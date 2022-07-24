import MainLayout from "../components/Layouts/MainLayout";
import { Link } from "react-router-dom";


export default function BucketList() {
  return (
    <MainLayout>
      <h1 className="mb-5">Bucket List</h1>

      <div className="list-group">
        <Link to='/bucket/test' className="list-group-item list-group-item-action">My Bucket</Link>
        <Link to='a' className="list-group-item list-group-item-action">Second Bucket</Link>
        <Link to='a' className="list-group-item list-group-item-action">Final Bucket</Link>

      </div>
    </MainLayout>
  );
}
