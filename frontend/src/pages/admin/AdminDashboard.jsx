import { useSelector } from "react-redux";
import AdminMain from "./AdminMain";
// import AdminSideBar from "./AdminSideBar";
import "./admin1.css";


const AdminDashboard = () => {
  

  return (
    <section className="admin-dashboard">
      {/* <AdminSideBar /> */}
      <AdminMain />

    </section>
    
  );
};

export default AdminDashboard;