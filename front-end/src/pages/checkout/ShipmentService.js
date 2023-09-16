import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import api from "../../api";
import Loading from "../../components/Loading";

const ShipmentService = () => {
    const [ courier, setCourier ] = useState(null);
    const [ shipments, setShipments ] = useState(null);
    const [ isChoosingShipment, setIsChoosingShipment ] = useState(false);

    const handleChoosingShipment = (courierName, service) => {
        setCourier({ courier: courierName, service });
        setIsChoosingShipment(false);
    }

    const estimatedArrival = (duration) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const current = new Date();
        current.setDate(current.getDate() + duration);
        return `${current.getDate()} ${months[current.getMonth()]} ${current.getFullYear()}`;
    }

    useEffect(() => {
        api.get("/api/v1/shipment").then(res => {
            setShipments(res.data);
            setCourier({ courier: res.data[0].courier, service: res.data[0].services[0]})
        })
    }, [])
    if(!shipments)
        return (<Loading/>)
    return ( 
        <div className="w-full">
            <div className="font-medium py-3">Shipment</div>
            <div className="py-3 flex items-center justify-between">
                <div className="">
                    { courier.courier }
                    <div className="no-underline text-sm font-light">{courier.service.name} Estimated arrival on {estimatedArrival(courier.service.duration[0])} or {estimatedArrival(courier.service.duration[1])}</div>
                </div>
                <div className="flex items-center text-center">
                    <div className="text-sm mr-5 font-medium">Courier</div>
                    <div className="flex flex-cols justify-end">
                        <button className="px-5 py-1 bg-stone-900 text-stone-50 rounded-full text-sm flex items-center hover:bg-stone-900/80" onClick={() => setIsChoosingShipment(!isChoosingShipment)}>
                            {courier.service.name}<FiChevronDown className="ml-1 text-lg"/>
                        </button>
                        { isChoosingShipment && (
                            <div className="absolute w-[400px] rounded-md mt-10 overflow-hidden text-left border">
                                {shipments.map((item) => (
                                    <div className="bg-stone-50 w-full px-3 py-2 hover:bg-stone-300 group">
                                        {item.courier}
                                        <div className="">
                                            { item.services.map((service) => (
                                                <div onClick={() => handleChoosingShipment(item.courier, service)}
                                                className="cursor-pointer hover:bg-stone-400 px-3 py-2 rounded-md items-center justify-between group-hover:flex hidden bg-stone-50 mt-2">
                                                    <div>
                                                        <div className="">{service.name}</div>
                                                        <div className="font-light text-sm">Estimated shipment {service.duration[0]} - {service.duration[1]} days</div>
                                                    </div>
                                                    <div className="text-sm">IDR {service.price}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="border-t text-right border-stone-900 py-3 mt-3 font-medium flex items-center justify-between">
                <div>Delivery cost</div>
                <div>IDR {courier.service.price}</div>
            </div>
        </div>
     );
}
 
export default ShipmentService;