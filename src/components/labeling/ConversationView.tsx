import React from 'react';
import { Conversation, Message } from '../../types/types';
import { User, Bot } from 'lucide-react';

interface ConversationViewProps {
  conversation: Conversation;
}

const ConversationView: React.FC<ConversationViewProps> = ({ conversation }) => {
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-base font-medium text-gray-900">{conversation.title}</h2>
        <div className="mt-1 flex items-center text-xs text-gray-500">
          <span>ID: {conversation.id}</span>
          <span className="mx-1">•</span>
          <span>{new Date(conversation.timestamp).toLocaleString()}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
      </div>
    </div>
  );
};

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div 
          className={`flex items-center justify-center h-8 w-8 rounded-full flex-shrink-0 ${
            isUser ? 'ml-2 bg-blue-100 text-blue-600' : 'mr-2 bg-gray-100 text-gray-600'
          }`}
        >
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </div>
        
        <div>
          <div 
            className={`px-4 py-3 rounded-lg ${
              isUser 
                ? 'bg-blue-500 text-white rounded-tr-none' 
                : 'bg-gray-100 text-gray-800 rounded-tl-none'
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          </div>
          <div className={`text-xs mt-1 text-gray-500 ${isUser ? 'text-right' : 'text-left'}`}>
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationView;