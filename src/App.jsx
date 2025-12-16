import React from "react";
import Sidebar from "./components/Sidebar";
import { IoIosSearch } from "react-icons/io";
import { IoArrowBackOutline } from "react-icons/io5";

function App() {
  return (
    //ส่วนที่แสดงผลทั้งหมดในหน้าจอ
    <div className="flex w-full min-h-screen bg-gray-100">
      {/*พื้นที่สำหรับสร้าง sidebar*/}
      <Sidebar />

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
              <div className="h-12 flex items-center">
                <span className="text-sm text-gray-400 font-medium">
                  Food & dirnk &gt; Burgers
                </span>
              </div>
            
              {/* ---หัวข้อ--- */}
              <h2 className="text-3xl font-bold text-gray-800">
                Burgers🍔
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
      </div>
    </div>
  );
}

export default App;
