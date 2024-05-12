import React from "react";
import { useModal } from "../../Modal/zustand";
import { useVideoController } from "../../Forms/Course Form/zustand";
import { storeCourses } from "../../../lib/api/store";

const RemoveClass = ({ moduleId, selectedItem }) => {
  const { removeVideo } = useVideoController();
  const { deleteClass } = storeCourses();
  const { closeModal } = useModal();
  const handleDelete = () => {
    if (selectedItem?.videoUrl) {
      removeVideo(selectedItem?.videoUrl);

      deleteClass(moduleId, selectedItem?._id);
      closeModal();
    }
  };
  return (
    <>
      <span className="flex justify-center text-lg font-semibold p-2">
        Are You Want to Delete This ?
      </span>
      <div className="flex justify-center gap-5 p-3">
        <button className="btn btn-error" onClick={handleDelete}>
          Yes
        </button>
        <button onClick={closeModal} className="btn btn-success">
          No
        </button>
      </div>
    </>
  );
};

export default RemoveClass;
