import React, { useState } from 'react';
import axios from 'axios';

export default function SingleTransactionForm({ onPredictSuccess }) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSinglePredict = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Please type a transaction description first.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`http://localhost:8000/predict?description=${description}`)
      onPredictSuccess(response.data)
      setDescription('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'Prediction failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Log Single Expense</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        Type a single transaction description to watch the AI classify it instantly.
      </p>

      <form onSubmit={handleSinglePredict} className="flex gap-3">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., Starbucks Coffee London"
          className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-transparent text-sm focus:outline-none focus:border-violet-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-xl font-semibold text-white bg-violet-600 hover:bg-violet-700 disabled:bg-slate-400 transition-colors text-sm"
        >
          {loading ? 'Classifying...' : 'Classify ✨'}
        </button>
      </form>

      {error && <p className="text-red-500 text-sm font-medium mt-3">⚠️ {error}</p>}
    </div>
  );
}