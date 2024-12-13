import React from 'react';
import { CircularProgress } from './CircularProgress';
import { ScoreCard } from './ScoreCard';
import { PriorityImprovements } from './PriorityImprovements';
import { ComparisonChart } from './ComparisonChart';
import { DetailedAnalysisOffer } from '../results/DetailedAnalysisOffer';
import { TotalScoreResult } from '../../types/scoring';
import { DollarSign, Building2, TrendingUp, RotateCcw, Share2 } from 'lucide-react';
import { generatePriorityImprovements } from '../../utils/scoring/priority/generatePriorityImprovements';
import { calculatePotentialSavings } from '../../utils/scoring/priority/calculateSavings';

interface ResultsDashboardProps {
  scoreResult: TotalScoreResult;
  onStartOver?: () => void;
  onShare?: () => void;
  copied?: boolean;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ 
  scoreResult,
  onStartOver,
  onShare,
  copied
}) => {
  const totalPercentage = Math.round((scoreResult.totalScore / scoreResult.maxScore) * 100);
  const improvements = generatePriorityImprovements(scoreResult.formData, totalPercentage);
  const savingsBreakdown = calculatePotentialSavings(scoreResult.formData, totalPercentage);

  const getTierMessage = (score: number) => {
    if (score < 40) return "Critical: Your creator business needs immediate attention";
    if (score < 70) return "Your creator business has key optimization opportunities";
    return "Your creator business is well-structured, with room for advanced strategies";
  };

  return (
    <div className="space-y-12">
      {/* Header Actions */}
      <div className="flex justify-end gap-4">
        <button
          onClick={onShare}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
        >
          {copied ? (
            <span className="text-green-500">Copied!</span>
          ) : (
            <>
              <Share2 className="w-4 h-4 mr-2" />
              Share Results
            </>
          )}
        </button>
        <button
          onClick={onStartOver}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Start Over
        </button>
      </div>

      {/* Score Message */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">{getTierMessage(totalPercentage)}</h2>
        <p className="text-gray-600">
          Score: {totalPercentage}/100
        </p>
      </div>

      {/* Main Score Display */}
      <div className="flex flex-col items-center justify-center">
        <CircularProgress 
          score={scoreResult.totalScore} 
          maxScore={scoreResult.maxScore} 
        />
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ScoreCard
          title="Revenue Performance"
          score={scoreResult.revenueScore.score}
          maxScore={scoreResult.revenueScore.maxScore}
          icon={DollarSign}
          delay={0.3}
        />
        <ScoreCard
          title="Tax Efficiency"
          score={scoreResult.taxScore.score}
          maxScore={scoreResult.taxScore.maxScore}
          icon={Building2}
          delay={0.4}
        />
        <ScoreCard
          title="Growth Potential"
          score={scoreResult.growthScore.score}
          maxScore={scoreResult.growthScore.maxScore}
          icon={TrendingUp}
          delay={0.5}
        />
      </div>

      {/* Priority Improvements */}
      <PriorityImprovements
        improvements={improvements}
        annualSavings={savingsBreakdown.total}
        score={totalPercentage}
      />

      {/* Comparison Chart */}
      <ComparisonChart data={[
        {
          category: 'Revenue',
          userScore: (scoreResult.revenueScore.score / scoreResult.revenueScore.maxScore) * 100,
          industryAvg: 65,
          topPerformers: 85,
        },
        {
          category: 'Tax',
          userScore: (scoreResult.taxScore.score / scoreResult.taxScore.maxScore) * 100,
          industryAvg: 60,
          topPerformers: 90,
        },
        {
          category: 'Growth',
          userScore: (scoreResult.growthScore.score / scoreResult.growthScore.maxScore) * 100,
          industryAvg: 70,
          topPerformers: 95,
        }
      ]} />

      {/* Detailed Analysis Offer */}
      <div className="mt-12">
        <DetailedAnalysisOffer scoreResult={scoreResult} />
      </div>
    </div>
  );
};