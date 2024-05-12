import React from "react";
import { storeCourses } from "../../../lib/api/store";
import { useModal } from "../../Modal/zustand";

const RemoveQuiz = ({ moduleId, selectedItem }) => {
  console.log("🚀 ~ file: RemoveQuiz.jsx:6 ~ RemoveQuiz ~ moduleId:", moduleId);
  console.log(
    "🚀 ~ file: RemoveQuiz.jsx:6 ~ RemoveQuiz ~ selectedItem:",
    selectedItem
  );
  const { deleteQuiz } = storeCourses();
  const { closeModal } = useModal();
  const handleDelete = () => {
    deleteQuiz(moduleId, selectedItem);
    closeModal();
  };
  return (
    <>
      {" "}
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

export default RemoveQuiz;
