import React from "react";
import { GiFoodTruck, GiFrenchFries } from "react-icons/gi";
import { IoGridOutline, IoFastFoodOutline, IoChatbubbleOutline, IoReceiptOutline, IoSettingsOutline, IoNotificationsOutline, IoHelpBuoyOutline } from "react-icons/io5";
import { FaBowlFood } from "react-icons/fa6";
import { CiBowlNoodles } from "react-icons/ci";
import { MdEmojiFoodBeverage } from "react-icons/md";
import { LuDessert } from "react-icons/lu";
import { SiIfood } from "react-icons/si";

const Sidebar =({onMenuClick, activeMenu})=>{
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
            {/* For menu catagory */}
            <div className="border border-dashed border-gray-300 p-2 text-sm text-gray-400">
                <nav className="space-y-2">
                    <Menulink icon={<GiFoodTruck/>} text="All Menu" onClick={()=>onMenuClick("all")} active={activeMenu === "all"}/>
                    <Menulink icon={<FaBowlFood/>} text="Fried Rice" onClick={()=>onMenuClick("Fried Rice")} active={activeMenu === "fried-rice"}/>
                    <Menulink icon={<CiBowlNoodles/>} text="Noodles" onClick={()=>onMenuClick("Noodles")} active={activeMenu === "noodles"}/>
                    <Menulink icon={<MdEmojiFoodBeverage />} text="Beverages" onClick={()=>onMenuClick("Beverages")} active={activeMenu === "beverages"}/>
                    <Menulink icon={<GiFrenchFries/>} text="Snack" onClick={()=>onMenuClick("Snack")} active={activeMenu === "snack"}/>
                    <Menulink icon={<LuDessert/>} text="Dessert"  onClick={()=>onMenuClick("Dessert")} active={activeMenu === "dessert"}/>
                    <Menulink icon={<SiIfood/>} text="Other Menu" onClick={()=>onMenuClick("Other Menu")} active={activeMenu === "other-menu"}/>
                </nav>
            </div>
            {/* Profile*/}
            <div className="mt-5">
                <div className="flex flex-col items-center gap-3 bg-gray-50 p-7 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-all">
                    <img src="public\profile.jpg" alt="profile picture" className="w-10 h-10 rounded-full object-cover shadow-lg" />
                <div>
                    <h4 className="font-bold text-sm text-gray-800">Nameeeeee</h4>
                    <p className="text-xs text-gray-500 py-2">Member : Goal</p>
                </div>

                </div>
            </div>
          </div>
        </div>
    )
}

const Menulink = ({icon, text, active, onClick}) => {
    return(
        <div 
            onClick={onClick}
            className={`flex items-center gap-3 p-3 round-xl  cursor-pointer transition-colors ${active? 'bg-yellow-400':'text-gray-500 hover:bg-red-500 hover:text-gray-700'}`}>
            <p className="text-xl">{icon}</p>
            <p className="text-xl">{text}</p>
        </div>
    );
};


export default Sidebar;