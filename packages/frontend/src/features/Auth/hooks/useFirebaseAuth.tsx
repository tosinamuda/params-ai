import { trpc } from "@/lib/trpc";
import { useAppSelector } from "@/app/redux/hook";
import { firebaseAuthInstance } from "@/features/Auth/config/firebase";
import { selectCurrentUserAuth } from "@/features/Auth/redux/slice/authSlice";
import * as firebaseAuth from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { Location, useLocation, useNavigate } from "react-router-dom";

export const useFirebaseAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authenticated } = useAppSelector(selectCurrentUserAuth);

  const addNewUser = trpc.user.create.useMutation();

  const goBackToRoute = () => {
    if (location.state?.from) {
      const fromPath = (location.state.from as Location).pathname;
      navigate(fromPath);
    } else {
      navigate("/");
    }
  };

  const handleGoogleLogin = () => {
    firebaseAuth
      .signInWithPopup(firebaseAuthInstance, new GoogleAuthProvider())
      .then((userCredentials) => {
        if (userCredentials) {
          const {
            uid,
            email,
            emailVerified,
            displayName,
            isAnonymous,
            photoURL,
            metadata: { lastSignInTime, creationTime },
          } = userCredentials.user;
          addNewUser.mutate(
            {
              uid,
              email: email!,
              emailVerified,
              displayName: displayName!,
              isAnonymous,
              photoURL: photoURL!,
              lastLoginAt: lastSignInTime!,
              createdAt: creationTime!,
            },
            {
              onSuccess: () => {
                goBackToRoute();
              },
            }
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return { authenticated, handleGoogleLogin };
};
