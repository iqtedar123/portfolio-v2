import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import ProjectPage from "./pages/ProjectPage";

const config = {
  apiKey: "AIzaSyDYl9whh-cQ7V9B6MNByR7mZqmPqXcx-0M",
  authDomain: "mohammad-s-portfolio.firebaseapp.com",
  databaseURL: "https://mohammad-s-portfolio.firebaseio.com",
  projectId: "mohammad-s-portfolio",
  storageBucket: "mohammad-s-portfolio.appspot.com",
  messagingSenderId: "710111136436",
  appId: "1:710111136436:web:05f3d2b7aeb3a004b3e5e1",
  measurementId: "G-HNS8VNX7K2",
};

const app = initializeApp(config);
export const db = getFirestore(app);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/project/:id",
    element: <ProjectPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<>Loading</>}>
      <App>
        <RouterProvider router={router} />
      </App>
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
