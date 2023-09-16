import { useNavigate } from "react-router-dom";

const Top10 = ({ data }) => {
    const navigate = useNavigate();
    return ( 
        <div className="">
            <div className="text-xl text-left mb-3">Trending 10 Books</div>
            <div className="flex w-full overflow-scroll">
                { data.map(item => (
                    <div className="py-3 ml-3 mr-10 hover:underline cursor-pointer group" key={ item._id } onClick={ () => navigate(`/books/${item._id}`)}>
                        <div className="h-[180px]">
                            <img src={ item.coverImage } alt="" 
                            className="w-[120px] shadow-[rgba(0,0,0,0.3)_-5px_10px_9px_2px] group-hover:scale-105"/>
                        </div>
                        <div className="text-sm py-6 text-left font-light text-stone-900 w-[110px]">
                            <div className="font-title">{ item.title }</div>
                            <div className="text-xs font-semibold">{ item.author }</div>
                            <div className="text-xs">{item.genre}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default Top10;