import React from "react";
import { storeCategory } from "../../../lib/api/store";
import Loading from "../../Loading";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useModal } from "../../Modal/zustand";
import { useState } from "react";
import AddCategory from "./AddCategory";
import CategoryEdit from "./CategoryEdit";
import CategoryRemove from "./CategoryRemove";
import Modal from "../../Modal/Modal";

const Category = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [mode, setMode] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const {
    getCategories,
    categories,
    isLoading: categoryLoading,
  } = storeCategory();

  useEffect(() => {
    if (categories?.length === 0) {
      getCategories();
    }
  }, []);
  if (categoryLoading) {
    return <Loading />;
  }
  return (
    <>
      <div
        className={`${isModalOpen && "blur-sm animation"} relative h-screen `}
      >
        <div className="text-center">
          <span className="headline text-center">Category</span>
        </div>
        {categories?.length === 0 && (
          <p className="font-semibold text-xl text-center my-6">
            CATEGORY NOT FOUND
          </p>
        )}
        <main className="flex flex-wrap gap-3 lg:p-8 p-5">
          {categories?.map((category) => (
            <div
              key={category?._id}
              className="flex justify-between items-center gap-2 px-6 w-72 h-28  bg-base-200 rounded-xl"
            >
              <p className="font-serif">{category?.name}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setMode(1), openModal(), setSelectedItem(category);
                  }}
                  className="btn btn-sm btn-info hover:neon-teal animation"
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
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setMode(2), openModal(), setSelectedItem(category);
                  }}
                  className="btn btn-sm btn-error hover:neon-rose animation"
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </main>

        <section
          className={`fixed   right-6 ${
            isModalOpen ? "bottom-[90px] -z-50" : "bottom-6"
          }`}
        >
          <button
            onClick={() => {
              setMode(3);
              openModal();
            }}
            className="btn btn-accent hover:neon-teal"
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
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </section>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <Modal
            isModalOpen={isModalOpen}
            onClose={() => {
              setMode(null), setSelectedItem(null), closeModal();
            }}
          >
            {(() => {
              switch (mode) {
                case 1:
                  return <CategoryEdit category={selectedItem} />;
                case 2:
                  return <CategoryRemove category={selectedItem} />;
                case 3:
                  return <AddCategory />;
                default:
                  return null;
              }
            })()}
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Category;