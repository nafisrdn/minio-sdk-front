import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";
import UploadObjectModal from "../components/UploadObjectModal";
import { bytesToSize } from "../utils";
import ObjectPreviewModal from "../components/ObjectPreviewModal";
import { getBucketObjects } from "../services/MinIO";
import BucketObjectListDeleteButton from "../components/BucketObjectListDeleteButton";
import BucketObjectListDownloadButton from "../components/BucketObjectListDownloadButton";
import BucketObjectListViewButton from "../components/BucketObjectListViewButton";

export default function BucketObjectList({ timeAgo }) {
  const { bucketName } = useParams();
  const [isUploadModalShow, setIsUploadModalShow] = useState(false);
  const [isPreviewModalShow, setIsPreviewModalShow] = useState(false);
  const [bucketObjects, setBucketObjects] = useState([]);
  const [latestInfo, setLatestInfo] = useState(null);
  const [selectedObj, setSelectedObj] = useState();

  const getObjects = useCallback(async () => {
    try {
      const res = await getBucketObjects(bucketName);

      setBucketObjects(res.data);
    } catch (error) {
      console.error(error);
    }
  }, [bucketName]);

  useEffect(() => {
    getObjects();
  }, [latestInfo, getObjects]);

  function objectUploadedHandle(info) {
    setIsUploadModalShow(false);
    setLatestInfo(info);
  }

  return (
    <MainLayout>
      {isUploadModalShow && (
        <UploadObjectModal
          onCloseClick={() => setIsUploadModalShow(false)}
          bucketName={bucketName}
          onObjectUploaded={objectUploadedHandle}
        />
      )}
      {isPreviewModalShow && (
        <ObjectPreviewModal
          objectName={selectedObj.name}
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

                <BucketObjectListViewButton
                  objectName={obj.name}
                  onClick={(objectName, ext) => {
                    setSelectedObj({ name: objectName, ext: ext });
                    setIsPreviewModalShow(true);
                  }}
                />

                <BucketObjectListDownloadButton
                  bucketName={bucketName}
                  objectName={obj.name}
                />
                
                <BucketObjectListDeleteButton
                  bucketName={bucketName}
                  objectName={obj.name}
                  onObjectDelete={(info) => {
                    setLatestInfo(info);
                  }}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </MainLayout>
  );
}
