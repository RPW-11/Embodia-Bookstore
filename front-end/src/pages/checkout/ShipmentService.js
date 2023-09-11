import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const ShipmentService = () => {
    const [ courier, setCourier ] = useState("JNE Express")
    return ( 
        <div className="w-full">
            <div className="font-medium py-3">Shipment</div>
            <div className="py-3 flex items-center justify-between">
                <div className="">
                    { courier }
                    <div className="no-underline text-sm font-light">Swift JNE Estimated arrival on Saturday, 25 Dec 2023</div>
                </div>
                <div className="flex items-center text-center">
                    <div className="text-sm mr-5 font-medium">Courier</div>
                    <button className="px-5 py-1 bg-stone-900 text-stone-50 rounded-full text-sm flex items-center">JNE Swift<FiChevronDown className="ml-1 text-lg"/></button>
                </div>
            </div>
            <div className="border-t text-right border-stone-900 py-3 mt-3 font-medium flex items-center justify-between">
                <div>Delivery cost</div>
                <div>IDR 42000</div>
            </div>
        </div>
     );
}
 
export default ShipmentService;