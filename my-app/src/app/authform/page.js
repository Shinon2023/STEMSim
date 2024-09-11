"use client";
import { useState } from "react";
import AuthForm from "@/components/Authform";
import Header from "@/components/Header";

export default function LoginPage() {
  const [isPopupActive, setPopupActive] = useState(false);
  const handlePopup = () => {
    setPopupActive(true);
  };

  const handleClosePopup = () => {
    setPopupActive(false);
  };

  return (
    <div>
      {/* ส่ง handlePopup ไปที่ Header */}
      <Header toggleAuthForm={handlePopup} />

      {/* ส่ง isPopupActive และ handleClosePopup ไปยัง AuthForm */}
      <AuthForm isPopupActive={isPopupActive} handleClosePopup={handleClosePopup} />
    </div>
  );
}
