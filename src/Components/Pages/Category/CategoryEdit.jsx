import React from "react";
import { storeCategory } from "../../../lib/api/store";
import { useModal } from "../../Modal/zustand";
import { useForm } from "react-hook-form";

const CategoryEdit = ({ category }) => {
  console.log(
    "🚀 ~ file: CategoryEdit.jsx:7 ~ CategoryEdit ~ category:",
    category
  );
  const { updateCategory } = storeCategory();
  const { closeModal } = useModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const body = {
      name: data?.category,
    };
    updateCategory(category?._id, body);
    reset();
    closeModal();
  };
  return (
    <>
      <p className="text-center text-lg font-semibold link">Edit Category</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 justify-center items-center"
      >
        <span>Category Name</span>
        <input
          {...register("category", {
            required: { value: true, message: "Category Name is required" },
          })}
          className="input-box"
        />
        {errors?.category && (
          <p className="text-error font-semibold">
            {errors?.category?.message}
          </p>
        )}
        <button className="btn btn-primary"> Submit</button>
      </form>
    </>
  );
};

export default CategoryEdit;
