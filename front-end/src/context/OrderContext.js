import { createContext, useReducer } from "react";

export const OrderContext = createContext();

export const orderReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE":
            return { order: action.payload }
        default:
            return state
    }
}

export const OrderContextProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(orderReducer, {
        order: null
    })
    return (
        <OrderContext.Provider value={{ ...state, dispatch }}>
            { children }
        </OrderContext.Provider>
    )
}