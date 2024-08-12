import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { styles } from "../../assets/styles";
import {
  ResponseData,
  ResponseEvent,
  ResponseItem,
} from "../../api/result.api";
import { endpoints } from "../../utils/api.service";
import { queryClient } from "../../utils/react-query.service";

export const PEPDetails = () => {
  const location = useLocation();
  const personData = location.state;
  const [amlTopology, setAmlTopology] = useState<string[]>([]);

  useEffect(() => {
    const cachedData: ResponseData | undefined = queryClient.getQueryData(
      endpoints.result.cacheKey
    );
    const ScanData: ResponseItem = cachedData?.data ?? {};
    const events: ResponseEvent[] = ScanData[personData.englishName];
    const amlKeys = events.flatMap((event) =>
      (Object.keys(event.AML) as (keyof typeof event.AML)[]).filter(
        (key) => event.AML[key]?.length > 0
      )
    );

    const uniqueAmlKeys = Array.from(new Set(amlKeys));
    setAmlTopology(uniqueAmlKeys);
  }, [amlTopology, personData]);

  const details = [
    { label: "PEP Type", value: personData.primarySecondary },
    { label: "AKA (English)", value: personData.akaEnglish.split(", ") },
    { label: "AKA (Urdu)", value: personData.akaUrdu.split(", ") },
    { label: "Organization", value: personData.organizations.split(", ") },
    { label: "Designation", value: personData.designations.split(", ") },
    {
      label: "AML Topology",
      value: amlTopology,
    },
  ];

  return (
    <div className={styles.box}>
      <h3 className={`${styles.heading3}`}>PEP Details</h3>
      <div className="flex flex-col gap-5">
        {details.map((detail, index) => (
          <div key={index} className="flex flex-row">
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
