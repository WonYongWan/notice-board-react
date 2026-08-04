import './Modal.scss';

const Modal = ({ open, onClose, onConfirm, message, confirmOnly }) => {
  if (!open) return null;

  return (
    <div className="modal-root">
      <div className="overlay" onClick={() => onClose(false)}></div>
      <div className="modal modal--center">
        <div className="modal__content">
          <p className="modal__message">{message || '게시글을 삭제 하시겠습니까'}</p>
        </div>
        <div className="modal__footer">
          {!confirmOnly && (
            <button className="modal__btn" type="button" onClick={() => onClose(false)}>
              취소
            </button>
          )}
          <button className="modal__btn modal__btn--accent" type="button" onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
