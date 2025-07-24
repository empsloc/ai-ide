import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import { UserDetailContext } from "@/context/UserDetailContext";
import { ModeToggle } from "./theme-toggle-button";
import { LucideDownload } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSidebar } from "../ui/sidebar";
import { ActionContext } from "@/context/ActionContext";
import { timeStamp } from "node:console";

function Header() {
  const path = usePathname();
  // const { toggleSidebar } = useSidebar();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { action, setAction } = useContext(ActionContext);
  const onActionButton = (action: any) => {
    setAction({
      actionType: action,
      timeStamp: Date.now(),
    });
  };
  return (
    <div className="p-4 flex justify-between items-center">
      <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
      {!userDetail?.name ? (
        <div className="flex gap-5">
          <ModeToggle />
          <Button variant="ghost" className="cursor-pointer">
            Sign In
          </Button>
          <Button
            className="text-white cursor-pointer"
            style={{ backgroundColor: Colors.BLUE }}
          >
            Get Started
          </Button>
        </div>
      ) : (
        path?.includes("workspace") && (
          <div className="flex gap-2 items-center">
            <ModeToggle />
            <Button onClick={() => onActionButton("export")} variant="ghost">
              {" "}
              <LucideDownload /> Export{" "}
            </Button>
            <Button
              onClick={() => onActionButton("deploy")}
              className="bg-blue-500 text-white hover:bg-blue-600"
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
      {/* <ModeToggle /> */}
    </div>
  );
}

export default Header;

