import React from "react";
import { useUserAuth } from "../../lib/api/store";
import { useModal } from "../Modal/zustand";
import { useImageController } from "../Forms/Course Form/zustand";

const DeleteProfile = ({ userData }) => {
  console.log(
    "🚀 ~ file: DeleteProfile.jsx:6 ~ DeleteProfile ~ userData:",
    userData
  );
  const { deleteTeachersAndBlogger } = useUserAuth();
  const { removeImage } = useImageController();
  const { closeModal } = useModal();
  const handleDelete = () => {
    if (userData?.image) {
      removeImage(userData?.image);
    }
    deleteTeachersAndBlogger(userData?._id);

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

export default DeleteProfile;
