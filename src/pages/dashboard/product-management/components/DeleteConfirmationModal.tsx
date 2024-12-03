import { Modal } from "@/components/Modal";

 interface DeleteConfirmationModalProps {  
    isOpen: boolean;  
    onClose: () => void;  
    onConfirm: () => void;  
    title: string;  
    message: string;  
  }  
  
  export function DeleteConfirmationModal({  
    isOpen,  
    onClose,  
    onConfirm,  
    title,  
    message,  
  }: DeleteConfirmationModalProps) {  
    return (  
      <Modal isOpen={isOpen} onClose={onClose} title={title}>  
        <div className="mt-2">  
          <p className="text-sm text-gray-500">{message}</p>  
        </div>  
        <div className="mt-5 flex justify-end space-x-3">  
          <button  
            type="button"  
            onClick={onClose}  
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"  
          >  
            Batal  
          </button>  
          <button  
            type="button"  
            onClick={onConfirm}  
            className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"  
          >  
            Hapus  
          </button>  
        </div>  
      </Modal>  
    );  
  }