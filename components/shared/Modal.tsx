import React, { Fragment } from 'react';
import { XIcon } from './Icons';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}></div>

            <div className="relative w-full max-w-lg m-4 bg-white dark:bg-slate-800 rounded-lg shadow-xl transform transition-all">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-slate-600">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white" id="modal-title">
                        {title}
                    </h3>
                    <button 
                        type="button" 
                        className="text-slate-400 bg-transparent hover:bg-slate-200 hover:text-slate-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-slate-600 dark:hover:text-white" 
                        onClick={onClose}
                    >
                        <XIcon className="w-5 h-5" />
                        <span className="sr-only">بستن مودال</span>
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;