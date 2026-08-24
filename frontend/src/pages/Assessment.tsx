import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Keyboard } from 'lucide-react';
import axios from 'axios';

export default function Assessment() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upload' | 'manual'>('upload');
  const [isLoading, setIsLoading] = useState(false);
  
  // Manual Input State
  const [manualData, setManualData] = useState({
    monthly_income: 25000,
    monthly_expenses: 16000,
    average_savings: 5000,
    utility_payment_consistency: 90,
    employment_type: 'Self-Employed'
  });

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      // Connect to local backend (for hackathon MVP)
      const res = await axios.post('http://127.0.0.1:8000/analyze-financial-profile', manualData);
      navigate('/results', { state: { data: res.data } });
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file first.');
      return;
    }
    setIsLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await axios.post('http://127.0.0.1:8000/analyze-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/results', { state: { data: res.data } });
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred processing the CSV.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Provide Financial Data</h2>
        <p className="text-slate-600">Choose how you want to provide data for the credit assessment.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200">
          <button
            className={`flex-1 py-4 text-center font-medium flex justify-center items-center gap-2 transition-colors ${activeTab === 'upload' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('upload')}
          >
            <Upload size={20} />
            Upload CSV
          </button>
          <button
            className={`flex-1 py-4 text-center font-medium flex justify-center items-center gap-2 transition-colors ${activeTab === 'manual' ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}
            onClick={() => setActiveTab('manual')}
          >
            <Keyboard size={20} />
            Manual Demo Input
          </button>
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm">
              {error}
            </div>
          )}

          {activeTab === 'upload' ? (
            <form onSubmit={handleFileUpload} className="flex flex-col items-center">
              <div className="w-full max-w-md">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-slate-400" />
                    <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-slate-500">CSV files only (Date, Amount, Type, Category)</p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".csv"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </label>
                {file && (
                  <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-100 flex justify-between items-center">
                    <span className="font-medium truncate">{file.name}</span>
                    <span>{(file.size / 1024).toFixed(1)} KB</span>
                  </div>
                )}
              </div>
              <button 
                type="submit" 
                disabled={isLoading || !file}
                className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Analyzing...' : 'Analyze CSV Data'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleManualSubmit} className="max-w-xl mx-auto space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Income (₹)</label>
                  <input 
                    type="number" 
                    value={manualData.monthly_income}
                    onChange={(e) => setManualData({...manualData, monthly_income: Number(e.target.value)})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Expenses (₹)</label>
                  <input 
                    type="number" 
                    value={manualData.monthly_expenses}
                    onChange={(e) => setManualData({...manualData, monthly_expenses: Number(e.target.value)})}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Average Savings (₹)</label>
                <input 
                  type="number" 
                  value={manualData.average_savings}
                  onChange={(e) => setManualData({...manualData, average_savings: Number(e.target.value)})}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Utility Payment Consistency (%)</label>
                <input 
                  type="range" 
                  min="0" max="100"
                  value={manualData.utility_payment_consistency}
                  onChange={(e) => setManualData({...manualData, utility_payment_consistency: Number(e.target.value)})}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-2"
                />
                <div className="text-right text-sm text-slate-500 mt-1">{manualData.utility_payment_consistency}%</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Employment Type</label>
                <select 
                  value={manualData.employment_type}
                  onChange={(e) => setManualData({...manualData, employment_type: e.target.value})}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                >
                  <option>Salaried</option>
                  <option>Self-Employed</option>
                  <option>Freelancer</option>
                  <option>Unemployed</option>
                </select>
              </div>

              <div className="pt-4 flex justify-center">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-full shadow-md transition-all disabled:opacity-50"
                >
                  {isLoading ? 'Analyzing Profile...' : 'Analyze Profile'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
