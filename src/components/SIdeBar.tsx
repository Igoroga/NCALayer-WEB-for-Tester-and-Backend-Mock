import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className=" w-64 bg-gray-800 text-white min-w-[250px] w-[250px] min-h-[100vh] h-auto">
  <div className="p-4 text-2xl font-semibold">Меню</div>
  <nav className="mt-4 ">
    <ul >
      <li className="">
        <NavLink to="/" className="block p-4 bg-gray-800 w-full h-full hover:bg-gray-700">
          Главная страница
        </NavLink>
      </li>
      <li className="">
        <NavLink to="/signature" className="block p-4 bg-gray-800 w-full h-full hover:bg-gray-700">
          Подпись Cms
        </NavLink>
      </li>
      <li className="">
        <NavLink to="/xml" className="block p-4 bg-gray-800 w-full h-full hover:bg-gray-700">
          Подпись Xml
        </NavLink>
      </li>
    </ul>
  </nav>
</div>

  );
};

export default Sidebar;
