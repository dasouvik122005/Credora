import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import ScoreCard from '../components/ScoreCard';
import FinancialChart from '../components/FinancialChart';
import RiskAnalysis from '../components/RiskAnalysis';
import { Building2, User, ChevronLeft } from 'lucide-react';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [view, setView] = useState<'applicant' | 'lender'>('applicant');
  
  const data = location.state?.data;

  if (!data) {
    return <Navigate to="/assessment" />;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <button 
            onClick={() => navigate('/assessment')} 
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium self-start md:self-auto"
          >
            <ChevronLeft size={20} />
            Back to Assessment
          </button>

          {/* Floating View Toggle Pill */}
          <div className="bg-white/70 backdrop-blur-md p-1.5 rounded-full shadow-sm border border-slate-200/60 inline-flex">
            <button
              onClick={() => setView('applicant')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${view === 'applicant' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <User size={18} />
              Applicant View
            </button>
            <button
              onClick={() => setView('lender')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${view === 'lender' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <Building2 size={18} />
              Lender View
            </button>
          </div>
        </div>

        {/* Views */}
        {view === 'applicant' ? (
          /* APPLICANT VIEW: Consumer-friendly Bento Box */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Main Score Area */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 h-full flex flex-col justify-center items-center relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -ml-10 -mb-10 opacity-60"></div>
                
                <ScoreCard score={data.credit_score} riskLevel={data.risk_level} />
              </div>
            </div>

            {/* Charts and Analysis */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-800">Financial Core Metrics</h3>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <MetricBar label="Income Stability" value={data.income_stability} color="bg-blue-500" />
                  <MetricBar label="Savings Behavior" value={data.savings_behavior} color="bg-indigo-500" />
                  <MetricBar label="Payment Discipline" value={data.payment_discipline} color="bg-emerald-500" />
                  <MetricBar label="Cashflow Stability" value={data.cashflow_stability} color="bg-amber-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 min-h-[300px] flex flex-col">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Behavior Analysis</h3>
                  <div className="flex-grow">
                    <FinancialChart data={data} />
                  </div>
                </div>

                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 min-h-[300px] overflow-y-auto">
                  <RiskAnalysis flags={data.risk_flags} recommendations={data.recommendations} view={view} />
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* LENDER VIEW: Clean, White SaaS Dashboard */
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200 pb-6 mb-8 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Underwriting Assessment Report</h2>
                  <p className="text-slate-500 mt-1">Generated via Stateless Behavioral Analysis</p>
                </div>
                <div className="text-left md:text-right">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-md uppercase tracking-widest border border-slate-200">
                    ID: ANONYMOUS_SESSION_99X
                  </div>
                  <p className="text-slate-500 text-sm mt-2">{new Date().toLocaleString()}</p>
                </div>
              </div>

              {/* Top Summary Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 flex flex-col justify-center items-center text-center">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Final Score</p>
                  <div className="text-5xl font-black text-slate-900 mb-2">{data.credit_score}</div>
                  <div className="text-sm font-medium text-slate-500">out of 900</div>
                </div>

                <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 flex flex-col justify-center items-center text-center">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Risk Categorization</p>
                  <div className={`text-2xl font-black mb-2 uppercase ${data.risk_level === 'Low' ? 'text-emerald-600' : data.risk_level === 'Medium' ? 'text-amber-600' : 'text-red-600'}`}>
                    {data.risk_level}
                  </div>
                  <div className="text-sm font-medium text-slate-500">Automated Decisioning</div>
                </div>
                
                <div className="md:col-span-2 bg-slate-50 p-6 rounded-lg border border-slate-200 flex flex-col justify-center text-center md:text-left">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Underwriting Recommendation</p>
                  {data.risk_level === 'Low' ? (
                    <p className="text-lg font-medium text-slate-800">Profile meets criteria for standard prime lending products. No significant red flags detected in cashflow analysis.</p>
                  ) : data.risk_level === 'Medium' ? (
                    <p className="text-lg font-medium text-slate-800">Profile is borderline. Manual review of income stability and expense patterns is highly recommended before approval.</p>
                  ) : (
                    <p className="text-lg font-medium text-slate-800">Profile exhibits high risk factors. Not recommended for standard lending products without additional collateral or verification.</p>
                  )}
                </div>
              </div>

              {/* Detailed Metrics Table */}
              <div className="mb-10">
                <h3 className="font-bold text-slate-900 mb-4 text-lg">Behavioral Data Indices</h3>
                <div className="overflow-hidden border border-slate-200 rounded-lg">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Metric</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Value</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-1/2">Visual Indicator</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      <SaaSRow label="Income Stability Index" value={data.income_stability} />
                      <SaaSRow label="Savings Buffer Ratio" value={data.savings_behavior} />
                      <SaaSRow label="Payment Consistency" value={data.payment_discipline} />
                      <SaaSRow label="Cashflow Volatility" value={data.cashflow_stability} />
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Flags Area */}
              <div>
                <h3 className="font-bold text-slate-900 mb-4 text-lg">System Generated Flags</h3>
                {data.risk_flags.length > 0 ? (
                  <div className="border border-red-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-red-200">
                      <tbody className="bg-white divide-y divide-red-100">
                        {data.risk_flags.map((flag: string, idx: number) => (
                          <tr key={idx}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600 w-10">FLAG</td>
                            <td className="px-6 py-4 text-sm text-slate-700">{flag}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 font-medium">
                    0 system flags generated for this profile.
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Small helper component for the progress bars
function MetricBar({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="flex flex-col group">
      <div className="flex justify-between items-end mb-2">
        <p className="text-sm font-semibold text-slate-500">{label}</p>
        <p className="text-lg font-bold text-slate-800">{value}%</p>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden relative">
        <div 
          className={`absolute top-0 left-0 h-full rounded-full ${color} transition-all duration-1000 ease-out`} 
          style={{ width: `${value}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-white/20 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        </div>
      </div>
    </div>
  );
}

// Helper for Lender SaaS view rows
function SaaSRow({ label, value }: { label: string, value: number }) {
  const getIndicatorColor = (val: number) => {
    if (val >= 80) return 'bg-emerald-500';
    if (val >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{label}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-slate-600">{value} / 100</td>
      <td className="px-6 py-4 whitespace-nowrap w-1/2">
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div className={`${getIndicatorColor(value)} h-2 rounded-full`} style={{ width: `${value}%` }}></div>
        </div>
      </td>
    </tr>
  );
}

