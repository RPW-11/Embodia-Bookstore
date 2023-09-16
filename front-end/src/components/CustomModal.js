import ReactModal from "react-modal";

ReactModal.setAppElement("#root");
const CustomModal = ({ isOpen, closeModal, children}) => {
    return ( 
        <ReactModal isOpen={isOpen} onRequestClose={closeModal} 
        overlayClassName="fixed inset-0 bg-stone-900/60 z-50 flex items-center"
        className="bg-white px-4 py-5 m-auto rounded-lg shadow-lg">
            <div className="relative">
                {children}
            </div>
        </ReactModal>
     );
}
 
export default CustomModal;