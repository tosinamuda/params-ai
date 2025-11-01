import React, { PropsWithChildren, useEffect } from "react";

import {
  logOut,
  setCredentials,
  setToken,
} from "@/features/Auth/redux/slice/authSlice";

import { useAppDispatch, } from "@/app/redux/hook";
import { firebaseAuthInstance } from "@/features/Auth/config/firebase";


const AuthProvider:React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(function authenticateUser(){
    const unsubscribe = firebaseAuthInstance.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setCredentials({ user: user.toJSON() }));
        user
          .getIdToken(true)
          .then((token) => {
            dispatch(setToken({ token }));
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        dispatch(logOut());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
