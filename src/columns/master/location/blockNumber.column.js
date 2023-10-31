import moment from "moment";

export const blockNumberColumn = () => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Tolfa area name",
    dataIndex: "tolfa_area_name",
    key: "tolfa_area_name",
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
