import React, { useState } from 'react';
import { User, Bot, Star, X, ChevronLeft, Code, BarChart2, ChevronDown, ChevronRight } from 'lucide-react';

interface ModelCallEvaluation {
  accuracy: number;
  relevance: number;
  fluency: number;
  notes: string;
}

interface ModelCall {
  id: string;
  model: string;
  tokens: number;
  latency: number;
  prompt: string;
  response: string;
  metadata: Record<string, any>;
  timestamp: string;
  evaluation?: ModelCallEvaluation;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  evaluation?: {
    accuracy: number;
    relevance: number;
    fluency: number;
    notes: string;
  };
  trace?: {
    calls: ModelCall[];
  };
}

interface ConversationViewProps {
  conversationId: string;
}

const ConversationView: React.FC<ConversationViewProps> = ({ conversationId }) => {
  const [messages, setMessages] = useState<Message[]>([
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
      timestamp: '2024-03-20 14:30:05',
      trace: {
        calls: [
          {
            id: 'call-1',
            model: 'gpt-4',
            tokens: 120,
            latency: 2.5,
            prompt: '请问这个产品的保修期是多久？',
            response: '您好！我们的产品保修期为12个月，从购买日期开始计算。在保修期内，如果产品出现非人为损坏的质量问题，我们将提供免费维修或更换服务。',
            metadata: {
              temperature: 0.7,
              top_p: 0.9,
              frequency_penalty: 0,
              presence_penalty: 0
            },
            timestamp: '2024-03-20 14:30:02'
          }
        ]
      }
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
      timestamp: '2024-03-20 14:31:05',
      trace: {
        calls: [
          {
            id: 'call-1',
            model: 'gpt-4',
            tokens: 80,
            latency: 1.8,
            prompt: '那保修期过了之后维修要收费吗？',
            response: '是的，保修期过后维修是需要收费的。',
            metadata: {
              temperature: 0.7,
              top_p: 0.9,
              frequency_penalty: 0,
              presence_penalty: 0
            },
            timestamp: '2024-03-20 14:31:02'
          },
          {
            id: 'call-2',
            model: 'gpt-4',
            tokens: 150,
            latency: 2.8,
            prompt: '那保修期过了之后维修要收费吗？\n\n是的，保修期过后维修是需要收费的。\n\n请补充说明维修政策和保养建议。',
            response: '是的，保修期过后维修是需要收费的。不过我们提供终身维修服务，维修费用会根据具体故障情况来定。建议您在使用过程中注意保养，这样可以延长产品的使用寿命。',
            metadata: {
              temperature: 0.7,
              top_p: 0.9,
              frequency_penalty: 0,
              presence_penalty: 0
            },
            timestamp: '2024-03-20 14:31:03'
          }
        ]
      }
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [evaluation, setEvaluation] = useState({
    accuracy: 0,
    relevance: 0,
    fluency: 0,
    notes: ''
  });
  const [activeTab, setActiveTab] = useState<'evaluation' | 'trace'>('evaluation');

  const handleMessageClick = (message: Message) => {
    if (message.role === 'assistant') {
      setSelectedMessage(message);
      setEvaluation(message.evaluation || {
        accuracy: 0,
        relevance: 0,
        fluency: 0,
        notes: ''
      });
    }
  };

  const handleRatingChange = (metric: string, value: number) => {
    setEvaluation(prev => ({
      ...prev,
      [metric]: value
    }));
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEvaluation(prev => ({
      ...prev,
      notes: e.target.value
    }));
  };

  const handleSaveEvaluation = () => {
    if (selectedMessage) {
      setMessages(prev => prev.map(msg => 
        msg.id === selectedMessage.id
          ? { ...msg, evaluation }
          : msg
      ));
      setSelectedMessage(null);
    }
  };

  const RatingStars = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          className={`p-1 rounded-full transition-colors ${
            star <= value ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          <Star size={20} fill={star <= value ? 'currentColor' : 'none'} />
        </button>
      ))}
    </div>
  );

  const ModelCallCard = ({ call, onEvaluationChange }: { 
    call: ModelCall; 
    onEvaluationChange: (callId: string, evaluation: ModelCallEvaluation) => void;
  }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [evaluation, setEvaluation] = useState<ModelCallEvaluation>(
      call.evaluation || {
        accuracy: 0,
        relevance: 0,
        fluency: 0,
        notes: ''
      }
    );

    const handleRatingChange = (metric: keyof ModelCallEvaluation, value: number) => {
      const newEvaluation = {
        ...evaluation,
        [metric]: value
      };
      setEvaluation(newEvaluation);
      onEvaluationChange(call.id, newEvaluation);
    };

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newEvaluation = {
        ...evaluation,
        notes: e.target.value
      };
      setEvaluation(newEvaluation);
      onEvaluationChange(call.id, newEvaluation);
    };

    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div 
          className="p-4 bg-gray-50 flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">
                调用 #{call.id.split('-')[1]} - {call.model}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {call.timestamp} · {call.tokens} tokens · {call.latency}s
              </div>
            </div>
          </div>
          {call.evaluation && (
            <div className="flex items-center space-x-1">
              <Star size={14} className="text-yellow-400" fill="currentColor" />
              <span className="text-xs text-gray-500">
                {call.evaluation.accuracy}
              </span>
            </div>
          )}
        </div>
        {isExpanded && (
          <div className="p-4 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Prompt</h4>
              <pre className="bg-gray-50 p-4 rounded-lg text-sm text-gray-900 overflow-x-auto whitespace-pre-wrap">
                {call.prompt}
              </pre>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Response</h4>
              <pre className="bg-gray-50 p-4 rounded-lg text-sm text-gray-900 overflow-x-auto whitespace-pre-wrap">
                {call.response}
              </pre>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">元数据</h4>
              <pre className="bg-gray-50 p-4 rounded-lg text-sm text-gray-900 overflow-x-auto">
                {JSON.stringify(call.metadata, null, 2)}
              </pre>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-4">调用评估</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      回答准确性
                    </label>
                    <RatingStars
                      value={evaluation.accuracy}
                      onChange={(value: number) => handleRatingChange('accuracy', value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      回答相关性
                    </label>
                    <RatingStars
                      value={evaluation.relevance}
                      onChange={(value: number) => handleRatingChange('relevance', value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      语言流畅度
                    </label>
                    <RatingStars
                      value={evaluation.fluency}
                      onChange={(value: number) => handleRatingChange('fluency', value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    评估备注
                  </label>
                  <textarea
                    value={evaluation.notes}
                    onChange={handleNotesChange}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="请输入评估备注..."
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleCallEvaluationChange = (callId: string, evaluation: ModelCallEvaluation) => {
    if (selectedMessage) {
      setMessages(prev => prev.map(msg => 
        msg.id === selectedMessage.id
          ? {
              ...msg,
              trace: msg.trace ? {
                ...msg.trace,
                calls: msg.trace.calls.map(call =>
                  call.id === callId
                    ? { ...call, evaluation }
                    : call
                )
              } : undefined
            }
          : msg
      ));
    }
  };

  return (
    <div className="h-full flex">
      <div 
        className={`flex-1 overflow-y-auto p-4 space-y-4 transition-opacity duration-300 ${
          selectedMessage ? 'opacity-50 pointer-events-none' : 'opacity-100'
        }`}
      >
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
                  className={`rounded-lg px-4 py-2 cursor-pointer ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                  onClick={() => handleMessageClick(message)}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    {message.timestamp}
                  </p>
                  {message.role === 'assistant' && message.evaluation && (
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="text-yellow-400" fill="currentColor" />
                      <span className="text-xs text-gray-500">
                        {message.evaluation.accuracy}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Page Panel */}
      <div 
        className={`fixed inset-y-0 right-0 left-[180px] bg-white z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          selectedMessage ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {selectedMessage && (
          <>
            <div className="h-16 border-b border-gray-200 flex items-center px-4">
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-gray-500 mr-4 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('evaluation')}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
                    activeTab === 'evaluation'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <BarChart2 size={16} />
                  <span className="text-sm">评估</span>
                </button>
                <button
                  onClick={() => setActiveTab('trace')}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-colors ${
                    activeTab === 'trace'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Code size={16} />
                  <span className="text-sm">系统 Trace</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {activeTab === 'evaluation' ? (
                <div className="max-w-3xl mx-auto p-8 space-y-8">
                  <div className="bg-gray-50 p-4 rounded-lg transition-colors">
                    <p className="text-sm text-gray-900">{selectedMessage.content}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          回答准确性
                        </label>
                        <RatingStars
                          value={evaluation.accuracy}
                          onChange={(value: number) => handleRatingChange('accuracy', value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          回答相关性
                        </label>
                        <RatingStars
                          value={evaluation.relevance}
                          onChange={(value: number) => handleRatingChange('relevance', value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          语言流畅度
                        </label>
                        <RatingStars
                          value={evaluation.fluency}
                          onChange={(value: number) => handleRatingChange('fluency', value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        评估备注
                      </label>
                      <textarea
                        value={evaluation.notes}
                        onChange={handleNotesChange}
                        rows={8}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="请输入评估备注..."
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-w-4xl mx-auto p-8 space-y-8">
                  {selectedMessage.trace && (
                    <>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg transition-colors">
                          <div className="text-sm font-medium text-gray-700 mb-1">总调用次数</div>
                          <div className="text-sm text-gray-900">{selectedMessage.trace.calls.length}</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg transition-colors">
                          <div className="text-sm font-medium text-gray-700 mb-1">总 Token 数</div>
                          <div className="text-sm text-gray-900">
                            {selectedMessage.trace.calls.reduce((sum, call) => sum + call.tokens, 0)}
                          </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg transition-colors">
                          <div className="text-sm font-medium text-gray-700 mb-1">总延迟</div>
                          <div className="text-sm text-gray-900">
                            {selectedMessage.trace.calls.reduce((sum, call) => sum + call.latency, 0).toFixed(1)}s
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {selectedMessage.trace.calls.map((call) => (
                          <ModelCallCard 
                            key={call.id} 
                            call={call}
                            onEvaluationChange={handleCallEvaluationChange}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {activeTab === 'evaluation' && (
              <div className="h-16 border-t border-gray-200 flex items-center justify-end px-8">
                <button
                  onClick={handleSaveEvaluation}
                  className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  保存评估
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ConversationView; 