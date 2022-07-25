import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainLayout from "../components/Layouts/MainLayout";
import UploadObjectModal from "../components/UploadObjectModal";
import { API_HOST } from "../config";

export default function BucketObjectList() {
  const { bucketName } = useParams();
  const [isUploadModalShow, setIsUploadModalShow] = useState(false);
  const [bucketObjects, setBucketObjects] = useState([]);

  useEffect(() => {
    getBucketObjects();
  }, []);

  async function getBucketObjects() {
    try {
      const res = await axios.get(API_HOST + "bucket/" + bucketName);
      const { data } = res;

      setBucketObjects(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <MainLayout>
      <UploadObjectModal
        show={isUploadModalShow}
        onCloseClick={() => setIsUploadModalShow(false)}
        bucketName={bucketName}
      />
      <header className="d-flex justify-content-between align-items-center">
        <h1>{bucketName}</h1>
        <a
          href="#"
          className="btn btn-primary"
          onClick={() => setIsUploadModalShow(true)}
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
                <td>{obj.lastModified}</td>
                <td>{obj.size}</td>
                <td>
                  <a href="#" className="btn btn-danger">
                    Delete
                  </a>
                </td>
              </tr>
            ))}
            {/* <tr>
              <td>1</td>
              <td>prod-liam</td>
              <td>2022-07-20T09:00:10.664Z</td>
              <td>50MB</td>
              <td>
                <a href="#" className="btn btn-danger">
                  Delete
                </a>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>prod-liam</td>
              <td>2022-07-20T09:00:10.664Z</td>
              <td>50MB</td>
              <td>
                <a href="#" className="btn btn-danger">
                  Delete
                </a>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>prod-liam</td>
              <td>2022-07-20T09:00:10.664Z</td>
              <td>50MB</td>
              <td>
                <a href="#" className="btn btn-danger">
                  Delete
                </a>
              </td>
            </tr> */}
          </tbody>
        </table>
      </main>
    </MainLayout>
  );
}
