import React from "react";

import { getAuth } from "firebase/auth";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";

import { useDispatch } from "react-redux";

import { login, loginError } from "../../store/auth/authSlice";

import { FcGoogle } from "react-icons/fc";
import { Button, Spin } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";

import "./Auth.scss";

const customSpin = <LoadingOutlined style={{ fontSize: 24 }} className={"color__dark"} spin />

const Auth = () => {
  const auth = getAuth();

  const [signInWithGoogle,, loading, error] = useSignInWithGoogle(auth);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    user && dispatch(login(user));
    error && dispatch(loginError());
  }, [user, error]);

  return (
    <section className="Auth">
      <div className="Auth__formContainer shadow p-4">
        <div className="Auth__heading mb-4">
          <h1 className="fs-2 m-0">Login with</h1>
        </div>

        <div className="Auth__providers">
          <Button
            className="btn btn__googleAuth w-100"
            disabled={loading}
            onClick={() => signInWithGoogle()}
          >
            {!loading ? (
              <>
                <FcGoogle size={"25px"} className="me-2" />
                Google
              </>
            ) : (
              <Spin size={'default'} indicator={customSpin}/>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Auth;
