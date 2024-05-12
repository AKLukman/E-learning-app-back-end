import React from "react";
import { useForm } from "react-hook-form";
import { useImageController } from "../../Forms/Course Form/zustand";
import { useModal } from "../../Modal/zustand";
import {
  storeCategory,
  storeCourses,
  useUserAuth,
} from "../../../lib/api/store";
import { useEffect } from "react";
import { cloud_front_url } from "../../../lib/data";
import Loading from "../../Loading";
import { useState } from "react";

const AddCourse = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [search, setSearch] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [selectedteachers, setSelectedTeachers] = useState([]);

  /// Get category
  const { getCategories, categories } = storeCategory();

  /// Image Controller
  const {
    isLoading: imageLoading,
    progress,
    imageUrl,
    uploadImage,
    removeImage,
  } = useImageController();

  /// Authentication Controller
  const { isLoading, teachersAndBloggers, getTeachersAndBloggers } =
    useUserAuth();
  /// Modal Controller
  const { closeModal } = useModal();
  /// Course Controller
  const { addCourse } = storeCourses();

  // UseEffect for category
  useEffect(() => {
    if (categories?.length === 0) {
      getCategories();
    }
    if (teachersAndBloggers?.length === 0) {
      getTeachersAndBloggers();
    }
  }, []);

  ///useEffect  for search
  useEffect(() => {
    if (teachersAndBloggers.length !== 0) {
      const teachers = teachersAndBloggers.filter(
        (teachersAndBlogger) =>
          teachersAndBlogger.role === "teacher" || "Teacher"
      );

      if (search?.length > 0) {
        const matchingData = teachers.filter(
          (teacher) =>
            teacher?.name.toLowerCase().includes(search.toLowerCase()) &&
            !selectedteachers.find(
              (selectedTeacher) => selectedTeacher._id === teacher._id
            )
        );

        setSearchData(matchingData);
      } else {
        setSearchData(null);
      }
    }
  }, [search]);

  /// react hook form
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: "",
      published: null,
    },
  });
  // form step next
  const goNext = async () => {
    const isValidStep = await trigger();
    if (isValidStep) {
      setCurrentStep(currentStep + 1);
    }
  };
  // form step back
  const goBack = () => {
    setCurrentStep(currentStep - 1);
  };
  /// form submit
  const onSubmit = (data) => {
    // teachers array distructuring

    const newArry = selectedteachers.map((item) => ({ _id: item._id }));
    const body = {
      title: data?.title,
      description: data?.description,
      category: data?.category,
      price: data?.price,
      published: data?.published,
      thumbnail: imageUrl,
      instructors: newArry,
    };
    console.log(body);
    addCourse(body);
    reset();
    useImageController.setState({ imageUrl: null });
    closeModal();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        {currentStep === 1 && (
          <section className="flex flex-col items-center gap-3">
            <div>
              <p>
                <span className="text-lg font-semibold">Title</span>
              </p>
              <input
                {...register("title", {
                  required: "Title is Required",
                  maxLength: { value: 80, message: "Title Max Length 80" },
                })}
                type="text"
                className="input-box "
              />
              {errors?.title?.message && (
                <p className="error-message ">{errors?.title?.message}</p>
              )}
            </div>
            <div>
              <p>
                <span className="text-lg font-semibold">Category</span>
              </p>
              <select
                {...register("category", { required: "Category is Required" })}
                className="select select-info w-[215px]"
              >
                {categories?.map((item, index) => (
                  <option key={index}>{item?.name}</option>
                ))}
              </select>
              {errors?.category?.message && (
                <p className="error-message">{errors?.category?.message}</p>
              )}
            </div>
            <div>
              <p>
                <span className="text-lg font-semibold">Price</span>
              </p>
              <input
                {...register("price", { required: "Price is Required" })}
                type="number"
                inputMode="decimal"
                className="input-box "
              />
              {errors?.price?.message && (
                <p className="error-message">{errors?.price?.message}</p>
              )}
            </div>
            <button type="button" onClick={goNext} className="btn btn-accent">
              Next
            </button>
          </section>
        )}

        {currentStep === 2 && (
          <section className="flex flex-col items-center gap-3">
            <div>
              <p>
                <span className="text-lg font-semibold">Description</span>
              </p>
              <textarea
                {...register("description", {
                  required: "Description is Required",
                })}
                className="p-2 outline-none border  border-secondary rounded-lg min-h-[75px]  w-[215px]  focus:neon-teal"
              />
              {errors?.description?.message && (
                <p className="error-message">{errors?.description?.message}</p>
              )}
            </div>
            <div>
              <span className="text-lg font-semibold">Published:</span>
              <div className="flex">
                <label className="label cursor-pointer">
                  <span className="label-text">Hide</span>

                  <input
                    {...register("published", { required: true })}
                    type="radio"
                    className="radio checked:bg-red-500"
                    value={false}
                  />
                </label>
                <label className="label cursor-pointer">
                  <span className="label-text">Public</span>

                  <input
                    {...register("published", { required: true })}
                    type="radio"
                    className="radio checked:bg-green-500"
                    value={true}
                  />
                </label>
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={goBack}
                className="btn btn-primary"
              >
                Back
              </button>
              <button type="button" onClick={goNext} className="btn btn-accent">
                Next
              </button>
            </div>
          </section>
        )}
        {/* image dropzone */}
        {currentStep === 3 && (
          <section className="flex flex-col gap-3">
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
                    {imageUrl?.length > 1 ? (
                      <div className="w-full relative">
                        <img
                          src={`${cloud_front_url}/${imageUrl}`}
                          className=" w-56 h-48 p-4"
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
                            className="w-6 h-6 hover:error-message"
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
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          onChange={(e) => uploadImage(e)}
                          id="dropzone-file"
                          type="file"
                          name="image"
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                )}
              </label>
            </div>
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={goBack}
                className="btn btn-primary"
              >
                Back
              </button>
              <button
                disabled={!imageUrl || imageLoading}
                type="button"
                onClick={goNext}
                className="btn btn-accent"
              >
                Next
              </button>
            </div>
          </section>
        )}

        {currentStep === 4 && (
          <section>
            <p className="text-center font-semibold text-lg">
              Select instructors
            </p>
            <div className="w-60 min-h-[116px] bg-base-200 flex flex-wrap justify-between items-center">
              {selectedteachers.length > 0 &&
                selectedteachers.map((item) => (
                  <button
                    onClick={() =>
                      setSelectedTeachers((prevTeachers) =>
                        prevTeachers.filter(
                          (teacher) => teacher?._id !== item?._id
                        )
                      )
                    }
                    data-tip={item.name}
                    className="tooltip w-fit flex flex-wrap items-center btn btn-sm border border-red-500"
                  >
                    <p key={item.name}>{item.name.slice(0, 7)}</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                ))}
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-box"
            />
            {search && (
              <div className="w-[215px] h-auto overflow-auto">
                {searchData?.length <= 0 ? (
                  <section>
                    <p>No Teachers Found</p>
                  </section>
                ) : (
                  <section>
                    {searchData?.slice(0, 10).map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedTeachers((prevTeachers) => [
                            ...prevTeachers,
                            item,
                          ]);
                          setSearch(null);
                        }}
                        className="flex justify-center items-center cursor-pointer w-[215px] h-[48px] border"
                      >
                        <img
                          src={`${cloud_front_url}/${item?.image}`}
                          alt={item?.title}
                          className="rounded-lg  w-[35px] h-[35px] border border-gray-900 object-cover mr-3"
                        />
                        <p>{item.name}</p>
                      </button>
                    ))}
                  </section>
                )}
              </div>
            )}
            <div className="flex justify-center items-center">
              <button
                type="button"
                onClick={goBack}
                className="btn btn-primary"
              >
                Back
              </button>

              <button
                type="submit"
                className="btn btn-accent hover:btn-secondary animation m-3"
              >
                Submit
              </button>
            </div>
          </section>
        )}
      </form>
    </>
  );
};

export default AddCourse;
