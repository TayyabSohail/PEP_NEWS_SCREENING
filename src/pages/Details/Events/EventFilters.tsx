import { useState } from "react";

import { Checkbox, Tag } from "antd";
import type { CheckboxProps } from "antd";

import { styles } from "../../../assets/styles";

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Keywords", "Critical", "Non Critical"];
const defaultCheckedList = ["Keywords"];

export const EventFilters= () => {
  const [checkedList, setCheckedList] = useState<string[]>(defaultCheckedList);

  const checkAll = plainOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  const onChange = (list: string[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps["onChange"] = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  return (
    <>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        All Events{" "}
        <Tag className={`bg-blue border-none ${styles.filtertags}`}>05</Tag>
      </Checkbox>

      <CheckboxGroup value={checkedList} onChange={onChange}>
        <Checkbox value="Keywords">
          Keywords{" "}
          <Tag className={`bg-pink border-none ${styles.filtertags}`}>05</Tag>
        </Checkbox>
        <Checkbox value="Critical">
          Critical{" "}
          <Tag className={`bg-red border-none ${styles.filtertags}`}>05</Tag>
        </Checkbox>
        <Checkbox value="Non Critical">
          Non Critical{" "}
          <Tag className={`bg-green border-none ${styles.filtertags}`}>05</Tag>
        </Checkbox>
      </CheckboxGroup>
    </>
  );
};
