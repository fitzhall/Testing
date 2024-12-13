import React, { useState, useEffect } from 'react';
import { BarChart2, Settings } from 'lucide-react';
import { MetricsOverview } from './MetricsOverview';
import { UserJourneyPanel } from './UserJourneyPanel';
import { RevenueAnalysis } from './RevenueAnalysis';
import { BusinessInsightsPanel } from './BusinessInsightsPanel';
import { RequestsMonitor } from './RequestsMonitor';
import { ErrorsPanel } from './ErrorsPanel';
import { PromptManagement } from './PromptManagement';
import { getDashboardData } from '../../utils/admin/api';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'settings'>('dashboard');
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await getDashboardData();
      setDashboardData(data);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
          <div className="text-red-600 flex items-center">
            <span className="font-medium">Error loading dashboard:</span>
            <span className="ml-2">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'dashboard' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BarChart2 className="w-5 h-5 mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === 'settings' 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </button>
        </div>

        {activeTab === 'dashboard' ? (
          <div className="space-y-6">
            <MetricsOverview metrics={dashboardData?.stats} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UserJourneyPanel metrics={dashboardData?.journeyMetrics} />
              <RevenueAnalysis metrics={dashboardData?.revenueMetrics} />
              <BusinessInsightsPanel insights={dashboardData?.businessInsights} />
              <RequestsMonitor stats={dashboardData?.stats} />
            </div>

            <ErrorsPanel errors={dashboardData?.errors || []} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <PromptManagement />
          </div>
        )}
      </div>
    </div>
  );
};