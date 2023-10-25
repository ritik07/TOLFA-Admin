import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import AddmissionIcon from "../static/images/icons/pet-care.png";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export const menuItem = [
  {
    key: "/home",
    icon: <PieChartOutlined />,
    label: "Dashboard",
  },
  {
    key: "/admission",
    icon: <img src={AddmissionIcon} style={{ width: 15, height: "auto" }} />,
    label: "Admission",
  },
    {
    key: "/caregiver",
    // icon: <img src={AddmissionIcon} style={{ width: 15, height: "auto" }} />,
    label: "Self Rescue Details",
  },
  getItem("Master", "master", <DatabaseOutlined />, [
    getItem(
      "Rescue",
      "rescue-master",
      null,
      [
        getItem("Rescue type", "rescue-type"),
        getItem("Species type", "species-type"),
      ],
      "group"
    ),
    getItem(
      "Animal",
      "animal-master",
      null,
      [getItem("Status", "status"), getItem("Breed", "breed")],
      "group"
    ),
    getItem(
      "Location",
      "location-master",
      null,
      [
        getItem("State", "state"),
        getItem("City", "city"),
        getItem("City area", "city-area"),
        getItem("Tolfa area", "tolfa-area"),
        getItem("Tolfa block number", "tolfa-block-number"),
      ],
      "group"
    ),
    getItem(
      "User",
      "user-master",
      null,
      [getItem("User Role", "user-role"), getItem("User", "User")],
      "group"
    ),
  ]),
];
