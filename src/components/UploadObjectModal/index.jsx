import axios from "axios";

import { API_HOST, API_PORT } from "../../config";
import { bytesToSize } from "../../utils";
import style from "./index.module.css";
import { useState, useRef } from "react";

export default function UploadObjectModal({
  show = false,
  onCloseClick,
  bucketName,
  onObjectUploaded,
}) {
  const [file, setFile] = useState("");
  const inputFileRef = useRef();

  const [isLoading, setIsloading] = useState(false);

  const formHandle = async (e) => {
    e.preventDefault();

    if (!file) return;

    try {
      setIsloading(true);
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(`${API_HOST}:${API_PORT}/bucket/${bucketName}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onObjectUploaded({ isSuccess: true, fileName: file.name, ...res.data });
    } catch (error) {
      console.error(error);
      onObjectUploaded({
        isSuccess: false,
        fileName: file.name,
        ...error.response.data,
      });
    }

    inputFileRef.current.value = "";
    setFile(null);

    setIsloading(false);
  };

  if (!show) return;

  return (
    <div className={style.parent}>
      <div className={`modal ${style.modal}`} id="myModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={formHandle}>
              <div className="modal-header">
                <h5>Upload to {bucketName}</h5>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="file" className="form-label">
                    File:
                  </label>
                  <input
                    type="file"
                    name="file"
                    className="form-control"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    ref={inputFileRef}
                  />
                </div>
                {file && (
                  <div className="mb-3">
                    <span>File Size: {bytesToSize(file.size)}</span>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onCloseClick}>
                  Close
                </button>
                {!isLoading ? (
                  <button className="btn btn-primary">Upload</button>
                ) : (
                  <button className="btn btn-secondary" disabled>
                    Loading...
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
