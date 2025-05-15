import React, { useState } from 'react';
import { Search, Filter, MessageSquare } from 'lucide-react';
import ConversationsList from '../components/ConversationsList';
import ConversationView from '../components/ConversationView';
import EvaluationPanel from '../components/EvaluationPanel';

const MultiTurnDialogPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  // Mock data
  const mockConversations = [
    {
      id: '1',
      title: '产品咨询对话',
      lastMessage: '请问这个产品的保修期是多久？',
      timestamp: '2024-03-20 14:30',
      status: '待标注'
    },
    {
      id: '2',
      title: '售后服务对话',
      lastMessage: '我的订单号是123456，想查询物流状态',
      timestamp: '2024-03-20 13:15',
      status: '已标注'
    }
  ];

  const filteredConversations = mockConversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <header className="bg-white shadow-sm z-10">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">多轮对话</h1>
          <p className="mt-1 text-sm text-gray-500">
            查看和评估AI助手的多轮对话
          </p>
        </div>
      </header>

      <div className="flex-1 p-6 bg-gray-50">
        <div className="h-full flex flex-col lg:flex-row gap-6">
          {/* Left panel - Conversations list */}
          <div className="w-full lg:w-1/4 flex flex-col">
            <div className="mb-4 flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="搜索对话..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowFilter(!showFilter)}
                className={`p-2 rounded-md ${
                  showFilter ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-500'
                }`}
              >
                <Filter size={20} />
              </button>
            </div>

            {showFilter && (
              <div className="mb-4 p-4 bg-white rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-900 mb-3">筛选条件</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">状态</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                      <option>全部</option>
                      <option>待标注</option>
                      <option>已标注</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">时间范围</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                      <option>全部</option>
                      <option>今天</option>
                      <option>本周</option>
                      <option>本月</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">标注人</label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                      <option>全部</option>
                      <option>张三</option>
                      <option>李四</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto">
              <ConversationsList
                conversations={filteredConversations}
                selectedId={selectedConversation}
                onSelect={setSelectedConversation}
              />
            </div>
          </div>

          {/* Right panel - Conversation view and evaluation */}
          <div className="w-full lg:w-3/4 flex flex-col">
            {selectedConversation ? (
              <div className="flex-1 flex flex-col lg:flex-row gap-6">
                {/* Conversation view */}
                <div className="flex-1 bg-white rounded-lg shadow overflow-hidden">
                  <ConversationView conversationId={selectedConversation} />
                </div>

                {/* Evaluation panel */}
                <div className="w-full lg:w-1/3 bg-white rounded-lg shadow overflow-hidden">
                  <EvaluationPanel conversationId={selectedConversation} />
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-white rounded-lg shadow">
                <div className="text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">未选择对话</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    请从左侧列表选择一个对话进行查看
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiTurnDialogPage; 