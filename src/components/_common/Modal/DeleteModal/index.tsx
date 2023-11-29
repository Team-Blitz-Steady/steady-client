"use client";

interface DeleteModalType {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onDelete: (id: string) => void;
  id: string;
}

const DeleteModal = ({ isOpen, onClose, onDelete, id }: DeleteModalType) => {
  const handleOnDelete = (id: string) => {
    onDelete(id);
    onClose();
  };

  return (
    <div className={`fixed inset-0 ${isOpen ? "" : "hidden"}`}>
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex h-150 w-400 flex-col items-center justify-center gap-10 rounded-lg bg-st-primary p-8">
          <h2 className="mb-4 text-lg font-semibold text-st-white">
            삭제하시겠습니까?
          </h2>
          <div className="flex justify-center gap-30">
            <button
              className="rounded-lg bg-st-white px-20 py-5 font-bold"
              onClick={onClose}
            >
              취소
            </button>
            <button
              className="rounded-lg bg-st-white px-20 py-5 font-bold"
              onClick={() => handleOnDelete(id)}
            >
              예
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
