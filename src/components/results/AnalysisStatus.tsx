import React, { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabase/client';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface AnalysisStatusProps {
  email: string;
}

interface AnalysisResult {
  status: string;
  analysis_text: string | null;
  error_message: string | null;
}

export const AnalysisStatus: React.FC<AnalysisStatusProps> = ({ email }) => {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('analysis_requests')
          .select('status, analysis_text, error_message')
          .eq('email', email)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error) throw error;
        setResult(data);
      } catch (error) {
        console.error('Error checking analysis status:', error);
      } finally {
        setLoading(false);
      }
    };

    // Check immediately
    checkStatus();

    // Poll every 5 seconds if pending or processing
    const interval = setInterval(() => {
      if (result?.status === 'pending' || result?.status === 'processing') {
        checkStatus();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [email, result?.status]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Clock className="animate-spin h-5 w-5 text-blue-500 mr-2" />
        <span>Checking analysis status...</span>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center p-4 text-red-600">
        <AlertCircle className="h-5 w-5 mr-2" />
        <span>No analysis request found</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-lg bg-white shadow-lg p-6"
    >
      <div className="flex items-center mb-4">
        {result.status === 'completed' ? (
          <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
        ) : result.status === 'failed' ? (
          <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
        ) : (
          <Clock className="h-6 w-6 text-blue-500 mr-2 animate-spin" />
        )}
        <h3 className="text-lg font-semibold">
          Analysis Status: {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
        </h3>
      </div>

      {result.status === 'completed' && result.analysis_text && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Analysis Results:</h4>
          <pre className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96">
            {JSON.stringify(JSON.parse(result.analysis_text), null, 2)}
          </pre>
        </div>
      )}

      {result.status === 'failed' && result.error_message && (
        <div className="mt-4 text-red-600">
          <h4 className="font-medium mb-2">Error:</h4>
          <p>{result.error_message}</p>
        </div>
      )}

      {(result.status === 'pending' || result.status === 'processing') && (
        <p className="text-gray-600 mt-2">
          Your analysis is being generated. This may take a few moments...
        </p>
      )}
    </motion.div>
  );
};