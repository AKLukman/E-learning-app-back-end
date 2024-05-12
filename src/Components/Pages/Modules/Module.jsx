import React, { useState, useEffect } from "react";
import { useModal } from "../../Modal/zustand";
import { storeCourses } from "../../../lib/api/store";
import { AnimatePresence } from "framer-motion";
import Modal from "../../Modal/Modal";
import ModuleEdit from "./ModuleEdit";
import ModuleRemove from "./ModuleRemove";
import AddModule from "./AddModule";

const Module = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [mode, setMode] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState("");
  const [milestoneId, setMilestoneId] = useState(null);
  const { isLoading, milestones, getMilestones } = storeCourses();

  useEffect(() => {
    if (milestones?.length === 0) {
      getMilestones();
    }
  }, []);

  const selectedModuleMilestones =
    (selectedMilestone && [
      milestones?.find((milestone) => milestone._id === selectedMilestone),
    ]) ||
    milestones;

  return (
    <>
      <div className="w-full">
        <p className="text-center md:m-6 m-4 ">
          <span className="headline">Modules</span>
        </p>
      </div>
      {milestones?.length > 0 && (
        <div className="flex justify-end px-4 py-4">
          <select
            className="select select-secondary w-full max-w-xs"
            value={selectedMilestone}
            onChange={(e) => setSelectedMilestone(e.target.value)}
            title={milestones.find(milestone => milestone._id === selectedMilestone)?.title || 'Select a Milestone'}
          >
            <option value="" disabled>Select a Milestone</option>
            {selectedMilestone && <option value="">All Milestones</option>}
            {milestones.map((milestone) => (
              <option key={milestone._id} value={milestone._id} title={milestone.title}>
                {milestone.title.length > 20 ? `${milestone.title.substring(0, 20)}...` : milestone.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedModuleMilestones && (
        <section>
          {selectedModuleMilestones?.map((milestone) => (
            <div
              className="flex flex-wrap justify-center lg:justify-start gap-4 m-3 "
              key={milestone._id}
            >
              {milestone?.modules?.map((module) => (
                <div
                  className="flex justify-between items-center gap-2 px-6 w-72 h-28  bg-base-200 rounded-xl"
                  key={module._id}
                >
                  <div>
                    <p className="text-xl font-semibold">{module.title}</p>
                    <div className="badge badge-secondary" title={milestone.title}>
                      {milestone.title.length > 10 ? `${milestone.title.substring(0, 10)}...` : milestone.title}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setMode(1);
                        openModal();
                        setSelectedItem(module);
                        setMilestoneId(milestone._id);
                      }}
                      className="btn btn-sm btn-info hover:neon-teal animation"
                      title="Edit Module"
                    >
                      {/* SVG for Edit Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        setMode(2);
                        openModal();
                        setSelectedItem(module);
                        setMilestoneId(milestone._id);
                      }}
                      className="btn btn-sm btn-error hover:neon-rose animation"
                      title="Remove Module"
                    >
                      {/* SVG for Delete Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>
      )}

      {/* Add Module Button */}
      <div
        className="fixed bottom-6 right-6"
        onClick={() => {
          setMode(3); openModal();
        }}
      >
        <button className="btn" title="Add Module">
          {/* SVG for Add Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            isModalOpen={isModalOpen}
            onClose={() => {
              setMode(null);
              setSelectedItem(null);
              closeModal();
              setMilestoneId(null);
            }}
          >
            {(() => {
              switch (mode) {
                case 1:
                  return <ModuleEdit selectedItem={selectedItem} milestoneId={milestoneId} />;

                case 2:
                  return (
                    <ModuleRemove
                      selectedItem={selectedItem}
                      milestoneId={milestoneId}
                    />
                  );
                case 3:
                  return <AddModule milestones={milestones} />;
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

export default Module;      