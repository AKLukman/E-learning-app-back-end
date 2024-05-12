import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { useImageController } from "../Forms/Course Form/zustand";
import { useModal } from "../Modal/zustand";
import { useUserAuth } from "../../lib/api/store";
import { MutatingDots } from "react-loader-spinner";
import { cloud_front_url } from "../../lib/data";

const ProfileForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { closeModal } = useModal();
  const {
    isLoading: imageLoading,
    progress,
    imageUrl,
    uploadImage,
    removeImage,
  } = useImageController();
  const { isLoading: teacherAndBloggerLoading, addTeachersAndBlogger } =
    useUserAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    register,
    watch,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      about: "",
      password: "",
      presentAddress: {
        country: "",
        city: "",
        street: "",
      },
      permanentAddress: {
        country: "",
        city: "",
        street: "",
      },
    },
  });

  const onSubmit = async (data) => {
    const bodyData = { ...data, image: imageUrl };
    await addTeachersAndBlogger(bodyData);
    useImageController.setState({ imageUrl: null });
    closeModal();
  };

  const goNext = async () => {
    const isValidStep = await trigger(); // Validate the current step before proceeding
    if (isValidStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goBack = () => {
    setCurrentStep(currentStep - 1);
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await uploadImage(e); // Call the uploadImage function to handle image upload
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" overflow-auto">
      {currentStep === 1 && (
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-xl font-bold text-center">
            <span className="border-b-2 border-sky-400 ">Step 1:</span> Personal
            Information
          </h2>
          <div>
            <p>
              <span className="text-lg font-semibold">Name</span>
            </p>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input-box"
            />
          </div>
          {errors.name && (
            <span className="text-red-600">Name is required</span>
          )}
          <div className="">
            <p>
              <span className="text-lg font-semibold">Email</span>
            </p>

            <input
              type="email"
              {...register("email", {
                required: { value: true, message: "Email Required" },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              className="input-box"
            />
          </div>
          {errors.email && (
            <span className="text-red-600">{errors?.email?.message}</span>
          )}
          <div className="">
            <p>
              <span className="text-lg font-semibold">Phone</span>
            </p>
            <input
              type="number"
              {...register("phone", { required: true })}
              className="input-box"
            />
          </div>
          {errors.phone && (
            <span className="text-red-600">Phone is required</span>
          )}
          <div className="">
            <p>
              <span className="text-lg font-semibold">Role</span>
            </p>
            <select
              className="input-box"
              {...register("role", { required: true })}
            >
              <option value="blogger">Blogger</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          {errors.role && (
            <span className="text-red-600">Role is required</span>
          )}

          <button type="button" onClick={goNext} className="btn btn-primary">
            Next
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div className="flex flex-col justify-center items-center gap-4">
          <h2 className="text-xl font-bold ">Step 2: Image Upload</h2>
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
              ) : imageUrl ? (
                <div className="w-full relative flex justify-center">
                  <img
                    src={`${cloud_front_url}/${imageUrl}`}
                    className="w-[90%] h-48 "
                    loading="lazy"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0"
                    onClick={() => removeImage(imageUrl)}
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

          {/* about input */}
          <div>
            <p>
              <span className="text-lg font-semibold">About</span>
            </p>
            <input
              type="text"
              {...register("about", { required: true })}
              className="input-box"
            />
          </div>
          {errors.about && (
            <span className="text-red-600">About is required</span>
          )}
          <div className="relative">
            <p>
              <span className="text-lg font-semibold italic">Pass-word</span>
            </p>
            <input
              className="input-box"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is Required",
                },
                pattern: {
                  value:
                    /^(?![@#$%^&*])[A-Za-z0-9@#$%^&*]+(?=.*[A-Z])(?=.*[0-9])/,
                  message:
                    "Password must contain at least one letter, one digit, and be at least 8 characters long. ",
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
          {errors.password && (
            <span className="text-red-600 font-semibold">
              {errors.password.message}
            </span>
          )}
          <div className="flex gap-3">
            <button type="button" onClick={goBack} className="btn btn-error">
              Back
            </button>
            <button
              type="button"
              onClick={goNext}
              className="btn btn-primary"
              disabled={imageLoading || teacherAndBloggerLoading}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="flex flex-col justify-center items-center gap-3 overflow-y-auto">
          <h2 className="text-xl font-bold ">Step 3: Address Information</h2>

          <p>
            <span className="text-lg font-semibold text-white bg-primary p-3 rounded-xl">
              Present Address
            </span>
          </p>
          <div className="">
            <p>
              <span className="text-lg font-semibold">Country</span>
            </p>
            <input
              type="text"
              {...register("presentAddress.country", { required: true })}
              className="input-box"
            />
          </div>
          {errors.presentAddress?.country && (
            <span className="text-red-600">Country is required</span>
          )}
          <div className="">
            <p>
              <span className="text-lg font-semibold">City</span>
            </p>
            <input
              type="text"
              {...register("presentAddress.city", { required: true })}
              className="input-box"
            />
          </div>
          {errors.presentAddress?.city && (
            <span className="text-red-600">City is required</span>
          )}
          <div className="">
            <p>
              <span className="text-lg font-semibold">Street</span>
            </p>
            <input
              type="text"
              {...register("presentAddress.street", { required: true })}
              className="input-box"
            />
          </div>
          {errors.presentAddress?.street && (
            <span className="text-red-600">Street is required</span>
          )}

          {!isSameAddress && (
            <p>
              <span className="text-lg font-semibold text-white bg-secondary p-3 rounded-xl">
                Permanent Address
              </span>
            </p>
          )}
          {!isSameAddress && (
            <div>
              <div className="">
                <p>
                  <span className="text-lg font-semibold">Country</span>
                </p>
                <input
                  type="text"
                  {...register("permanentAddress.country", { required: true })}
                  className="input-box"
                />
              </div>
              {errors.permanentAddress?.country && (
                <span className="text-red-600">Country is required</span>
              )}
              <div className="">
                <p>
                  <span className="text-lg font-semibold">City</span>
                </p>
                <input
                  type="text"
                  {...register("permanentAddress.city", {
                    required: true,
                  })}
                  className="input-box"
                />
              </div>
              {errors?.permanentAddress?.city && (
                <span className="text-red-600">City is required</span>
              )}
              <div className="">
                <p>
                  <span className="text-lg font-semibold">Street</span>
                </p>

                <input
                  type="text"
                  {...register("permanentAddress.street", { required: true })}
                  className="input-box"
                />
              </div>
              {errors.permanentAddress?.street && (
                <span className="text-red-600">Street is required</span>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              setValue("permanentAddress", watch("presentAddress"));
              setIsSameAddress(!isSameAddress); // Set the state to true when addresses are same
            }}
            className={`btn  ${!isSameAddress ? "btn-info" : "btn-warning"}`}
          >
            {!isSameAddress
              ? "Set Present Address as Permanent Address "
              : "Use Different Permanent Address"}
          </button>

          <div className="flex gap-3">
            <button type="button" onClick={goBack} className="btn btn-error">
              Back
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={`btn btn-primary ${
                !isValid && "opacity-50 cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default ProfileForm;
