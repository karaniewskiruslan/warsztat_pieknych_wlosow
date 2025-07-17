import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <main className="font-poppins tablet:px-15 mx-auto w-full max-w-7xl px-8 py-12">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
