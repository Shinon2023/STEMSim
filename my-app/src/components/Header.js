"use client";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react"; // นำเข้า useSession และ signOut จาก next-auth/react
import "./../app/login-register_style.css";
import "@fontsource/orbitron"; 
import Image from "next/image";

export default function Header({ toggleAuthForm }) {
  const { data: session, status } = useSession(); // ใช้ useSession เพื่อตรวจสอบ session
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    signOut(); // ใช้ signOut จาก NextAuth เพื่อล็อกเอาท์
  };

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false); // เมื่อสถานะไม่เป็น "loading" แล้ว เราจะถือว่า session ได้รับการตรวจสอบแล้ว
    }
  }, [status]);

  if (loading) {
    return null; // รอให้การตรวจสอบ session เสร็จสิ้นก่อนที่จะแสดง header
  }

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
        {!session ? ( // แสดงปุ่ม Login ถ้าไม่มี session (ยังไม่ได้ล็อกอิน)
          <button className="btnLogin-popup mx-2" onClick={toggleAuthForm}>
            Login
          </button>
        ) : ( // แสดงปุ่ม Logout ถ้ามี session (ล็อกอินสำเร็จ)
          <button className="btnLogin-popup mx-2" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
