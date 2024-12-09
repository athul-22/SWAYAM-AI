/* eslint-disable */

import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import routes from "routes.js";
import { NavLink } from "react-router-dom";

const visibleRoutes = routes.filter(route => route.showInMenu);


const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[56px] mt-[50px] flex items-center`}>
        <div className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          Swayam<span class="font-medium"> AI ✦ </span>
        </div>
      </div>
      <div class="mt-[58px] mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      {/* <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul> */}

<ul className="mb-auto pt-1 space-y-[15px] m-5">
  {visibleRoutes.map(route => (
    <li key={route.path} className="menu-item">
      <NavLink
        to={`${route.layout}/${route.path}`}
        className={({ isActive }) =>
          `menu-link flex items-center gap-4 px-4 py-3 rounded-md text-sm transition-colors duration-200 ${
            isActive
              ? "bg-[rgba(67,24,255,0.85)] text-white shadow-lg"
              : "text-gray-400 hover:text-white hover:bg-[rgba(67,24,255,0.15)]"
          }`
        }
      >
        <span className="text-xl fill-current">{route.icon}</span>
        <span className="font-medium">{route.name}</span>
      </NavLink>
    </li>
  ))}
</ul>




{/* <ul>
      {routes
        .filter(route => route.showInMenu) // Filter for routes visible in the menu
        .map(route => (
          <li key={route.path}>
            <NavLink to={`${route.layout}/${route.path}`} className="menu-link">
              {route.icon}
              <span>{route.name}</span>
            </NavLink>
          </li>
        ))}
          
    </ul> */}

{/* <ul className="mb-auto pt-1">
  <Links routes={routes} />
</ul> */}

      {/* Free Horizon Card */}
      <div className="flex justify-center">
        <SidebarCard />
      </div>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
