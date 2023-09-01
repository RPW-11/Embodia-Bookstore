import { CiSearch } from "react-icons/ci"

const SearchBar = () => {
    return ( 
        <div className="flex rounded-full items-center bg-stone-400 px-4 py-2 w-fit">
            <CiSearch className="text-xl text-stone-900"/>
            <input type="text" className="min-w-[250px] ml-2 bg-transparent text-stone-900 placeholder-stone-600 outline-none text-sm" 
            placeholder="search book name, author, genre"/>
        </div>
     );
}
 
export default SearchBar;