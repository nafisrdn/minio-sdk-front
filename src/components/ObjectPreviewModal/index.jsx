import style from "./index.module.css";

export default function ObjectPreviewModal({ onCloseClick, src }) {
  return (
    <div className={style.parent}>
      <div className={`modal ${style.modal}`} id="myModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Preview</h5>
            </div>
            <div className="modal-body">
              <img src={src} className={style.image} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onCloseClick}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
