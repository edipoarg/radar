import { Outlet } from "react-router-dom";
import Marquee from "../components/Marquee.jsx";
import NavbarBootstrap from "../components/navbar.jsx";

export default function Root() {
  return (
    <>
      <NavbarBootstrap /> {/* Navbar siempre se muestra */}
      <Marquee />
      <Outlet />
    </>
  );
}
