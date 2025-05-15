import React from 'react';
import { Conversation } from '../../types/types';
import { CheckCircle, Clock } from 'lucide-react';

interface ConversationsListProps {
  conversations: Conversation[];
  selectedId: number;
  onSelect: (conversation: Conversation) => void;
}

const ConversationsList: React.FC<ConversationsListProps> = ({
  conversations,
  selectedId,
  onSelect,
}) => {
  return (
    <div className="h-full overflow-y-auto">
      {conversations.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <p className="text-gray-500 mb-2">未找到对话</p>
          <p className="text-sm text-gray-400">请尝试调整搜索条件或筛选器</p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              onClick={() => onSelect(conversation)}
              className={`cursor-pointer transition-colors ${
                selectedId === conversation.id
                  ? 'bg-blue-50 border-l-4 border-blue-500'
                  : 'hover:bg-gray-50 border-l-4 border-transparent'
              }`}
            >
              <div className="px-4 py-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {conversation.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 truncate">
                      {conversation.messages.length} 条消息 • ID: {conversation.id}
                    </p>
                  </div>
                  {conversation.isLabeled ? (
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  ) : (
                    <Clock size={16} className="text-amber-500 flex-shrink-0" />
                  )}
                </div>
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <span>{new Date(conversation.timestamp).toLocaleDateString()}</span>
                  <span className="mx-1">•</span>
                  <span>
                    {conversation.isLabeled ? '已标注' : '未标注'}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConversationsList;