import React from 'react';
import { ScoreDisplay } from './ScoreDisplay';
import { ConsultationCTA } from './ConsultationCTA';
import { ResourceOffer } from './ResourceOffer';

interface ResultsDisplayProps {
  score: number;
  calendarLink: string;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  score,
  calendarLink 
}) => {
  return (
    <div className="space-y-6">
      <ScoreDisplay score={score} />
      
      <div className="mt-8">
        <ConsultationCTA calendarLink={calendarLink} />
      </div>
      
      <ResourceOffer 
        resourceLink="/guide"
        resourceTitle="Top Tax Strategies for Creators in 2024"
      />
    </div>
  );
};