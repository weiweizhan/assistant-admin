import React, { useState } from 'react';
import { Star, Save } from 'lucide-react';

interface EvaluationPanelProps {
  conversationId: string;
}

const EvaluationPanel: React.FC<EvaluationPanelProps> = ({ conversationId }) => {
  const [evaluation, setEvaluation] = useState({
    accuracy: 0,
    completeness: 0,
    relevance: 0,
    fluency: 0,
    notes: ''
  });

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

  const handleSave = () => {
    // TODO: 保存评估结果到后端
    console.log('Saving evaluation:', evaluation);
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

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">对话评估</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            回答准确性
          </label>
          <RatingStars
            value={evaluation.accuracy}
            onChange={(value) => handleRatingChange('accuracy', value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            回答完整性
          </label>
          <RatingStars
            value={evaluation.completeness}
            onChange={(value) => handleRatingChange('completeness', value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            回答相关性
          </label>
          <RatingStars
            value={evaluation.relevance}
            onChange={(value) => handleRatingChange('relevance', value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            语言流畅度
          </label>
          <RatingStars
            value={evaluation.fluency}
            onChange={(value) => handleRatingChange('fluency', value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            评估备注
          </label>
          <textarea
            value={evaluation.notes}
            onChange={handleNotesChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="请输入评估备注..."
          />
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save size={16} className="mr-2" />
          保存评估
        </button>
      </div>
    </div>
  );
};

export default EvaluationPanel; 