import { Input } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";

const SearchBar = () => {
  return (
    <div className="cs-lh-40">
      <Input
      className="cs-br-5"
        placeholder="What you are looking for?"
        prefix={<SearchOutlined />}
      />
    </div>
  );
};

export default SearchBar;
