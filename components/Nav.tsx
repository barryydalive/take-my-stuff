import Link from "next/link";
import {
  useSignInWithGoogle,
  useSignOut,
  useAuthState,
} from "react-firebase-hooks/auth";
import { auth } from "@/firebase";
import BackButton from "./BackButton";
import { useRouter } from "next/router";
import {
  NavButton,
  NavAppBar,
  NavToolbar,
  NavLeftContainer,
  NavRightContainer,
  NavTypography,
} from "./NavStyles";

const NavBar = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signOut] = useSignOut(auth);

  const handleLogin = async () => {
    await signInWithGoogle();
  };

  const handleLogout = async () => {
    await signOut();
  };

  const isHome = router.pathname === "/";

  return (
    <NavAppBar position="static">
      <NavToolbar>
        <NavLeftContainer>{!isHome && <BackButton />}</NavLeftContainer>
        <NavTypography variant="h6" sx={{ flexGrow: 1 }}>
          Take My Stuff
        </NavTypography>
        <NavRightContainer>
          <Link href={"/add-items"}>
            <NavButton>Add Items</NavButton>
          </Link>
          <NavButton onClick={user ? handleLogout : handleLogin}>
            {user ? "Logout" : "Login"}
          </NavButton>
        </NavRightContainer>
      </NavToolbar>
    </NavAppBar>
  );
};

export default NavBar;
