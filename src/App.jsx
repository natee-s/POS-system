import React from "react";
import Sidebar from "./components/Sidebar";

function App() {
  return (              //ส่วนที่แสดงผลทั้งหมดในหน้าจอ
    <div className="flex w-full min-h-screen bg-gray-100">
      
     {/*พื้นที่สำหรับสร้าง sidebar*/}
        <Sidebar />
    
      <div className="flex-1 bg-blue-100">  {/*พื้นที่สำหรับสร้าง main content*/}

      </div>
      
    </div>
  );
}

export default App;