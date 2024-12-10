import { headerItems, headerIcons } from "@/constants/header.js";
import React, { createElement } from "react";
import { Separator } from "@/components/ui/separator.jsx";
import { Input } from "@/components/ui/input.jsx";
import { CiSearch } from "react-icons/ci";
import avatarFallback from "@/assets/images/avatar.png";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.jsx";
import { IoIosArrowDropdown } from "react-icons/io";
const AdminHeder = () => {
  return (
    <>
      <header className="flex justify-between pt-4 px-36 gap-24">
        <div className="scroll-m-20 text-[25px] font-semibold tracking-tight">
          3legant
        </div>
        <div>
          <Input
            type="text"
            placeholder="Search"
            className="w-[400px] rounded-full"
          />
        </div>
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage src={avatarFallback} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-[16px]">Moni Roy</p>
            <p className="text-[14px] text-gray-400">Admin</p>
          </div>
          <IoIosArrowDropdown size="24" color="#5C5C5C" />
        </div>
      </header>
      <Separator className="my-4" />
    </>
  );
};

export default AdminHeder;
