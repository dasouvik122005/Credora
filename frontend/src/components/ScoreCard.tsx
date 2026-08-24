import React, { useEffect, useState } from 'react';

interface ScoreCardProps {
  score: number;
  riskLevel: string;
}

export default function ScoreCard({ score, riskLevel }: ScoreCardProps) {
  // Animation state for the score counting up
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = score / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [score]);

  // Determine colors based on score
  let bgGradient = "from-emerald-400 to-emerald-600";
  let ringColor = "ring-emerald-100";
  let textColor = "text-emerald-600";
  let shadowColor = "shadow-emerald-200";
  let strokeColor = "#10b981"; // emerald-500
  
  if (score < 550) {
    bgGradient = "from-red-400 to-red-600";
    ringColor = "ring-red-100";
    textColor = "text-red-600";
    shadowColor = "shadow-red-200";
    strokeColor = "#ef4444";
  } else if (score < 700) {
    bgGradient = "from-amber-400 to-amber-600";
    ringColor = "ring-amber-100";
    textColor = "text-amber-600";
    shadowColor = "shadow-amber-200";
    strokeColor = "#f59e0b";
  }

  // Calculate SVG circle dash offset based on score (300 to 900 range)
  const normalizedScore = Math.max(0, Math.min(100, ((score - 300) / 600) * 100));
  const circleRadius = 90;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circleCircumference - (normalizedScore / 100) * circleCircumference;

  return (
    <div className="flex flex-col items-center justify-center w-full relative z-10">
      
      <div className="relative mb-6 group">
        {/* SVG Progress Gauge */}
        <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 200 200">
          {/* Background Track */}
          <circle 
            cx="100" cy="100" r={circleRadius} 
            stroke="currentColor" 
            strokeWidth="12" 
            fill="transparent" 
            className="text-slate-100" 
          />
          {/* Animated Progress Track */}
          <circle 
            cx="100" cy="100" r={circleRadius} 
            stroke={strokeColor} 
            strokeWidth="12" 
            fill="transparent" 
            strokeLinecap="round"
            strokeDasharray={circleCircumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Inner Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-bold text-slate-400 tracking-widest uppercase mb-1">Score</span>
          <span className={`text-6xl font-black ${textColor} tracking-tight`}>{displayScore}</span>
          <span className="text-sm font-medium text-slate-400 mt-1">out of 900</span>
        </div>
      </div>

      <div className={`px-8 py-3 rounded-full font-bold tracking-widest text-sm uppercase bg-gradient-to-r ${bgGradient} text-white shadow-xl ${shadowColor} hover:scale-105 transition-transform cursor-default`}>
        {riskLevel} RISK
      </div>
      
      <p className="text-sm text-slate-500 mt-8 text-center font-medium max-w-[250px]">
        Top 15% of profiles with similar alternative behaviors.
      </p>
    </div>
  );
}
