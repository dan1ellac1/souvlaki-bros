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


export const Home = ({ user, setGuest, guest, phoneVerified }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Fetch username from Realtime Database
  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        const db = getDatabase(app);
        const userRef = ref(db, "users/" + user.uid);
        const snap = await get(userRef);
        if (snap.exists()) {
          setUsername(snap.val().username); // <-- match the field name you saved
        } else {
          setUsername("User");
        }
      }
    };
    fetchUsername();
  }, [user]);

  // Logout handler
  const handleLogout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    navigate("/login"); // redirect to login
    setGuest(false)
  };

  console.log(username)
  return (
    <>
      <Header phoneVerified={phoneVerified} handleLogout={handleLogout} setGuest={setGuest} guest={guest} user={user}/>
      <main className="ml-7 mr-7">
        {/* Welcome and Logout */}
        <div className="flex justify-between items-center m-9">
          <h2 className="text-3xl font-bold">Welcome {username}!</h2>
          
        </div>

        <section className="flex flex-row m-9 font-bold bg-[#e8a033] border rounded-xl">
          <div className="m-5 flex flex-col justify-evenly">
            <h1 className="text-center text-3xl">Souvlaki Bros</h1>
            <p className="m-5">
              Craving something quick, tasty, and satisfying? At Souvlaki Bros,
              we serve up classic fast food favorites made fresh and fast. From
              juicy burgers and crispy fries to chicken sandwiches, wraps, and
              refreshing drinks — we've got something for every appetite.
              Whether you're dining in, grabbing takeout, or ordering online,
              we're here to fuel your day with great flavor and fast service.
            </p>
            <Link
              className="text-center border border-[2px] border-black text-2xl ml-[25%] mr-[25%] bg-black text-white rounded-3xl"
              to="/about-us"
            >
              About Us
            </Link>
          </div>
          <div>
            <img className="under-nav-calibration" src={UnderNav} alt="" />
          </div>
        </section>

        <section className="m-9">
          <ProductShowcase />
        </section>

        <section className="m-9 bg-[#e8a033] border rounded-xl">
          <div className="m-3">
            <h1 className="text-4xl font-bold text-center mb-5">Contact Us</h1>
            <p className="text-lg font-bold text-center">
              Souvlaki Bros is located on Rruga Mikel Maruli in the Astir/Yzberisht
              area of Tirana. You can enjoy our delicious offerings daily
            </p>
            <p className="text-lg font-bold text-center">
              We are open from 11:00 to 02:00 early in the morning, every day of the
              week
            </p>
          </div>
          <div className="m-11 flex font-bold justify-between">
            <div className="flex flex-col m-8 pt-6">
              <p className="text-4xl pb-3">Via phone number:</p>
              <p className="text-2xl pb-8">
                <PhoneOutlined /> +355 68 741 2345
              </p>

              <p className="text-4xl pb-3">Via social media:</p>
              <p className="text-2xl pb-8">
                <InstagramOutlined /> <FacebookOutlined /> Souvlaki Bros
              </p>
            </div>
            <img src={BrosLogo} className="map-calibration" alt="" />
          </div>
        </section>

        <section className="m-9 border rounded border-color-[#dcdcdc] border-[5px]">
          <div className="p-5 text-center">
            <p className="font-bold text-3xl">Already decided on dinner?</p>
            <p className="text-xl m-4">
              Take a shortcut and order right here, right now! Our operators will
              see to contact you ASAP!
            </p>
            <Link
              className="m-4 p-1 px-5 bg-[#e8a033] text-xl font-bold rounded-xl"
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
