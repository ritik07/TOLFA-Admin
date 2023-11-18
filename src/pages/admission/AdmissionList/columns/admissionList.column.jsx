import { Button, Image } from "antd";
import { BASE_URL_ASSET } from "../../../../constants/server";

export const admissionColumn = (handleViewDetail) => [
  {
    title: "Rescue No.",
    dataIndex: "rescue_no",
    key: "rescue_no",
  },
  {
    title: "Image",
    dataIndex: "animal_image",
    key: "animal_image",
    render: (data) => (
      <div>
        <Image src={BASE_URL_ASSET + data} className="admission-table-profile-image" />
      </div>
    ),
  },
  {
    title: "Species",
    dataIndex: "species_name",
    key: "species_name",
  },
  {
    title: "Type of rescue",
    dataIndex: "rescue_type_name",
    key: "rescue_type_name",
  },
  {
    title: "Sex",
    dataIndex: "sex",
    key: "sex",
    render: (data) => {
      return <div>
        {data ? "Male" : "Female"}
      </div>
    }
  },
  {
    title: "Status",
    dataIndex: "animal_status_name",
    key: "animal_status_name",
  },
  {
    title: "Condition",
    dataIndex: "condition_value",
    key: "condition_value",
  },
  {
    title: "Breed",
    dataIndex: "breed_name",
    key: "breed_name",
  },
  {
    title: "ABC status",
    dataIndex: "abc_status",
    key: "breed",
  },
  {
    width: "160px",
    title: "Actions",
    dataIndex: "action",
    key: "action",
    render: (data, rowdata) => {
      return (
        <div>
          <Button onClick={() => handleViewDetail(rowdata)} className="cs-theme-button-invert">
            View Details
          </Button>
        </div>
      )
    }
  },
];
