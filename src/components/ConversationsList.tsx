import React from 'react';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  status: string;
}

interface ConversationsListProps {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const ConversationsList: React.FC<ConversationsListProps> = ({
  conversations,
  selectedId,
  onSelect,
}) => {
  return (
    <div className="space-y-2">
      {conversations.map((conversation) => (
        <button
          key={conversation.id}
          onClick={() => onSelect(conversation.id)}
          className={`w-full text-left p-4 rounded-lg transition-colors ${
            selectedId === conversation.id
              ? 'bg-blue-50 border border-blue-200'
              : 'bg-white border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-900">{conversation.title}</h3>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                conversation.status === '已标注'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {conversation.status}
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{conversation.lastMessage}</p>
          <p className="mt-2 text-xs text-gray-400">{conversation.timestamp}</p>
        </button>
      ))}
    </div>
  );
};

export default ConversationsList; 