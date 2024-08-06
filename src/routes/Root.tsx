import { Outlet } from "react-router-dom";
import NavbarBootstrap from "../components/Navbar/Navbar";

export default function Root() {
  return (
    <>
      <NavbarBootstrap /> {/* Navbar siempre se muestra */}
      <Outlet />
    </>
  );
}
