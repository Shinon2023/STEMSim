"use client";
import { useEffect, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import "./../app/login-register_style.css";

export default function AuthForm({ isPopupActive, handleClosePopup }) {
  const wrapperRef = useRef(null);
  const { data: session, status } = useSession(); // ใช้ session จาก NextAuth

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
    const wrapper = wrapperRef.current;
    const loginLink = document.querySelector(".login-link");
    const registerLink = document.querySelector(".register-link");
    registerLink.addEventListener("click", () => {
      wrapper.classList.add("active");
    });
    loginLink.addEventListener("click", () => {
      wrapper.classList.remove("active");
    });
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

  const handleGoogleLogin = async () => {
    try {
      const result = await signIn("google", { redirect: false });

      if (result.error) {
        console.error(result.error);
      } else {
        window.location.reload(); // เปลี่ยนเส้นทางหลังจากล็อกอินสำเร็จ
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setMessage(result.error || "Login failed");
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Credentials login error:", error);
      setMessage("An error occurred while trying to log in");
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={`wrapper ${
        isPopupActive ? "active-popup" : ""
      } bg-black/[.05]`}
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
          <button className="btn mb-5" onClick={handleGoogleLogin}>
            Sign in with Google
          </button>
          <button type="submit" className="btn">
            Login
          </button>
          {/* วางข้อความผลลัพธ์หลังฟอร์ม */}
          {message && <p className="mb-[10px] mt-[10px]">{message}</p>}
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
          {message && <p className="mt-[10px]">{message}</p>}
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
