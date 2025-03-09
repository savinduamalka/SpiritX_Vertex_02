import Sidebar from "../../components/adminComponents/SIdebar";
import natureImage from "../../assets/images/new.jpg";

export default function Dashboard() {
  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col md:flex-row"
      style={{ backgroundImage: `url(${natureImage})` }}
    >
      <Sidebar />
      <div className="flex-1 p-4">
        {/* Your page content goes here */}
      </div>
    </div>
  );
}
