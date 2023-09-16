import { useEffect, useState } from "react";
import CustomModal from "../../components/CustomModal";
import api from "../../api";
const AddAddressForm = ({isOpen, handler, userId, data}) => {
    const [ receiver, setReceiver ] = useState('');
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ province, setProvince ] = useState('');
    const [ city, setCity ] = useState('');
    const [ postalCode, setPostalCode ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ additionalNotes, setAddionalNotes ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullAddress = { userId, receiver, phoneNumber, province, city, postalCode, address, additionalNotes };
        if(!data){
            api.post("/api/v1/user/address", fullAddress).then(res => {
                handler('add', res.data);
                setReceiver(''); setPhoneNumber(''); setProvince(''); setCity(''); setPostalCode(''); setAddress(''); setAddionalNotes('')
            }).catch(err => {
                console.log(err);
            })
        }
        else{
            api.put("/api/v1/user/address/" + data._id, fullAddress).then(res => {
                handler('change', res.data);
                setReceiver(''); setPhoneNumber(''); setProvince(''); setCity(''); setPostalCode(''); setAddress(''); setAddionalNotes('')
            }).catch(err => {
                console.log(err);
            })
        }
    }
    useEffect(() => {
        if(data){
            console.log(data);
            setReceiver(data.receiver); setPhoneNumber(data.phoneNumber); setProvince(data.province); setCity(data.city); setPostalCode(data.postalCode); setAddress(data.address); setAddionalNotes(data.additionalNotes)
        }
        else{
            setReceiver(''); setPhoneNumber(''); setProvince(''); setCity(''); setPostalCode(''); setAddress(''); setAddionalNotes('')
        }
    }, [data])
    return ( 
        <CustomModal isOpen={isOpen} >
                <div className="px-5 font-main w-[400px]">
                    <div className="text-2xl py-3 mb-5 border-b">{data ? "Change Your Address" : "Add Your Address"}</div>
                    <div className="text-sm overflow-y-scroll h-[380px]">
                        <form action="">
                            <label className="text-sm font-semibold">Reciever Name</label>
                            <input value={ receiver } onChange={(e) => setReceiver(e.target.value)} 
                            type="text" className="block outline-none border rounded-md px-2 mt-2 mb-4 py-1 w-full"/>
                            <label className="text-sm font-semibold">Phone Number</label>
                            <input value={ phoneNumber } onChange={(e) => setPhoneNumber(e.target.value)}
                            type="text" className="block outline-none border rounded-md px-2 mt-2 mb-4 py-1 w-full"/>
                            <label className="text-sm font-semibold">Province</label>
                            <input value={ province } onChange={(e) => setProvince(e.target.value)}
                            type="text" className="block outline-none border rounded-md px-2 mt-2 mb-4 py-1 w-full"/>
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-semibold">
                                    City
                                    <input value={ city } onChange={(e) => setCity(e.target.value)}
                                    type="text" className="font-normal block outline-none border rounded-md px-2 mt-2 mb-4 py-1 w-full"/>
                                </label>
                                <label className="text-sm font-semibold">
                                    Postal Code
                                    <input value={ postalCode } onChange={(e) => setPostalCode(e.target.value)}
                                    type="text" className="font-normal block outline-none border rounded-md px-2 mt-2 mb-4 py-1 w-full"/>
                                </label>
                            </div>
                            <label className="text-sm font-semibold">Address</label>
                            <textarea value={ address } onChange={(e) => setAddress(e.target.value)}
                            type="text" className="block outline-none border rounded-md px-2 mt-2 mb-4 py-1 w-full h-[100px] resize-none"/>
                            <label className="text-sm font-semibold">Additional Notes</label>
                            <textarea value={ additionalNotes } onChange={(e) => setAddionalNotes(e.target.value)}
                            type="text" className="block outline-none border rounded-md px-2 mt-2 mb-4 py-1 w-full resize-none"/>
                        </form>
                    </div>
                    <div className="flex items-center text-sm pt-5">
                        <button onClick={ (e) => handleSubmit(e) }
                        className="px-5 py-2 rounded-full bg-stone-900 hover:bg-stone-900/80 text-stone-50 mr-5 w-full">{data ? "Change Address" : "Add Address"}</button>
                        <button onClick={ () => handler() }
                        className="px-5 py-2 rounded-full border border-stone-400 text-stone-400 w-full hover:shadow hover:font-medium">Cancel</button>
                    </div>
                </div>
            </CustomModal>
     );
}
 
export default AddAddressForm;