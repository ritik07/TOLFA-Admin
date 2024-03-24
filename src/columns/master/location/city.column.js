import moment from "moment";
import { Button } from "antd";

export const cityColumn = (handleOnAddAdmission) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "State name",
    dataIndex: "state_name",
    key: "state_name",
  },
  {
    title: "Created by",
    dataIndex: "created_by",
    key: "created_by",
    width: "180px",
  },
  {
    title: "Updated by",
    dataIndex: "updated_by",
    key: "updated_by",
    width: "180px",
  },
  {
    title: "Created at",
    dataIndex: "created_at",
    key: "created_at",
    render: (value) => moment(value).format("YYYY-MM-DD hh:mm A"),
  },
  {
    title: "Updated at",
    dataIndex: "updated_at",
    key: "updated_at",
    render: (value) => moment(value).format("YYYY-MM-DD hh:mm A"),
  },
  {
    title: "Action",
    dataIndex: "",
    key: "",
    render: (data) => {
      return (
        <Button onClick={() => handleOnAddAdmission(data, true)} type="primary">
          Edit
        </Button>
      );
    },
  },
];
