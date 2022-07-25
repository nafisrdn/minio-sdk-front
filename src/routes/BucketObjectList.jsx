import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainLayout from "../components/Layouts/MainLayout";
import UploadObjectModal from "../components/UploadObjectModal";
import { API_HOST } from "../config";
import { bytesToSize } from "../utils";

export default function BucketObjectList({ timeAgo }) {
  const { bucketName } = useParams();
  const [isUploadModalShow, setIsUploadModalShow] = useState(false);
  const [bucketObjects, setBucketObjects] = useState([]);
  const [latestInfo, setLatestInfo] = useState(null);

  useEffect(() => {
    getBucketObjects();
  }, [latestInfo]);

  async function getBucketObjects() {
    try {
      const res = await axios.get(API_HOST + "bucket/" + bucketName);
      const { data } = res;

      setBucketObjects(data);
    } catch (error) {
      console.error(error);
    }
  }

  function objectUploadedHandle(info) {
    setIsUploadModalShow(false);
    setLatestInfo(info);
  }

  return (
    <MainLayout>
      <UploadObjectModal
        show={isUploadModalShow}
        onCloseClick={() => setIsUploadModalShow(false)}
        bucketName={bucketName}
        onObjectUploaded={objectUploadedHandle}
      />
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
          href="#"
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
              <th className="col">Delete</th>
            </tr>
          </thead>

          <tbody>
            {bucketObjects.map((obj, index) => (
              <tr key={obj.etag}>
                <td>{index + 1}</td>
                <td>{obj.name}</td>
                <td>{timeAgo.format(new Date(obj.lastModified))}</td>
                {/* <td>{obj.lastModified}</td> */}
                <td>{bytesToSize(obj.size)}</td>
                <td>
                  <a href="#" className="btn btn-danger">
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
