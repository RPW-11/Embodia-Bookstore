import ChooseAddress from "./ChooseAddress";
import ShipmentService from "./ShipmentService";
import Payment from "./Payment";

const CheckOut = () => {
    return ( 
        <div id="Checkout" className="px-20 py-10 w-full text-left h-full">
            <div className="text-2xl font-semibold">Checkout</div>
            <div className="grid grid-cols-3">
                <div className="col-span-2 pr-5">
                    <div className="py-5 border-b-[8px] border-stone-300">
                        <ChooseAddress/>
                    </div>
                    <div className="py-5">
                        <ShipmentService />
                    </div>
                </div>
                <div className="col-span-1 pl-5 py-5">
                    <Payment />
                </div>
            </div>
        </div>
    );
}
 
export default CheckOut;