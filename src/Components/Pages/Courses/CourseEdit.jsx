import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  storeCategory,
  storeCourses,
  useUserAuth,
} from "../../../lib/api/store";
import { useImageController } from "../../Forms/Course Form/zustand";
import { cloud_front_url } from "../../../lib/data";
import Loading from "../../Loading";
import { useModal } from "../../Modal/zustand";

const CourseEdit = ({ selectedItem }) => {
  const [mode, setMode] = useState(1);
  const [search, setSearch] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [status, setStatus] = useState(null);
  const [selectedteachers, setSelectedTeachers] = useState(
    selectedItem?.instructors || []
  );
  const { getCategories, categories } = storeCategory();
  const { isLoading, teachersAndBloggers, getTeachersAndBloggers } =
    useUserAuth();
  const {
    isLoading: imageLoading,
    progress,
    imageUrl,
    uploadImage,
    removeImage,
  } = useImageController();
  useEffect(() => {
    if (categories?.length === 0) {
      getCategories();
    }
    if (teachersAndBloggers?.length === 0) {
      getTeachersAndBloggers();
    }
  }, [categories]);

  /// Modal Controller
  const { closeModal } = useModal();
  /// Course Controller
  const { updateCourse } = storeCourses();
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
  const {
    register: registerBasic,
    handleSubmit: handleSubmitBasic,
    reset: resetBasic,
  } = useForm();

  const onSubmitBasic = (data) => {
    if (data.title) {
      selectedItem.title = data.title;
    }
    if (data.price) {
      selectedItem.price = data.price;
    }
    if (data.category) {
      selectedItem.category = data.category;
    }
    if (data.description) {
      selectedItem.description = data.description;
    }
    updateCourse(selectedItem?._id, selectedItem);
    resetBasic();
    closeModal();
  };
  const onSubmitStatus = () => {
    if (status) {
      selectedItem.published = status;
    }
    updateCourse(selectedItem?._id, selectedItem);
    closeModal();
    setStatus(null);
  };

  const onSubmitImage = () => {
    if (imageUrl) {
      selectedItem.thumbnail = imageUrl;
    }
    updateCourse(selectedItem?._id, selectedItem);
    closeModal();
    useImageController.setState({ imageUrl: null });
  };
  const onSubmitInstructors = () => {
    if (selectedteachers) {
      const newArry = selectedteachers.map((item) => ({ _id: item._id }));
      selectedItem.instructors = newArry;
    }
    updateCourse(selectedItem?._id, selectedItem);
    closeModal();
    setSearch(null);
  };
  return (
    <>
      {/*  navigatior */}
      <div className="flex  justify-center items-center gap-3">
        <button
          onClick={() => setMode(1)}
          className={`btn btn-sm  animation ${
            mode === 1 ? "btn-accent" : "btn-neutral"
          }`}
        >
          Basic
        </button>
        <button
          onClick={() => setMode(2)}
          className={`btn btn-sm animation ${
            mode === 2 ? "btn-accent" : "btn-neutral"
          }`}
        >
          Status
        </button>
        <button
          onClick={() => setMode(3)}
          className={`btn btn-sm animation ${
            mode === 3 ? "btn-accent" : "btn-neutral"
          }`}
        >
          Img
        </button>
        <button
          onClick={() => setMode(4)}
          className={`btn btn-sm animation ${
            mode === 4 ? "btn-accent" : "btn-neutral"
          }`}
        >
          Teacher
        </button>
      </div>
      <AnimatePresence>
        {mode === 1 && (
          <motion.form
            initial={{ x: "-100vh", opacity: 0.25 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 100,
              duration: 0.5,
              delay: 0.25,
            }}
            onSubmit={handleSubmitBasic(onSubmitBasic)}
            className="flex flex-col items-center gap-3"
          >
            <div>
              <p>
                <span className="text-lg font-semibold">Title</span>
              </p>
              <input
                {...registerBasic("title", {
                  maxLength: { value: 80, message: "Title Max Length 80" },
                })}
                type="text"
                className="input-box "
              />
            </div>
            <div>
              <p>
                <span className="text-lg font-semibold">Category</span>
              </p>
              <select
                {...registerBasic("category")}
                className="select select-info w-[215px]"
              >
                {categories?.map((item, index) => (
                  <option key={index}>{item?.name}</option>
                ))}
              </select>
            </div>
            <div>
              <p>
                <span className="text-lg font-semibold">Price</span>
              </p>
              <input
                {...registerBasic("price")}
                type="number"
                inputMode="decimal"
                className="input-box "
              />
            </div>
            <div>
              <p>
                <span className="text-lg font-semibold">Description</span>
              </p>
              <textarea
                {...registerBasic("description")}
                className="p-2 outline-none border  border-secondary rounded-lg min-h-[75px]  w-[215px]  focus:neon-teal"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </motion.form>
        )}
        {mode === 2 && (
          <motion.section
            initial={{ x: "100vh", opacity: 0.25 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 100,
              duration: 0.5,
              delay: 0.25,
            }}
            className="flex flex-col gap-2 p-2 justify-center items-center"
          >
            <span className="text-lg font-semibold link">Visibility</span>
            <span className="text-lg font-semibold">
              Alreary Course
              <span className="text-emerald-600">
                {selectedItem?.published === true ? " Public" : " Hidden"}
              </span>
            </span>

            <select
              onClick={(e) => setStatus(e.target.value)}
              className="select select-primary w-full max-w-xs"
            >
              <option disabled selected>
                Select Status?
              </option>
              <option value={true}>Public</option>
              <option value={false}>Hide</option>
            </select>

            <button
              onClick={onSubmitStatus}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </motion.section>
        )}
        {mode === 3 && (
          <motion.section
            initial={{ y: "100vh", opacity: 0.25 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 100,
              duration: 0.5,
              delay: 0.25,
            }}
            className="flex flex-col gap-3 justify-center items-center p-3"
          >
            <div className="flex items-center justify-center w-60 ">
              <label
                for="dropzone-file"
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
                      <Loading />
                    )}
                  </div>
                ) : (
                  <div>
                    {imageUrl?.length > 1 ||
                    selectedItem?.thumbnail?.length > 1 ? (
                      <div className="w-full relative">
                        <img
                          src={`${cloud_front_url}/${
                            imageUrl || selectedItem?.thumbnail
                          }`}
                          className=" w-56 h-48 p-4"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0"
                          onClick={() => {
                            removeImage(imageUrl),
                              (selectedItem.thumbnail = "");
                          }}
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
            <button
              onClick={onSubmitImage}
              disabled={imageLoading || !imageUrl}
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </motion.section>
        )}
        {mode === 4 && (
          <motion.section
            initial={{ y: "-100vh", opacity: 0.25 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 100,
              duration: 0.5,
              delay: 0.25,
            }}
            className="flex flex-col gap-3 justify-center items-center"
          >
            <p className="text-center font-semibold text-lg">
              Select instructors
            </p>
            <div className="w-60 min-h-[116px] bg-base-200 flex flex-wrap justify-between items-center">
              {selectedteachers?.length > 0 &&
                selectedteachers?.map((item) => (
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
                        <p>{item?.name}</p>
                      </button>
                    ))}
                  </section>
                )}
              </div>
            )}
            <button onClick={onSubmitInstructors} className="btn btn-primary">
              Submit
            </button>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default CourseEdit;
