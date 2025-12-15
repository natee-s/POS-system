import React from "react";
import { GiFoodTruck, GiFrenchFries } from "react-icons/gi";
import { IoGridOutline, IoFastFoodOutline, IoChatbubbleOutline, IoReceiptOutline, IoSettingsOutline, IoNotificationsOutline, IoHelpBuoyOutline } from "react-icons/io5";
import { FaBowlFood } from "react-icons/fa6";
import { CiBowlNoodles } from "react-icons/ci";
import { MdEmojiFoodBeverage } from "react-icons/md";
import { LuDessert } from "react-icons/lu";
import { SiIfood } from "react-icons/si";

const Sidebar =()=>{
    return(
        // main sidebar เราจะแบ่งเป็น 2 ส่วน คือ "เมนูบน" กับ "โปรไฟล์ล่าง"
        // พื้นที่ส่วนบน
        <div className="w-64 h-screen bg-white p-6 flex flex-col justify-between shadow-2xl border-r border-gray-100">
          {/* --- ส่วนบน: โลโก้ และ เมนูหลัก --- */}
          <div>
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 mb-10">
                <div className="bg-red-500 text-white p-2 round-xl rounded-2xl">
                    <IoFastFoodOutline size={24} />
                </div>
                {/* System name */}
                <h1 className="font-bold text-2xl">SmartPOS</h1>
            </div>
            {/* Formenu catagory */}
            <div className="border border-dashed border-gray-300 p-2 text-sm text-gray-400">
                <nav className="space-y-2">
                    <Menulink icon={<GiFoodTruck/>} text="All Menu" />
                    <Menulink icon={<FaBowlFood/>} text="Fried Rice" />
                    <Menulink icon={<CiBowlNoodles/>} text="Noodles" />
                    <Menulink icon={<MdEmojiFoodBeverage />} text="Beverages" />
                    <Menulink icon={<GiFrenchFries/>} text="snack" />
                    <Menulink icon={<LuDessert/>} text="Dessert"  />
                    <Menulink icon={<SiIfood/>} text="Other Menu" />
                </nav>
            </div>

          </div>
        </div>
    )
}

const Menulink = ({icon, text, active}) => {
    return(
        <div className={`flex items-center gap-3 p-3 round-xl  cursor-pointer transition-colors ${active? 'bg-yellow-400':'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}>
            <span className="text-xl">{icon}</span>
            <span className="text-xl">{text}</span>
        </div>
    );
};


export default Sidebar;