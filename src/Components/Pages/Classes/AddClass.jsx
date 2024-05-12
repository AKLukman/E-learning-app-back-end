import React from "react";
import { useForm } from "react-hook-form";
import { storeCourses } from "../../../lib/api/store";
import { useModal } from "../../Modal/zustand";
import Loading from "../../Loading";
import { useVideoController } from "../../Forms/Course Form/zustand";
import { cloud_front_url } from "../../../lib/data";

const AddClass = ({ modules }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { addClass } = storeCourses();
  const { isLoading, progress, videoUrl, uploadVideo, removeVideo } =
    useVideoController();
  const { closeModal } = useModal();
  const onSubmit = (data) => {
    const body = { title: data?.class, videoUrl: videoUrl };
    const moduleId = data?.module;
    addClass(moduleId, body);
    useVideoController.setState({ videoUrl: null });
    reset();
    closeModal();
  };
  return (
    <>
      <p className="text-center text-lg font-semibold link">Add Class</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 justify-center items-center"
      >
        <span>Class Name</span>
        <input
          {...register("class", {
            required: { value: true, message: "Class Name is required" },
          })}
          className="input-box"
        />
        {errors?.class && (
          <p className="text-error font-semibold">
            {errors?.milestone?.message}
          </p>
        )}
        <p className="text-xl font-semibold">Module </p>
        <select
          {...register("module", {
            required: { value: true, message: "Module  is required" },
          })}
          className="input-box"
        >
          <option disabled selected value="">
            Select Your Module
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
        <div className="flex items-center justify-center w-60 ">
          <label
            for="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {isLoading ? (
              <div>
                {progress ? (
                  <div
                    className="radial-progress"
                    style={{ "--value": progress }}
                  >
                    {progress}%
                  </div>
                ) : (
                  <Loading />
                )}
              </div>
            ) : (
              <div>
                {videoUrl?.length > 1 ? (
                  <div className="w-60 relative">
                    <video className="w-56 h-48" controls>
                      <source
                        type="video/mp4"
                        src={`${cloud_front_url}/${videoUrl}`}
                        className=" w-fit p-4"
                      />
                    </video>
                    <button
                      type="button"
                      className="absolute top-0 right-0"
                      onClick={() => removeVideo(videoUrl)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-white hover:text-red-500"
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
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400"></p>
                    </div>
                    <input
                      onChange={(e) => uploadVideo(e)}
                      id="dropzone-file"
                      type="file"
                      name="video"
                      className="hidden"
                    />
                  </div>
                )}
              </div>
            )}
          </label>
        </div>
        <button className="btn btn-primary"> Submit</button>
      </form>
    </>
  );
};

export default AddClass;
