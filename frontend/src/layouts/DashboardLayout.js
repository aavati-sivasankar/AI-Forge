import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {
  return (
    <>
      <Sidebar />

      <div
        style={{
          marginLeft: "250px",
          minHeight: "100vh",
        }}
      >
        <Navbar />

        <div className="p-4">
          {children}
        </div>
      </div>
    </>
  );
}

export default DashboardLayout;