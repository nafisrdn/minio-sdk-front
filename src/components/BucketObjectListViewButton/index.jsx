export default function BucketObjectListViewButton({ objectName, onClick }) {
  function viewObjectHandle(event, objectName) {
    event.preventDefault();

    const splitText = objectName.split(".");
    const ext = splitText[splitText.length - 1].toLowerCase();

    onClick(objectName, ext);
    // setSelectedObj({ object: object, ext: ext });
    // setIsPreviewModalShow(true);
  }

  return (
    <td>
      <a
        href="#view"
        className="btn btn-primary"
        onClick={(event) => viewObjectHandle(event, objectName)}
      >
        View
      </a>
    </td>
  );
}
