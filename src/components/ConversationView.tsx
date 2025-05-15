import React from 'react';
import { User, Bot } from 'lucide-react';

interface ConversationViewProps {
  conversationId: string;
}

const ConversationView: React.FC<ConversationViewProps> = ({ conversationId }) => {
  // Mock data - 实际应用中应该从API获取
  const messages = [
    {
      id: '1',
      role: 'user',
      content: '请问这个产品的保修期是多久？',
      timestamp: '2024-03-20 14:30:00'
    },
    {
      id: '2',
      role: 'assistant',
      content: '您好！我们的产品保修期为12个月，从购买日期开始计算。在保修期内，如果产品出现非人为损坏的质量问题，我们将提供免费维修或更换服务。',
      timestamp: '2024-03-20 14:30:05'
    },
    {
      id: '3',
      role: 'user',
      content: '那保修期过了之后维修要收费吗？',
      timestamp: '2024-03-20 14:31:00'
    },
    {
      id: '4',
      role: 'assistant',
      content: '是的，保修期过后维修是需要收费的。不过我们提供终身维修服务，维修费用会根据具体故障情况来定。建议您在使用过程中注意保养，这样可以延长产品的使用寿命。',
      timestamp: '2024-03-20 14:31:05'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`flex max-w-[80%] ${
                message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                  message.role === 'user'
                    ? 'bg-blue-100 text-blue-600 ml-2'
                    : 'bg-gray-100 text-gray-600 mr-2'
                }`}
              >
                {message.role === 'user' ? (
                  <User size={16} />
                ) : (
                  <Bot size={16} />
                )}
              </div>
              <div>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {message.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationView; 