import { useState } from "react";

import { Checkbox, Tag } from "antd";
import type { CheckboxProps } from "antd";

import { styles } from "../../../assets/styles";

const CheckboxGroup = Checkbox.Group;

const newsCategories = ["Keywords", "Critical", "Non Critical"] as const;

type NEWS_CATEGORY_TYPE = (typeof newsCategories)[number];

export const NewsFilters = () => {
  const [checkedList, setCheckedList] = useState<NEWS_CATEGORY_TYPE[]>([
    "Keywords",
  ]);

  const checkAll = newsCategories.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < newsCategories.length;

  const onChange = (list: NEWS_CATEGORY_TYPE[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? Array.from(newsCategories) : []);
  };

  return (
    <div className="flex gap-5">
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
        className={`${styles.label} ${
          !checkAll && "!font-normal !text-text_color"
        }`}
      >
        All Events <Tag className={`bg-blue ${styles.filtertags}`}>25</Tag>
      </Checkbox>

      <CheckboxGroup
        className="flex gap-5"
        value={checkedList}
        onChange={onChange}
      >
        <Checkbox
          value="Keywords"
          className={`${styles.label} ${
            !checkedList.includes("Keywords") && "!font-normal !text-text_color"
          }`}
        >
          Keywords <Tag className={`bg-pink ${styles.filtertags}`}>05</Tag>
        </Checkbox>
        <Checkbox
          value="Critical"
          className={`${styles.label} ${
            !checkedList.includes("Critical") && "!font-normal !text-text_color"
          }`}
        >
          Critical <Tag className={`bg-red ${styles.filtertags}`}>05</Tag>
        </Checkbox>
        <Checkbox
          value="Non Critical"
          className={`${styles.label} ${
            !checkedList.includes("Non Critical") &&
            "!font-normal !text-text_color"
          }`}
        >
          Non Critical <Tag className={`bg-green ${styles.filtertags}`}>05</Tag>
        </Checkbox>
      </CheckboxGroup>
    </div>
  );
};
