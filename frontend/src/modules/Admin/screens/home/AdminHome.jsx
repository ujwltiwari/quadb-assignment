import data from "./data.json";
import StatusCard from "@/modules/Admin/screens/home/StatusCard.jsx";
import SalesDetails from "@/modules/Admin/components/adminHome/SalesDetails.jsx";

const AdminHome = () => {
  return (
    <>
      <div className="gap-[30px] flex flex-col self-stretch">
        <div className="flex justify-between gap-[20px]">
          {data.status.map((item, index) => (
            <StatusCard {...item} key={index} />
          ))}
        </div>
        <SalesDetails />
      </div>
    </>
  );
};

export default AdminHome;
