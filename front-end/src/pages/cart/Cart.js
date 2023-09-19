import { useEffect, useState } from "react";
import api from "../../api";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FaTrash } from"react-icons/fa";
import PlusMinus from "./PlusMinus";
import Summary from "./Summary";
import ItemBlock from "./ItemBlock";
import Loading from "../../components/Loading";
import { OrderContextProvider } from "../../context/OrderContext";
import { useNavigate } from "react-router-dom";
const Cart = () => {
    const { user, isLogin } = useAuthContext();
    const [ books, setBooks ] = useState(null);
    const navigate = useNavigate();

    const mapQuantity = (books, cart) => {
        const bookQuantity =  cart.map((item) => {
            const matchingBook = books.find((book) => book._id === item.bookId);
            if(matchingBook){
                return {
                    isChecked: false, //check box prop
                    quantity: item.quantity,
                    ...matchingBook
                }
            }
            return item;
        });
        return bookQuantity;
    }

    const handleCheckboxChange = (itemId) => {
        const updatedBooks = books.map((item) =>
          item._id === itemId ? { ...item, isChecked: !item.isChecked } : item
        );
        console.log(updatedBooks);
        setBooks(updatedBooks);
    };

    const handleCheckAllChange = () => {
        const updatedBooks = books.map((item) => ({
          ...item,
          isChecked: !books.every((i) => i.isChecked),
        }));
        setBooks(updatedBooks);
    };

    const removeFromCart = (itemId) => {
        const params = `userId=${user._id}&bookId=${itemId}`;
        api.delete("/api/v1/user/cart?" + params).then().catch(err => {
            console.log(err);
        });
        const updatedBooks = books.filter(item => (item._id !== itemId));
        setBooks(updatedBooks);
    };

    const removeSelected = () => {
        const bookIds = books.map((item) => item.isChecked ? "bookId=" + item._id : null).filter((id) => id !== null);
        const params = `userId=${user._id}&${bookIds.join("&")}`;
        api.delete("api/v1/user/cart?" + params).then(res => {
            console.log(res.data);
        }).catch(err => {console.log(err);});
        const updatedBooks = books.filter(item => !item.isChecked);
        setBooks(updatedBooks);
    };
    
    useEffect(() => {
        if(user){
            api.get("/api/v1/user/cart?userId=" + user._id).then(res => {
                const cart = res.data;
                let bookIds = cart.map(item => "bookIds=" + item.bookId);
                api.get("/api/v1/book?" + bookIds.join("&")).then(res => {
                    const bookDetails = mapQuantity(res.data, cart);
                    setBooks(bookDetails);
                }).catch(err => {
                    console.log(err);
                });
            });
        }
        else if(isLogin === false){
            navigate("/auth");
        }
    }, [user, navigate, isLogin]);
    
    if(books){
        if(books.length){
            return ( 
                <div className="py-5 grid grid-cols-6 w-full px-10">
                    <div className="col-span-4 pr-5">
                        <div className="border text-left p-5 rounded-md bg-stone-50 h-full">
                            <div className="relative absolute text-2xl font-semibold">Cart</div>
                            <div className="relative absolute grid grid-cols-12 text-sm font-medium text-stone-400 border-b border-stone-400 py-3">
                                <div className="col-span-5 flex items-center"> <input type="checkbox" className="mr-4" checked={books.every((item) => item.isChecked)} onChange={() => handleCheckAllChange()} /> PRODUCT</div>
                                <div className="col-span-3 flex items-center">QUANTITY</div>
                                <div className="col-span-3 flex items-center">PRICE</div>
                                <button className="col-span-1 flex flex-col items-center text-red-400 hover:text-red-500 text-xs" onClick={ () => removeSelected() }>Remove Selected</button>
                            </div>
                            <div className="overflow-y-auto h-[520px]">
                                { books.map(item => (
                                    <div className="grid grid-cols-12 text-sm font-medium text-stone-900 py-5" key={ item._id }>
                                        <div className="col-span-5 flex items-center"> <input type="checkbox" className="mr-4" checked={ item.isChecked } onChange={ () => handleCheckboxChange(item._id) }/>
                                            <ItemBlock item={ item }/>
                                        </div>
                                        <div className="col-span-3">
                                            <PlusMinus initialAmount={ item.quantity } books={ books } bookId={ item._id } handler={ setBooks } userId={ user._id }/>
                                        </div>
                                        <div className="col-span-3">IDR { item.price }</div>
                                        <button className="col-span-1 flex flex-col items-center text-red-400 hover:text-red-500 text-3xl" onClick={() => removeFromCart(item._id)}><FaTrash className="rounded-full hover:bg-red-200/80 p-2"/></button>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 pl-5">
                        <Summary data={ books }/>
                    </div>
                </div>
            );
        }
        else{
            return(
            <div className="m-auto">
                Cart is empty
            </div>
            )
        }
    }
    else{
        return(<div className="m-auto">
            <Loading />
        </div>)
    }
}
 
export default Cart;