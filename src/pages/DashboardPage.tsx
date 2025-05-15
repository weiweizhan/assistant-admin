import React from 'react';
import { BarChart2, Users, MessageSquare, AlertTriangle } from 'lucide-react';

const DashboardPage: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <header className="bg-white shadow-sm z-10">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">仪表盘</h1>
          <p className="mt-1 text-sm text-gray-500">
            AI助手性能和标注活动概览
          </p>
        </div>
      </header>

      <div className="flex-1 p-6 bg-gray-50">
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="总对话数"
            value="1,284"
            change="+12.5%"
            positive={true}
            icon={<MessageSquare size={24} className="text-blue-600" />}
          />
          <StatCard
            title="已标注对话"
            value="843"
            change="+8.3%"
            positive={true}
            icon={<BarChart2 size={24} className="text-green-600" />}
          />
          <StatCard
            title="活跃标注员"
            value="12"
            change="-2"
            positive={false}
            icon={<Users size={24} className="text-purple-600" />}
          />
          <StatCard
            title="问题报告"
            value="37"
            change="-15.2%"
            positive={true}
            icon={<AlertTriangle size={24} className="text-amber-500" />}
          />
        </div>

        {/* Charts placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">对话指标</h2>
            <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">图表将在此处显示</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">标注进度</h2>
            <div className="h-64 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">图表将在此处显示</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, positive, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon}
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p className={`text-sm ${positive ? 'text-green-600' : 'text-red-600'} mt-1`}>
          {change} {positive ? '增长' : '下降'}
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;