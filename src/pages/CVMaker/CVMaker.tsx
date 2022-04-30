import React from 'react'

import { getAuth, signOut } from 'firebase/auth'

import { Button } from 'react-bootstrap'

import { useDispatch } from 'react-redux';

import { logout } from '../../store/auth/authSlice';

import './CVMaker.scss';

export const CVMaker = () => {
  const auth = getAuth();

  const dispatch = useDispatch();

  const signOutUser = () => {
    signOut(auth).then(() => dispatch(logout()));
  }

  return (
    <section className="CVMaker">
      <div className="container">
        <Button variant='danger' onClick={signOutUser}>
          Logout
        </Button>
      </div>
    </section>
  )
}
