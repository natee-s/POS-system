import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import { IoIosSearch } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";
import ProductCard from "./components/ProductCard";
import { data } from "./data";
import OrderSidebar from "./components/OrderSidebar";

function App() {
  const [cart, setCart] = useState([]); //[] (Array ว่าง) เพราะตอนเริ่มเปิดหน้าเว็บมา ตะกร้าต้องว่างเปล่า (ไม่มีของ)
  const [searchTerm, setSearchTerm] = useState(""); //searchTerm คือตัวแปรเก็บข้อความ, setSearchTerm คือฟังก์ชันที่ใช้เปลี่ยนข้อความนั้น
  const [selectedCategory, setSelectedCategory] = useState("all");
  // สร้าง state สำหรับเก็บ สินค้าที่กำลังถูกเลือก
  const [selectedProduct, setSelectedProduct] = useState(null);

  // สร้างฟังก์ชัน "หยิบใส่ตะกร้า" (Add to Cart Logic)
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      //ตรวจสอบว่ามีสินค้าอยู่ในตระกร้าหรือยัง
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // ถ้ามีแล้ว: ให้ลูปหาชิ้นนั้นแล้ว + เข้าไป
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        //ถ้ายังไม่มี: ให้ + ชิ้นใหม่ เข้าไปใน array ต่อจากของเดิม
        return [...prevCart, { ...product, quantity: quantity }];
      }
    });
    // เมื่อเพิ่มเสร็จให้ปิดหน้าต่างเลือกสินค้า
    setSelectedProduct(null);
  };

  // กรองข้อมูล
  const filteredData = data.filter((item) => {
    // สร้างเงื่อนไขสำหรับ "หมวดหมู่"
    const matchesCatagory =
      selectedCategory === "all" || item.category === selectedCategory;

    // สร้างเงื่อนไขสำหรับ "การค้นหา"
    // เราใช้ .toLowerCategory() เพื่อให้พิมพ์ตัวเล็ก/ใหญ่ก็หาเจอ
    // .includes(...): เป็นคำสั่งเช็คว่า "ในชื่อสินค้า มีคำที่เราพิมพ์อยู่ข้างในไหม?"
    const matchesSearch = item.name
      .toLocaleLowerCase()
      .includes(searchTerm.toLocaleLowerCase());

    // ผลลัพธ์ต้องผ่าน "ทั้งสองเงื่อนไข" ถึงจะยอมให้แสดงบนหน้าจอ
    return matchesCatagory && matchesSearch;
  });

    //LOGIC คำนวณราคารวมทั้งหมด
  const totalAmount = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const pageTitle =
    selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);

  return (
    //ส่วนที่แสดงผลทั้งหมดในหน้าจอ
    <div className="flex w-full min-h-screen bg-gray-100 overflow-hidden">
      {/*พื้นที่สำหรับสร้าง sidebar*/}
      <Sidebar
        onMenuClick={setSelectedCategory}
        activeMenu={selectedCategory}
      />

      {/*พื้นที่สำหรับสร้าง main content*/}
      <div className="flex-1 bg-gray-50 h-screen overflow-y-auto flex flex-col">
        {/* --- ส่วนหัว (Header) --- */}
        <header className="p-6 flex justify-between items-start sticky top-0 z-10 bg-gray-50">
          {/*---ปุ่มย้อนกลับ + หัวข้อ---*/}
          <div className="flex items-center gap-4">
            {/*---ปุ่มย้อนกลับ---*/}
            <button className="bg-white p-3 rounded-2xl shadow-sm hover:shadow-red-500 transition-all text-gray-600">
              <IoArrowBackOutline size={20} />
            </button>
            {/* กล่องข้อความ (Breadcrumb + Title) */}
            <div className="flex flex-col">
              {/* <div className="h-12 flex items-center">
                <span className="text-sm text-gray-400 font-medium">
                  Food & dirnk &gt; Burgers
                </span>
              </div> */}

              {/* ---หัวข้อ--- */}
              <h2 className="text-3xl font-bold text-gray-800">{pageTitle}</h2>
            </div>
          </div>
          {/* ฝั่งขวา: Search Bar */}
          <div className="bg-white flex items-center gap-3 px-4 py-3 rounded-xl shadow-sm w-80 border border-gray-100 ">
            <IoIosSearch className="text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search . . ."
              className="bg-transparent outline-none text-gray-600 w-full placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} //ทุกครั้งที่มีการกดแป้นพิมพ์ (e), มันจะเอาค่าในช่องนั้น (e.target.value) ไปเก็บไว้ใน searchTerm
            />
          </div>
        </header>
        {/*Card Area*/}
        <main className="pt-12 px-8 pb-20 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-y-20 gap-x-8">
            {filteredData.map((food) => (
              <ProductCard
                key={food.id}
                img={food.img}
                name={food.name}
                detail={food.detail}
                price={food.price}
                //ส่งคำสั่ง onClick ไปให้ card*
                onClick={() => setSelectedProduct(food)}
              />
            ))}
          </div>
        </main>
      </div>
      {/* แสดงผลสินค้าที่เลือกในตะกร้า */}
      <aside className="w-96 bg-white border-l border-gray-100 flex flex-col shadow-xl h-screen">
        <h2 className="text-2xl font-bold text-gray-800 my-6 text-center">
          Current Order
        </h2>

        {/* ส่วนรายการสินค้าในตะกร้า */}
        <div className="flex-1 overflow-y-auto px-6 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-16 h-16 object-contain bg-white rounded-xl shadow-sm"
              />
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 text-sm line-clamp-1">
                  {item.name}
                </h4>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-400">
                    ฿{item.price}x{item.quantity}
                  </span>
                  <span className="font-bold text-yellow-500">
                    ฿{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* สรุปราคารวม */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <div className="flex justify-between mb-4">
            <span className="text-gray-400">Total Amout</span>
            
            {/* แสดงราคารวมที่คำนวณได้ */}
            <span className="text-2xl font-bold text-gray-800">
              ฿{totalAmount.toLocaleString(undefined, {
                miniumnFractionDigits: 2,
              })}
            </span>
          </div>
          <button className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-600 transition-all shadow-lg shadow-green-100">
            Checkout
          </button>
        </div>
      </aside>

      {/* 4. แสดง OrderSidebar เมื่อมีข้อมูลสินค้า (selectedProduct ไม่ใช่ null) */}
      {/* ส่งข้อมูล product และฟังก์ชันปิด (onClose) เข้าไป */}
      {selectedProduct && (
        <OrderSidebar
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onConfirm={addToCart}
        />
      )}
    </div>
  );
}

export default App;
