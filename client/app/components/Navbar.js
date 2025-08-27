import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="#about" className="text-white hover:underline">
            About
          </Link>
        </li>
        <li>
          <Link href="#portfolio" className="text-white hover:underline">
            Portfolio
          </Link>
        </li>
        <li>
          <Link href="#articles" className="text-white hover:underline">
            Articles
          </Link>
        </li>
        <li>
          <Link href="#donate" className="text-white hover:underline">
            Donate
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
