import Image from "next/image";
import Navbar from "./components/Navbar/Navbar.js";
import RecTree from "./components/RecTree/RecTree.js";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex justify-center">
        <div className="text-left max-w-2xl w-full p-4">
          <h1 className="text-3xl font-bold">Hello world!</h1>
          <p className="mt-4">This is my personal webpage!</p>
          <RecTree />
        </div>
      </div>
    </div>
  );
}
