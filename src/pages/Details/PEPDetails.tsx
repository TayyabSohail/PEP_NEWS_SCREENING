import React from "react";
import { styles } from "../../assets/styles";

export const PEPDetailsCard = () => {
  const details = [
    { label: "PEP Type", value: "Primary" },
    { label: "AKA (English)", value: ["Imran Khan", "Imran"] },
    { label: "AKA (Urdu)", value: ["عمران خان", "عمران"] },
    { label: "Organization", value: ["Govt. of Pakistan", "PTI"] },
    { label: "University", value: ["University of Bradford"] },
    {
      label: "Designation",
      value: ["Prime Minister of Pakistan"],
    },
    { label: "Date", value: "05/07/2020 - 05/07/2022" },
    { label: "Keywords", value: ["Corruption", "Bribery", "Money Laundering"] },
  ];

  return (
    <div className="border border-light_gray rounded-lg bg-white ml-auto p-4 mb-4">
      <h2 className={`mb-4 ${styles.heading5}`}>PEP Details</h2>
      <div className="space-y-4">
        {details.map((detail, index) => (
          <div key={index} className="flex flex-row">
            <p className={`${styles.label} w-36 font-lato`}>{detail.label}</p>
            <div className="font-lato text-black">
              {Array.isArray(detail.value) ? (
                detail.value.map((item, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="text-light_gray"> | </span>}
                    {item}
                  </React.Fragment>
                ))
              ) : (
                <span>{detail.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
