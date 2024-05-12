import React from "react";
import { useForm } from "react-hook-form";
import { storeCourses } from "../../../lib/api/store";
import { useModal } from "../../Modal/zustand";

const AddBlogs = ({ courses }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { addBlog } = storeCourses();
  const { closeModal } = useModal();
  const onSubmit = (data) => {
    const body = { title: data?.title, description: data?.description };
    const courseId = data?.course;
    addBlog(courseId, body);
    reset();
    closeModal();
  };
  return (
    <>
      <p className="text-center text-lg font-semibold link">Add Blogs</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 justify-center items-center"
      >
        <span>Blog Title</span>
        <input
          {...register("title", {
            required: { value: true, message: "Blog  is required" },
          })}
          className="input-box"
        />
        {errors?.title && (
          <p className="text-error font-semibold">{errors?.title?.message}</p>
        )}
        <span>Blog Description</span>
        <textarea
          {...register("description", {
            required: { value: true, message: "Description  is required" },
          })}
          className="input-box"
        />
        {errors?.description && (
          <p className="text-error font-semibold">
            {errors?.description?.message}
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

export default AddBlogs;
