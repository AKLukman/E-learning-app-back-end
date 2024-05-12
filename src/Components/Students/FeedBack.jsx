import React from "react";
import { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { ContextApi } from "../../Context/ContextApi";
import { axiosInstance } from "../../lib/api/axiosInstance";
import toast from "react-hot-toast";
import { useModal } from "../Modal/zustand";

const FeedBack = ({ studentId, selectedCourse }) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  console.log(" file: FeedBack.jsx:7 ~ FeedBack ~ studentId:", studentId);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useContext(ContextApi);
  const onSubmit = async (data) => {
    try {
      const body = {
        from: user?.uid,
        to: studentId,
        feedBack: data?.feedBack,
        course: selectedCourse,
      };
      const request = await axiosInstance.post("/teacher/feedback", body);
      if (request.status === 201) {
        toast.success("Your FeedBack Added Successfully", {
          duration: 1500,
          position: "top-center",
        });
        closeModal();
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  return (
    <div>
      <h2 className="text-center text-xl font-semibold">
        Student Feedback Form
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-7"
      >
        <>
          <p>
            <span className="text-lg font-semibold">FeedBack</span>
          </p>
          <textarea
            {...register("feedBack", {
              required: "feedBack is Required",
              maxLength: { value: 230, message: "feedBack Max Length 230" },
            })}
            type="text"
            className="p-2 outline-none border  border-secondary rounded-lg min-h-[75px]  w-[215px]  focus:neon-teal"
          />
          {errors?.feedBack?.message && (
            <p className="error-message ">{errors?.feedBack?.message}</p>
          )}
        </>
        <button type="submit" className="btn btn-accent">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedBack;
