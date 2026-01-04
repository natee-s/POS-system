import React,{useState} from "react";
import Sidebar from "./components/Sidebar";
import { IoIosSearch } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";
import ProductCard from "./components/ProductCard";
import { data } from "./data";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All Menu");
  // Category Filter
  // ถ้า selectedCategory เป็น "all" ให้เอา products ทั้งหมดมา
  // ถ้าไม่ใช่ ให้กรองเอาเฉพาะ item ที่ category ตรงกับที่เลือก
  const filteredData = selectedCategory === "all"
    ? data : data.filter(item => item.category === selectedCategory);
  
    const pageTile = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);

  return (
    //ส่วนที่แสดงผลทั้งหมดในหน้าจอ
    <div className="flex w-full min-h-screen bg-gray-100">
      {/*พื้นที่สำหรับสร้าง sidebar*/}
      <Sidebar 
        onMenuClick = {setSelectedCategory}
        activeMenu = {selectedCategory}
      />

      {/*พื้นที่สำหรับสร้าง main content*/}
      <div className="flex-1 bg-gray-50 h-screen overflow-y-auto">
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
              <h2 className="text-3xl font-bold text-gray-800">
                {pageTile}
              </h2>
            </div>
          </div>
            {/* ฝั่งขวา: Search Bar */}
            <div className="bg-white flex items-center gap-3 px-4 py-3 rounded-xl shadow-sm w-80 border border-gray-100 ">
              <IoIosSearch className="text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search . . ."
                className="bg-transparent outline-one text-gray-600 w-full placeholder-gray-400"
              />
            </div>
        </header>
        {/*Card Area*/}
        <main className="pt-12 px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-20 gap-x-8">
            {filteredData.map((food)=>(
              <ProductCard
                key={food.id}
                img={food.img}
                name={food.name}
                detail={food.detail}
                price={food.price}
              />
              ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
