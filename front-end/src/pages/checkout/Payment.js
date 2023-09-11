import { useState } from "react";

const Payment = () => {
    const [ sticking, setSticking ] = useState(false);
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
    return ( 
        <div className={`Payment border bg-stone-50  h-[400px] w-[380px] ${sticking && `fixed top-10` } shadow p-5 rounded-md`}>
            Do you?
        </div>
     );
}
 
export default Payment;