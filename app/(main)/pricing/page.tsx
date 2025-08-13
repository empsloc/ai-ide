"use client";
import PricingModel from "@/components/custom/PricingModel";
import { UserDetailContext } from "@/context/UserDetailContext";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import React, { useContext } from "react";

function Pricing() {
  const { userDetail } = useContext(UserDetailContext);
  
  return (
    <div className="w-full">
      <div className="flex flex-col items-center mt-24 md:mt-36 xl:mt-52 gap-2 w-full px-5 sm:px-10 md:px-32 lg:px-48">
        
        {/* Heading */}
        <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-center">
          Pricing
        </h2>
        <p className="text-gray-400 max-w-xl text-center mt-4 text-sm sm:text-base">
          {Lookup.PRICING_DESC}
        </p>

        {/* Token Info Box */}
        <div
          style={{ backgroundColor: Colors.BACKGROUND }}
          className="p-4 sm:p-5 border rounded-xl w-full flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between mt-7 items-start sm:items-center"
        >
          <h2 className="text-base sm:text-lg">
            Token Left: <span className="font-bold">{userDetail?.token}</span>
          </h2>
          <div className="text-sm sm:text-base">
            <h2 className="font-medium">Need more tokens?</h2>
            <p>Upgrade your plan below</p>
          </div>
        </div>

        {/* Pricing Cards */}
        <PricingModel />
      </div>
    </div>
  );
}

export default Pricing;
