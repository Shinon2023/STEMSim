"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import "./../app/login-register_style.css";
import "@fontsource/orbitron";
import Image from "next/image";

export default function Header({ toggleAuthForm }) {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src =
      "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js";
    script1.type = "module";

    const script2 = document.createElement("script");
    script2.src = "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js";
    script2.nomodule = true;

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    signOut();
  };

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  if (loading) {
    return null;
  }

  return (
    <>
      <header className="flex items-center justify-between w-full py-4 px-8">
        <div className="flex items-center">
          <Image
            src="/img/Logo-White.png"
            alt="Logo"
            width={65}
            height={65}
            priority
          />
          <h2 className="font-sans font-semibold text-5xl text-white select-none ml-2">
            STEMSim
          </h2>
        </div>
        <nav className="navigation">
          <a href="/" className="mx-2">
            Home
          </a>
          <a href="#" className="mx-2">
            AboutUs
          </a>
          <a href="#" className="mx-2">
            Service
          </a>
          <a href="#" className="mx-2">
            Contact
          </a>
          {!session ? (
            <button className="btnLogin-popup mx-2" onClick={toggleAuthForm}>
              Login
            </button>
          ) : (
            <button className="btnLogin-popup mx-2" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>
      </header>
    </>
  );
}
