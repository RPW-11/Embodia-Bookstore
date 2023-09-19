import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("user", JSON.stringify(action.payload));
            return { user: action.payload, isLogin: true }
    
        case "LOGOUT":
            return { user: null, isLogin: false }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(authReducer, {
        user: null, isLogin: null
    })
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if(user){
            dispatch({ type: "LOGIN", payload: user });
        }
        else{
            dispatch({ type: "LOGOUT"})
        }
    }, []);


    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}