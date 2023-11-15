"use client";

import { useState } from "react";

interface InputModalType {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSave: (value: string) => void;
}

const InputModal = ({ isOpen, onClose, onSave }: InputModalType) => {
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    onSave(inputValue);
    onClose();
  };

  return (
    <div className={`fixed inset-0 ${isOpen ? "" : "hidden"}`}>
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex h-150 w-400 flex-col items-center justify-center gap-10 rounded-lg bg-st-primary p-8">
          <h2 className="mb-4 text-lg font-semibold text-st-white">
            템플릿 제목
          </h2>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-2/3 rounded-lg p-10"
            placeholder="제목을 입력해주세요"
          />
          <div className="flex justify-center gap-30">
            <button
              className="rounded-lg bg-st-white px-20 py-5 font-bold"
              onClick={onClose}
            >
              취소
            </button>
            <button
              className="rounded-lg bg-st-white px-20 py-5 font-bold"
              onClick={handleSave}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
