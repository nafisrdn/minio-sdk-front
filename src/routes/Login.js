import styles from "../pageStyles/login.module.css";

export default function Login() {
  return (
    <div className={styles.parent}>
      <div className={styles.main}>
        <h1 className="mb-5">MinIO Pegadaian</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="for-label">
              Username:
            </label>
            <input type="text" className="form-control" name="username" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="for-label">
              Password:
            </label>
            <input type="password" className="form-control" name="password" />
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}
