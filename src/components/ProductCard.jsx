import React from "react";

const ProductCard = ({img, name, detail, price}) => {
    return (
        // Card box
        <div className="bg-white p-6 rounded-[40px] shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:translate-2 flex flex-col items-center">
            {/*image*/}
            <img
                src={img}
                alt={name}
                className="w-40 h-40 object-cover -mt-2 drop-shadow-xl pt-1 rounded-xl shadow-xl "
            />
            {/*Menu name*/}
            <h3 className="text-xl font-bold text-gray-800 mt-4 text-center">
                {name}
            </h3>
            {/*Detail*/}
            <p className="text-gray-400 text-sm mt-1 mb-3">
                {detail}
            </p>
            {/*Price*/}
            <span className="text-2xl font-bold text-yellow-400">
                {price}
            </span>


        </div>
    )
}
export default ProductCard;