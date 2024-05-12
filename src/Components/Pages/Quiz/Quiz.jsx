import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Modal from "../../Modal/Modal";
import { useModal } from "../../Modal/zustand";
import { useState } from "react";
import { storeCourses } from "../../../lib/api/store";
import RemoveQuiz from "./RemoveQuiz";
import AddQuiz from "./AddQuiz";
import Marquee from "react-fast-marquee";
import ai_image from "../../../assets/ai.png";
import { useEffect } from "react";
import ChatGpt from "./ChatGpt";
import { Link } from "react-router-dom";

const Quiz = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [mode, setMode] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedModule, setSelectedModule] = useState("");
  const [moduleId, setModuleId] = useState(null);

  const { isLoading, modules, getModules } = storeCourses();

  useEffect(() => {
    if (modules?.length === 0) {
      getModules();
    }
  }, []);
  const selectedModules =
    (selectedModule && [
      modules?.find((modulef) => modulef._id === selectedModule),
    ]) ||
    modules;
  return (
    <>
      {/*   <p className="text-lg font-semibold text-center">
        {count?.totalModules === 0
          ? "No Module Found"
          : ` Total Modules ${count?.totalModules}`}
      </p> */}
      {modules?.length > 0 && (
        <div className="flex justify-end px-4 py-4">
          <select
            className="select select-secondary w-full max-w-xs"
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
          >
            <option value="" disabled>
              Select a Module
            </option>
            {selectedModule && <option value="">All Modules</option>}
            {modules.map((moduleI) => (
              <option key={moduleI._id} value={moduleI._id}>
                {moduleI?.title}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedModules && (
        <section>
          {selectedModules?.map((module) => (
            <div
              className="flex flex-wrap justify-center lg:justify-start gap-4 m-3 "
              key={module._id}
            >
              {module?.quiz?.map((item) => (
                <div key={item._id}>
                  <div
                    tabIndex={0}
                    className="collapse w-80  collapse-arrow border border-base-300 bg-base-200"
                  >
                    <div className="collapse-title flex justify-between">
                      <Marquee speed={20} className="w-3/5 text-xl font-medium">
                        {item?.question}
                      </Marquee>
                      <button
                        onClick={() => {
                          setMode(1),
                            openModal(),
                            setModuleId(module?._id),
                            setSelectedItem(item?._id);
                        }}
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

                    <div tabIndex={0} className="collapse-content">
                      <p className="text-xl font-semibold"> {item?.question}</p>
                      <div className=" flex flex-col">
                        {item?.options.map((option, index) => (
                          <p className="flex" key={option?._id}>
                            <span className="font-semibold">{index + 1}.</span>{" "}
                            <span className="flex items-center gap-2">
                              <span>{option?.option}</span>{" "}
                              <span>
                                {item?.correctOptions?.includes(index) && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4 text-green-600"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                                    />
                                  </svg>
                                )}
                              </span>
                            </span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>
      )}

      <div className="fixed flex flex-col gap-5 items-center  bottom-6 right-6 ">
        <Link to={"/ai-quiz"}>
          <img className="w-10 h-10" src={ai_image} />
        </Link>
        <button
          className="btn"
          onClick={() => {
            setMode(2), openModal();
          }}
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
                  return (
                    <RemoveQuiz
                      selectedItem={selectedItem}
                      moduleId={moduleId}
                    />
                  );
                case 2:
                  return <AddQuiz modules={modules} />;
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

export default Quiz;
