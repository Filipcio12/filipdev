import Link from "next/link";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="bg-bg0 p-4">
      <div className="flex justify-center">
        <ul id="nav-list" className="flex justify-center space-x-8">
          <li>
            <Link href="/about" className="text-white hover:underline">
              About
            </Link>
          </li>
          <li>*</li>
          <li>
            <Link href="/portfolio" className="text-white hover:underline">
              Portfolio
            </Link>
          </li>
          <li>*</li>
          <li>
            <Link href="/articles" className="text-white hover:underline">
              Articles
            </Link>
          </li>
          <li>*</li>
          <li>
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
