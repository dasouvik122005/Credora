import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, BarChart3, TrendingUp } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
          Turn Your Financial Behaviour Into <span className="text-blue-600">Financial Opportunity</span>
        </h1>
        
        <div className="bg-slate-100/50 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto mb-10 shadow-sm">
          <p className="text-xl md:text-2xl text-slate-700 font-medium italic">
            "Bridging the Financial Inclusion Gap: Over 1.4B unbanked individuals are excluded from formal credit due to a lack of traditional bank records, leaving lenders with a multi-billion-dollar blind spot."
          </p>
        </div>

        <button 
          onClick={() => navigate('/assessment')}
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-4 px-10 rounded-full shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1"
        >
          Start Financial Assessment
        </button>
      </section>

      {/* Features */}
      <section className="w-full bg-white py-20 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">No Credit History Needed</h3>
            <p className="text-slate-600">We analyze your everyday financial behaviour to generate a reliable alternative credit score.</p>
          </div>
          
          <div className="text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <BarChart3 size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Instant Analysis</h3>
            <p className="text-slate-600">Upload your transaction history and get a comprehensive risk assessment within seconds.</p>
          </div>
          
          <div className="text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">Actionable Insights</h3>
            <p className="text-slate-600">Receive clear, actionable steps to improve your financial health and loan suitability.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
