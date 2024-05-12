import React from "react";
import { useModal } from "../../Modal/zustand";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Modal from "../../Modal/Modal";
import EditClass from "./EditClass";
import RemoveClass from "./RemoveClass";
import AddClass from "./AddClass";
import { storeCourses } from "../../../lib/api/store";
import { useEffect } from "react";
import { cloud_front_url } from "../../../lib/data";

const Classes = () => {
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
      <div className="w-full">
        <p className="text-center md:m-6 m-4 ">
          <span className="headline">Videos</span>
        </p>
      </div>
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
              {module?.classes?.map((classI) => (
                <div
                  className="flex flex-col justify-center items-center gap-1 px-6 w-72 h-60 bg-base-200 rounded-xl"
                  key={classI._id}
                >
                  <p className="badge badge-secondary capitalize">
                    {module?.title}
                  </p>
                  <p className="text-lg font-bold">{classI?.title}</p>
                  <video className="h-auto max-h-[220px] w-64" controls>
                    <source src={`${cloud_front_url}/${classI?.videoUrl}`} />
                  </video>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setMode(1),
                          openModal(),
                          setSelectedItem(classI),
                          setModuleId(module._id);
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
                        setMode(2),
                          openModal(),
                          setSelectedItem(classI),
                          setModuleId(module._id);
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
            </div>
          ))}
        </section>
      )}
      <div
        className="fixed  bottom-6 right-6"
        onClick={() => {
          setMode(3), openModal();
        }}
      >
        <button className="btn">
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
                  return <EditClass selectedItem={selectedItem} />;
                case 2:
                  return (
                    <RemoveClass
                      selectedItem={selectedItem}
                      moduleId={moduleId}
                    />
                  );
                case 3:
                  return <AddClass modules={modules} />;
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

export default Classes;
