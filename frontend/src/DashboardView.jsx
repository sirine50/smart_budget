import React from 'react';

// This component receives the backend's "data" as a prop!
export default function DashboardView({ data }) {
  // If the user hasn't uploaded a file yet, data will be null, so we show nothing
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="p-6 rounded-2xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 flex flex-col justify-center items-center shadow-sm">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Transactions Analyzed</p>
          <p className="text-6xl font-black text-violet-600 dark:text-violet-400 mt-2">
            {data.total_transactions}
          </p>
          <p className="text-xs text-green-500 font-medium mt-3">✓ Processed by AI model</p>
        </div>

        <div className="p-6 rounded-2xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-md font-semibold mb-4 text-slate-800 dark:text-slate-200">Category Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(data.summary).map(([category, count]) => (
              <div key={category} className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{category}</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-400 font-bold">
                  {count} items
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
      <div className="p-6 rounded-2xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-md font-semibold mb-4 text-slate-800 dark:text-slate-200">All Processed Transactions</h3>
        <div className="divide-y divide-slate-100 dark:divide-slate-700 max-h-60 overflow-y-auto pr-2">
          {data.transactions.map((tx, idx) => (
            <div key={idx} className="py-3 flex justify-between items-center text-sm">
              <span className="font-mono text-slate-600 dark:text-slate-300">{tx.Description}</span>
              <span className="px-3 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                {tx.Predicted_Category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}