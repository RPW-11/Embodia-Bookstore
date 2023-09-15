const PaymentOptions = ({ type, setPayment }) => {
    const handleChoosingPayment = (e) => {
        setPayment(e.target.value);
    }
    if(type === 'bank'){
        return ( 
            <div className="rounded-md grid grid-cols-4 py-2 border my-2">
                <div className="col-span-1 px-2 m-auto flex items-center">
                    <input type="radio" value={"bni"} className="mr-1" name="payment" onChange={handleChoosingPayment}/>
                    <img className="w-[50px]" src="https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/2560px-BNI_logo.svg.png" alt="" />
                </div>
                <div className="col-span-1 px-2 m-auto flex items-center">
                    <input type="radio" value={"bca"} className="mr-1" name="payment" onChange={handleChoosingPayment}/>
                    <img className="w-[50px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png" alt="" />
                </div>
                <div className="col-span-1 px-2 m-auto flex items-center">
                    <input type="radio" value={"mandiri"} className="mr-1" name="payment" onChange={handleChoosingPayment}/>
                    <img className="w-[50px]" src="https://logos-download.com/wp-content/uploads/2016/06/Bank_Mandiri_logo_white_bg.png" alt="" />
                </div>
                <div className="col-span-1 px-2 m-auto flex items-center">
                    <input type="radio" value={"bri"} className="mr-1" name="payment" onChange={handleChoosingPayment}/>
                    <img className="w-[50px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/BRI_2020.svg/2560px-BRI_2020.svg.png" alt="" />
                </div>
            </div>
        );
    }
    else{
        return (
            <div className="rounded-md grid grid-cols-4 py-2 border my-2">
                <div className="col-span-1 px-2 m-auto flex items-center">
                    <input type="radio" value={"gopay"} className="mr-1" name="payment" onChange={handleChoosingPayment}/>
                    <img className="w-[50px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png" alt="" />
                </div>
                <div className="col-span-1 px-2 m-auto flex items-center">
                    <input type="radio" value={"shopee"} className="mr-1" name="payment" onChange={handleChoosingPayment}/>
                    <img className="w-[50px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Shopee.svg/1200px-Shopee.svg.png" alt="" />
                </div>
                <div className="col-span-1 px-2 m-auto flex items-center">
                    <input type="radio" value={"dana"} className="mr-1" name="payment" onChange={handleChoosingPayment}/>
                    <img className="w-[50px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/2560px-Logo_dana_blue.svg.png" alt="" />
                </div>
                <div className="col-span-1 px-2 m-auto flex items-center">
                    <input type="radio" value={"ovo"} className="mr-1" name="payment" onChange={handleChoosingPayment}/>
                    <img className="w-[50px]" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/2560px-Logo_ovo_purple.svg.png" alt="" />
                </div>
            </div>
        )
    }
}
 
export default PaymentOptions;