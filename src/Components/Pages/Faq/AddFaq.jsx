import React from "react";
import { useForm } from "react-hook-form";
import { storeCourses } from "../../../lib/api/store";
import { useModal } from "../../Modal/zustand";

const AddFaq = ({ courses }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { addFaq } = storeCourses();
  const { closeModal } = useModal();
  const onSubmit = (data) => {
    const body = { question: data?.question, answer: data?.answer };
    const courseId = data?.course;
    addFaq(courseId, body);
    reset();
    closeModal();
  };
  return (
    <>
      <p className="text-center text-lg font-semibold link">Add Faq</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 justify-center items-center"
      >
        <span>Question </span>
        <input
          {...register("question", {
            required: { value: true, message: "Question  is required" },
          })}
          className="input-box"
        />
        {errors?.question && (
          <p className="text-error font-semibold">
            {errors?.question?.message}
          </p>
        )}
        <span>Answer</span>
        <input
          {...register("answer", {
            required: { value: true, message: "Answer  is required" },
          })}
          className="input-box"
        />
        {errors?.answer && (
          <p className="text-error font-semibold">{errors?.answer?.message}</p>
        )}
        <p className="text-xl font-semibold">Course </p>
        <select
          {...register("course", {
            required: { value: true, message: "Course  is required" },
          })}
          className="input-box"
        >
          <option disabled selected value="">
            Select Your Course
          </option>
          {courses?.map((course) => (
            <option key={course?._id} value={course?._id}>
              {course?.title}
            </option>
          ))}
        </select>
        {errors?.course && (
          <p className="text-error font-semibold">{errors?.course?.message}</p>
        )}
        <button className="btn btn-primary"> Submit</button>
      </form>
    </>
  );
};

export default AddFaq;
