import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const RatingsStar = ({ rating }) => {
    const renderRatings = (rating) => {
        const newRating = Math.round(rating);
        const items = [];
        for(let i=0; i<5; i++){
            if (i < newRating){
                items.push(
                    <AiFillStar className="text-red-400" key={i}/>
                )
            }
            else{
                items.push(
                    <AiOutlineStar className="text-red-400" key={i}/>
                )
            }
        }
        return items;
    };
    return ( 
        <div className="flex items-center text-sm">
            { renderRatings(rating) }
            <s className="no-underline ml-2">{rating}</s>
        </div>
     );
}
 
export default RatingsStar;