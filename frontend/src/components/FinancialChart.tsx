import React from 'react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';

interface FinancialChartProps {
  data: any;
}

export default function FinancialChart({ data }: FinancialChartProps) {
  const chartData = [
    { subject: 'Income', A: data.income_stability, fullMark: 100 },
    { subject: 'Savings', A: data.savings_behavior, fullMark: 100 },
    { subject: 'Payments', A: data.payment_discipline, fullMark: 100 },
    { subject: 'Cashflow', A: data.cashflow_stability, fullMark: 100 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
        <defs>
          <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
          </linearGradient>
        </defs>
        
        <PolarGrid stroke="#f1f5f9" strokeWidth={2} />
        
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fill: '#64748b', fontSize: 13, fontWeight: 700 }} 
        />
        
        <PolarRadiusAxis 
          angle={30} 
          domain={[0, 100]} 
          tick={false} 
          axisLine={false} 
        />
        
        <Tooltip 
          contentStyle={{ 
            borderRadius: '12px', 
            border: 'none', 
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            fontWeight: 'bold',
            color: '#1e293b'
          }}
          itemStyle={{ color: '#3b82f6' }}
        />
        
        <Radar 
          name="Behavior Score" 
          dataKey="A" 
          stroke="#4f46e5" 
          strokeWidth={3} 
          fill="url(#colorA)" 
          fillOpacity={1} 
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
