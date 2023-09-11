import { useNavigate } from "react-router-dom";

const SearchArea = ({ data }) => {
    const navigate = useNavigate();
    if(!data.length){
        return(
            <div className="italic text-sm w-full text-center py-2">
                No result was found
            </div>
        )
    }
    return ( 
        <div className="grid grid-cols-4 overflow-scroll h-[550px] mt-5 py-3">
            { data.map((item) => (
                <div className="col-span-2 p-1" key={ item._id }>
                    <div className="w-full h-[210px] p-5 mr-10
                     cursor-pointer group flex items-center bg-stone-50" onClick={() => navigate(`/books/${item._id}`)}>
                        <div className="w-[200px] h-full">
                            <img src={ item.coverImage } alt="" 
                            className="w-full shadow-[rgba(0,0,0,0.3)_-5px_10px_9px_2px] group-hover:scale-105"/>
                        </div>
                        <div className="h-full ml-4 w-full flex flex-col justify-between">
                            <div className="text-sm text-left font-light text-stone-900 hover:underline">
                                <div className="font-title">{ item.title }</div>
                                <div className="text-xs font-semibold">{ item.author }</div>
                                <div className="text-xs">{item.genre}</div>
                                <div className="font-medium text-red-400">IDR { item.price }</div>
                            </div>
                            <button className="w-fit mb-2 text-stone-400 text-sm rounded-full hover:text-stone-500 hover:border-stone-500
                            px-5 py-1 border border-stone-400 text-end">Buy</button>
                        </div>
                    </div>
                </div>
            )) }
        </div>
     );
}
 
export default SearchArea;