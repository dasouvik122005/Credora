import React from 'react';
import { AlertTriangle, Lightbulb } from 'lucide-react';

interface RiskAnalysisProps {
  flags: string[];
  recommendations: string[];
  view: 'applicant' | 'lender';
}

export default function RiskAnalysis({ flags, recommendations, view }: RiskAnalysisProps) {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Risk Flags Section */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <AlertTriangle size={16} />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            {view === 'lender' ? 'Detected Risk Factors' : 'Attention Areas'}
          </h3>
        </div>
        
        {flags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {flags.map((flag, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-red-50 py-2 px-4 rounded-full border border-red-100/50 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-red-700 text-sm font-medium">{flag}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50 text-emerald-700 text-sm font-medium flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            No significant risk flags detected. Profile looks clean.
          </div>
        )}
      </div>

      <div className="w-full h-px bg-slate-100"></div>

      {/* Recommendations Section */}
      <div className="flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
            <Lightbulb size={16} />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            {view === 'lender' ? 'Automated Mitigation Steps' : 'Improvement Plan'}
          </h3>
        </div>
        
        <ul className="space-y-3">
          {recommendations.map((rec, idx) => (
            <li key={idx} className="flex items-start gap-3 bg-amber-50/50 p-4 rounded-2xl border border-amber-100/50 shadow-sm hover:bg-amber-50 transition-colors">
              <div className="w-6 h-6 rounded-full bg-amber-200/50 flex flex-shrink-0 items-center justify-center text-amber-700 mt-0.5">
                <span className="font-bold text-xs">✓</span>
              </div>
              <span className="text-slate-700 text-sm font-medium">{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
