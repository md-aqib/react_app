import React from "react";
import { Link } from "react-router";

const Header = () => (
  <header style={{ padding: 10, background: "#333", color: "#fff" }}>
    <nav>
      <Link to="/" style={{ color: "white", marginRight: 10 }}>Home</Link>
      <Link to="/about" style={{ color: "white" }}>About</Link>
    </nav>
  </header>
);

export default Header;
