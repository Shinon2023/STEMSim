"use client";

import AuthForm from "@/components/Authform";
import Header from "@/components/Header";

export default function LoginPage({ handlePopup, handleClosePopup, isPopupActive }) {

  return (
    <div>
      {/* ส่ง handlePopup ไปที่ Header */}
      <Header toggleAuthForm={handlePopup} />

      {/* ส่ง isPopupActive และ handleClosePopup ไปยัง AuthForm */}
      <AuthForm isPopupActive={isPopupActive} handleClosePopup={handleClosePopup} />
    </div>
  );
}
