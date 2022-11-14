import React, {
  useState,
} from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import NavSubMenu from "./NavSubMenu";
import Link from "next/link";

function Navbar() {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [currentSubMenu, setcurrentSubMenu] = useState("");

  function handleMouseOver(e: React.SyntheticEvent) {
    e.preventDefault();
    let subMenu = (e.target as HTMLInputElement).id;
    setShowSubMenu(true);
    setcurrentSubMenu(subMenu);
  }

  function handleMouseOut() {
    setShowSubMenu(false);
  }

  return (
    <header className="shadow sticky top-0">
      <nav className="nav h-full flex justify-evenly items-center">
        <div className="primary-nav flex items-center">
          <Link className='logo' href="/">
            <Image
              src="/weebLogo.svg"
              alt="Weeb Logo"
              width={100}
              height={20}
            />
          </Link>
          <ul className={`nav-list ${styles.navLinks}`}>
            <li>
              <a>NEW</a>
            </li>
            <li>
              <a>LIMITED EDITION</a>
            </li>
            <li
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}>
              <Link
                id="collections"
                href="/collections"
                
              >
                COLLECTIONS
              </Link>
            </li>
            <li
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}>
              <Link
                id="clothing"
                href="/clothing"
                
              >
                CLOTHING
              </Link>
            </li>
          </ul>
        </div>
        <NavSubMenu handleMouseOver={handleMouseOver} handleMouseOut={handleMouseOut} menuCategory={currentSubMenu} showSubMenu={showSubMenu} />
        <div className="secondary-nav">
          <ul className={styles.navLinks}>
            <li>
              <a>
                <Image
                  className="nav-icon"
                  src="/userIcon.svg"
                  alt="User account"
                  width={35}
                  height={35}
                />
              </a>
            </li>
            <li>
              <a>
                <Image
                  className="nav-icon"
                  src="/searchIcon.svg"
                  alt="User account"
                  width={35}
                  height={35}
                />
              </a>
            </li>
            <li>
              <a>
                <Image
                  className="nav-icon"
                  src="/cartIcon.svg"
                  alt="User account"
                  width={35}
                  height={35}
                />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
