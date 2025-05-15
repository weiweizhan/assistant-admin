import React from 'react';
import { Bot, Plus, Settings, Zap } from 'lucide-react';

const ModelManagementPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <header className="bg-white shadow-sm z-10">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">模型管理</h1>
          <p className="mt-1 text-sm text-gray-500">
            管理AI模型配置和部署
          </p>
        </div>
      </header>

      <div className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header actions */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Plus size={16} className="mr-2" />
                添加模型
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Bot className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">已部署模型</dt>
                      <dd className="text-lg font-medium text-gray-900">5</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Settings className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">模型版本</dt>
                      <dd className="text-lg font-medium text-gray-900">12</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Zap className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">平均响应时间</dt>
                      <dd className="text-lg font-medium text-gray-900">1.2s</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Model list */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <p className="text-gray-500">模型列表将在这里实现</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelManagementPage; 