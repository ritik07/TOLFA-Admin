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
      "User",
      "user-master",
      null,
      [getItem("User Role", "user-role"), getItem("User", "User")],
      "group"
    ),
  ]),
];
