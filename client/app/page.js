import Image from "next/image";
import Navbar from "./components/Navbar/Navbar.js";
import RecTree from "./components/RecTree/RecTree.js";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex justify-center">
        <div className="text-left max-w-2xl w-full p-4 md:pl-11 sm:pl-11">
          {" "}
          {/* Added padding-left */}
          <h1 className="text-3xl font-bold">Hi! I'm Filip.</h1>
          <p className="mt-4">
            I'm a developer and this is my personal webpage! I upload my
            projects here and write blog posts about my current obsessions. I
            love GNU/Linux, Neovim and systems programming.
          </p>
          <div className="flex justify-center mt-4">
            {" "}
            {/* Centering RecTree */}
            <RecTree />
          </div>
        </div>
      </div>
      <footer className="bg-bg1 text-white text-center p-4 mt-4">
        <p>&copy; Filip Fajfer {currentYear} </p>
      </footer>
    </div>
  );
}
