import React, { useEffect, useState } from "react";
import { useModal } from "../Modal/zustand";
import { storeCourses } from "../../lib/api/store";
import Loading from "../Loading";
import { AnimatePresence } from "framer-motion";
import Modal from "../Modal/Modal";
import EditFaq from "../Pages/Faq/EditFaq";
import ReomveFaq from "../Pages/Faq/ReomveFaq";
import AddFaq from "../Pages/Faq/AddFaq";
import Marquee from "react-fast-marquee";

const Faq = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [mode, setMode] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseId, setCourseId] = useState(null);
  const { courses, isLoading: courseLoading, getCourses } = storeCourses();

  useEffect(() => {
    if (courses?.length === 0) {
      getCourses();
    }
  }, []);

  if (courseLoading) {
    return <Loading />;
  }

  const selectedCourseMilestones =
    (selectedCourse && [
      courses?.find((course) => course._id === selectedCourse),
    ]) ||
    courses;
  return (
    <>
      {courses?.length > 0 && (
        <div className="flex justify-end px-4 py-4">
          <select
            className="select select-secondary w-full max-w-xs"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="" disabled>
              Select a course
            </option>
            {selectedCourse && <option value="">All Course</option>}
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedCourseMilestones && (
        <section>
          {selectedCourseMilestones?.map((course) => (
            <div
              className="flex flex-wrap justify-center lg:justify-start gap-4 m-3"
              key={course._id}
            >
              {course?.faq?.map((faqI) => (
                <div key={faqI._id}>
                  <div
                    tabIndex={0}
                    className="collapse w-80 collapse-arrow border border-base-300 bg-base-200"
                  >
                    <div className="collapse-title flex justify-between">
                      <Marquee
                        speed={20}
                        pauseOnHover
                        className="w-3/5 text-xl font-medium"
                      >
                        {faqI?.question}
                      </Marquee>
                      <button
                        onClick={() => {
                          setMode(2),
                            openModal(),
                            setCourseId(course?._id),
                            setSelectedItem(faqI?._id);
                        }}
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
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>

                    <div tabIndex={0} className="collapse-content">
                      <div className=" flex flex-col"></div>
                      <p className="flex">
                        <span className="text-lg font-semibold flex gap-2 items-center">
                          Answer :{faqI?.answer}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>
      )}

      {/* add  button */}
      <div
        className="fixed  bottom-6 right-6"
        onClick={() => {
          setMode(3), openModal();
        }}
      >
        <button className="btn">
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
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <Modal
            isModalOpen={isModalOpen}
            onClose={() => {
              setMode(null),
                setSelectedItem(null),
                closeModal(),
                setCourseId(null);
            }}
          >
            {(() => {
              switch (mode) {
                case 1:
                  return <EditFaq selectedItem={selectedItem} />;
                case 2:
                  return (
                    <ReomveFaq
                      selectedItem={selectedItem}
                      courseId={courseId}
                    />
                  );
                case 3:
                  return <AddFaq courses={courses} />;
                default:
                  return null;
              }
            })()}
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Faq;
