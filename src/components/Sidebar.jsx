import React from "react";
import { GiFoodTruck } from "react-icons/gi";
import { IoGridOutline, IoFastFoodOutline, IoChatbubbleOutline, IoReceiptOutline, IoSettingsOutline, IoNotificationsOutline, IoHelpBuoyOutline } from "react-icons/io5";

const Sidebar =()=>{
    return(
        // main sidebar เราจะแบ่งเป็น 2 ส่วน คือ "เมนูบน" กับ "โปรไฟล์ล่าง"
        // พื้นที่ส่วนบน
        <div className="w-64 h-screen bg-white p-6 flex flex-col jusrtify-between shadow-2xl border-r border-gray-100">
          {/* --- ส่วนบน: โลโก้ และ เมนูหลัก --- */}
          <div>
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 mb-10">
                <div className="bg-red-500 text-white p-2 round-xl rounded-2xl">
                    <IoFastFoodOutline size={24} />
                </div>
                <h1 className="font-bold text-2xl">SmartPOS</h1>
            </div>

            <nav className="space-y-3">

            </nav>

          </div>
        </div>
    )
}
export default Sidebar;