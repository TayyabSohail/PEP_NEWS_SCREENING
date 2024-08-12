import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { styles } from "../../assets/styles";

export const PEPDetails = () => {
  const location = useLocation();
  const { personData, requestData } = location.state;

  useEffect(() => {}, [personData, requestData]);

  const details = [
    { label: "PEP Type", value: personData.primarySecondary },
    { label: "AKA (English)", value: personData.akaEnglish.split(", ") },
    { label: "AKA (Urdu)", value: personData.akaUrdu.split(", ") },
    { label: "Organization", value: personData.organizations.split(", ") },
    { label: "Designation", value: personData.designations.split(", ") },
    {
      label: "Keywords",
      value: [
        personData.keywords1,
        personData.keywords2,
        personData.keywords3,
        personData.keywords4,
        personData.keywords5,
      ].filter((keyword) => keyword),
    },
  ];

  return (
    <div className={styles.box}>
      <h3 className={`${styles.heading3}`}>PEP Details</h3>
      <div className="flex flex-col gap-5">
        {details.map((detail, index) => (
          <div key={index} className="flex flex-row gap-10">
            <p className={`${styles.label} w-1/3`}>{detail.label}</p>
            <div className="w-2/3">
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
