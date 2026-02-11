import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import { IoIosSearch } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";
import ProductCard from "./components/ProductCard";
import { data } from "./data";
import OrderSidebar from "./components/OrderSidebar";
import { IoTrashOutline } from "react-icons/io5";
import { IoAdd, IoRemove } from "react-icons/io5";
import { IoMenuOutline, IoCartOutline } from "react-icons/io5";

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

    // ถ้าหน้าจอเล็ก (ต่ำกว่า 1024px) ให้เปิดตะกร้าโชว์ทันที
    if (window.innerWidth < 1024) {
      setIsCartOpen(true);
    }
  };

  //ลบสินค้าออกจากตะกร้า
  const removeFromCart = (productID) => {
    setCart((prevCart) => {
      // ใช้ .filter เพื่อเก็บสินค้าที่ "ไม่ใช่ไอดีที่เราจะลบ" เอาไว้
      // ชิ้นไหนที่ไอดีตรงกับที่ส่งมา จะถูกคัดออกไป
      return prevCart.filter((item) => item.id !== productID);
    });
  };

  // function เพิ่ม และ ลด สินค้าในตะกร้า
  const updateCartQuantity = (productID, amount) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productID) {
          //คำนวณจำนวนใหม่
          const newQuantity = item.quantity + amount;

          //ถ้าจำนวนน้อยกว่า 1 ให้คงที่ที่ 1
          return { ...item, quantity: newQuantity < 1 ? 1 : newQuantity };
        }
        return item;
      });
    });
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

  // สร้าง State สำหรับควบคุมการแจ้งเตือน
  const [showSuccess, setShowSuccess] = useState(false);

  //สร้างฟังก์ชัน Handle Checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("please select foods");
      return;
    }
    // ล้างตะกร้า
    setCart([]);

    // โชว์หน้าต่างสำเร็จ
    setShowSuccess(true);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    //ส่วนที่แสดงผลทั้งหมดในหน้าจอ
    <div className="flex w-full min-h-screen bg-gray-100 overflow-hidden">
      {/*พื้นที่สำหรับสร้าง sidebar*/}
      <div
        className={`
        fixed insert-y-0 left-0 z-40 transform transition-traansform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar
          onMenuClick={(cat) => {
            setSelectedCategory(cat);
            setIsSidebarOpen(false);
          }}
          activeMenu={selectedCategory}
        />
      </div>

      {/* ฉากมืดตอนเปิด Sidebar บนมือถือ */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/*พื้นที่สำหรับสร้าง main content*/}
      <div className="flex-1 bg-gray-50 h-screen overflow-y-auto flex flex-col">
        {/* --- ส่วนหัว (Header) --- */}
        <header className="p-4 md:p-6 flex justify-between items-start sticky top-0 z-10 bg-gray-50/80 backdrop-blur-md">
          {/*---ปุ่มย้อนกลับ + หัวข้อ---*/}
          <div className="flex items-center gap-3">
            {/* --- นี่คือปุ่ม Hamburger --- */}
            <button
              onClick={() => setIsSidebarOpen(true)}// เมื่อกดจะสั่งให้ Sidebar เปิด
              className="lg:hidden p-2 bg-white rounded-xl shadow-sm hover:bg-gray-50 text-gray-600 border border-gray-100"
            >
              <IoMenuOutline size={28}/>

            </button>
            {/*---ปุ่มย้อนกลับ---*/}
            <button className="bg-white p-3 rounded-2xl shadow-sm hover:shadow-red-500 transition-all text-gray-600">
              <IoArrowBackOutline size={20} />
            </button>
            {/* ---หัวข้อ--- */}
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold text-gray-800">{pageTitle}</h2>
            </div>
          </div>
          {/* Search Bar ปรับความกว้างตามหน้าจอ */}
          <div className=" bg-white flex items-center gap-3 px-4 py-2 md:py-3 rounded-xl shadow-sm w-40 md:w-80 border border-gray-100">
            <IoIosSearch className="text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>
        {/*Card Area*/}
        <main className="pt-4 px-4 md:px-8 pb-32 flex-1">
          {/* ปรับเป็น 2 คอลัมน์บนมือถือ (grid-cols-2) */}
          <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
            {filteredData.map((food) => (
              <ProductCard
                key={food.id}
                {...food}
                onClick={() => setSelectedProduct(food)}
              />
            ))}
          </div>
        </main>
      </div>
      {/* แสดงผลสินค้าที่เลือกในตะกร้า */}
      <aside
        className={`
        fixed inset-y-0 right-0 z-50 flex flex-col bg-white shadow-2xl transition-transform duration-300
        w-full ${isCartOpen ? "translate-x-0" : "translate-x-full"}
        lg:relative lg:w-96 lg:translate-x-0 lg:shadow-none lg:border-l lg:border-gray-100
      `}
      >
        {/* เพิ่มปุ่มปิดตะกร้าเฉพาะบนมือถือ */}
        <div className="p-4 flex items-center justify-between lg:hidden border-b">
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-gray-500"
          >
            <IoArrowBackOutline size={24} />
          </button>
          <h2 className="text-xl font-bold">My Order</h2>
          <div className="w-10"></div> {/* สร้างสมดุลให้หัวข้ออยู่กลาง */}
        </div>

        <div className="p-6 hidden lg:block">
          <h2 className="text-2xl font-bold text-gray-800">Current Order</h2>
        </div>

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
                  <div className="flex items-center gap-3 mt-2">
                    {/* ปุ่ม - */}
                    <button
                      onClick={() => updateCartQuantity(item.id, -1)}
                      className="w-6 h-6 flex items-center justify-center bg-whote border border-gray-200 rounded-md text-gray-600 hover-bg-gray-100 transition-colors"
                    >
                      <IoRemove size={14} />
                    </button>

                    {/* แสดงจำนวน */}
                    <span className="font-bold text-gray-700 min-w-5 text-center">
                      {item.quantity}
                    </span>

                    {/* ปุ่ม + */}
                    <button
                      onClick={() => updateCartQuantity(item.id, 1)}
                      className="w-6 h-6 flex items-center justify-center bg-yellow-400 rounded-md text-white hover:bg-yellow-500 transition-colors shadow-sm"
                    >
                      <IoAdd size={14} />
                    </button>

                    <span className="text-xs text-gray-400 ml-1">
                      @ ฿{item.price}
                    </span>
                  </div>
                  <span className="font-bold text-yellow-500">
                    ฿{(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-red-400 hover:text-red-700 hover:bg-red-200 rounded-lg transition-colors"
                    title="Remove item"
                  >
                    <IoTrashOutline size={18} />
                  </button>
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
              ฿
              {totalAmount.toLocaleString(undefined, {
                miniumnFractionDigits: 2,
              })}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-green-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-600 transition-all shadow-lg active:scale-95"
          >
            Checkout
          </button>
        </div>
      </aside>

      {/* แสดง OrderSidebar เมื่อมีข้อมูลสินค้า (selectedProduct ไม่ใช่ null) */}
      {/* ส่งข้อมูล product และฟังก์ชันปิด (onClose) เข้าไป */}
      {selectedProduct && (
        //ฉากมืด
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedProduct(null)} // คลิ๊กที่ว่างแล้วปิด Popup
        >
          {/* ตัว popup */}
          <div onClick={(e) => e.stopPropagation()}>
            <OrderSidebar
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onConfirm={addToCart}
            />
          </div>
        </div>
      )}

      {/* --- Floating Cart Button (โชว์เฉพาะมือถือ และจะโชว์ก็ต่อเมื่อมีของในตะกร้า) --- */}
      {cart.length > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="lg:hidden fixed bottom-6 right-6 z-40 bg-yellow-400 text-white p-4 rounded-full shadow-2xl flex items-center gap-3 animate-pop-in active:scale-95 transition-transform"
        >
          <div className="relative">
            <IoCartOutline size={28} />
            {/* วงกลมสีแดงบอกจำนวนชิ้น */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-yellow-400">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <span className="font-bold text-lg">
            ฿{totalAmount.toLocaleString()}
          </span>
        </button>
      )}

      {/* --- Success Message Popup --- */}
      {showSuccess && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 animate-fade-in">
          {/* ฉากหลังมืดจางๆ */}
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

          {/* กล่องข้อความสีเขียว */}
          <div className="bg-white p-8 rounded-4xl shadow-2xl z-10 flex flex-col items-center text-center animate-pop-in">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-500">
              Your order has been recorded in the system.
            </p>

            <button
              onClick={() => setShowSuccess(false)}
              className="mt-6 px-8 py-2 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-700 transition-all"
            >
              {`>>OK<<`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
