import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import UnderNav from "../components/under-nav.jpg";
import { Link, useNavigate } from "react-router-dom";
import BrosLogo from "../components/bros-map.png";
import ProductShowcase from "./ProductShowcase";
import { PhoneOutlined, InstagramOutlined, FacebookOutlined } from "@ant-design/icons";
import { getDatabase, ref, get } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebaseConfig";

export const Home = ({ user, setGuest, guest, phoneVerified, phoneNumber }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        const db = getDatabase(app);
        const userRef = ref(db, "users/" + user.uid);
        const snap = await get(userRef);
        setUsername(snap.exists() ? snap.val().username : "User");
      }
    };
    fetchUsername();
  }, [user]);

  const handleLogout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    setGuest(false);
    navigate("/login");
  };

  return (
    <>
      <Header
        phoneVerified={phoneVerified}
        handleLogout={handleLogout}
        phoneNumber={phoneNumber}
        setGuest={setGuest}
        guest={guest}
        user={user}
      />

      <main className="mx-4 md:mx-10 lg:mx-20">
        
        <div className="flex justify-between items-center my-9">
          <h2 className="text-3xl font-bold">Welcome {username}!</h2>
        </div>

        {/* ABOUT SECTION */}
        <section className="flex flex-col md:flex-row m-9 font-bold bg-[#e8a033] border rounded-xl overflow-hidden">
          <div className="m-5 flex flex-col justify-evenly md:w-1/2">
            <h1 className="text-center text-3xl">Souvlaki Bros</h1>
            <p className="m-5 text-center md:text-left">
              Craving something quick, tasty, and satisfying? At Souvlaki Bros, we serve up
              classic fast food favorites made fresh and fast. From juicy burgers and crispy fries
              to chicken sandwiches, wraps, and refreshing drinks — we've got something for every appetite.
            </p>
            <div className="flex justify-center md:justify-start">
              <Link
                className="text-center border border-[2px] border-black text-2xl bg-black text-white rounded-3xl px-8 py-2"
                to="/about-us"
              >
                About Us
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img className="w-full h-full object-cover" src={UnderNav} alt="" />
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="m-9">
          <ProductShowcase />
        </section>

        {/* CONTACT SECTION */}
        <section className="m-9 bg-[#e8a033] border rounded-xl">
          <div className="p-5 text-center">
            <h1 className="text-4xl font-bold mb-5">Contact Us</h1>
            <p className="text-lg font-bold">
              Souvlaki Bros is located on Rruga Mikel Maruli in the Astir/Yzberisht area of Tirana.
            </p>
            <p className="text-lg font-bold">Open daily from 11:00 to 02:00</p>
          </div>

          <div className="m-11 flex flex-col md:flex-row font-bold justify-between items-center">
            <div className="flex flex-col m-8 pt-6 text-center md:text-left">
              <p className="text-4xl pb-3">Via phone number:</p>
              <p className="text-2xl pb-8 flex justify-center md:justify-start items-center gap-2">
                <PhoneOutlined /> +355 68 741 2345
              </p>

              <p className="text-4xl pb-3">Via social media:</p>
              <p className="text-2xl pb-8 flex justify-center md:justify-start items-center gap-2">
                <InstagramOutlined /> <FacebookOutlined /> Souvlaki Bros
              </p>
            </div>

            <img src={BrosLogo} className="map-calibration max-w-[300px] md:max-w-[400px]" alt="" />
          </div>
        </section>

        {/* ORDER CTA */}
        <section className="m-9 border rounded border-color-[#dcdcdc] border-[5px]">
          <div className="p-5 text-center">
            <p className="font-bold text-3xl">Already decided on dinner?</p>
            <p className="text-xl m-4">
              Take a shortcut and order right here, right now! Our operators will
              contact you ASAP!
            </p>
            <Link
              className="m-4 p-1 px-5 bg-[#e8a033] text-xl font-bold rounded-xl inline-block"
              to="/order-now"
            >
              Order Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};
