import React, { useState } from 'react';
import UploadForm from './UploadForm';
import SingleTransactionForm from './handleSinglePredict';
import DashboardView from './DashboardView';

export default function App() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  // This handles what happens when a whole CSV is successfully processed
  const handleBulkSuccess = (data) => {
    setAnalyticsData(data);
  };

  // This handles when a single transaction is logged
  const handleSingleSuccess = (newData) => {
    // If we already have a dashboard showing, let's inject this new transaction into the view!
    if (analyticsData) {
      setAnalyticsData({
        ...analyticsData,
        total_transactions: analyticsData.total_transactions + 1,
        summary: {
          ...analyticsData.summary,
          [newData.predicted_category]: (analyticsData.summary[newData.predicted_category] || 0) + 1
        },
        transactions: [
          { Description: newData.original_description, Predicted_Category: newData.predicted_category },
          ...analyticsData.transactions
        ]
      });
    } else {
      // If the dashboard is empty, start it up with this single transaction
      setAnalyticsData({
        filename: "Manual Entry",
        total_transactions: 1,
        summary: { [newData.predicted_category]: 1 },
        transactions: [{ Description: newData.original_description, Predicted_Category: newData.predicted_category }]
      });
    }
  };

  return (
    <div className={darkMode ? 'dark bg-slate-900 text-white min-h-screen p-8' : 'bg-slate-50 text-slate-900 min-h-screen p-8'}>
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold tracking-wide">🧠 SmartBudget AI</h1>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg text-sm bg-slate-200 dark:bg-slate-800 font-medium transition-all"
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <main className="max-w-4xl mx-auto space-y-8">
        {/* Our input forms sit side-by-side or stacked */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UploadForm onUploadSuccess={handleBulkSuccess} />
          <SingleTransactionForm onPredictSuccess={handleSingleSuccess} />
        </div>

        {/* The Dashboard view shows up automatically once data exists */}
        <DashboardView data={analyticsData} />
      </main>
    </div>
  );
}