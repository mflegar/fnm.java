import "./init.tsx";

import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";
import InstitutionForm from "./InstitutionForm.tsx";
import ProjectForm from "./ProjectForm.tsx";
import { UserProvider } from "./useUser"; // Importing the UserProvider
import Page from "./app/dashboard/InstitutionPage.tsx";
import Logout from "./Logout.tsx";
import JoinProject from "./JoinProject.tsx";
import ProjectPage from "./app/dashboard/ProjectPage.tsx";
import AddExpense from "./AddExpense.tsx";
import { ProjectRequest } from "./ProjectRequest.tsx";
import { UserRequest } from "./UserRequest.tsx";
import AddTask from "./AddTask.tsx";
import JoinInstitution from "./JoinInstitution.tsx";
import DashboardPage from "./app/dashboard/DashboardPage.tsx";
import AuthRedirect from "./auth-redirect.tsx";

const App = () => {
  return (
    <BrowserRouter>
      {" "}
      {/* Wrap the Router around the entire app */}
      <UserProvider>
        {" "}
        {/* Wrap the UserProvider inside the Router */}
        <Routes>
          {/* Starting page */}
          <Route path="/" element={<Home />} />
          <Route path="/auth-redirect" element={<AuthRedirect />} /> {/* Used to save token and user in LocalStorage */}

          {/* Protected routes (need to be signed in to GitHub) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <h2>
                  <DashboardPage />
                </h2>
              </ProtectedRoute>
            }
          />
          <Route
            path="/institution/:name"
            element={
              <ProtectedRoute>
                <h2>
                  <Page />
                </h2>
              </ProtectedRoute>
            }
          />
          <Route
            path="/institution/:name/:projectName"
            element={
              <ProtectedRoute>
                <h2>
                  <ProjectPage />
                </h2>
              </ProtectedRoute>
            }
          />
          <Route
            path="/institution/new"
            element={
              <ProtectedRoute>
                <h2>
                  <InstitutionForm />
                </h2>
              </ProtectedRoute>
            }
          />
          <Route
            path="/pp/new"
            element={
              <ProtectedRoute>
                <h2>
                  <ProjectForm />
                </h2>
              </ProtectedRoute>
            }
          />
          <Route
            path="/pp/join"
            element={
              <ProtectedRoute>
                <h2>
                  <JoinProject />
                </h2>
              </ProtectedRoute>
            }
          />
          <Route
            path="/institution/join"
            element={
              <ProtectedRoute>
                <h2>
                  <JoinInstitution />
                </h2>
              </ProtectedRoute>
            }
          />
          <Route
            path="/expense/add"
            element={
              <ProtectedRoute>
                <h2>
                  <AddExpense />
                </h2>
              </ProtectedRoute>
            }
          />
          <Route
            path="/task/add"
            element={
              <ProtectedRoute>
                <h2>
                  <AddTask />
                </h2>
              </ProtectedRoute>
            }
          />
          <Route
            path="/projectRequest"
            element={
              <ProtectedRoute>
                <h2>
                  <ProjectRequest />
                </h2>
              </ProtectedRoute>
            }
          />
          <Route
            path="/userRequest"
            element={
              <ProtectedRoute>
                <h2>
                  <UserRequest />
                </h2>
              </ProtectedRoute>
            }
          />

          <Route
            path="/logout"
            element={
              <ProtectedRoute>
                <Logout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
