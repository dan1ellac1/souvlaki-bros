import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "./bros logo.webp"
import { PoweroffOutlined, UserOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { getAuth, signOut } from "firebase/auth";
import app from '../firebaseConfig';
import { useSnackbar } from 'notistack';

export const Header = ({ user, guest, setGuest, phoneVerified }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleOrderGuest = (e) => {
    e.preventDefault();

    if (!user) {
      enqueueSnackbar("Please Log in to order!", { variant: "warning" });
      return navigate("/login");
    }
    if (!phoneVerified) {
      enqueueSnackbar("Phone Number not verified", { variant: "warning" });
      return navigate("/numberConfirmation");
    }
    navigate("/order");
  };

  const handleLogout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    setGuest(false);
    navigate("/login");
  };

  return (
    <header className="bg-[#0d0304] h-[10%]">
      <nav className="flex justify-between md:justify-around items-center px-4 py-2">

        {/* Logo */}
        <Link to="/">
          <img className="image-calibration w-28 md:w-32" src={Logo} alt="Souvlaki Bros Logo" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex font-bold items-center text-lg text-[#e8a133] gap-6">
          <Link className="hover:text-white" to="/">Home</Link>
          <Link className="hover:text-white" to="/about-us">About</Link>
          <Link className="hover:text-white" to="/products">Menu</Link>
          <Link className="hover:text-white" to="/order" onClick={handleOrderGuest}>Order Now!</Link>

          <button onClick={handleLogout} className="bg-[#0d0304] text-white px-5">
            {guest ? <UserOutlined /> : <PoweroffOutlined />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#e8a133] text-2xl"
          onClick={() => setMenuOpen(true)}
        >
          <MenuOutlined />
        </button>
      </nav>

      {/* Mobile Slide Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenuOpen(false)}></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-3/4 bg-[#0d0304] text-[#e8a133] z-50 transform
        ${menuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}
      >
        <div className="flex justify-between items-center p-4 border-b border-[#e8a133]">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setMenuOpen(false)} className="text-2xl text-white">
            <CloseOutlined />
          </button>
        </div>

        <div className="flex flex-col text-lg font-semibold p-4 space-y-5">
          <Link onClick={() => setMenuOpen(false)} to="/">Home</Link>
          <Link onClick={() => setMenuOpen(false)} to="/about-us">About</Link>
          <Link onClick={() => setMenuOpen(false)} to="/products">Menu</Link>
          <Link onClick={(e) => { setMenuOpen(false); handleOrderGuest(e); }} to="/order">
            Order Now!
          </Link>

          <button
            onClick={() => { setMenuOpen(false); handleLogout(); }}
            className="text-white bg-[#e8a133] py-2 px-4 rounded flex items-center gap-3"
          >
            {guest ? <UserOutlined /> : <PoweroffOutlined />} Logout
          </button>
        </div>
      </div>
    </header>
  );
};
