import { Outlet } from "react-router-dom";
import Marquee from "../components/Marquee";
import NavbarBootstrap from "../components/Navbar";

export default function Root() {
  return (
    <>
      <NavbarBootstrap /> {/* Navbar siempre se muestra */}
      <Marquee />
      <Outlet />
    </>
  );
}
