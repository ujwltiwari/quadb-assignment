import trending from "@/assets/icons/trending.svg";
const StatusCard = ({ title, number, percentage, icon }) => {
  return (
    <>
      <div className="rounded-[14px] w-[24%] flex flex-col gap-6 bg-white-a700 p-4 shadow-xs md:w-full bg-white">
        <div className="self-stretch">
          <div className="flex items-start">
            <div className="flex flex-1 flex-col items-start gap-3 self-center">
              <h6 className=" text-[16px] font-light text-gray-900_b2 ">
                {title}
              </h6>
              <h3 className=" text-[28px] tracking-[1.00px] font-bold text-gray-900_02 ">
                {number}
              </h3>
            </div>
            <img
              className="w-[26%] h-[60px] object-contain"
              src={icon}
              alt="Contrast Image"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 self-stretch">
          <img
            className="h-[24px]"
            src={trending}
            alt="Checkmark Image"
            loading="lazy"
          />
          <h6 className="text-[16px] font-light text-teal-a700 ">
            <span className="text-teal-a700">{percentage}%</span>
            <span className="text-gray-900">&nbsp;</span>
            <span className="text-gray-700">Up from yesterday</span>
          </h6>
        </div>
      </div>
    </>
  );
};

export default StatusCard;
