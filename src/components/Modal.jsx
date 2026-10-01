function Modal({ title, children, onClose }) {
  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">
          <h2>{title}</h2>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="modal-content">
          {children}
        </div>

        <button
          className="modal-footer-button"
          onClick={onClose}
        >
          Close
        </button>

      </div>

    </div>
  );
}

export default Modal;