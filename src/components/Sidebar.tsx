import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart2, 
  FileText, 
  PlayCircle, 
  Settings, 
  Users, 
  Database, 
  Layout, 
  Bot,
  ChevronDown,
  ChevronRight,
  Phone,
  LayoutDashboard,
  MessageSquare,
  Play
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({
    'data-labeling': true
  });

  const toggleExpand = (path: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  const navItems = [
    { name: '仪表盘', path: '/', icon: LayoutDashboard },
    { 
      name: '数据标注', 
      path: '/data-labeling', 
      icon: MessageSquare,
      subItems: [
        { name: '多轮对话', path: '/data-labeling/multi-turn', icon: MessageSquare },
        { name: 'AI外呼', path: '/data-labeling/ai-call', icon: Phone },
        { name: '测评指标', path: '/data-labeling/metrics', icon: BarChart2 }
      ]
    },
    { name: '对话测试', path: '/playground', icon: Play },
    { name: '用户管理', path: '/users', icon: Users },
    { name: '模型管理', path: '/models', icon: Bot },
    { name: '数据集', path: '/datasets', icon: Database },
    { name: '界面组件', path: '/ui-components', icon: Layout },
    { name: '设置', path: '/settings', icon: Settings },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          {React.createElement(Bot, { className: "h-8 w-8 text-blue-600" })}
          <span className="text-xl font-bold text-gray-900">AI管理后台</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <div key={item.path}>
            {item.subItems ? (
              <>
                <button
                  onClick={() => toggleExpand(item.path)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-all ${
                    expandedItems[item.path]
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center">
                    {React.createElement(item.icon, { className: "mr-3 h-5 w-5" })}
                    {item.name}
                  </div>
                  {expandedItems[item.path] ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
                {expandedItems[item.path] && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        className={({ isActive }) =>
                          `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all ${
                            isActive
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                          }`
                        }
                      >
                        {subItem.icon && React.createElement(subItem.icon, { className: "mr-2 h-5 w-5" })}
                        {subItem.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                {React.createElement(item.icon, { className: "mr-3 h-5 w-5" })}
                {item.name}
              </NavLink>
            )}
          </div>
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