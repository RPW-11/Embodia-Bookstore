import ReactModal from "react-modal";

ReactModal.setAppElement("#root");
const CustomModal = ({ isOpen, closeModal, children}) => {
    return ( 
        <ReactModal isOpen={isOpen} onRequestClose={closeModal} 
        overlayClassName="fixed inset-0 bg-stone-900/60 z-50 flex items-center"
        className="bg-white p-4 m-auto rounded-lg w-[500px] shadow-lg">
            <div className="relative">
                {children}
            </div>
        </ReactModal>
     );
}
 
export default CustomModal;