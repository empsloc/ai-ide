import { HelpCircle, LogOut, Settings, Wallet } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function SideBarFooter() {
  const router = useRouter();
  const options = [
   
    
    {
      name: "My Subscription",
      icon: Wallet,
      path: "/pricing",
    },
   
  ];

  const onOptionClick = (option: any) => {
    router.push(option.path);
  };
  return (
    <div className="p-2 mb-10 ">
      {options.map((option, index) => (
        <Button
          onClick={() => onOptionClick(option)}
          variant="ghost"
          className="w-full flex justify-start my-3 cursor-pointer"
          key={index}
        >
          <option.icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
}

export default SideBarFooter;

