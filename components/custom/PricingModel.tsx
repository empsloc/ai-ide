import Lookup from "@/data/Lookup";
import React, { useContext, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function PricingModel() {
  const { userDetail } = useContext(UserDetailContext);
  const [selectedOption, setSelectedOption] = useState<any>();
  const UpdateToken = useMutation(api.users.UpdateToken);

  const onPaymentSuccess = async () => {
    const token = userDetail?.token + Number(selectedOption?.value);
    await UpdateToken({
      token: token,
      userId: userDetail?._id,
    });
  };

  return (
    <div className="mt-10 grid grid-cols-1   xl:grid-cols-3 gap-5 px-4 sm:px-6">
      {Lookup.PRICING_OPTIONS.map((pricing, index) => (
        <div
          className="border p-5 sm:p-7 rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-all min-h-[300px]"
          key={index}
        >
          <h2 className="font-bold text-xl sm:text-2xl">{pricing.name}</h2>
          <h2 className="font-medium text-base sm:text-lg">{pricing.tokens} Tokens</h2>
          <p className="text-gray-500 text-sm sm:text-base">{pricing.desc}</p>
          <h2 className="font-bold text-3xl sm:text-4xl text-center mt-auto">
            ${pricing.price}
          </h2>

          <div className="mt-4 w-full ">
            <PayPalButtons
            
              onClick={() => setSelectedOption(pricing)}
              disabled={!userDetail}
              style={{
                layout: "horizontal",
                height: 40,
              }}
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
        </div>
      ))}
    </div>
  );
}

export default PricingModel;
