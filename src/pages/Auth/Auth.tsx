import { getAuth } from 'firebase/auth';
import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { FcGoogle } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { login, loginError } from '../../store/auth/authSlice';

import './Auth.scss';

const Auth = () => {
  const auth = getAuth();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    user && dispatch(login(user.user));
    error && dispatch(loginError());
  }, [user, error])

  return (
    <section className="Auth">
      <div className="Auth__formContainer shadow p-4">
        <div className="Auth__heading mb-4">
          <h1 className="fs-2 m-0">Login with</h1>
        </div>

        <div className="Auth__providers">
          <button
            className="btn btn__googleAuth w-100"
            onClick={() => signInWithGoogle()}
          >
            <FcGoogle size={"25px"} className="me-2" />
            Google
          </button>
        </div>
      </div>
    </section>
  );
}

export default Auth;