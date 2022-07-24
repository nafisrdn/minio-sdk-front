import MainLayout from "../components/layouts/MainLayout";
import { useParams, Link } from "react-router-dom";

export default function BucketObjectList() {
  const { bucketName } = useParams();

  return (
    <MainLayout>
      <header className="d-flex justify-content-between align-items-center">
        <h1>{bucketName}</h1>
        <a href="#" className="btn btn-primary">
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
            <tr>
              <td>1</td>
              <td>prod-liam</td>
              <td>2022-07-20T09:00:10.664Z</td>
              <td>50MB</td>
              <td>
                <a href='#' className="btn btn-danger">Delete</a>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>prod-liam</td>
              <td>2022-07-20T09:00:10.664Z</td>
              <td>50MB</td>
              <td>
                <a href='#' className="btn btn-danger">Delete</a>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>prod-liam</td>
              <td>2022-07-20T09:00:10.664Z</td>
              <td>50MB</td>
              <td>
                <a href='#' className="btn btn-danger">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </MainLayout>
  );
}
