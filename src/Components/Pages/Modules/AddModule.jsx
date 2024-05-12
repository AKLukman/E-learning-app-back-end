import React from "react";
import { useModal } from "../../Modal/zustand";
import { useForm } from "react-hook-form";
import { storeCourses } from "../../../lib/api/store";

const AddModule = ({ milestones }) => {
  console.log(
    "🚀 ~ file: AddModule.jsx:7 ~ AddModule ~ milestones:",
    milestones
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { addModule } = storeCourses();
  const { closeModal } = useModal();
  const onSubmit = (data) => {
    const body = { title: data?.module };
    const milestoneId = data?.milestone;
    addModule(milestoneId, body);
    reset();
    closeModal();
  };
  return (
    <>
      <p className="text-center text-lg font-semibold link">Add Module</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 justify-center items-center"
      >
        <span>Module Name</span>
        <input
          {...register("module", {
            required: { value: true, message: "Module Name is required" },
          })}
          className="input-box"
        />
        {errors?.module && (
          <p className="text-error font-semibold">{errors?.module?.message}</p>
        )}
        <p className="text-xl font-semibold">Milestone</p>
        <select
          {...register("milestone", {
            required: { value: true, message: "Milestone  is required" },
          })}
          className="input-box"
        >
          <option disabled selected value="">
            Select Your Milestone
          </option>
          {milestones?.map((milestone) => (
            <option key={milestone?._id} value={milestone?._id}>
              {milestone?.title}
            </option>
          ))}
        </select>
        {errors?.milestone && (
          <p className="text-error font-semibold">
            {errors?.milestone?.message}
          </p>
        )}
        <button className="btn btn-primary"> Submit</button>
      </form>
    </>
  );
};

export default AddModule;
