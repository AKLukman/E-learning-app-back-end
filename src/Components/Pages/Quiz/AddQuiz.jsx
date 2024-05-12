import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { storeCourses } from "../../../lib/api/store";
import { useModal } from "../../Modal/zustand";

const AddQuiz = ({ modules }) => {
  const { addQuiz } = storeCourses();
  const { closeModal } = useModal();
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });
  const onSubmit = (data) => {
    console.log("🚀 ~ file: AddQuiz.jsx:21 ~ onSubmit ~ data:", data);
    const moduleId = data?.module;
    const body = {
      question: data?.question,
      options: data?.options,
      correctOptions: data?.answer,
    };
    if (data?.answer !== false) {
      addQuiz(moduleId, body);
      reset();
      closeModal();
    }
  };
  return (
    <>
      <form
        className="flex flex-col justify-center items-center gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2 justify-center items-center">
          <label className="text-lg font-semibold">Question:</label>
          <input
            className="input-box"
            {...register("question", {
              required: { value: true, message: "Question is Required" },
            })}
          />
        </div>
        {errors.question && (
          <p className="text-red-600 font-semibold">
            {errors?.question?.message}
          </p>
        )}
        <div className="flex flex-col gap-2 justify-center items-center">
          <label>Options:</label>
          {fields.map((option, index) => (
            <div className="flex justify-between items-center" key={option.id}>
              <input
                className="input-box"
                {...register(`options.${index}.option`)}
                defaultValue={option.option}
              />
              {index > 0 && (
                <button type="button" onClick={() => remove(index)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12h-15"
                    />
                  </svg>
                </button>
              )}
            </div>
          ))}
          {fields.length < 4 && (
            <button
              className="btn btn-sm btn-neutral"
              type="button"
              onClick={() => append({ option: "" })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <label className="text-lg font-semibold">Answer:</label>
          <div className="flex justify-center items-center gap-4">
            {fields?.map((item, index) => (
              <span className="flex justify-center gap-3">
                {index + 1}
                <input
                  {...register("answer")}
                  type="checkbox"
                  className="checkbox checkbox-success"
                  value={index}
                />
              </span>
            ))}{" "}
          </div>
        </div>
        <p className="text-xl font-semibold">Course </p>
        <select
          {...register("module", {
            required: { value: true, message: "Module  is required" },
          })}
          className="input-box"
        >
          <option disabled selected value="">
            Select Your Course
          </option>
          {modules?.map((module) => (
            <option key={module?._id} value={module?._id}>
              {module?.title}
            </option>
          ))}
        </select>
        {errors?.module && (
          <p className="text-error font-semibold">{errors?.module?.message}</p>
        )}
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default AddQuiz;
