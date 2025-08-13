import Image from "next/image";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import { UserDetailContext } from "@/context/UserDetailContext";
import { ModeToggle } from "./theme-toggle-button";
import { Info, LucideDownload, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { ActionContext } from "@/context/ActionContext";
import Link from "next/link";
import { InfoAlert } from "./InfoAlert";

function Header() {
  const path = usePathname();
  const { userDetail } = useContext(UserDetailContext);
  const { action, setAction } = useContext(ActionContext);
  const [ openAlert, setOpenAlert ] = useState(true);

  const onActionButton = (action: any) => {
    setAction({
      actionType: action,
      timeStamp: Date.now(),
    });
  };

  return (
    <div className="p-4 flex justify-between items-center">
      <Link href={"/"}><Image src={"/logo.svg"} alt="logo" width={40} height={40} /></Link>
      {!userDetail?.name ? (
        <div className="flex gap-5">  
          <ModeToggle />
        </div>
      ) : (
        path?.includes("workspace") && (
          <div className="flex gap-2 items-center">
            {/* <ModeToggle /> */}
            {/* New User Button */}
            {/* <Button variant="outline" className="flex items-center gap-2 cursor-pointer">
              <Info size={16} />
              
            </Button> */}
           <InfoAlert  />
            <Button variant="outline" className="flex items-center gap-2">
              <User size={16} />
              {userDetail?.name}
            </Button>
            <Button className="cursor-pointer" onClick={() => onActionButton("export")} variant="ghost">
              <LucideDownload /> Export
            </Button>
            <Button
              onClick={() => onActionButton("deploy")}
              className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
            >
              Deploy
            </Button>
            {userDetail && (
              <Image
                src={userDetail?.picture}
                alt="user"
                width={10}
                height={10}
                className="rounded-full w-[30px]"
              />
            )}
          </div>
        )
      )}
    </div>
  );
}

export default Header;
