import React, { useState } from 'react';
import ConversationsList from '../components/labeling/ConversationsList';
import ConversationView from '../components/labeling/ConversationView';
import EvaluationPanel from '../components/labeling/EvaluationPanel';
import { mockConversations } from '../data/mock-data';
import { Conversation } from '../types/types';
import { Filter, Search, BarChart2, Users, MessageSquare, AlertTriangle, Play, Pause } from 'lucide-react';

const AICallPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    mockConversations.length > 0 ? mockConversations[0] : null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredConversations = mockConversations.filter(
    (conv) => 
      conv.id.toString().includes(searchQuery) || 
      conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlayAudio = () => {
    setIsPlaying(!isPlaying);
    // TODO: 实现音频播放逻辑
  };

  return (
    <div className="h-full flex flex-col">
      <header className="bg-white shadow-sm z-10">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">AI外呼</h1>
          <p className="mt-1 text-sm text-gray-500">
            审查和评估AI外呼对话
          </p>
        </div>
      </header>

      {/* Stats cards */}
      {/* <div className="px-6 py-4 bg-gray-50"> */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            title="总外呼数"
            value="1,284"
            change="+12.5%"
            positive={true}
            icon={<MessageSquare size={24} className="text-blue-600" />}
          />
          <StatCard
            title="已标注外呼"
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
        </div> */}

      {/* </div> */}

      <div className="px-6 py-2 border-b border-gray-200 flex items-center justify-between">
        <div className="relative w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="搜索对话..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
        >
          <Filter size={16} />
          <span>筛选</span>
        </button>
      </div>

      {/* Filter panel - conditionally rendered */}
      {filterOpen && (
        <div className="bg-white border-b border-gray-200 px-6 py-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option value="all">全部</option>
              <option value="labeled">已标注</option>
              <option value="unlabeled">未标注</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">时间范围</label>
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option value="all">全部时间</option>
              <option value="today">今天</option>
              <option value="week">本周</option>
              <option value="month">本月</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">标注员</label>
            <select className="w-full border border-gray-300 rounded-md p-2">
              <option value="all">全部</option>
              <option value="self">我的</option>
              <option value="team">我的团队</option>
            </select>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* Left panel - Conversations listing and viewing */}
        <div className="w-full md:w-1/2 flex flex-col border-r border-gray-200">
          <div className="hidden md:block h-12 px-6 border-b border-gray-200 flex items-center">
            <h2 className="text-sm font-medium text-gray-700">
              显示 {filteredConversations.length} 个对话
            </h2>
          </div>
          
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Conversations list */}
            <div className="w-full md:w-2/5 overflow-y-auto border-r border-gray-200">
              <ConversationsList
                conversations={filteredConversations}
                selectedId={selectedConversation?.id || 0}
                onSelect={(conversation) => setSelectedConversation(conversation)}
              />
            </div>
            
            {/* Selected conversation view */}
            <div className="w-full md:w-3/5 overflow-y-auto">
              {selectedConversation && (
                <>
                  <ConversationView conversation={selectedConversation} />
                  {/* Audio player */}
                  <div className="border-t border-gray-200 p-4 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={handlePlayAudio}
                          className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                        <div>
                          <p className="text-sm font-medium text-gray-900">外呼录音</p>
                          <p className="text-xs text-gray-500">00:00 / 05:30</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-sm text-gray-600 hover:text-gray-900">
                          下载
                        </button>
                        <button className="text-sm text-gray-600 hover:text-gray-900">
                          分享
                        </button>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-4">
                      <div className="h-1 bg-gray-200 rounded-full">
                        <div className="h-1 bg-blue-600 rounded-full w-1/3"></div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Right panel - Evaluation */}
        <div className="w-full md:w-1/2 overflow-y-auto">
          {selectedConversation && (
            <EvaluationPanel conversation={selectedConversation} />
          )}
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

export default AICallPage; 