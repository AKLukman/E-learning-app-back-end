import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const Modal = ({ isModalOpen, onClose, children, ref }) => {
  return (
    <>
      {isModalOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: "100vh" }}
            className="fixed inset-0 z-50 bg-transparent flex items-center justify-center"
          >
            <motion.div
              className="w-[290px] md:w-[400px] bg-slate-100 rounded-xl px-3 py-2 h-1/2 lg:h-3/5 overflow-y-auto"
              initial={{ scale: 1, y: "100vh" }}
              animate={{ scale: 1, y: "0" }}
              exit={{ scale: 0, rotate: 360 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 0.5,
              }}
            >
              <div className="flex justify-end m-1">
                <button
                  onClick={onClose}
                  className="border border-black rounded-lg hover:neon-red p-1"
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
              <hr className="border my-2 border-black" />
              {children}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default Modal;
