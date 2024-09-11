import { useEffect, useState } from "react";
import "./../app/login-register_style.css";
import "@fontsource/orbitron"; 
import Image from "next/image";

export default function Header({ toggleAuthForm }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }
  console.log()
  return (
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
        {!isLoggedIn ? ( // แสดงปุ่ม Login ถ้าไม่ได้ล็อกอิน
          <button className="btnLogin-popup mx-2" onClick={toggleAuthForm}>
            Login
          </button>
        ) : ( // แสดงปุ่ม Logout ถ้าล็อกอินสำเร็จ
          <button className="btnLogin-popup mx-2" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
