import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, DollarSign, FileSearch, Lightbulb } from 'lucide-react';
import { BUSINESS_METRICS } from '../constants/businessMetrics';

interface StartPageProps {
  onStart: () => void;
}

export const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-sm bg-white/90 rounded-3xl shadow-2xl p-8 border border-white/20 text-center"
          >
            {/* Logo/Brand Section */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-10 h-10 text-blue-600" />
                <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  CORE Score™
                </h1>
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              See how much you're overpaying in taxes in 30 seconds
            </h2>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <FileSearch className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-gray-700 font-medium">See your revenue efficiency score</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-gray-700 font-medium">Discover missed tax opportunities</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-pink-600" />
                </div>
                <p className="text-gray-700 font-medium">Get your custom action plan</p>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={onStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center mx-auto mb-6"
            >
              Find Your Tax Savings →
            </motion.button>

            {/* Social Proof */}
            <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Average online business finds ${BUSINESS_METRICS.AVERAGE_SAVINGS.toLocaleString()} in annual tax savings
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};