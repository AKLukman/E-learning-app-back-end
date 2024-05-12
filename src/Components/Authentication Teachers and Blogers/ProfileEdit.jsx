import React, { useState } from "react";
import { useUserAuth } from "../../lib/api/store";
import { useModal } from "../Modal/zustand";
import { useImageController } from "../Forms/Course Form/zustand";
import { useForm } from "react-hook-form";
import { MutatingDots } from "react-loader-spinner";
import { cloud_front_url } from "../../lib/data";

const ProfileEdit = ({ selectedItem }) => {
  const [mode, setMode] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const { updateTeachersAndBlogger, updatePassword } = useUserAuth();
  const { closeModal } = useModal();
  const [image, setImage] = useState(selectedItem?.image);
  const {
    isLoading: imageLoading,
    progress,
    imageUrl,
    uploadImage,
    removeImage,
  } = useImageController();
  const {
    register: registerInfo,
    handleSubmit: handleSubmitInfo,
    reset: resetInfo,
    formState: { errors: errorsInfo },
  } = useForm();

  const {
    register: registerPass,
    handleSubmit: handleSubmitPass,
    reset: resetPass,
    formState: { errors: errorsPass },
  } = useForm();

  const onSubmitInfo = (data) => {
    const id = selectedItem?._id;
    const { studentId, name, email, phone, role, address, about } =
      selectedItem;
    const body = {
      studentId,
      name: data?.name || name,
      email,
      phone: data?.phone || phone,
      role: data?.role || role,
      address,
      about,
      image: imageUrl ?? image,
    };

    updateTeachersAndBlogger(id, body);
    closeModal();
  };

  const onSubmitPass = (data) => {
    const id = selectedItem?._id;
    updatePassword(id, data);
    closeModal();
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await uploadImage(e); // Call the uploadImage function to handle image upload
    }
  };
  const handleSwitchMode = (mode) => {
    setMode(mode);
    // Reset the form data of the other mode when switching
    if (mode === 1) {
      resetPass();
    } else if (mode === 2) {
      resetInfo();
    }
  };
  return (
    <>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => handleSwitchMode(1)}
          className={`btn  btn-xs ${mode === 1 && "btn-success"}`}
        >
          Info
        </button>
        <button
          onClick={() => handleSwitchMode(2)}
          className={`btn  btn-xs ${mode === 2 && "btn-error"} `}
        >
          Pass
        </button>
      </div>
      {mode === 1 ? (
        <form
          onSubmit={handleSubmitInfo(onSubmitInfo)}
          className="flex flex-col justify-center items-center gap-4"
        >
          <div>
            <p>
              <span className="text-lg font-semibold">Name</span>
            </p>
            <input
              {...registerInfo("name", {
                maxLength: { value: 80, message: "Title Max Length 80" },
              })}
              type="text"
              className="input-box "
            />
          </div>
          {errorsInfo?.name?.message && (
            <p className="text-red-500">{errorsInfo?.name?.message}</p>
          )}
          <div>
            <p>
              <span className="text-lg font-semibold">Email</span>
            </p>
            <input
              disabled
              defaultValue={selectedItem?.email}
              type="email"
              className="input-box "
            />
          </div>

          <div>
            <p>
              <span className="text-lg font-semibold">Phone</span>
            </p>
            <input
              {...registerInfo("phone")}
              type="number"
              className="input-box "
            />
          </div>
          {errorsInfo?.phone?.message && (
            <p className="text-red-500">{errorsInfo?.phone?.message}</p>
          )}
          <div className="flex items-center justify-center w-60">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {imageLoading ? (
                <div>
                  {progress ? (
                    <div
                      className="radial-progress"
                      style={{ "--value": progress }}
                    >
                      {progress}%
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-60">
                      <MutatingDots
                        height="100"
                        width="100"
                        color="#4fa94d"
                        secondaryColor="#1abdd6"
                        radius="12.5"
                        ariaLabel="mutating-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    </div>
                  )}
                </div>
              ) : imageUrl || image ? (
                <div className="w-full h-48 relative">
                  <img
                    src={`${cloud_front_url}/${imageUrl || image}`}
                    className="w-full h-48 p-4"
                    loading="lazy"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0"
                    onClick={() => {
                      removeImage(imageUrl || image), setImage("");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 hover:text-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG
                    </p>
                  </div>
                  <input
                    onChange={(e) => handleImageChange(e)}
                    id="dropzone-file"
                    type="file"
                    name="image"
                    className="hidden"
                  />
                </div>
              )}
            </label>
          </div>
          <div>
            <p>
              <span className="text-lg font-semibold">Role</span>
            </p>
            <select
              {...registerInfo("role")}
              className=" w-[225px] select select-bordered"
            >
              <option value={"teacher"}>Teacher</option>
              <option value={"blogger"}>Blogger</option>
            </select>
          </div>
          {errorsInfo?.role?.message && (
            <p className="text-red-500">{errorsInfo?.role?.message}</p>
          )}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmitPass(onSubmitPass)}
          className="flex flex-col justify-center items-center gap-4"
        >
          <div className="relative">
            <p>
              <span className="text-lg font-semibold italic">Pass-word</span>
            </p>
            <input
              className="input-box"
              type={showPassword ? "text" : "password"}
              {...registerPass("newPassword", {
                required: {
                  value: true,
                  message: "Password is Required",
                },
                pattern: {
                  value:
                    /^(?![@#$%^&*])[A-Za-z0-9@#$%^&*]+(?=.*[A-Z])(?=.*[0-9])/,
                  message:
                    "Password must contain at least one letter, one digit, and be at least 8 characters long. It should not contain $, /, &, or #.",
                },
              })}
            />

            <button
              type="button"
              className="absolute top-1/2 right-3 "
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
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
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
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
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>
          </div>
          {errorsPass.newPassword && (
            <span className="text-red-600 font-semibold">
              {errorsPass.newPassword.message}
            </span>
          )}
          <button type="submit" className="btn  btn-primary ">
            Submit{" "}
          </button>
        </form>
      )}
    </>
  );
};

export default ProfileEdit;
