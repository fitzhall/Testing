import { useState } from 'react';
import { TotalScoreResult } from '../types/scoring';

export const useShare = (scoreResult: TotalScoreResult) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // Format the score details
    const revenuePercentage = Math.round((scoreResult.revenueScore.score / scoreResult.revenueScore.maxScore) * 100);
    const taxPercentage = Math.round((scoreResult.taxScore.score / scoreResult.taxScore.maxScore) * 100);
    const growthPercentage = Math.round((scoreResult.growthScore.score / scoreResult.growthScore.maxScore) * 100);
    const totalPercentage = Math.round((scoreResult.totalScore / scoreResult.maxScore) * 100);

    const shareText = `
Creator Business Score™: ${totalPercentage}%

Breakdown:
• Revenue Performance: ${revenuePercentage}%
• Tax Efficiency: ${taxPercentage}%
• Growth Potential: ${growthPercentage}%

Get your free creator business assessment at: ${window.location.href}
    `.trim();
    
    try {
      // Always use clipboard as the primary sharing method
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  return { copied, handleShare };
};