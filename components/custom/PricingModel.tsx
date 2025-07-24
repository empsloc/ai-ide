import Lookup from "@/data/Lookup";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { action } from "@/convex/_generated/server";
import { stringify } from "querystring";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function PricingModel() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [selectedOption, setSelectedOption] = useState<any>();
  const UpdateToken = useMutation(api.users.UpdateToken);
  const onPaymentSuccess = async () => {
    const token = userDetail?.token + Number(selectedOption?.value);
    console.log(token);
    await UpdateToken({
      token: token,
      userId: userDetail?._id,
    });
  };
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {Lookup.PRICING_OPTIONS.map((pricing, index) => (
        <div className="border p-7 rounded-xl flex flex-col gap-3" key={index}>
          <h2 className="font-bold text-2xl">{pricing.name}</h2>
          <h2 className="font-medium text-lg">{pricing.tokens} Tokens </h2>
          <p className="text-gray-400">{pricing.desc}</p>
          <h2 className="font-bold text-4xl text-center mt-6">
            ${pricing.price}
          </h2>
          {/* <Button>Upgrade to {pricing.name}</Button> */}
          <PayPalButtons
            onClick={() => {
              setSelectedOption(pricing);
              console.log(pricing.value);
            }}
            disabled={!userDetail}
            style={{ layout: "horizontal" }}
            onCancel={() => console.log("Payment cancelled")}
            onApprove={() => onPaymentSuccess()}
            createOrder={(data, actions) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    amount: {
                      value: pricing.price.toFixed(2),
                      currency_code: "USD",
                    },
                  },
                ],
              });
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default PricingModel;
