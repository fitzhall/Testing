import React from 'react';

interface ScoreDisplayProps {
  score: number;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold">Your Creator Business Score</h3>
      <div className="text-4xl font-bold mt-3">
        {score}/100
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded">
        <p className="text-gray-700">
          {score < 70 
            ? "Your creator business has key optimization opportunities"
            : "Your creator business is well-structured, with room for advanced strategies"
          }
        </p>
      </div>
    </div>
  );
};