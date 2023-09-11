import { useEffect, useState } from "react";
import { GiHand } from "react-icons/gi";
import { BiLogIn } from "react-icons/bi";
import SearchBar from "./SearchBar";
import Top10 from "./Top10";
import SearchArea from "./SearchArea";
import Highlight from "./Highlight";
import Loading from "../../components/Loading";
import api from "../../api";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const Main = () => {
    const [ data, setData ] = useState([]);
    const [ queryData, setQueryData ] = useState([]);
    const [ isQuerying, setIsQuerying ] = useState(false);
    const highlightIndex = randomIntFromInterval(0, data.length - 1);
    const { user } = useAuthContext();
    useEffect(() => {
        api.get("/api/v1/book").then(res => {
            setData(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, []);
    if(data.length){
        return ( 
            <div className="px-5 grid grid-cols-2 w-full">
                <div className="col-span-1 p-5">
                    <div className="grid grid-cols-2">
                        <div className="col-span-1">
                            <SearchBar setQueryData={ setQueryData } setIsQuerying={ setIsQuerying }/>
                        </div>
                        <div className="flex items-center col-span-1 justify-end">
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
                    </div>
                    <div className="py-7">
                        { isQuerying ?
                            <div className="text-left">
                                <button className="text-sm rounded-full bg-stone-400 px-5 py-2 hover:bg-stone-400/80" onClick={ () => setIsQuerying(false)}>Back</button>
                                <SearchArea data={ queryData }/>
                            </div>  
                            : 
                            <div className="">
                                <Top10 data={ data.slice(0, 11)} />
                                <div className="relative w-full overflow-hidden h-[255px] rounded-lg">
                                    <img
                                        className="w-full absolute top-[-150px] z-0"
                                        src="https://img.freepik.com/free-vector/flat-background-world-book-day-celebration_23-2150183373.jpg?w=1800&t=st=1694080264~exp=1694080864~hmac=8c3c4e0386235ce699b7278587c73fcec56338353730b4c438824a86c6946f11"
                                        alt=""
                                    />
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="col-span-1 bg-neutral-50">
                    <Highlight data={ data.slice(highlightIndex, highlightIndex + 1) }/>
                </div>
            </div>
        );
    }
    else{
        return(
            <div className="m-auto">
                <Loading />
            </div>
        )
    }
}
 
export default Main;