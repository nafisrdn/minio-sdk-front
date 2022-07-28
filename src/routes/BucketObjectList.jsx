import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainLayout from "../components/Layouts/MainLayout";
import UploadObjectModal from "../components/UploadObjectModal";
import { API_HOST, API_PORT } from "../config";
import { bytesToSize } from "../utils";
import ObjectPreviewModal from "../components/ObjectPreviewModal";

export default function BucketObjectList({ timeAgo }) {
  const { bucketName } = useParams();
  const [isUploadModalShow, setIsUploadModalShow] = useState(false);
  const [isPreviewModalShow, setIsPreviewModalShow] = useState(false);
  const [bucketObjects, setBucketObjects] = useState([]);
  const [latestInfo, setLatestInfo] = useState(null);
  const [selectedObj, setSelectedObj] = useState();

  const getBucketObjects = useCallback(async () => {
    try {
      const res = await axios.get(
        `${API_HOST}:${API_PORT}/bucket/${bucketName}`
      );
      const { data } = res;

      setBucketObjects(data);
    } catch (error) {
      console.error(error);
    }
  }, [bucketName]);

  useEffect(() => {
    getBucketObjects();
  }, [latestInfo, getBucketObjects]);

  function objectUploadedHandle(info) {
    setIsUploadModalShow(false);
    setLatestInfo(info);
  }

  function deleteObjectHandle(event, obj) {
    event.preventDefault();

    let confirmed = window.confirm(`Delete ${obj.name}?`);

    if (!confirmed) return;

    deleteObject(obj.name);
  }

  async function deleteObject(objectName) {
    try {
      const res = await axios.delete(
        `${API_HOST}:${API_PORT}/bucket/${bucketName}`,
        {
          data: { objectName: objectName },
        }
      );

      setLatestInfo({
        isSuccess: true,
        message: res.data.message,
        fileName: objectName,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  function viewObjectHandle(event, obj) {
    event.preventDefault();

    const splitText = obj.name.split(".");
    const ext = splitText[splitText.length - 1].toLowerCase();

    setSelectedObj({ object: obj, ext: ext });
    setIsPreviewModalShow(true);
  }

  return (
    <MainLayout>
      <UploadObjectModal
        show={isUploadModalShow}
        onCloseClick={() => setIsUploadModalShow(false)}
        bucketName={bucketName}
        onObjectUploaded={objectUploadedHandle}
      />
      {isPreviewModalShow && (
        <ObjectPreviewModal
          object={selectedObj.object}
          ext={selectedObj.ext}
          bucketName={bucketName}
          onCloseClick={() => setIsPreviewModalShow(false)}
        />
      )}
      {latestInfo && (
        <div
          className={`alert alert-${
            latestInfo.isSuccess ? "success" : "error"
          }`}
        >
          {latestInfo.message}: {latestInfo.fileName}
        </div>
      )}
      <header className="d-flex justify-content-between align-items-center">
        <h1>{bucketName}</h1>
        <a
          href="#upload"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            setIsUploadModalShow(true);
          }}
        >
          Upload +
        </a>
      </header>
      <main>
        <table className="table">
          <thead>
            <tr>
              <th className="col">#</th>
              <th className="col">Name</th>
              <th className="col">Last Modified</th>
              <th className="col">Size</th>
              <th className="col">View</th>
              <th className="col">Download</th>
              <th className="col">Delete</th>
            </tr>
          </thead>

          <tbody>
            {bucketObjects.map((obj, index) => (
              <tr key={obj.etag + index}>
                <td>{index + 1}</td>
                <td>{obj.name}</td>
                <td>{timeAgo.format(new Date(obj.lastModified))}</td>
                <td>{bytesToSize(obj.size)}</td>
                <td>
                  <a
                    href="#view"
                    className="btn btn-primary"
                    onClick={(event) => viewObjectHandle(event, obj)}
                  >
                    View
                  </a>
                </td>
                <td>
                  <a
                    href={`${API_HOST}:${API_PORT}/bucket/${bucketName}/object?objectName=${obj.name}&action=download`}
                    className="btn btn-success"
                  >
                    Download
                  </a>
                </td>
                <td>
                  <a
                    href="#delete"
                    className="btn btn-danger"
                    onClick={(event) => deleteObjectHandle(event, obj)}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </MainLayout>
  );
}
