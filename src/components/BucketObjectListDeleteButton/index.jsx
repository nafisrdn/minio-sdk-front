import { deleteBucketObject } from "../../services/MinIO";

export default function BucketObjectListDeleteButton({
  bucketName,
  objectName,
  onObjectDelete,
}) {
  function deleteObjectHandle(event, objectName) {
    event.preventDefault();

    let confirmed = window.confirm(`Delete ${objectName}?`);

    if (!confirmed) return;

    deleteObject(objectName);
  }

  async function deleteObject(objectName) {
    try {
      const res = await deleteBucketObject(bucketName, objectName);

      onObjectDelete({
        isSuccess: true,
        message: res.data.message,
        fileName: objectName,
      });

      console.log(res);
    } catch (error) {
      console.log(error);

      onObjectDelete({
        isSuccess: false,
        message: error,
        fileName: objectName,
      });
    }
  }

  return (
    <td>
      <a
        href="#delete"
        className="btn btn-danger"
        onClick={(event) => deleteObjectHandle(event, objectName)}
      >
        Delete
      </a>
    </td>
  );
}
