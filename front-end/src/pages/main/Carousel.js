import { useState } from "react";
import { FiChevronLeft, FiChevronRight} from "react-icons/fi"
const Carousel = ({ children: slides }) => {
    const [ curr, setCurr ] = useState(0);
    const prev = () => {
        setCurr((curr) => (curr === 0 ? slides.length-1 : curr - 1));
    };
    const next = () => {
        setCurr((curr) => (curr === slides.length-1 ? 0 : curr + 1));
    };
    return ( 
        <div className="overflow-hidden relative group">
            <div className="flex transition-transform ease-out duration-500" style={{ transform: `translateX(-${curr * 100}%)`}}>{ slides }</div>
            <div className="absolute inset-0 flex items-center justify-between">
                <button onClick={ prev } className="bg-stone-500/30 rounded-full">
                    <FiChevronLeft className="text-stone-900 text-4xl hidden group-hover:block"/>
                </button>
                <button onClick={ next } className="bg-stone-500/30 rounded-full">
                    <FiChevronRight className="text-stone-900 text-4xl hidden group-hover:block"/>
                </button>
            </div>
        </div>
     );
}
 
export default Carousel;