import { useEffect, useState } from "react";
import { GiHand } from "react-icons/gi";
import { BiLogIn } from "react-icons/bi";
import SearchBar from "./SearchBar";
import Top10 from "./Top10";
import Highlight from "./Highlight";
import api from "../../api";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const Main = () => {
    const [ data, setData ] = useState([]);
    const highlightIndex = randomIntFromInterval(0, data.length - 1);
    const { user } = useAuthContext();
    useEffect(() => {
        api.get("/api/v1/book").then(res => {
            console.log(res.data);
            setData(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);
    return ( 
        <div className="px-5 grid grid-cols-2 w-full">
            <div className="col-span-1 p-5">
                <div className="flex justify-between items-center">
                    <SearchBar />
                    { user ? 
                    <div className="no-underline mr-5 flex items-center">
                        <GiHand className="mr-3"/> Hello { user.username }
                    </div>
                    :
                    <Link to={"/auth"}>
                        <button className="px-5 py-2 rounded-full bg-stone-900 hover:bg-stone-900/70 text-sm text-stone-50 font-semibold flex items-center">
                            <BiLogIn className="mr-2 text-xl"/> Log in
                        </button>
                    </Link>
                    }
                </div>
                <div className="py-10">
                    <Top10 data={ data.slice(0, 11)} />
                </div>
            </div>
            <div className="col-span-1 bg-neutral-50">
                <Highlight data={ data.slice(highlightIndex, highlightIndex + 1) }/>
            </div>
        </div>
     );
}
 
export default Main;