import { BiArrowFromLeft } from "react-icons/bi";
import dummyReviews from "../../dummyReviews.json";
import Carousel from "./Carousel";
import ReviewBlock from "./ReviewBlock";
import RatingsStar from "../../components/RatingsStar";

const Highlight = ({ data }) => {
    const description = (desc) => {
        return  desc.length > 200 ? desc.slice(0, 200) + "..." : desc;
    };
    const rating = 3.1;
    return ( 
        <div className="p-10 h-full">
            <div className="text-2xl text-left mb-5">Today's selection</div>
            { data.map(item => (
                <div className="flex w-full" key={ item._id }>
                    <img src={ item.coverImage } alt="" 
                    className="w-[250px] shadow-[rgba(0,0,0,0.3)_-5px_10px_9px_2px]"/>
                    <div className="ml-10 text-left w-full">
                        <div className="text-4xl font-title mt-2 mb-5"> { item.title } </div>
                        <div className="">{ item.genre }</div>
                        <RatingsStar rating={ rating }/>
                        <div className="text-lg font-semibold">IDR { item.price }.,</div>
                        <div className="h-[170px] flex flex-col justify-between w-full">
                            <p className="text-sm">{ description(item.description) }</p>
                            <div className="text-right text-sm">- { item.author } </div>
                        </div>
                        <div className="flex items-center py-1 px-5 bg-stone-900 text-neutral-50 w-fit 
                        cursor-pointer rounded-full text-base hover:bg-stone-700">
                            Buy Now
                            <BiArrowFromLeft className="ml-1 text-xl"/>
                        </div>
                    </div>
                </div>
            ))}
            <div className="text-lg text-left mt-10 mb-5 font-semibold">Reviews</div>
            <Carousel>
                {dummyReviews.map(item => (
                    <ReviewBlock key={ item.userId } data={ item }/>
                ))}
            </Carousel>
        </div>
     );
}
 
export default Highlight;