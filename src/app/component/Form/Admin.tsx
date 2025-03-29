import UserCard from "../UserCard/UserCard";
import CountChart from "../Charts/CountChart/CountChart";
import Attendance from "../Charts/Attendance/Attendance";
import EventCalender from "../Charts/EventCalender/EventCalender";
import { withAuth } from "@/app/utils/auth";

let user = null;
let accessToken = null;
if (typeof window !== "undefined") {
    debugger
    user = localStorage.getItem("userName");
    accessToken = localStorage.getItem("authToken");
}
const AdminPage = () => {
    return (
        <div className="p-4 flex gap-4 flex-col md:flex-row">
            {/* Left */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
            {/* UserCard */}
            <div className="flex gap-4 justify-between flex-wrap">
                <UserCard type="Inward" />
                <UserCard type="Outward" />
                <UserCard type="Loading" />
                <UserCard type="UnLoading" />
            </div>
            {/* middlechart */}
            <div className="flex gap-4 flex-col lg:flex-row">
                {/* countchart */}
                <div className="w-full lg:w-1/3 h-[350px]">
               <CountChart/>
                </div>
                {/* attanncechart */}
                <div className="w-full lg:w-2/3 h-[350px]">
                <Attendance/>
                </div>
            </div>
             {/* bottomchart */}
            <div className="w-full  h-[500px]">
                <Attendance/>
                </div>
            </div>
            {/* right */}
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
            <EventCalender/>
            </div>
        </div>
    );
};
export default AdminPage;