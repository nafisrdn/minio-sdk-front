import styles from "../pageStyles/login.module.css";

import { useState } from "react";

import axios from "axios";
import { API_HOST } from "../config";

export default function Login() {
  const [accessKey, setAccessKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const formHandle = async (e) => {
    e.preventDefault();

    const res = await axios.post(API_HOST + "auth/login", {
      accessKey: accessKey,
      privateKey: privateKey,
    });

    console.log(res);
  };

  return (
    <div className={styles.parent}>
      <div className={styles.main}>
        <h1 className="mb-5">MinIO Pegadaian</h1>
        <form onSubmit={formHandle}>
          <div className="mb-3">
            <label htmlFor="access-key" className="for-label">
              Access Key:
            </label>
            <input
              type="text"
              className="form-control"
              name="access-key"
              onChange={(e) => setAccessKey(e.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="private-key" className="for-label">
              Private Key:
            </label>
            <input
              type="password"
              className="form-control"
              name="private-key"
              onChange={(e) => setPrivateKey(e.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
