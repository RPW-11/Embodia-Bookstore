const ItemBlock = ({ item }) => {
    return ( 
        <div className="flex">
            <img src={ item.coverImage } className="w-[60px]" alt=""/>
            <div className="px-3">
                <s className="no-underline font-semibold">{ item.title }</s>
                <div className="font-light no-underline">{ item.author }</div>
                <div className="">{ item.genre }</div>
            </div>
        </div>
     );
}
 
export default ItemBlock;