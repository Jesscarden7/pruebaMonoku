import Header from "../header/Header";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div style={{ padding: "20px" }}>{children}</div>
    </div>
  );
};

export default Layout;
