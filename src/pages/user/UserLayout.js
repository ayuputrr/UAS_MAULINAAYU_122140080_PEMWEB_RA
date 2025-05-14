
import { Outlet } from "react-router-dom";
import BottomNav from "../../components/BottomNav"; 

export default function UserLayout() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Outlet /> 
      <BottomNav />
    </div>
  );
}
