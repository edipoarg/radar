import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

export default function Root() {
  return (
    <>
      <Navbar /> {/* Navbar siempre se muestra */}
      <Outlet />
    </>
  );
}
