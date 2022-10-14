import { useSelector } from "react-redux";
import Navbar from "../Navbar";

export default function MainLayout({ children, ...rest }) {
  const minIOError = useSelector((state) => state.minIO.error);

  if (minIOError) {
    return (
      <div>
        <div className="container py-5">
          <h1>Error: {minIOError.status}</h1>
          <pre>{JSON.stringify(minIOError.data, null, 2)}</pre>
        </div>
      </div>
    );
  }

  return (
    <div {...rest}>
      <Navbar />
      <div className="container">{children}</div>
    </div>
  );
}
