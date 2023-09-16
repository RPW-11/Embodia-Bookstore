const Icon = ({ icon, isActive, onClick, extraStyle }) => {
    const style = (isActive) => {
        return `rounded-full p-2 cursor-pointer text-center ${extraStyle} ${ isActive ? "bg-red-400 text-stone-100" : "text-stone-900" }`;
    };
    return ( 
        <div className={ style(isActive) } onClick={ onClick }>
            { icon }
        </div>
    );
}
 
export default Icon;