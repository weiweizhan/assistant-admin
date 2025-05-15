import React, { useState } from 'react';
import { Conversation, EvaluationMetrics } from '../../types/types';
import { Save, HelpCircle } from 'lucide-react';

interface EvaluationPanelProps {
  conversation: Conversation;
}

const EvaluationPanel: React.FC<EvaluationPanelProps> = ({ conversation }) => {
  const [metrics, setMetrics] = useState<EvaluationMetrics>({
    relevance: conversation.evaluation?.relevance ?? 0,
    accuracy: conversation.evaluation?.accuracy ?? 0,
    helpfulness: conversation.evaluation?.helpfulness ?? 0,
    clarity: conversation.evaluation?.clarity ?? 0,
    safety: conversation.evaluation?.safety ?? 0,
    overall: conversation.evaluation?.overall ?? 0,
    comments: conversation.evaluation?.comments ?? '',
  });

  const handleMetricChange = (metric: keyof EvaluationMetrics, value: number | string) => {
    setMetrics((prev) => ({
      ...prev,
      [metric]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('提交评估:', metrics);
    // Here you would typically save this to your backend
    alert('评估提交成功！');
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="sticky top-0 bg-white px-6 py-3 border-b border-gray-200 z-10">
        <h2 className="text-lg font-medium text-gray-900">评估</h2>
        <p className="text-sm text-gray-500">对此对话的质量进行评分</p>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-4 space-y-6">
        {/* Rating metrics */}
        <div className="space-y-4">
          <MetricSlider
            label="相关性"
            description="助手的回答与用户问题的相关程度"
            value={metrics.relevance}
            onChange={(value) => handleMetricChange('relevance', value)}
          />
          
          <MetricSlider
            label="准确性"
            description="助手回答的事实准确程度"
            value={metrics.accuracy}
            onChange={(value) => handleMetricChange('accuracy', value)}
          />
          
          <MetricSlider
            label="帮助性"
            description="助手在解决用户问题方面的帮助程度"
            value={metrics.helpfulness}
            onChange={(value) => handleMetricChange('helpfulness', value)}
          />
          
          <MetricSlider
            label="清晰度"
            description="助手回答的清晰度和可理解程度"
            value={metrics.clarity}
            onChange={(value) => handleMetricChange('clarity', value)}
          />
          
          <MetricSlider
            label="安全性"
            description="助手回答的安全性和适当性"
            value={metrics.safety}
            onChange={(value) => handleMetricChange('safety', value)}
          />
          
          <MetricSlider
            label="整体质量"
            description="助手表现的整体质量"
            value={metrics.overall}
            onChange={(value) => handleMetricChange('overall', value)}
          />
        </div>

        {/* Comments section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            评论与反馈
          </label>
          <textarea
            value={metrics.comments}
            onChange={(e) => handleMetricChange('comments', e.target.value)}
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="添加关于对话的详细反馈..."
          ></textarea>
        </div>

        {/* Additional evaluation options */}
        <div className="space-y-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">问题类别</h3>
            <div className="grid grid-cols-2 gap-2">
              {['幻觉', '误解', '离题', '不完整', '有害', '偏见'].map((issue) => (
                <label key={issue} className="flex items-center">
                  <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4 mr-2" />
                  <span className="text-sm text-gray-700">{issue}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              建议改进
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">选择类别</option>
              <option value="prompt">优化提示词</option>
              <option value="knowledge">更新知识库</option>
              <option value="reasoning">改进推理能力</option>
              <option value="safety">增强安全性</option>
              <option value="other">其他</option>
            </select>
          </div>
        </div>

        {/* Submit button */}
        <div className="pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <Save size={18} className="mr-2" />
            提交评估
          </button>
        </div>
      </form>
    </div>
  );
};

interface MetricSliderProps {
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
}

const MetricSlider: React.FC<MetricSliderProps> = ({
  label,
  description,
  value,
  onChange,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          <label className="block text-sm font-medium text-gray-700 mr-1">
            {label}
          </label>
          <div className="relative group">
            <HelpCircle size={14} className="text-gray-400 cursor-help" />
            <div className="absolute left-0 bottom-full mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity z-10">
              {description}
            </div>
          </div>
        </div>
        <span className="text-sm font-semibold text-gray-900">{value}/5</span>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between w-full text-xs text-gray-500">
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>
    </div>
  );
};

export default EvaluationPanel;