import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white">
      <div className="p-4 text-2xl font-semibold">Меню</div>
      <nav className="mt-4">
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <NavLink to="/"  className="bg-gray-700">
              Главная страница
            </NavLink>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <NavLink to="/signature" className="bg-gray-700">
              Подпись
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
