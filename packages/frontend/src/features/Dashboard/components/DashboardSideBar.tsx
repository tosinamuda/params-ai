import { Link } from "react-router-dom";

const menus = [
  { name: "Experiments", to: "/experiment/dashboard" },
  //{ name: "Prompt Lab", to: "#" },
  //{ name: "My Apps", to: "#" },
  //{ name: "Final Survey", to: "#" },
  { name: "Settings", to: "/experiment/dashboard/settings" },
];

function DashboardSideBar() {
  return (
    <div className="bg-white text-violet-700 w-64 py-6 px-8 fixed left-0 top-0 bottom-0 overflow-y-auto border-r border-r-gray-200 pt-16">
      <ul>
        {menus.map((menu) => (
          <li key={menu.name}>
            <Link to={menu.to} className="block py-2">
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default DashboardSideBar;
