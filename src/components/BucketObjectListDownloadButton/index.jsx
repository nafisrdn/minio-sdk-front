import { getBucketObjectsUrl } from "../../services/MinIO";

export default function BucketObjectListDownloadButton({ bucketName, objectName }) {
  return (
    <td>
      <a
        href={`${getBucketObjectsUrl(
          bucketName
        )}/object?objectName=${objectName}&action=download`}
        className="btn btn-success"
      >
        Download
      </a>
    </td>
  );
}
