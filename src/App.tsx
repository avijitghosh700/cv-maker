import { Navigate, Route, Routes } from "react-router-dom";

import { initializeApp } from "firebase/app";

import { useSelector } from "react-redux";

import { RootState } from "./store/store";

import Auth from "./pages/Auth/Auth";
import { CVMaker } from "./pages/CVMaker/CVMaker";
import Header from "./components/layout/Header/Header";

initializeApp({
  apiKey: "AIzaSyBHgTL5Iu-tP5jcmBd1BHdJ_L3-GobaSeA",
  authDomain: "cv-maker-36fb0.firebaseapp.com",
  projectId: "cv-maker-36fb0",
  storageBucket: "cv-maker-36fb0.appspot.com",
  messagingSenderId: "395071734619",
  appId: "1:395071734619:web:647e4c9ea60d466b42d07e",
});

// For authenticated components
const AuthProtectedComponents = ({ children }: Record<string, JSX.Element>) => {
  const isLoggedIn: boolean = useSelector((state: RootState) => state.auth.isLoggedIn);

  return isLoggedIn ? children : null;
};

const AuthProtectedRoute = ({ children }: Record<string, JSX.Element>) => {
  const isLoggedIn: boolean = useSelector((state: RootState) => state.auth.isLoggedIn);

  return isLoggedIn ? children : <Navigate to={"/"} />;
};

const App = () => {
  const isLoggedIn: boolean = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <main className="main py-4">
      <div className="container custom-width h-100">
        <AuthProtectedComponents>
          <Header />
        </AuthProtectedComponents>

        <Routes>
          <Route path="/" element={!isLoggedIn ? <Auth /> : <Navigate to={"/cv-maker"} />} />
          <Route
            path="/cv-maker"
            element={
              <AuthProtectedRoute>
                <CVMaker />
              </AuthProtectedRoute>
            }
          />
        </Routes>
      </div>
    </main>
  );
};

export default App;
