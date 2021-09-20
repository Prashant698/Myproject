import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer",
  },
  {
    name: "Students",
    url: "/students",
    icon: "fa fa-users",
    children: [
      {
        name: "List",
        url: "/students/list",
        icon: "fa fa-list",
      },
      {
        name: "Add Student",
        url: "/students/add",
        icon: "fa fa-user-plus",
      },
    ],
  },
];
