import { Button } from "antd";
import moment from "moment";

export const userRoleColumn = (onDelete, handleUpdate) => [
  {
    title: "S/N",
    dataIndex: "serial_no",
    key: "serial_no",
    width: "70px",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
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

  // {
  //   title: "Action",
  //   dataIndex: "",
  //   key: "",
  //   render: (rowdata) => {
  //     return (
  //       <div className="cs-dis-flex">
  //         <Button onClick={() => onDelete(rowdata)} type="primary">
  //           Delete
  //         </Button>

  //         <Button
  //           onClick={() => handleUpdate(rowdata)}
  //           className="cs-lm-10"
  //           type="primary"
  //         >
  //           Update
  //         </Button>
  //       </div>
  //     );
  //   },
  // },
];

export const userColumn = (onDelete, handleUpdate) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "User role",
    dataIndex: "user_role",
    key: "user_role",
    render: (value) => (
      <div>
        {value.map((x) => {
          return <div className="cs-lm-5">{x.name} {" "}</div>;
        })}
      </div>
    ),
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
    title: "Active",
    dataIndex: "active",
    key: "active",
    render: (value) => (value ? "True" : "False"),
  },

  // {
  //   title: "Action",
  //   dataIndex: "",
  //   key: "",
  //   render: (rowdata) => {
  //     return (
  //       <div className="cs-dis-flex">
  //         <Button onClick={() => onDelete(rowdata)} type="primary">
  //           Delete
  //         </Button>

  //         <Button
  //           onClick={() => handleUpdate(rowdata)}
  //           className="cs-lm-10"
  //           type="primary"
  //         >
  //           Update
  //         </Button>
  //       </div>
  //     );
  //   },
  // },
];
