import { Gi3DStairs } from "react-icons/gi"
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";
import { useState } from "react";

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    return ( 
        <div className="grid grid-cols-5 w-[70%] min-h-[75%] m-auto shadow-[rgba(0,0,0,0.3)_-5px_5px_10px_2px]">
            <div className="col-span-3 bg-stone-900">Sa</div>
            <div className="col-span-2 bg-stone-50 p-7 flex flex-col justify-center">
                <div className="w-full">
                    <Link to={"/"}>
                        <div className="rounded-full m-auto flex justify-center mb-5">
                            <Gi3DStairs className="text-5xl text-stone-900"/>
                        </div>
                    </Link>
                    <div className="text-xl font-semibold">
                        Embodia
                        <p className="text-[10px] font-light">Your favorite book store</p>
                    </div>
                    <AuthForm isLogin={ isLogin }/>
                    <div className="text-bottom text-sm mt-7">
                        { isLogin ? "Don't have an account?" : "Already have an account?" } 
                        <s className="no-underline font-semibold hover:underline cursor-pointer" onClick={() => setIsLogin(!isLogin)}>{ isLogin ? " Sign up" : " Log in" }</s>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Auth;