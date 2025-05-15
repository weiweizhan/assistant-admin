import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ChevronDown, ChevronRight, MessageSquare, Bot, Code } from 'lucide-react';

interface Metric {
  id: string;
  name: string;
  description: string;
  type: 'single' | 'multiple' | 'scale';
  options?: string[];
  required: boolean;
  category: string;
  scope: 'conversation' | 'message' | 'model_call';
}

const MetricsManagementPage: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([
    {
      id: '1',
      name: '对话完整性',
      description: '评估整个对话是否完整覆盖用户需求',
      type: 'scale',
      required: true,
      category: '基础指标',
      scope: 'conversation'
    },
    {
      id: '2',
      name: '对话连贯性',
      description: '评估对话的上下文连贯程度',
      type: 'scale',
      required: true,
      category: '基础指标',
      scope: 'conversation'
    },
    {
      id: '3',
      name: '回答准确性',
      description: '评估AI回答的准确程度',
      type: 'scale',
      required: true,
      category: '基础指标',
      scope: 'message'
    },
    {
      id: '4',
      name: '回答完整性',
      description: '评估AI回答是否完整覆盖问题要点',
      type: 'scale',
      required: true,
      category: '基础指标',
      scope: 'message'
    },
    {
      id: '5',
      name: '问题类型',
      description: '对话中涉及的问题类型',
      type: 'multiple',
      options: ['咨询', '投诉', '建议', '其他'],
      required: true,
      category: '分类指标',
      scope: 'conversation'
    },
    {
      id: '6',
      name: '模型响应时间',
      description: '评估模型调用的响应速度',
      type: 'scale',
      required: false,
      category: '性能指标',
      scope: 'model_call'
    },
    {
      id: '7',
      name: 'Token 使用量',
      description: '评估模型调用的资源消耗',
      type: 'scale',
      required: false,
      category: '性能指标',
      scope: 'model_call'
    }
  ]);

  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({
    '基础指标': true,
    '分类指标': true,
    '性能指标': true
  });

  const [editingMetric, setEditingMetric] = useState<Metric | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeScope, setActiveScope] = useState<'conversation' | 'message' | 'model_call'>('conversation');

  const categories = Array.from(new Set(metrics.map(m => m.category)));

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleAddMetric = () => {
    setShowAddModal(true);
  };

  const handleEditMetric = (metric: Metric) => {
    setEditingMetric(metric);
    setShowAddModal(true);
  };

  const handleDeleteMetric = (metricId: string) => {
    if (window.confirm('确定要删除这个指标吗？')) {
      setMetrics(prev => prev.filter(m => m.id !== metricId));
    }
  };

  const filteredMetrics = metrics.filter(metric => metric.scope === activeScope);

  return (
    <div className="h-full flex flex-col">
      <header className="bg-white shadow-sm z-10">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">测评指标管理</h1>
          <p className="mt-1 text-sm text-gray-500">
            管理对话评估的测评指标
          </p>
        </div>
      </header>

      <div className="flex-1 p-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Scope tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveScope('conversation')}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeScope === 'conversation'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <MessageSquare size={16} />
                  <span>多轮对话</span>
                </button>
                <button
                  onClick={() => setActiveScope('message')}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeScope === 'message'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Bot size={16} />
                  <span>单次回复</span>
                </button>
                <button
                  onClick={() => setActiveScope('model_call')}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeScope === 'model_call'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Code size={16} />
                  <span>模型调用</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Header actions */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddMetric}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus size={16} className="mr-2" />
                添加指标
              </button>
            </div>
          </div>

          {/* Metrics list */}
          <div className="bg-white rounded-lg shadow">
            {categories.map(category => {
              const categoryMetrics = filteredMetrics.filter(m => m.category === category);
              if (categoryMetrics.length === 0) return null;

              return (
                <div key={category} className="border-b border-gray-200 last:border-b-0">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
                  >
                    <h3 className="text-lg font-medium text-gray-900">{category}</h3>
                    {expandedCategories[category] ? (
                      <ChevronDown size={20} className="text-gray-500" />
                    ) : (
                      <ChevronRight size={20} className="text-gray-500" />
                    )}
                  </button>

                  {expandedCategories[category] && (
                    <div className="px-6 pb-4">
                      <div className="space-y-4">
                        {categoryMetrics.map(metric => (
                          <div
                            key={metric.id}
                            className="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="text-sm font-medium text-gray-900">
                                  {metric.name}
                                </h4>
                                {metric.required && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                    必填
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {metric.description}
                              </p>
                              {metric.options && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {metric.options.map(option => (
                                    <span
                                      key={option}
                                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                    >
                                      {option}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleEditMetric(metric)}
                                className="p-1 text-gray-400 hover:text-gray-500"
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteMetric(metric.id)}
                                className="p-1 text-gray-400 hover:text-red-500"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {editingMetric ? '编辑指标' : '添加指标'}
              </h3>
            </div>
            <div className="px-6 py-4">
              {/* Form fields will go here */}
              <p className="text-gray-500">表单内容将在这里实现</p>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingMetric(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingMetric(null);
                }}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MetricsManagementPage; 