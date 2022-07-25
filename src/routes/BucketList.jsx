import { useState, useEffect } from "react";
import axios from "axios";
import { API_HOST } from "../config";
import MainLayout from "../components/Layouts/MainLayout";
import { Link } from "react-router-dom";

export default function BucketList() {
  const [buckets, setBuckets] = useState([]);

  useEffect(() => {
    getBuckets();
  }, []);

  async function getBuckets() {
    try {
      const res = await axios.get(API_HOST + "bucket");
      console.log(res);
      const { data } = res;

      setBuckets(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <MainLayout>
      <h1 className="mb-5">Bucket List</h1>

      <div className="list-group">
        {buckets.map((bucket, index) => (
          <Link
            to={`/bucket/${bucket.name}`}
            className="list-group-item list-group-item-action"
            key={index}
          >
            {bucket.name}
          </Link>
        ))}
        {/* <Link
          to="/bucket/test"
          className="list-group-item list-group-item-action"
        >
          My Bucket
        </Link>
        <Link to="a" className="list-group-item list-group-item-action">
          Second Bucket
        </Link>
        <Link to="a" className="list-group-item list-group-item-action">
          Final Bucket
        </Link> */}
      </div>
    </MainLayout>
  );
}
