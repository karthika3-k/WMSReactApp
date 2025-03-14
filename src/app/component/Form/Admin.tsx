import UserCard from "../UserCard/UserCard";
import CountChart from "../Charts/CountChart/CountChart";

const AdminPage = () => {
    return (
        <div className="p-4 flex gap-4 flex-col md:flex-row">
            {/* Left */}
            <div className="w-full lg:w-2/3">
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
                <div className="w-full lg:w-1/3 h-[450px]">
               <CountChart/>
                </div>
                {/* attanncechart */}
                <div className="w-full lg:w-2/3 h-[450px]"></div>
            </div>
            </div>
            {/* right */}
            <div className="w-full lg:w-1/3">R</div>
        </div>
    );
};
export default AdminPage;