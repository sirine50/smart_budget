import React, { useState } from 'react';
import axios from 'axios';


export default function UploadForm({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setError('');
    setLoading(true);

    // 1. Pack the physical file into a network-ready envelope
    const formData = new FormData();
    formData.append('file', file); // 'file' must match your FastAPI argument name!

    try {
      
      const response = await axios.post('http://localhost:8000/upload-statement', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Essential header for file uploads
        },
      });

      
      onUploadSuccess(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || 'An error occurred during upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-2xl border bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
      <h2 className="text-lg font-semibold mb-2">Upload Bank Statement</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
        Select a .csv file to process through your trained AI model.
      </p>
      
      <form onSubmit={handleFileUpload} className="space-y-4">
        <input 
          type="file" 
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])} // Captures the specific file object
          className="block w-full text-sm text-slate-500 dark:text-slate-400 cursor-pointer"
        />
        
        <button 
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl font-semibold text-white bg-violet-600 hover:bg-violet-700 disabled:bg-slate-400 transition-colors"
        >
          {loading ? 'Processing...' : 'Analyze with AI ✨'}
        </button>
      </form>

      {error && <p className="text-red-500 text-sm font-medium mt-3">⚠️ {error}</p>}
    </div>
  );
}