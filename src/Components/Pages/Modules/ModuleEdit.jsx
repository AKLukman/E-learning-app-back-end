import React from "react";
import { useForm } from "react-hook-form";
import { useModal } from "../../Modal/zustand";
import { storeCourses } from "../../../lib/api/store";

const ModuleEdit = ({ selectedItem }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { closeModal } = useModal();
  const { updateModule } = storeCourses();
  const onSubmit = (data) => {
    if (data.title) {
      selectedItem.title = data.title;
    }
    const body = {
      title: data?.title,
    };
    updateModule(selectedItem._id, body);
    reset();
    closeModal();
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-4"
      >
        <div>
          <p>
            <span className="text-lg font-semibold">Title</span>
          </p>
          <input
            {...register("title", {
              maxLength: { value: 80, message: "Title Max Length 80" },
            })}
            type="text"
            className="input-box "
          />
        </div>
        {errors?.title?.message && (
          <p className="text-red-500">{errors?.title?.message}</p>
        )}

        <button className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default ModuleEdit;
