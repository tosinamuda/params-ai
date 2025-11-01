import Header from "@/layouts/Header";
import { LoginForm } from "../features/Auth/components/LoginForm";
import { useFirebaseAuth } from "../features/Auth/hooks/useFirebaseAuth";

const Login = () => {
  const { authenticated, handleGoogleLogin: handleLogin } = useFirebaseAuth();

  return (
    <>
      <Header showMenu={false} />
      <LoginForm authenticated={authenticated} handleLogin={handleLogin} />
    </>
  );
};

export default Login;
