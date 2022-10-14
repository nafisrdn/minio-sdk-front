import { useState, useEffect } from "react";
import { getBuckets } from "../services/MinIO";
import MainLayout from "../components/Layouts/MainLayout";
import { Link } from "react-router-dom";

export default function BucketList() {
  const [buckets, setBuckets] = useState([]);

  useEffect(() => {
    const getAndSet = async () => {
      try {
        const res = await getBuckets();
        setBuckets(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAndSet();
  }, []);

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
      </div>
    </MainLayout>
  );
}
