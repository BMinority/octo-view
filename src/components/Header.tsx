import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import OctoViewImg from "../assets/octoview-white.svg";
import "../styles/Header.scss";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bc-header">
      <div className="bc-header__content">
        <Link to="/" className="bc-header__logo" onClick={closeMenu}>
          <img src={OctoViewImg} alt="Logo OctoView" />
          <h1>OctoView</h1>
        </Link>

        <button className="bc-header__toggle" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className={`bc-header__nav ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={closeMenu}>
            Início
          </Link>
          <Link to="/page-search" onClick={closeMenu}>
            DevFinder
          </Link>
          <Link to="/page-repo-explorer" onClick={closeMenu}>
            GitRepoExplorer
          </Link>
          <Link to="/page-git-timeline" onClick={closeMenu}>
            GitHubTimeline
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
