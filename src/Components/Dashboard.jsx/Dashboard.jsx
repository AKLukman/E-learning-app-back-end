import React, { useEffect, useState } from "react";
import { useCounter } from "../../lib/api/store";
import Loading from "../Loading";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import AnimatedCountUp from "./AnimatedCountUp";
import { axiosInstance } from "../../lib/api/axiosInstance";
import { cloud_front_url } from "../../lib/data";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const {
    isLoading,
    counter,
    getCounter,
    totalCoursesDeatils,
    getAllCoursesDetails,
  } = useCounter();
  const titles = counter?.enrollmentStudent?.map((course) => course?.title);
  const [feedBacks, setFeedbacks] = useState(null);
  console.log(
    "🚀 ~ file: Dashboard.jsx:22 ~ Dashboard ~ feedBacks:",
    feedBacks
  );

  const enrolledStudents = counter?.enrollmentStudent?.map(
    (course) => course.enrolledCount
  );

  useEffect(() => {
    if (counter?.length === 0) {
      getCounter();
    }
    if (totalCoursesDeatils?.length === 0) {
      getAllCoursesDetails();
    }
    const fetchfeedbacks = async () => {
      try {
        const res = await axiosInstance.get(`/feedback`);
        setFeedbacks(res.data);
      } catch (error) {
        console.log(
          "🚀 ~ file: Dashboard.jsx:37 ~ fetchfeedbacks ~ error:",
          error
        );
      }
    };
    fetchfeedbacks();
  }, []);
  if (isLoading) {
    return <Loading />;
  }

  const data = {
    labels: titles,
    datasets: [
      {
        label: "Enrolled Student",
        data: enrolledStudents,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 2.5,
      },
    ],
  };
  return (
    <main className="flex flex-col place-content-between items-center md:items-start  w-full px-10 lg:px-32">
      <section className="flex  md:flex-wrap lg:flex-row  flex-col gap-7 items-center lg:items-end justify-center w-full h-fit">
        <div className="">
          <p className="text-2xl font-serif font-semibold text-center my-7">
            Enrolled Course Students
          </p>

          {data?.labels?.length > 0 && data?.datasets?.length > 0 && (
            <div className="w-[300px]  h-[300px] md:w-[600px] md:h-[600px] lg:w-[420px] lg:h-[420px]">
              <Pie data={data} />
            </div>
          )}
        </div>
        <div className="h-[250px] md:w-[700px] border-2 border-cyan-300 rounded-xl p-3 lg:mb-7">
          <p className="text-2xl font-serif font-semibold text-center ">
            Total User
          </p>
          <div className="flex justify-between gap-5">
            {counter?.totalUser?.map((user, i) => (
              <AnimatedCountUp
                key={i}
                endValue={user?.count}
                title={user?._id}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="w-full">
        <p className="text-5xl font-serif font-semibold text-center my-6">
          Course Content
        </p>
        <div className="flex flex-wrap justify-between items-center">
          <AnimatedCountUp
            endValue={totalCoursesDeatils?.totalCourses}
            title={"course"}
          />
          <AnimatedCountUp
            endValue={totalCoursesDeatils?.totalMilestones}
            title={"Milestones"}
          />
          <AnimatedCountUp
            endValue={totalCoursesDeatils?.totalModules}
            title={"Modules"}
          />
          <AnimatedCountUp
            endValue={totalCoursesDeatils?.totalClasses}
            title={"Classes"}
          />
          <AnimatedCountUp
            endValue={totalCoursesDeatils?.totalQuizes}
            title={"Quizes"}
          />
        </div>
      </section>
      <section className="w-full">
        <p className="text-2xl font-serif font-semibold text-center my-7 ">
          Students FeedBack
        </p>
        <div className="flex flex-wrap justify-center lg:justify-start gap-5">
          {feedBacks && feedBacks.length > 0 ? (
            feedBacks.map((feedback, i) => (
              <div
                key={i}
                className="border border-gray-500 rounded-xl h-56 w-72 max-h-96 max-w-96 px-8 py-4 flex flex-col gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-14 mask mask-squircle">
                      <img
                        src={`${cloud_front_url}/${
                          feedback?.user?.image ||
                          "images/1691843036253-avatar.png"
                        }`}
                      />
                    </div>
                  </div>
                  <p>
                    {" "}
                    &#32;
                    {feedback?.user?.name}
                  </p>
                </div>
                <p className="text-lg font-mulish ">
                  <span className="text-violet-700">FeedBack</span> &#x3A;
                  {feedback?.feedBack}
                </p>
              </div>
            ))
          ) : (
            <p>No feedback available</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
