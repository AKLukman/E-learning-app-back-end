import React from "react";
import { storeCourses } from "../../../lib/api/store";
import { useModal } from "../../Modal/zustand";

const ReomveFaq = ({ selectedItem, courseId }) => {
  const { removeFaq } = storeCourses();
  const { closeModal } = useModal();
  const handleDelete = () => {
    removeFaq(courseId, selectedItem);
    closeModal();
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

export default ReomveFaq;
