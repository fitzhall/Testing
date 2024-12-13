import React from 'react';
import { Share2, Copy, Check } from 'lucide-react';

interface ResultsActionsProps {
  onStartOver: () => void;
  onShare: () => void;
  copied: boolean;
}

export const ResultsActions: React.FC<ResultsActionsProps> = ({
  onStartOver,
  onShare,
  copied,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        onClick={onStartOver}
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Start Over
      </button>
      <button
        onClick={onShare}
        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 mr-2 text-green-500" />
            Copied!
          </>
        ) : (
          <>
            {navigator.share ? (
              <Share2 className="w-4 h-4 mr-2" />
            ) : (
              <Copy className="w-4 h-4 mr-2" />
            )}
            {navigator.share ? 'Share Results' : 'Copy Results'}
          </>
        )}
      </button>
    </div>
  );
};