import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, FileText, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { generateAndSendAnalysis } from '../../utils/analysis/generateAIAnalysis';
import { TotalScoreResult } from '../../types/scoring';
import { trackEvent } from '../../utils/analytics/posthog';

interface DetailedAnalysisOfferProps {
  scoreResult: TotalScoreResult;
}

export const DetailedAnalysisOffer: React.FC<DetailedAnalysisOfferProps> = ({ scoreResult }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await generateAndSendAnalysis({
        email,
        scoreResult
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to generate analysis');
      }

      setIsSubmitted(true);
      trackEvent({
        name: 'detailed_analysis_requested',
        properties: { email }
      });
      toast.success('Analysis request submitted! Check your email soon.');
    } catch (error) {
      console.error('Error submitting analysis request:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit request');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-green-50 p-6 rounded-xl text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <Mail className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-green-900 mb-2">
          Your detailed analysis is on the way!
        </h3>
        <p className="text-green-700">
          Check your inbox soon for our comprehensive review and personalized recommendations.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-blue-100 p-3 rounded-full">
          <FileText className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Get Your Detailed Analysis
          </h3>
          <p className="text-gray-600">
            Receive a comprehensive review of your creator business
          </p>
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        <li className="flex items-center gap-2 text-gray-700">
          <ArrowRight className="w-4 h-4 text-blue-600" />
          In-depth revenue optimization strategies
        </li>
        <li className="flex items-center gap-2 text-gray-700">
          <ArrowRight className="w-4 h-4 text-blue-600" />
          Custom tax-saving recommendations
        </li>
        <li className="flex items-center gap-2 text-gray-700">
          <ArrowRight className="w-4 h-4 text-blue-600" />
          Personalized growth roadmap
        </li>
      </ul>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="you@example.com"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Get My Analysis'}
        </button>
      </form>
    </motion.div>
  );
};