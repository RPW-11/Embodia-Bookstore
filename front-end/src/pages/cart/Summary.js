import { useEffect, useState } from "react";

const Summary = ({ data }) => {
    const [ subTotal, setSubtotal ] = useState(0);
    const [ discount, setDiscount ] = useState(0);
    const [ grandTotal, setGrandTotal ] = useState(0);
    useEffect(() => {
        let total = data.reduce((accumulator, item) => {
            return accumulator + item.price * item.quantity;
        }, 0)
        setSubtotal(total)
        setDiscount(5000);
        setGrandTotal(total - 5000);
    }, [data])
    return ( 
        <div className="relative absolute p-5 rounded-md bg-stone-50 text-left border">
            <div className="mb-3 font-semibold">Summary</div>
            <div className="text-sm border-b text-stone-400">
                <div className="flex justify-between py-2">
                    <s className="no-underline">Subtotal</s>
                    <s className="no-underline text-stone-900 font-semibold">IDR { subTotal }</s>
                </div>
                <div className="flex justify-between py-2">
                    <s className="no-underline">Discount</s>
                    <s className="no-underline text-stone-900 font-semibold">IDR { discount }</s>
                </div>
            </div>
            <div className="flex justify-between py-2">
                <s className="no-underline font-semibold">Grand total</s>
                <s className="no-underline font-semibold">IDR { grandTotal }</s>
            </div>
            <button className="bg-stone-900 rounded-md text-stone-50 w-full py-2 mt-5 hover:bg-stone-900/80 font-medium">Check out</button>
        </div>
     );
}
 
export default Summary;