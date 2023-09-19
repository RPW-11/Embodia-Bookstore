import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import PaymentOptions from "./PaymentOptions";
import { useOrderContext } from "../../hooks/useOrderContext";
import { useAuthContext } from "../../hooks/useAuthContext";

const Payment = () => {
    const [ sticking, setSticking ] = useState(false);
    const [ orders, setOrders ] = useState(null);
    const [ payment, setPayment ] = useState(null);
    const [ isChoosingBank, setIsChoosingBank ] = useState(false);
    const [ isChoosingEwallet, setIsChoosingEwallet ] = useState(false);
    const { order } = useOrderContext();
    const { user } = useAuthContext();


    // functions
    const sticky = () => {
        let scrollTop = window.scrollY;

        if(scrollTop >= 74){
            setSticking(true);
        }
        else{
            setSticking(false);
        }
    }
    window.onscroll = () => {
        sticky();
    };

    const computeTotal = () => {
        return order ? order.totalPrice - order.currentCourier.service.price : 0
    }
    return ( 
        <div className={`Payment border bg-stone-50  w-[380px] ${sticking && `fixed top-10` } shadow p-5 rounded-md`}>
            <div className="font-medium text-lg pb-3">Order Recap</div>
            <div className="flex justify-between pt-3 pb-1 text-stone-500">
                <div>Total (x{ user ? user.cart.reduce((acc, item) => { return acc + item.quantity;}, 0) : 0})</div> <div>IDR { order ? order.totalPrice : 0 }</div>
            </div>
            <div className="flex justify-between py-1 text-stone-500">
                <div>Shipment</div> <div>-IDR { order.currentCourier ? order.currentCourier.service.price : 0 }</div>
            </div>
            <div className="flex justify-between py-3 text-stone-900 font-medium text-lg border-b-4">
                <div>Total</div> <div>IDR { computeTotal() }</div>
            </div>
            <div className="font-medium text-lg py-3 ">Payment Method</div>
            <button onClick={() => setIsChoosingBank(!isChoosingBank)}
            className="w-full px-3 py-2 border rounded-lg bg-stone-500 hover:bg-stone-500/80 text-stone-50 flex justify-between items-center">
                <div>Bank Transfer</div> <FiChevronDown size={20}/>
            </button>
            { isChoosingBank && <PaymentOptions type={"bank"} setPayment={setPayment}/> }
            <button onClick={() => setIsChoosingEwallet(!isChoosingEwallet)}
            className="mt-1 w-full px-3 py-2 border rounded-lg bg-stone-500 hover:bg-stone-500/80 text-stone-50 flex justify-between items-center">
                <div>E-Wallet</div> <FiChevronDown size={20}/>
            </button>
            { isChoosingEwallet && <PaymentOptions type={"ewallet"} setPayment={setPayment}/>}
            <button className="rounded-full text-center bg-stone-900 hover:bg-stone-900/80 py-2 text-stone-50 w-full mt-7">Proceed to Payment</button>
        </div>
     );
}
 
export default Payment;