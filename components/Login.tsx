import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/firebase";

const Login = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <button onClick={() => signInWithGoogle()}>Sign in with google</button>
  );
};

export default Login;
