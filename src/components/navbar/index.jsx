import { Link } from "react-router-dom";

import style from "./index.module.css";
import logo from "../../images/pegadaian-logo.png";

export default function Navbar() {
  return (
    <nav className={style.navbar + ' mb-4'}>
      <div className="container-fluid align-items-center">
        <div className="row">
          <div className="col logo">
            <Link to="/">
              <img src={logo} className={style.logo} alt="logo" />
            </Link>
          </div>

          {/* <div className="col">
            <div className="d-flex justify-content-end align-items-center h-100">
              <Link to="/logout" className="btn btn-warning">
                Logout
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </nav>
  );
}
