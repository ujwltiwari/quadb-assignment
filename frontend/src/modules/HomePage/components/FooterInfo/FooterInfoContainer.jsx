import FooterInfo from "./FooterInfo";
import { footerInfoData } from "@/constants/footerInfo.js";

const FooterInfoContainer = () => {
  return (
    <div className="flex justify-between gap-4">
      {footerInfoData.map((item, index) => (
        <FooterInfo
          key={index}
          Icon={item.icon}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default FooterInfoContainer;
