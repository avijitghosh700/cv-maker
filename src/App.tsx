import { Navigate, Route, Routes } from "react-router-dom";

import { initializeApp } from "firebase/app";

import { useSelector } from "react-redux";

import { RootState } from "./store/store";

import Auth from "./pages/Auth/Auth";
import { CVMaker } from "./pages/CVMaker/CVMaker";

initializeApp({
  apiKey: "AIzaSyBHgTL5Iu-tP5jcmBd1BHdJ_L3-GobaSeA",
  authDomain: "cv-maker-36fb0.firebaseapp.com",
  projectId: "cv-maker-36fb0",
  storageBucket: "cv-maker-36fb0.appspot.com",
  messagingSenderId: "395071734619",
  appId: "1:395071734619:web:647e4c9ea60d466b42d07e",
});

const AuthProtectedRoute = ({ children }: Record<string, JSX.Element>) => {
  const isLoggedIn: boolean = useSelector((state: RootState) => state.auth.isLoggedIn);

  return isLoggedIn ? children : <Navigate to={"/"} />;
};

const App = () => {
  const isLoggedIn: boolean = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <main className="main">
      <Routes>
        <Route path="/" element={!isLoggedIn ? <Auth /> : <Navigate to={'/cv-maker'}/>} />
        <Route
          path="/cv-maker"
          element={
            <AuthProtectedRoute>
              <CVMaker />
            </AuthProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
};

export default App;
