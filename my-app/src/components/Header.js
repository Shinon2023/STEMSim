import "./../app/login-register_style.css";

export default function Header({ toggleAuthForm }) {
  const reloadHome = () => {
    window.location.href = "/"; // เปลี่ยน URL และรีโหลดหน้าใหม่
  };

  return (
    <header>
      <h2 className="logo">Physics Simulation</h2>
      <nav className="navigation">
        <a href="#" onClick={reloadHome}>Home</a>
        <a href="#">About</a>
        <a href="#">Service</a>
        <a href="#">Contact</a>
        {/* เมื่อคลิกปุ่ม Login ให้เรียกฟังก์ชัน toggleAuthForm */}
        <button className="btnLogin-popup" onClick={toggleAuthForm}>
          Login
        </button>
      </nav>
    </header>
  );
}
