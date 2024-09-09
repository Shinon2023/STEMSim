"use client";
import { useEffect, useRef, useState } from "react";
import "./../app/login-register_style.css";

export default function AuthForm({ isPopupActive, handleClosePopup }) {
  const wrapperRef = useRef(null); // อ้างอิง wrapper element

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

  useEffect(() => {
    const wrapper = wrapperRef.current; // เข้าถึง wrapper element ผ่าน useRef
    const loginLink = document.querySelector(".login-link");
    const registerLink = document.querySelector(".register-link");

    // เมื่อคลิกที่ register link ให้เพิ่ม class 'active'
    registerLink.addEventListener("click", () => {
      wrapper.classList.add("active");
    });

    // เมื่อคลิกที่ login link ให้ลบ class 'active'
    loginLink.addEventListener("click", () => {
      wrapper.classList.remove("active");
    });

    // Cleanup เพื่อป้องกัน memory leaks
    return () => {
      registerLink.removeEventListener("click", () => {
        wrapper.classList.add("active");
      });
      loginLink.removeEventListener("click", () => {
        wrapper.classList.remove("active");
      });
    };
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  console.log(formData);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { username, ...restFormData } = formData;
    console.log(restFormData);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restFormData),
    });
  };

  return (
    <div
      ref={wrapperRef}
      className={`wrapper ${isPopupActive ? "active-popup" : ""}`}
    >
      <span className="icon-close" onClick={handleClosePopup}>
        <ion-icon name="close"></ion-icon>
      </span>

      {/* ฟอร์มล็อกอิน */}
      <div className="form-box login">
        <h2>Login</h2>
        <form onSubmit={handleLogin} autoComplete="off">
          <div className="input-box">
            <span className="icon">
              <ion-icon name="mail"></ion-icon>
            </span>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label>Email</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <label>Password</label>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <div className="login-register">
            <p>
              Don't have an account?
              <a href="#" className="register-link">
                Register
              </a>
            </p>
          </div>
        </form>
      </div>

      <div className="form-box register">
        <h2>Registration</h2>
        <form onSubmit={handleRegister} autoComplete="off">
          <div className="input-box">
            <span className="icon">
              <ion-icon name="person"></ion-icon>
            </span>
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
            />
            <label>Username</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="mail"></ion-icon>
            </span>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label>Email</label>
          </div>
          <div className="input-box">
            <span className="icon">
              <ion-icon name="lock-closed"></ion-icon>
            </span>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <label>Password</label>
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" required /> I agree to the terms &
              conditions
            </label>
          </div>
          <button type="submit" className="btn">
            Register
          </button>
          {message && <p>{message}</p>}
          <div className="login-register">
            <p>
              Already have an account?
              <a href="#" className="login-link">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
