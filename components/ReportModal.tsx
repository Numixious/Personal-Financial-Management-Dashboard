import React, { useState } from 'react';
import Modal from './shared/Modal';
import { ClipboardIcon, SparklesIcon } from './shared/Icons';

interface ReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    reportContent: string;
}

const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, reportContent }) => {
    const [copySuccess, setCopySuccess] = useState('');

    const handleCopy = async () => {
        if (!reportContent) return;
        try {
            await navigator.clipboard.writeText(reportContent);
            setCopySuccess('کپی شد!');
            setTimeout(() => setCopySuccess(''), 2000);
        } catch (err) {
            setCopySuccess('کپی ناموفق بود.');
             setTimeout(() => setCopySuccess(''), 2000);
        }
    };
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="گزارش مالی هوشمند">
            <div className="space-y-4">
                <div 
                    className="text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg max-h-[60vh] overflow-y-auto"
                    style={{ whiteSpace: 'pre-wrap', lineHeight: '1.75' }}
                >
                    {reportContent}
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center pt-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-indigo-500 dark:text-indigo-400 self-start sm:self-center">
                        <SparklesIcon className="w-5 h-5" />
                        <span>تولید شده توسط هوش مصنوعی Gemini</span>
                    </div>
                    <div className="flex gap-3 self-end sm:self-center">
                         <button 
                            type="button" 
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:focus:ring-offset-slate-900 w-28 justify-center"
                        >
                            <ClipboardIcon className="w-5 h-5"/>
                            <span>{copySuccess || 'کپی کردن'}</span>
                        </button>
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-slate-900"
                        >
                            بستن
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ReportModal;
