import { useEffect, useState } from "react";
import AddAddressForm from "./AddAddressForm";
import Loading from "../../components/Loading";
import { useAuthContext } from "../../hooks/useAuthContext";
import CustomModal from "../../components/CustomModal";
import { GrClose } from "react-icons/gr";
import api from "../../api";

const ChooseAddress = () => {
    const [ address, setAddress ] = useState(null);
    const [ userAddresses, setUserAddresses ] = useState([]);
    const [ isAddingAddress, setIsAddingAddress ] = useState(false);
    const [ isChoosingAddress, setIsChoosingAddress ] = useState(false);
    const [ dataOnChange, setDataOnChange ] = useState(null);
    const { user } = useAuthContext();
    const handleAddAddress = (type, value=null) => {
        if(type === "add" && value){
            const newArr = [...userAddresses, value];
            setUserAddresses(newArr);
        }
        if(type === 'change' && value){
            const updatedData = userAddresses.map((item) => {
                if(item._id === value._id){
                    return value;
                }
                return item;
            })
            setUserAddresses(updatedData);
        }
        setIsAddingAddress(false);
        setDataOnChange(null);
        console.log("data is set to null");
    } 
    const handleChoosingAddress = (addr) => {
        setAddress(addr);
        setIsChoosingAddress(false);
    }
    const deleteAddress = (id) => {
        api.delete("/api/v1/user/address?addressId=" + id).then().catch(err => {
            console.log(err);
        })
        const newArr = userAddresses.filter((item) => item._id !== id);
        setUserAddresses(newArr);
    }
    const handleChange = (addr) => {
        setDataOnChange(addr);
        setIsAddingAddress(true);
        setIsChoosingAddress(false);
    }
    const createAddress = () => {
        return(
            <div className="not-italic">
                <div className="text-sm font-medium">Receiver: {address.receiver + "-" + address.phoneNumber}</div>
                <div className="italic font-light">{address.address}</div>
                <div className="text-sm">{address.province + " " + address.city + ", " + address.postalCode} </div>
            </div>
        )
    }
    useEffect(() => {
        if(user ){
            api.get("/api/v1/user/address?userId=" + user._id).then(res => {
                setAddress(res.data[0]);
                setUserAddresses(res.data);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [user])

    useEffect(() => {
        if(userAddresses){
            console.log("testo");
            setAddress(userAddresses[0]);
        }
    },[userAddresses]);

    if(user){
        return ( 
            <div className="w-full">
                <AddAddressForm isOpen={ isAddingAddress } handler={handleAddAddress} userId={ user._id } data={dataOnChange}/>
                <CustomModal isOpen={ isChoosingAddress } >
                    <div className="p-5 font-main w-[600px]">
                        <div className="text-2xl pb-3 mb-5 border-b">Choose Your Address</div>
                        <div className="absolute relative h-[400px] scrollbar-hide overflow-y-scroll z-50">
                            {userAddresses.map((addr) => (
                                <div className="flex items-center" key={addr._id}>
                                    <button className="text-left rounded-md w-full border mb-3 p-3 shadow" onClick={() => handleChoosingAddress(addr)}>
                                        <div className="text-sm font-medium mb-3">Receiver: {addr.receiver} - {addr.phoneNumber}</div>
                                        <div className="font-light">{addr.address}</div>
                                        <div className="text-sm">{addr.province + " " + addr.city + ", " + addr.postalCode}</div>
                                    </button>
                                    <div className="absolute z-40 right-8 mb-3 flex items-center justify-between">
                                        <button onClick={() => handleChange(addr)}
                                        className="px-5 py-1 text-sm border rounded-full mr-3 border-stone-400 text-stone-400 
                                        hover:font-medium hover:shadow-gray-400/50 hover:shadow-md">
                                            CHANGE</button>
                                        <button onClick={() => deleteAddress(addr._id)}
                                        className="px-5 py-1 text-sm border rounded-full border-red-400 text-red-400 hover:font-medium 
                                        hover:shadow-red-400/50 hover:shadow-md">
                                            DELETE</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setIsChoosingAddress(false)} className="absolute top-0 right-0 p-2 hover:bg-stone-400 rounded-full"><GrClose/></button>
                    </div>
                </CustomModal>
                <div className="font-medium py-3">Address</div>
                <div className="italic border-y py-3 border-stone-400"> { address ? createAddress(): "You don't have address yet" }</div>
                <div className="Buttons flex items-center py-3 w-[325px] justify-between">
                    <button className="px-5 py-2 bg-stone-900 text-stone-50 rounded-full hover:bg-stone-900/80"
                    onClick={() => setIsAddingAddress(true)}>Add Address</button>
                    <button disabled={!userAddresses.length}
                    onClick={() => setIsChoosingAddress(true)}
                    className={userAddresses.length?
                    `px-5 py-2 bg-stone-900 text-stone-50 rounded-full hover:bg-stone-900/80` :
                    `px-5 py-2 bg-stone-400 text-stone-500 rounded-full cursor-default`}>
                        Choose Address</button>
                </div>
            </div>
        );
    }
    return (
        <Loading/>
    )
}
 
export default ChooseAddress;