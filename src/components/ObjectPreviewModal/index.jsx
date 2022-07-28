import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { API_HOST, API_PORT } from "../../config";
import style from "./index.module.css";

export default function ObjectPreviewModal({
  onCloseClick,
  object,
  ext,
  bucketName,
}) {
  const [objContent, setObjContent] = useState();

  const isImage = ext === "png" || ext === "jpg" || ext === "gif";

  const getObj = useCallback(async () => {
    const res = await axios.get(
      `${API_HOST}:${API_PORT}/bucket/${bucketName}/object?objectName=${object.name}&action=view&plain=true`
    );

    const { data } = res;

    if (ext === "json") {
      setObjContent(JSON.stringify(data));
    } else {
      setObjContent(data);
    }
  }, [bucketName, ext, object.name]);

  useEffect(() => {
    if (isImage) return;

    getObj();
  }, [object, isImage, getObj]);

  return (
    <div className={style.parent}>
      <div className={`modal ${style.modal}`} id="myModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Preview</h5>
            </div>
            <div className="modal-body">
              {isImage ? (
                <img
                  src={`${API_HOST}:${API_PORT}/bucket/${bucketName}/object?objectName=${object.name}&action=view`}
                  className={style.image}
                  alt=''
                />
              ) : (
                <p className={style.text}>{objContent}</p>
              )}
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
