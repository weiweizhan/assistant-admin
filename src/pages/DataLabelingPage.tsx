import React, { useState } from 'react';
import ConversationsList from '../components/labeling/ConversationsList';
import ConversationView from '../components/labeling/ConversationView';
import EvaluationPanel from '../components/labeling/EvaluationPanel';
import { mockConversations } from '../data/mock-data';
import { Conversation } from '../types/types';
import { Filter, Search } from 'lucide-react';

const DataLabelingPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    mockConversations.length > 0 ? mockConversations[0] : null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredConversations = mockConversations.filter(
    (conv) => 
      conv.id.toString().includes(searchQuery) || 
      conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <header className="bg-white shadow-sm z-10">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">数据标注</h1>
          <p className="mt-1 text-sm text-gray-500">
            审查和评估AI助手对话
          </p>
        </div>
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
      </header>

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
                <ConversationView conversation={selectedConversation} />
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

export default DataLabelingPage;