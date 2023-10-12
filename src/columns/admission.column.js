import dogImage from "../static/images/dummy/indoor-dog-toys-1587002073.jpeg";
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

export const admissionDataSource = [
  {
    rescue_no: 1,
    image: dogImage,
    species: "Cat",
    type_of_rescue: "Small animal",
    sex: "Male",
    status: "Adopted",
    condition: "Good",
    breed: "Siamese",
    abc_status: "Done",
  },
  {
    rescue_no: 2,
    image: dogImage,
    species: "Dog",
    type_of_rescue: "Large animal",
    sex: "Female",
    status: "Admitted- under treatment",
    condition: "Poor",
    breed: "Labrador",
    abc_status: "Pending",
  },
];
