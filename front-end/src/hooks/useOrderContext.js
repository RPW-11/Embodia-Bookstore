import { OrderContext } from "../context/OrderContext";
import { useContext } from "react";

export const useOrderContext = () => {
    const context = useContext(OrderContext);

    if(!context) {
        throw Error("Can't use the order context outside OrderContextProvider");
    }

    return context;
}