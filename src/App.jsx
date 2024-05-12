import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ContextProvider from "./Context/ContextApi";
import Navbar from "./Components/Header/Navbar";
import Dashboard from "./Components/Dashboard.jsx/Dashboard";
import Authentication from "./Components/Authentication Teachers and Blogers/Authentication";
import Course from "./Components/Pages/Courses/Course";
import Category from "./Components/Pages/Category/Category";
import Milestone from "./Components/Pages/Milestones/Milestone";
import Module from "./Components/Pages/Modules/Module";
import Classes from "./Components/Pages/Classes/Classes";
import Quiz from "./Components/Pages/Quiz/Quiz";
import Navigation from "./Components/Faq and blogs/Navigation";
import ChatGpt from "./Components/Pages/Quiz/ChatGpt";
import Forbidden from "./Components/Pages/Error/Forbidden";
import SignIn from "./Firebase/SignIn";
import Students from "./Components/Students/Students";
import PrivateRoute from "./Firebase/PrivateRoute"; // Your PrivateRoute component

function App() {
  return (
    <Router>
      <ContextProvider>
        <Navbar />
        <Routes>

          <Route path="/signin" element={<SignIn />} />
          <Route path="/forbidden" element={<Forbidden />} />

          <Route path="/" element={
            <PrivateRoute element={<Dashboard />} allowedRoles={['admin', 'teacher']} />
          } />

          <Route path="/authentication" element={
            <PrivateRoute element={<Authentication />} allowedRoles={['admin', 'teacher']} />
          } />

          <Route path="/course" element={
            <PrivateRoute element={<Course />} allowedRoles={['admin', 'teacher']} />
          } />

          <Route path="/category" element={
             <PrivateRoute element={<Category />} allowedRoles={['admin', 'teacher']} />
          } />

          <Route path="/milestone" element={
             <PrivateRoute element={<Milestone />} allowedRoles={['admin', 'teacher']} />
          } />

          <Route path="/module" element={
             <PrivateRoute element={<Module />} allowedRoles={['admin', 'teacher']} />
          } />

          <Route path="/class" element={
            <PrivateRoute element={<Classes />} allowedRoles={['admin', 'teacher']} />
          } />

          <Route path="/students" element={
            <PrivateRoute element={<Students />} allowedRoles={['admin', 'teacher']} />
          } />

          <Route path="/quiz" element={
            <PrivateRoute element={<Quiz />} allowedRoles={['admin', 'teacher']}/>
          } />

          <Route path="/blogs-&-faq" element={
             <PrivateRoute element={<Navigation/>} allowedRoles={['admin', 'blogger', 'teacher']}/>
          } />

          <Route path="/ai-quiz" element={
             <PrivateRoute element={<ChatGpt />} allowedRoles={['admin', 'teacher']}/>
          } />

        </Routes>
      </ContextProvider>
    </Router>
  );
}

export default App;
