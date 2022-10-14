import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { API_HOST, API_PORT } from "../../config";
import ModalPopup from "../ModalPopup";
import style from "./index.module.css";

export default function ObjectPreviewModal({
  onCloseClick,
  objectName,
  ext,
  bucketName,
}) {
  const [objContent, setObjContent] = useState();

  const isImage = ext === "png" || ext === "jpg" || ext === "gif";

  const getObj = useCallback(async () => {
    const res = await axios.get(
      `${API_HOST}:${API_PORT}/bucket/${bucketName}/object?objectName=${objectName}&action=view&plain=true`
    );

    const { data } = res;

    if (ext === "json") {
      setObjContent(JSON.stringify(data));
    } else {
      setObjContent(data);
    }
  }, [bucketName, ext, objectName]);

  useEffect(() => {
    if (isImage) return;

    getObj();
  }, [objectName, isImage, getObj]);

  return (
    <ModalPopup
      onBackdropClick={onCloseClick}
      header={<h5>Preview</h5>}
      footer={
        <button className="btn btn-secondary" onClick={onCloseClick}>
          Close
        </button>
      }
    >
      {isImage ? (
        <img
          src={`${API_HOST}:${API_PORT}/bucket/${bucketName}/object?objectName=${objectName}&action=view`}
          className={style.image}
          alt=""
        />
      ) : (
        <p className={style.text}>{objContent}</p>
      )}
    </ModalPopup>
  );
}
