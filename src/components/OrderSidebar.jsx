import React, {useState}from "react";
import { IoCloseOutline, IoAdd, IoRemove } from "react-icons/io5";

const OrderSidebar = ({product, onClose}) => {
  // สร้าง State สำหรับรับจำนวน เริ่มที่ 1 (สร้าง "ความจำ" ให้หน้าจอ (State))
  const [quantity, setQuantity] = useState(1)

  // Logic เพิ่มจำนวน
  const increase = () => {
    setQuantity(quantity +1);
  };

  // Logic ลดจำนวน but ห้ามต่ำกว่า 1
  // ถ้าจำนวนปัจจุบัน มากกว่า 1 ถึงจะยอมให้ลบได้นะ แต่ถ้าเหลือ 1 แล้ว กดไปก็ไม่มีผลอะไ
  const decrease = () =>{
    if(quantity>1){
      setQuantity(quantity-1)
    }
  };

  // Logic คำนวณราคารวม(ราคาต่อชิ้น*จำนวน)
  const totalPrice = (parseFloat(product.price)*quantity).toFixed(2);

  return (
    // main box
    <div className="animate-slide-in animate-slide-out fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto">
      {/*ปุ่มปิด + รายละเอียดสินค้า*/}
      <div>
        {/*ปุ่มปิด*/}
        <div className="flex justify-end mb-6">
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
            <IoCloseOutline size={24} />
          </button>
        </div>
        {/* รูปอาหาร */}
        <div className="flex justify-center mb-8 relative">
          {/* เงาข้างหลัง */}
          <div className="absolute inset-0 bg-yellow-400 rounded-full blur-3xl opacity-20 scale-75 transform translate-y-4"></div>
          <img
            src={product.img}
            alt={product.name}
            className="w-64 h-64 object-contain relative z-20 drop-shadow-xl"
          />
        </div>
        {/*food detail*/}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {product.name}
          </h2>
          <span className="text-4xl font-bold text-yellow-400">
            ฿{product.price}
          </span>
        </div>
        {/* ปุ่มเพิ่ม/ลดจำนวน (Quantity Control) */}
        <div className="flex items-center justify-between bg-green-50 p-4 rounded-2xl mb-6 border border-gray-100">
          <span className="font-bold text-gray-700 text-lg">Quantity</span>
          <div className="flex items-center gap-4">
            {/*ปุ่มลบ*/}
            <button 
              onClick={decrease}
              className="bg-white border border-gray-200 p-3 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-colors shadow-sm">
              <IoRemove size={20} />
            </button>
            {/*Number*/}
            <span className="font-bold text-2xl w-8 text-center">
              {quantity}
            </span>
            {/*ปุ่มบวก*/}
            <button 
              onClick={increase}
              className="bg-yellow-400 p-3 rounded-xl text-white hover:bg-yellow-500 transition-colors shadow-md">
              <IoAdd size={20} />
            </button>
          </div>
        </div>
      </div>
      {/* --- ส่วนล่าง: ปุ่ม Add to Order --- */}
      <div>
        <button 
        
          className="w-full bg-yellow-400 text-whit py-4 rounded-2xl font-bold text-xl hover:bg-yellow-500 transition-colors shadow-lg hover:shadow-xl active:scale-95 transform duration-200 flex items-center justify-center gap-2">
            Add to Order
            {/*คำนวณราคา (จำนวน * ราคา) */}
            <span>฿{totalPrice}</span>
        </button>
      </div>
    </div>
  );
};

export default OrderSidebar;
