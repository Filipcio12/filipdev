import Image from "next/image";
import Navbar from "./components/Navbar.js";

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>Hello world!</h1>
      <p>This is my personal webpage!</p>
    </div>
  );
}
