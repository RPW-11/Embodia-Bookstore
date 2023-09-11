import { useState } from "react";
import CustomModal from "../../components/CustomModal";

const ChooseAddress = () => {
    const [ address, setAddress ] = useState("You haven't choose any address yet");
    const [ userAddresses, setUserAddresses ] = useState([]);
    const [ isAddingAddress, setIsAddingAddress ] = useState(false); 


    return ( 
        <div className="w-full">
            <CustomModal isOpen={isAddingAddress} closeModal={() => setIsAddingAddress(false)} >
                <div className="px-5">
                    <form action="" className="text-sm">
                        <label className="text-sm font-semibold">Reciever Name</label>
                        <input type="text" className="block outline-none border rounded-md px-2 mt-2 mb-4 py-1 w-full"/>
                        <label className="text-sm font-semibold">Phone Number</label>
                        <input type="text" className="block outline-none border rounded-md px-2 mt-2 mb-4 py-1 w-full"/>
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold">
                                Province
                                <input type="text" className="block outline-none border rounded-md px-2 mt-2 mb-4 py-1 w-full"/>
                            </label>
                            <label className="text-sm font-semibold">
                                Postal Code
                                <input type="text" className="block outline-none border rounded-md px-2 mt-2 mb-4 py-1 w-full"/>
                            </label>
                        </div>
                        <label className="text-sm font-semibold">Address</label>
                        <input type="text" className="block outline-none border rounded-md px-2 mt-2 mb-4 py-1 w-full h-[100px] text-top"/>

                    </form>
                </div>
            </CustomModal>
            <div className="font-medium py-3">Address</div>
            <div className="italic border-y py-3 border-stone-400"> { address }</div>
            <div className="Buttons flex items-center py-3 w-[325px] justify-between">
                <button className="px-5 py-2 bg-stone-900 text-stone-50 rounded-full hover:bg-stone-900/80"
                onClick={() => setIsAddingAddress(true)}>Add Address</button>
                <button className={userAddresses.length?
                `px-5 py-2 bg-stone-900 text-stone-50 rounded-full hover:bg-stone-900/80` :
                `px-5 py-2 bg-stone-400 text-stone-500 rounded-full cursor-default`}>
                    Choose Address</button>
            </div>
        </div>
     );
}
 
export default ChooseAddress;