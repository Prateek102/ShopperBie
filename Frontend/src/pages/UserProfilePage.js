import Navbar from "../features/navbar/Navbar";
import { UserProfile } from "../features/user/components/UserProfile";

function UserProfilePage() {
  return (
    <>
      <Navbar>
        <h1>My Profile</h1>
        <UserProfile />;
      </Navbar>
    </>
  );
}

export default UserProfilePage;
