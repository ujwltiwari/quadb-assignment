import React from "react";
import "react-modern-drawer/dist/index.css";
import { addProductSidebarMenu } from "@/constants/addProduct.js";
import { Button } from "@/components/ui/button.jsx";
import { useLocation } from "react-router-dom";
import { textCapitalizer } from "@/helpers/helpers.js";
import { Link } from "react-router-dom";

const Sidebar = ({ className }) => {
  const [selectedIdx, setSelectedIdx] = React.useState("Dashboard");
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const pathname = useLocation().pathname.split("/");
  let currentRoute = pathname[pathname.length - 1];
  if (currentRoute === "create" || currentRoute === "update") {
    currentRoute = textCapitalizer("products");
  }

  return (
    <>
      {/*<button onClick={toggleDrawer}>Show</button>*/}
      {/*<Drawer*/}
      {/*  open={isOpen}*/}
      {/*  onClose={toggleDrawer}*/}
      {/*  direction="right"*/}
      {/*  className="bla bla bla"*/}
      {/*>*/}
      {/*  <div>Hello World</div>*/}
      {/*</Drawer>*/}
      <div className={`px-2 ${className ?? ""} shadow-lg h-[100vh]`}>
        <div className="flex flex-col gap-4">
          {addProductSidebarMenu.map((x, idx) => {
            return (
              <Button
                variant={selectedIdx === x.title ? "default" : "ghost"}
                onClick={() => setSelectedIdx(currentRoute)}
                className="h-[50px]"
                key={idx}
              >
                <Link to={`/admin${x.link}`}>{x.title}</Link>
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
