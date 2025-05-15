import React from 'react';
import { Settings } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <header className="bg-white shadow-sm z-10">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">设置</h1>
          <p className="mt-1 text-sm text-gray-500">
            配置AI管理系统设置
          </p>
        </div>
      </header>

      <div className="flex-1 p-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">系统设置</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                在此配置AI助手管理系统设置。
                您可以管理用户权限、通知偏好和其他系统级设置。
              </p>
              <div className="text-center py-10">
                <Settings size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  设置功能即将推出
                </h3>
                <p className="text-gray-600">
                  此功能正在开发中。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;