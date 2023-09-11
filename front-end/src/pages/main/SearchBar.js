import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci"
import api from "../../api";

const SearchBar = ({ setQueryData, setIsQuerying }) => {
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ searchSuggestions, setSearchSuggestions ] = useState([]);
    const handleSubmit = (e, searchTerm) => {
        e.preventDefault();
        if(searchTerm){
            api.get("/api/v1/book/search?q=" + searchTerm).then(res => {
                setQueryData(res.data)
                console.log(searchTerm);
                setIsQuerying(true);
            }).catch(err => {
                console.log(err);
            })
        }
        setSearchTerm("");
    };
    const handleSuggestion = (e, suggestion) => {
        setSearchTerm(suggestion);
        handleSubmit(e, suggestion);
        setSearchSuggestions([]);
    };
    useEffect(() => {
        if(searchTerm.length){
            api.get("/api/v1/book/autocomplete?q=" + searchTerm).then(res => {
                console.log(res.data);
                setSearchSuggestions(res.data);
            }).catch(err => {
                console.log(err);
            });
        }
        else{
            setSearchSuggestions([]);
        }
    },[searchTerm]);
    return ( 
        <div className="w-full relative">
            <div className="rounded-full bg-stone-400 px-4 py-2">
                <form onSubmit={ (e) => handleSubmit(e, searchTerm) } className="flex items-center">
                    <CiSearch className="text-xl text-stone-900"/>
                    <input type="text" 
                    className="w-full ml-2 bg-transparent text-stone-900 placeholder-stone-600 outline-none text-sm" 
                    placeholder="search book name, author, genre"
                    onChange={ (e) => setSearchTerm(e.target.value)}
                    value={searchTerm}/>
                </form>
            </div>
            { searchSuggestions.length !== 0 && ( 
                        <div className="Autocomplete w-full rounded-lg bg-stone-400 absolute mt-2 p-2">
                            { searchSuggestions.map((item) => (
                                <button className="text-sm font-medium text-left hover:bg-stone-100 px-5 py-1 rounded-md w-full" 
                                key={item._id} onClick={(e) => handleSuggestion(e, item.title)}
                                >{ item.title }</button>
                            ))
                            }
                        </div>
                    )
            }
        </div>
        );
}
 
export default SearchBar;