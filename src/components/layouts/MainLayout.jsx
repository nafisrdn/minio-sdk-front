import Navbar from "../navbar";

export default function MainLayout({ children, ...rest }) {
  return (
    <div {...rest}>
      <Navbar />
      <div className="container">{children}</div>
    </div>
  );
}
