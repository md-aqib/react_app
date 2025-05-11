import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const MainLayout = () => (
  <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <Header />
    <main style={{ flex: 1, padding: 20 }}>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;

