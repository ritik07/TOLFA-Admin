import { Image } from "antd";

export const admissionColumn = () => [
  {
    title: "Rescue No.",
    dataIndex: "rescue_no",
    key: "rescue_no",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (data) => (
      <div>
        <Image src={data} className="admission-table-profile-image" />
      </div>
    ),
  },
  {
    title: "Species",
    dataIndex: "species",
    key: "species",
  },
  {
    title: "Type of rescue",
    dataIndex: "type_of_rescue",
    key: "type_of_rescue",
  },
  {
    title: "Sex",
    dataIndex: "sex",
    key: "sex",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Condition",
    dataIndex: "condition",
    key: "condition",
  },
  {
    title: "Breed",
    dataIndex: "breed",
    key: "breed",
  },
  {
    title: "ABC status",
    dataIndex: "abc_status",
    key: "breed",
  },
];

