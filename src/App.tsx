import { Navigate, Route, Routes } from "react-router-dom";

import { initializeApp } from "firebase/app";

import { useSelector } from "react-redux";

import { RootState } from "./store/store";

import Auth from "./pages/Auth/Auth";
import CVMaker from "./pages/CVMaker/CVMaker";
import Header from "./components/layout/Header/Header";
import Themes from "./pages/Themes/Themes";
import { Container } from "./pages/Container";

import ThemeOne from "./pages/Themes/ThemeOne/ThemeOne";

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
    <Routes>
      <Route
        path="/"
        element={
          !isLoggedIn ? (
            <Container>
              <Auth />
            </Container>
          ) : (
            <Navigate to={"/cv-maker"} />
          )
        }
      />

      <Route
        path="/cv-maker"
        element={
          <AuthProtectedRoute>
            <Container>
              <>
                <Header/>
                <CVMaker/>
              </>
            </Container>
          </AuthProtectedRoute>
        }
      />

      <Route
        path="/themes"
        element={
          <AuthProtectedRoute>
            <Container>
              <>
                <Header/>
                <Themes/>
              </>
            </Container>
          </AuthProtectedRoute>
        }
      />
      
      {/* Theme print pages */}
      <Route
        path="/themes/one"
        element={
          <AuthProtectedRoute>
            <ThemeOne/>
          </AuthProtectedRoute>
        }
      />
      {/* END */}
    </Routes>
  );
};

export default App;
