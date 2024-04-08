import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div className="Content">
        {children}
      </div>
    </div>
  );
};

export default Layout;