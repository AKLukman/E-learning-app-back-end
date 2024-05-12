import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useRef, useState } from "react";
import { navbar_items_data } from "./navigation";
import { Link, useLocation } from "react-router-dom";
import { ContextApi } from "../../Context/ContextApi";

const Navbar = () => {
  const location = useLocation();
  console.log("🚀 ~ file: Navbar.jsx:9 ~ Navbar ~ location:", location);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(ContextApi);
  const sidePanelRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (sidePanelRef.current && !sidePanelRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <button onClick={() => setIsOpen(!isOpen)} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">LWK</a>
        </div>
        <div className="navbar-end ">
          {user && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn m-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 hover:stroke-violet-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content bg-gray-600 z-[1] menu p-2 shadow  rounded-box w-52"
              >
                <li></li>
                <li>
                  <button
                    onClick={() => logOut()}
                    className="capitalize btn btn-sm btn-error text-white"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={sidePanelRef}
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
            className="fixed z-50 top-0 bottom-0 left-0 bg-slate-100 h-screen w-1/2 md:w-2/5 shadow-lg neon-gray"
          >
            <motion.div className="">
              <div className="flex justify-end m-1">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="border p-2 rounded-xl "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <hr className="border-2 border-black px-2" />
              <div className="flex  flex-col mx-0 px-2 gap-1">
                {navbar_items_data.map((item, index) => (
                  <Link
                    onClick={() => setIsOpen(!isOpen)}
                    key={index}
                    to={item.href}
                    className={`${
                      location?.pathname === item?.href &&
                      "bg-cyan-600 text-white"
                    } capitalize btn `}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
