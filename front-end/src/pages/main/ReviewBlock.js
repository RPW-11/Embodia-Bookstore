import RatingsStar from "../../components/RatingsStar";

const ReviewBlock = ({ data }) => {
    return ( 
        <div className="min-w-[100%] h-full py-5 pr-5 pl-3 flex items-center h-full bg-main border-l-4 border-dashed ">
            <div className="h-full">
                <div className="w-16 h-16 mr-7 overflow-hidden">
                    <img
                        src="https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg"
                        className="object-cover w-full h-full rounded-full"
                        style={{ objectPosition: 'center center' }} // Ensure the focal point is centered
                        alt="User Profile"
                    />
                </div>
            </div>
            <div className="text-left">
                <div className="text-base font-semibold font-title">{data.username}</div>
                <RatingsStar rating={data.rating} />
                <p className="text-xs italic whitespace-normal">
                    {data.review.length > 250 ? data.review.slice(0, 250) + "..." : data.review}
                </p>
            </div>
        </div>

     );
}
 
export default ReviewBlock;