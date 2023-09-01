import { Gi3DStairs } from "react-icons/gi";
import { GoHome } from "react-icons/go";
import { BsBookmark } from "react-icons/bs";
import { BsCart2 } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import Icon from "../Icon";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import api from "../../api";

const Navbar = () => {
    const navigate = useNavigate();
    const [ status, setStatus ] = useState([ true, false, false, false ]);
    const [ showLogout, setShowLogout ] = useState(true);
    const { dispatch } = useAuthContext();
    const { user } = useAuthContext();
    const buttonsControl = (ind) => {
        const newStatus = status.map((_, i) => i === ind);
        setStatus(newStatus);
        setShowLogout(true);
    };
    const logOut = () => {
        api.post("/logout").then(res => {
            localStorage.removeItem("user");
            dispatch({ type: "LOGOUT" });
            navigate("/");
        }).catch(err => {
            navigate("/");
        })
    }

    return ( 
        <div className="bg-main h-full flex flex-col min-w-[70px] border-r border-stone-400 justify-between items-center">
            <Link to={"/"}>
                <div className="rounded-full" onClick={ () => buttonsControl(0)}>
                    <Gi3DStairs className="text-4xl text-stone-900"/>
                </div>
            </Link>
            <div className="Option ">
                <Link to={"/"}>
                    <Icon icon={ <GoHome className="text-2xl"/> } isActive={ status[0] } onClick={ () => buttonsControl(0) }/>
                </Link>
                <Link to={"/bookmark"}>
                    <Icon icon={ <BsBookmark className="text-2xl"/> } isActive={ status[1] } onClick={ () => buttonsControl(1) }/>
                </Link>
                <Link to={"/cart"}>
                    <Icon icon={ <BsCart2 className="text-2xl"/> } isActive={ status[2] } onClick={ () => buttonsControl(2) }/>
                </Link>
            </div>
            <div className={`Profile flex items-center group ${ user ? 'opacity-100' : 'opacity-0' }`}>
                <Icon icon={ <AiOutlineUser className="text-2xl"/> } isActive={ status[3] } extraStyle={"border border-stone-400 hover:shadow-lg"}/>
                <div className={`absolute hidden group-hover:block`}>
                    { showLogout && <div className="ml-16 mb-10 text-left text-base bg-stone-50 rounded-md shadow-lg overflow-hidden">
                        <Link to={"/profile"}>
                            <div className="px-5 py-2 hover:bg-stone-200 border-b cursor-pointer flex items-center" onClick={ () => {buttonsControl(3); setShowLogout(false)} }><AiOutlineUser className="mr-2"/>Profile</div>
                        </Link>
                        <div className="px-5 py-2 hover:bg-stone-200 cursor-pointer text-red-500 flex items-center" onClick={ () => logOut() }><BiLogOut className="mr-2"/>Log out</div>
                    </div>}
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;