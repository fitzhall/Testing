import React, { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { AssessmentForm } from './components/assessment/AssessmentForm';
import { LoadingState } from './components/assessment/LoadingState';
import { ResultsDashboard } from './components/dashboard/ResultsDashboard';
import { StartPage } from './components/StartPage';
import { AdminDashboard } from './components/admin/Dashboard';
import { useFormValidation } from './hooks/useFormValidation';
import { useShare } from './hooks/useShare';
import { useAnalytics } from './hooks/useAnalytics';
import { calculateTotalScore } from './utils/scoring/totalScore';
import { TotalScoreResult } from './types/scoring';
import { RevenueSources, RevenueAmounts, revenueSourcesSchema, revenueAmountsSchema } from './types/revenue';
import { ArrowLeft } from 'lucide-react';

const STEPS = ['Revenue Information', 'Business Structure', 'Expense Tracking'];

const initialRevenueSources = revenueSourcesSchema.parse({});
const initialRevenueAmounts = revenueAmountsSchema.parse({});

function App() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [scoreResult, setScoreResult] = useState<TotalScoreResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentStep: 1,
    revenueSources: initialRevenueSources,
    revenueAmounts: initialRevenueAmounts,
    businessStructure: '',
    businessAge: '',
    employees: '',
    monthlyExpenses: '',
    expenseCategories: [] as string[],
    taxPlanning: ''
  });

  // Check if we're on the admin route
  const isAdminRoute = window.location.pathname === '/admin';

  const { errors, validate, markFieldAsTouched } = useFormValidation(formData);
  const { copied, handleShare } = useShare(scoreResult!);
  const analytics = useAnalytics({
    currentStep,
    stepName: STEPS[currentStep - 1],
    isComplete: !!scoreResult,
    score: scoreResult?.totalScore
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    analytics.trackFieldInteraction(field, typeof value, 'complete');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate({ ...formData, currentStep })) {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      const result = calculateTotalScore(formData);
      setScoreResult(result);
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (validate({ ...formData, currentStep })) {
      const nextStep = Math.min(currentStep + 1, STEPS.length);
      analytics.trackFormStep(currentStep, STEPS[currentStep - 1]);
      setCurrentStep(nextStep);
      setFormData(prev => ({ ...prev, currentStep: nextStep }));
    }
  };

  const handlePrevious = () => {
    const prevStep = Math.max(1, currentStep - 1);
    setCurrentStep(prevStep);
    setFormData(prev => ({ ...prev, currentStep: prevStep }));
  };

  const handleStartOver = () => {
    analytics.trackButtonClick('start_over', 'Start Over');
    setScoreResult(null);
    setCurrentStep(1);
    setStarted(false);
    setFormData({
      currentStep: 1,
      revenueSources: initialRevenueSources,
      revenueAmounts: initialRevenueAmounts,
      businessStructure: '',
      businessAge: '',
      employees: '',
      monthlyExpenses: '',
      expenseCategories: [],
      taxPlanning: ''
    });
    // Redirect to root path
    window.history.pushState({}, '', '/');
  };

  // Return admin dashboard if on admin route
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-4">
          <button
            onClick={handleStartOver}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Start
          </button>
        </div>
        <AdminDashboard />
      </div>
    );
  }

  if (!started) {
    return <StartPage onStart={() => {
      setStarted(true);
      analytics.trackButtonClick('start_assessment', 'Start Assessment');
    }} />;
  }

  return (
    <AppLayout>
      {isLoading ? (
        <LoadingState />
      ) : !scoreResult ? (
        <AssessmentForm
          formData={formData}
          currentStep={currentStep}
          errors={errors}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onNext={handleNext}
          onPrevious={handlePrevious}
          totalSteps={STEPS.length}
          onFieldTouch={markFieldAsTouched}
        />
      ) : (
        <ResultsDashboard 
          scoreResult={scoreResult}
          onStartOver={handleStartOver}
          onShare={() => {
            analytics.trackButtonClick('share_results', 'Share Results');
            handleShare();
          }}
          copied={copied}
        />
      )}
    </AppLayout>
  );
}

export default App;