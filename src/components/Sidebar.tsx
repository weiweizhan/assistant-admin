import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart2, 
  FileText, 
  PlayCircle, 
  Settings, 
  Users, 
  Database, 
  Layout, 
  Bot 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { name: '仪表盘', path: '/', icon: <BarChart2 size={20} /> },
    { name: '数据标注', path: '/data-labeling', icon: <FileText size={20} /> },
    { name: '对话测试', path: '/playground', icon: <PlayCircle size={20} /> },
    { name: '用户管理', path: '/users', icon: <Users size={20} /> },
    { name: '模型管理', path: '/models', icon: <Bot size={20} /> },
    { name: '数据集', path: '/datasets', icon: <Database size={20} /> },
    { name: '界面组件', path: '/ui-components', icon: <Layout size={20} /> },
    { name: '设置', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Bot className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">AI管理后台</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* User profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
            管理
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">管理员</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;