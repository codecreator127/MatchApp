import React, { useState } from "react";

interface ModalProps {
  toggleModal: boolean;
}

const Modal: React.FC<ModalProps> = ({ toggleModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  const modalTitle = "Hello!";
  const modalContent = "This modal works with a hidden checkbox!";

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Modal structure */}
      <input
        type="checkbox"
        id={id}
        className="modal-toggle"
        checked={isOpen}
        onChange={toggleModal}
      />
      <div className={`modal${isOpen ? " open" : ""}`} role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{modalTitle}</h3>
          <p className="py-4">{modalContent}</p>
        </div>
        <label className="modal-backdrop" htmlFor={id} onClick={toggleModal}>
          Close
        </label>
      </div>
    </>
  );
};

export default Modal;
