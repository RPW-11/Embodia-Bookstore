import { useEffect, useState } from "react";
import api from "../../api";
import Loading from "../../components/Loading"
import { useParams } from "react-router-dom";
import { BsCartPlus } from "react-icons/bs";
import { BiArrowFromLeft } from "react-icons/bi";
import Notification from "../../components/Notification";
import { useAuthContext } from "../../hooks/useAuthContext";


const BookPage = () => {
    const [ book, setBook ] = useState(null);
    const [ showNotification, setShowNotification ] = useState(false);
    const [ message, setMessage ] = useState("Book added to cart");
    const { bookId } = useParams();
    const { user, dispatch } = useAuthContext();
    const addToCart = () => {
        api.post("api/v1/user/cart", {
            userId: user._id,
            bookId
        }).then(res => {
            const updatedUser = user;
            updatedUser.cart = res.data.cart;
            dispatch({ type: 'LOGIN', payload: updatedUser });
            setShowNotification(true);
        }).catch(err => {
            setShowNotification(true);
            setMessage("Book is already in cart");
            console.log(err);
        });
    };

    useEffect(() => {
        if(bookId){
            api.get(`api/v1/book/${bookId}`).then(res => {
                setBook(res.data);
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [bookId])

    if (user && book){
        return ( 
            <div className="w-full px-20 py-10">
                { showNotification && <Notification message={ message } handler={() => setShowNotification(false)}/>}
                <div className="flex items-center justify-center z-50 absolute relative h-[400px] w-[calc(100%-300px)] m-auto">
                    <div className="Image w-full  flex justify-end">
                        <img src={book.coverImage} alt="" className="w-[250px] shadow-[rgba(0,0,0,0.3)_-5px_10px_9px_2px]"/>
                    </div>
                    <div className="ml-10 text-left relative h-full py-5 w-full">
                        <div className="text-4xl font-title mb-3">
                            { book.title }
                        </div>
                        <div className="text-lg font-medium mb-3">
                            { book.author }
                        </div>
                        <div className="font-light mb-5 text-lg">{ book.genre }</div>
                        <div className="text-xl">IDR { book.price }</div>
                        <div className="absolute bottom-5 flex items-center">
                            <button className="flex items-center py-2 px-5 bg-stone-900 text-neutral-50 w-fit 
                            rounded-full text-base hover:bg-stone-700">
                                Buy Now
                                <BiArrowFromLeft className="ml-1 text-xl"/>
                            </button>
                            <button  onClick={() => addToCart()}
                            className="flex items-center text-2xl rounded-full bg-stone-900 hover:bg-stone-700 p-2 text-stone-50 ml-3">
                                <BsCartPlus />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="relative absolute bg-stone-50 h-[400px] w-full bottom-[100px] z-0 pt-[120px] px-10">
                    <div className="text-left">
                        <div className="text-xl font-medium font-title mb-2">Description</div>
                        <p>{ book.description }</p>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return(
            <div className="m-auto">
                <Loading/>
            </div>
        )
    }
}
 
export default BookPage;