import { auth } from "@/firebase";
import { useSignOut } from "react-firebase-hooks/auth";

const Logout = () => {
  const [signOut, loading, error] = useSignOut(auth);

  return (
    <button
      onClick={() => {
        signOut();
      }}
    >
      Sign Out
    </button>
  );
};

export default Logout;
