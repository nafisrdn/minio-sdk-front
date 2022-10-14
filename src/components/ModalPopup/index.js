import style from "./index.module.css";

export default function ModalPopup({
  backropClass = "",
  backdropProps,
  modalClass = "",
  modalProps,
  header,
  children,
  footer,
  onBackdropClick,
}) {
  return (
    <div
      className={`${style.backdrop} ${backropClass}`}
      onClick={onBackdropClick}
      {...backdropProps}
    >
      <div
        className={`modal ${style.modal} ${modalClass}`}
        role="dialog"
        {...modalProps}
      >
        <div className="modal-dialog">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">{header}</div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">{footer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
