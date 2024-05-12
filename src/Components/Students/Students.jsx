import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../lib/api/axiosInstance";
import { ContextApi } from "../../Context/ContextApi";
import { cloud_front_url } from "../../lib/data";
import { useModal } from "../Modal/zustand";
import FeedBack from "./FeedBack";
import Modal from "../Modal/Modal";

const Students = () => {
  const { user } = useContext(ContextApi);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [courses, setCourses] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [leaderboard, setLeaderBoard] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isFetchDone, setIsFetchDone] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/teachers/${user?.uid}`);
        setCourses(res.data);
        setIsFetchDone(true);
        setSelectedCourse(res?.data[0]?._id);
      } catch (error) {
        console.log(error);
      }
    };
    if (user?.uid) {
      fetchData();
    }
  }, []);
  useEffect(() => {
    const fetchLeaderBoard = async () => {
      try {
        const res = await axiosInstance.get(`/leaderboard/${selectedCourse}`);
        setLeaderBoard(res.data);
      } catch (error) {
        console.error(error);
        // Handle the error as needed
      }
    };
    if (courses?.length > 0) {
      fetchLeaderBoard();
    }
  }, [isFetchDone, selectedCourse]);
  return (
    <main>
      <section className="p-4 lg:p-12">
        <p className="text-xl text-center font-semibold link my-4">
          LeaderBoard
        </p>

        <div className="flex justify-end mx-3">
          <select
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
            }}
            className="select select-bordered w-full max-w-xs"
          >
            <option value="" disabled>
              Select a course
            </option>
            {courses?.map((course, index) => (
              <option value={course?._id} key={index}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Name</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard?.map((person, index) => (
                <tr
                  key={index}
                  className={`${
                    person?.user?._id === user?.uid && "bg-sky-400"
                  }`}
                >
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={person.user?.image ? `${cloud_front_url}/${person.user.image}` : "https://cdn-icons-png.flaticon.com/512/266/266033.png"}
                          alt={person?.user?.name}
                        />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{person?.user?.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="flex gap-3">
                    <p className="font-mulish ">{person?.totalPoints}</p>
                    <button
                      onClick={() => {
                        openModal(), setSelectedId(person?.user?._id);
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
                          d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          onClose={() => {
            closeModal(), setSelectedId(null);
          }}
        >
          <FeedBack studentId={selectedId} selectedCourse={selectedCourse} />
        </Modal>
      )}
    </main>
  );
};

export default Students;
