import AdminOrders from "../features/admin/components/AdminOrder";
import Navbar from "../features/navbar/Navbar";

function AdminHome() {
  return (
    <div>
      <Navbar>
        <AdminOrders />
      </Navbar>
    </div>
  );
}

export default AdminHome;
