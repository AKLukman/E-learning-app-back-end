import React, { useState } from "react";
import robot_image from "../../../assets/robot.png";
import { axiosInstance } from "../../../lib/api/axiosInstance";
import { Comment } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { storeCourses } from "../../../lib/api/store";
const ChatGpt = () => {
  const {
    isLoading: ModuleLoading,
    modules,
    getModules,
    addQuiz,
  } = storeCourses();
  useEffect(() => {
    if (modules?.length === 0) {
      getModules();
    }
  }, []);
  const [responseData, setResponseData] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  console.log("quizzes:", quizzes);
  const [selectedQuiz, setSelelectedQuiz] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    const organizedQuizzes = [];
    if (responseData?.length === 30) {
      for (let i = 0; i < responseData.length; i += 6) {
        const question = responseData[i];
        const optionFind = responseData.slice(i + 1, i + 5);
        let options = [];
        for (let j = 0; j < optionFind?.length; j++) {
          options = [...options, { option: optionFind[j] }]; // Fix the assignment here
        }

        const correctOptions = responseData[i + 5].split("Answer: ")[1];

        const quiz = {
          question,
          options,
          correctOptions,
        };

        organizedQuizzes.push(quiz);
      }
      setQuizzes(organizedQuizzes);
    } else {
      toast.error("Try again", { duration: 1200, position: "top-center" });
    }
  }, [responseData]);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const handleChatGptRequest = async (data) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/ai", { passage: data?.prompt });
      const filteredData = res.data?.questions.filter(
        (item) => item.trim() !== ""
      );
      setResponseData(filteredData);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsLoading(false);
      reset();
    }
  };
  const handleSelection = (quiz, opi) => {
    // Check if the quiz is already selected
    const quizIndex = selectedQuiz.indexOf(quiz);

    if (quizIndex === -1) {
      quiz.correctOptions = [opi];
      const updatedSelection = [...selectedQuiz, quiz];
      setSelelectedQuiz(updatedSelection);
    } else {
      const updatedSelection = selectedQuiz.filter(
        (selected) => selected !== quiz
      );
      setSelelectedQuiz(updatedSelection);
    }
  };
  const addMultipleQuizzes = (moduleId) => {
    selectedQuiz.forEach((data) => {
      const body = {
        question: data.question,
        options: data.options,
        correctOptions: data.correctOptions,
      };

      if (data.answer !== false) {
        addQuiz(moduleId, body);
      }
    });
  };
  return (
    <>
      <section className="relative">
        <div className="flex flex-col justify-start items-center gap-4 p-4 lg:p-10 mb-20">
          {quizzes.map((quiz, qI) => (
            <div
              key={qI}
              className="border border-gray-500 rounded-lg h-auto w-80 p-3"
            >
              <div className="flex justify-between gap-2">
                <p className="text-lg font-semibold">{quiz.question}</p>{" "}
                <input
                  checked={selectedQuiz.includes(quiz)}
                  type="checkbox"
                  className="checkbox "
                />
              </div>

              <div className="flex flex-col">
                <p className=" font-semibold">Options</p>
                {quiz.options.map((option, opI) => (
                  <label key={opI}>
                    <input
                      type="radio"
                      name={`quiz-${qI}`}
                      value={opI}
                      onChange={() => handleSelection(quiz, opI)}
                    />
                    {option.option}
                  </label>
                ))}
              </div>
              <p className="text-lg font-semibold">
                Answer:{quiz.correctOptions}
              </p>
            </div>
          ))}
          {selectedQuiz.length > 1 && (
            <select
              className="select select-secondary w-full max-w-xs"
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
            >
              <option value="" disabled>
                Select a Module
              </option>
              {selectedModule && <option value="">All Modules</option>}
              {modules.map((moduleI) => (
                <option key={moduleI._id} value={moduleI._id}>
                  {moduleI?.title}
                </option>
              ))}
            </select>
          )}
          {selectedModule && (
            <button
              onClick={() => addMultipleQuizzes(selectedModule)}
              className="btn btn-accent"
            >
              Submit
            </button>
          )}
        </div>

        <section className="fixed bottom-0 left-0 w-full px-4 lg:px-10">
          <div className="flex flex-col items-center bg-white p-4">
            {isLoading === true && (
              <Comment
                visible={true}
                height="80"
                width="80"
                ariaLabel="comment-loading"
                wrapperStyle={{}}
                wrapperClass="comment-wrapper"
                color="#fff"
                backgroundColor="#F4442E"
              />
            )}

            <form
              onSubmit={handleSubmit(handleChatGptRequest)}
              className="flex gap-2 items-center justify-between lg:justify-center w-full"
            >
              <input
                {...register("prompt", {
                  required: { value: true, message: "Prompt is Required" },
                })}
                className="w-8/12 input border-black rounded-lg"
              />
              <button
                type="submit"
                className="btn btn-neutral btn-sm lg:btn-md hover:btn-success"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
            {errors.prompt && (
              <p className="text-red-600 font-semibold">
                {errors?.prompt?.message}
              </p>
            )}
          </div>
        </section>
      </section>
    </>
  );
};

export default ChatGpt;
