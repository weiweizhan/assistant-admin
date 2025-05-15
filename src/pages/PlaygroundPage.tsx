import React from 'react';
import { Bot } from 'lucide-react';

const PlaygroundPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <header className="bg-white shadow-sm z-10">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">AI对话测试</h1>
          <p className="mt-1 text-sm text-gray-500">
            实时测试和体验AI助手
          </p>
        </div>
      </header>

      <div className="flex-1 p-6 flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <Bot size={48} className="mx-auto text-blue-500 mb-4" />
          <h2 className="text-xl font-medium text-gray-900 mb-2">对话测试功能即将推出</h2>
          <p className="text-gray-600">
            此功能正在开发中。敬请期待实时测试和体验AI助手的功能。
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundPage;