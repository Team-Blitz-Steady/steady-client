// components/BottomModal.js
import { useEffect, useState } from "react";

interface BottomModalType {
  onClose: () => void;
}

const BottomModal = ({ onClose }: BottomModalType) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose && onClose();
  };

  // Add useEffect to listen for isOpen changes and apply transition effect
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling when modal is open
    } else {
      document.body.style.overflow = ""; // Enable scrolling when modal is closed
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed bottom-0 flex h-300 w-full items-end justify-center bg-st-white transition-opacity ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div>
        <p>Modal Content</p>
        <button className="mt-2 rounded bg-st-primary px-4 py-2 font-bold text-st-white">
          필터 적용
        </button>
        <button
          onClick={handleClose}
          className="mt-2 rounded bg-st-primary px-4 py-2 font-bold text-st-white"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default BottomModal;
