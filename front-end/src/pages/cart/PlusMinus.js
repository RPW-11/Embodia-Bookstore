import { useState } from "react";
import api from "../../api";

const PlusMinus = ({ initialAmount, books, handler, userId, bookId }) => {
    const [ amount, setAmount ] = useState(initialAmount);
    const updateAmount = (operator) => {
        let newAmount = amount;
        if(operator === '+'){
            newAmount++;
        }
        else if(newAmount > 1){
            newAmount--;
        }
        const updatedBooks = books.map((item) => {
            if (item._id === bookId) {
                return { ...item, quantity: newAmount };
            }
            return item;
        });
        handler(updatedBooks);
        setAmount(newAmount);
        // api call
        api.put("/api/v1/user/cart", {
            userId, bookId, quantity: newAmount
        }).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
    }
    return ( 
        <div className="flex bg-stone-50 w-fit rounded-md border text-sm text-stone-900">
            <button className="px-3 hover:bg-stone-100 py-1" onClick={() => updateAmount('-')}>-</button>
            <div className="py-1 px-2">{ amount }</div>
            <button className="px-3 hover:bg-stone-100 py-1" onClick={() => updateAmount('+')}>+</button>
        </div>
     );
}
 
export default PlusMinus;