import Navbar from "../Navbar";

export default function MainLayout({ children, ...rest }) {
  return (
    <div {...rest}>
      <Navbar />
      <div className="container">{children}</div>
    </div>
  );
}
