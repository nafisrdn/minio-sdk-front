import axios from "axios";

import { API_HOST, API_PORT } from "../../config";
import { bytesToSize } from "../../utils";
import { useState, useRef, useEffect } from "react";
import ModalPopup from "../ModalPopup";

const maxProgressValue = 100;

export default function UploadObjectModal({
  onCloseClick,
  bucketName,
  onObjectUploaded,
}) {
  const [file, setFile] = useState("");
  const inputFileRef = useRef();

  const [isLoading, setIsloading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);


  const formHandle = async (e) => {
    e.preventDefault();

    if (!file) return;

    try {
      setIsloading(true);
      console.log(file);
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        `${API_HOST}:${API_PORT}/bucket/${bucketName}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: function (progressEvent) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * maxProgressValue) / progressEvent.total
            );

            setUploadProgress(percentCompleted);
          },
        }
      );

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

  const closeClickHandle = () => {
    if (uploadProgress > 0) {
      const isConfirmed = window.confirm(
        `You're still uploading, are you sure want to cancel upload?`
      );

      if (!isConfirmed) return;
    }

    onCloseClick();
  };

  return (
    <form onSubmit={formHandle}>
      <ModalPopup
        onBackdropClick={closeClickHandle}
        header={<h5>Upload to {bucketName}</h5>}
        footer={
          <>
            <button className="btn btn-secondary" onClick={closeClickHandle}>
              Close
            </button>
            {!isLoading ? (
              <button className="btn btn-primary">Upload</button>
            ) : (
              <button className="btn btn-secondary" disabled>
                Loading...
              </button>
            )}
          </>
        }
      >
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
        {uploadProgress > 0 && (
          <div>
            <span className="mb-2 d-block">
              {uploadProgress < maxProgressValue - 5
                ? "Uploading to Server..."
                : "Uploading to MinIO..."}
            </span>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                aria-label="Example with label"
                style={{ width: `${uploadProgress}%` }}
              >
                {uploadProgress}%
              </div>
            </div>
          </div>
        )}
      </ModalPopup>
    </form>
  );
}
