import React from "react";

import { useDispatch } from "react-redux";

import { getAuth } from "firebase/auth";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";

import { FcGoogle } from "react-icons/fc";
import { Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { login, loginError, addEMSIToken } from "../../store/auth/authSlice";

import { EMSIAuthentication } from "../../shared/services/api";

import "./Auth.scss";

const customSpin = <LoadingOutlined style={{ fontSize: 24 }} className={"color__dark"} spin />;

const Auth = () => {
  const auth = getAuth();

  const [loading, setLoading] = React.useState<boolean>(false);

  const [signInWithGoogle, , OAuthLoading, OAuthError] = useSignInWithGoogle(auth);
  const [user] = useAuthState(auth);

  const dispatch = useDispatch();

  const signIn = async () => {
    setLoading(true);

    try {
      const data = await EMSIAuthentication();

      if (data && Object.keys(data)) {
        await signInWithGoogle();

        if (!OAuthLoading) {
          setLoading(false);
          dispatch(addEMSIToken(data?.access_token));
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    user && dispatch(login(user));
    OAuthLoading && OAuthError && dispatch(loginError());
  }, [user, OAuthError]);

  return (
    <section className="Auth">
      <div className="Auth__formContainer shadow p-4">
        <div className="Auth__head mb-4">
          <h1 className="fs-2 m-0">Login with</h1>
        </div>

        <div className="Auth__providers">
          <Button className="btn btn__googleAuth w-100" disabled={loading} onClick={signIn}>
            {!loading ? (
              <>
                <FcGoogle size={"25px"} className="me-2" />
                Google
              </>
            ) : (
              <Spin size={"default"} indicator={customSpin} />
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Auth;
