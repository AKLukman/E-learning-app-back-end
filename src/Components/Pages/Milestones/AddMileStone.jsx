import React from "react";
import { useForm } from "react-hook-form";
import { storeCourses } from "../../../lib/api/store";
import { useModal } from "../../Modal/zustand";

const AddMileStone = ({ courses }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { addMileStone } = storeCourses();
  const { closeModal } = useModal();
  const onSubmit = (data) => {
    const body = { title: data?.milestone };
    const courseId = data?.course;
    addMileStone(courseId, body);
    reset();
    closeModal();
  };
  return (
    <>
      <p className="text-center text-lg font-semibold link">Add Millestone</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 justify-center items-center"
      >
        <span>Milestone Name</span>
        <input
          {...register("milestone", {
            required: { value: true, message: "Milestone Name is required" },
          })}
          className="input-box"
        />
        {errors?.milestone && (
          <p className="text-error font-semibold">
            {errors?.milestone?.message}
          </p>
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

export default AddMileStone;
