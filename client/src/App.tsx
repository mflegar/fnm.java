import "./init.tsx";

import { BrowserRouter, Route, Routes } from "react-router";
import UserForm from "./UserForm";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";
import ArxivSearch from "./Arxiv";
import InstitutionForm from "./InstitutionForm.tsx";
import Researcher from "./Researcher.tsx";
import InstitutionManager from "./InstitutionManager.tsx";
import ProjectForm from "./ProjectForm.tsx";
import { UserProvider } from "./useUser"; // Importing the UserProvider

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

          {/* Protected routes (need to be signed in to GitHub) */}
          <Route
            path="/form"
            element={
              <ProtectedRoute>
                <UserForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/researcher"
            element={
              <ProtectedRoute>
                <h2>
                  <Researcher />
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
            path="/institution-manager"
            element={
              <ProtectedRoute>
                <h2>
                  <InstitutionManager />
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
            path="/search"
            element={
              <ProtectedRoute>
                <ArxivSearch />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
