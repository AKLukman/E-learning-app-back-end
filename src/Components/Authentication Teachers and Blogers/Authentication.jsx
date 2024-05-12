import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../lib/api/store";
import Marquee from "react-fast-marquee";
import { useModal } from "../Modal/zustand";
import { AnimatePresence } from "framer-motion";
import Modal from "../Modal/Modal";

import Loading from "../Loading";
import { cloud_front_url } from "../../lib/data";
import ProfileEdit from "./ProfileEdit";
import ProfileForm from "./ProfileForm";
import DeleteProfile from "./DeleteProfile";

const Authentication = () => {
  const {
    getTeachersAndBloggers,
    isLoading: teacherAndBloggerLoading,
    teachersAndBloggers,
  } = useUserAuth();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [mode, setMode] = useState(null);
  const [data, setData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (teachersAndBloggers.length === 0) {
      getTeachersAndBloggers();
    }
  }, []);
  const handleSelectChange = (e) => {
    const selectedValue = e.target.value.toLowerCase();

    if (selectedValue == "all") {
      return setData(teachersAndBloggers);
    }
    const filteredData = teachersAndBloggers.filter(
      (item) => item?.role === selectedValue
    );
    setData(filteredData);
  };
  const teachersAndBloggersData = data ?? teachersAndBloggers;
  if (teacherAndBloggerLoading) {
    return <Loading />;
  }
  return (
    <>
      <main className={`${isModalOpen && "blur-sm"} animation re`}>
        <div className=" flex  flex-wrap  justify-center md:justify-between items-center gap-3 p-4">
          <input
            onChange={(e) =>
              setData(
                teachersAndBloggers.filter((item) =>
                  item?.email
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              )
            }
            placeholder="Email"
            className="input-box"
          />

          <select
            onChange={(e) => handleSelectChange(e)}
            className=" w-[225px] select select-bordered"
          >
            <option selected>All</option>
            <option value={"teacher"}>Teacher</option>
            <option value={"blogger"}>Blogger</option>
          </select>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-5 p-3 md:p-4 ">
          {teachersAndBloggersData?.map((item, index) => (
            <div
              key={index}
              className="card card-compact w-96 bg-base-100  shadow-lg shadow-slate-700"
            >
              <figure className="px-10 pt-10 ">
                <img
                  className="h-44 w-full object-fill rounded-lg"
                  src={`${cloud_front_url}/${item?.image}`}
                  alt={item?.name}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  <Marquee speed={20} className="w-24">
                    {item?.name}
                  </Marquee>
                  <div className="badge badge-secondary text-white">
                    {item?.role}
                  </div>
                </h2>

                <div className="flex flex-col gap-3">
                  <div>
                    <span className="text-sm">Email :-</span>{" "}
                    <p className="badge  badge-accent ">{item?.email}</p>{" "}
                  </div>
                  <div className="flex justify-between items-center ">
                    <div>
                      <span className="text-sm">Number :-</span>{" "}
                      <p className="badge badge-warning">{item?.phone}</p>
                    </div>
                    <div className=" flex justify-center items-center gap-4">
                      <button
                        onClick={() => {
                          setMode(1), openModal(), setSelectedItem(item);
                        }}
                        className="btn btn-sm btn-info hover:neon-sky animation"
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
                          setMode(2), openModal(), setSelectedItem(item);
                        }}
                        className="btn btn-sm btn-error hover:neon-red animation"
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <div className={`fixed  bottom-6 right-6  ${isModalOpen && "blur-sm"}`}>
        <button
          onClick={() => {
            setMode(3), openModal();
          }}
          className=" btn btn-circle  bg-gradient-to-r
            from-sky-400
            via-red-400
            to-emerald-600
            background-animate"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <Modal
            isModalOpen={isModalOpen}
            onClose={() => {
              setSelectedItem(null), closeModal();
            }}
          >
            {(() => {
              switch (mode) {
                case 1:
                  return <ProfileEdit selectedItem={selectedItem} />;
                case 2:
                  return <DeleteProfile userData={selectedItem} />;
                case 3:
                  return <ProfileForm />;
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

export default Authentication;
