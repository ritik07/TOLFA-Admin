import moment from "moment";

export const cityAreaColumn = () => [
  {
    title: "Area Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "City name",
    dataIndex: "city_name",
    key: "city_name",
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
];
