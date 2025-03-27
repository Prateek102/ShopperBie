import Navbar from "../features/navbar/Navbar";
import { UserOrder } from "../features/user/components/UserOrder";

function UserOrderPage() {
  return (
    <>
      <Navbar>
        <h1>My Orders</h1>
        <UserOrder />
      </Navbar>
    </>
  );
}

export default UserOrderPage;
