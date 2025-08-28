import Link from "next/link";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="bg-bg0 p-4">
      <div className="flex justify-center">
        <ul id="nav-list" className="flex justify-center">
          <li className="mx-2 md:mx-4 lg:mx-6">
            <Link href="/about" className="text-white hover:underline">
              About
            </Link>
          </li>
          <li>✶</li>
          <li className="mx-2 md:mx-4 lg:mx-6">
            <Link href="/portfolio" className="text-white hover:underline">
              Portfolio
            </Link>
          </li>
          <li>✶</li>
          <li className="mx-2 md:mx-4 lg:mx-6">
            <Link href="/articles" className="text-white hover:underline">
              Articles
            </Link>
          </li>
          <li>✶</li>
          <li className="mx-2 md:mx-4 lg:mx-6">
            <Link href="/donate" className="text-white hover:underline">
              Donate
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
