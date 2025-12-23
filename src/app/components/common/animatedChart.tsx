'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect, useMemo } from 'react';

export function AnimatedChart({ dates, amounts }: { dates: any[], amounts: number[] }) {
  const [animatedData, setAnimatedData] = useState<any[]>([]);

  // Округляем ВСЕ amounts
  const roundedAmounts = useMemo(() => 
    amounts.map(amount => Math.round(amount * 100) / 100), 
    [amounts]
  );

  const fullChartData = useMemo(() => 
    dates.map((date, index) => ({
      date: new Date(date),
      amount: roundedAmounts[index],
      displayAmount: roundedAmounts[index]
    })), [dates, roundedAmounts]
  );

  // Автоматически рассчитываем интервал для оси X (максимум 10-15 меток)
  const xAxisInterval = useMemo(() => {
    const dataLength = fullChartData.length;
    if (dataLength <= 15) return 0; // Показывать все метки если их мало
    return Math.floor(dataLength / 12); // Показывать примерно 12 меток
  }, [fullChartData.length]);

  const simplifiedData = useMemo(() => {
    if (fullChartData.length <= 200) return fullChartData;
    const step = Math.ceil(fullChartData.length / 200);
    return fullChartData.filter((_, index) => index % step === 0);
  }, [fullChartData]);

  const xAxisDomain = useMemo(() => {
    if (fullChartData.length === 0) return [0, 0];
    const dates = fullChartData.map(d => d.date.getTime());
    return [Math.min(...dates), Math.max(...dates)];
  }, [fullChartData]);

  const yAxisDomain = useMemo(() => {
    if (fullChartData.length === 0) return [0, 0];
    const amounts = fullChartData.map(d => d.amount);
    return [Math.min(...amounts) * 0.95, Math.max(...amounts) * 1.05];
  }, [fullChartData]);

  useEffect(() => {
    setAnimatedData([]);
    
    if (simplifiedData.length > 0) {
      const baseInterval = 30;
      const maxTotalDuration = 5000;
      
      const calculatedDuration = simplifiedData.length * baseInterval;
      const actualDuration = Math.min(calculatedDuration, maxTotalDuration);
      const actualInterval = actualDuration / simplifiedData.length;

      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < simplifiedData.length) {
          setAnimatedData(prev => [...prev, simplifiedData[currentIndex]]);
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, actualInterval);

      return () => clearInterval(interval);
    }
  }, [simplifiedData]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: '2-digit', 
      year: 'numeric' 
    });
  };

  // Форматирование чисел для оси Y
  const formatYAxis = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    } else if (value >= 1) {
      return `$${value.toFixed(0)}`;
    } else {
      return `$${value}`;
    }
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart 
        data={animatedData}
        margin={{ left: 20, right: 20, top: 20, bottom: 50 }} // Увеличил bottom для наклонных меток
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          tickFormatter={(date) => formatDate(new Date(date))}
          domain={xAxisDomain}
          type="number"
          scale="time"
          interval={xAxisInterval} // Автоматический интервал для ограничения меток
          angle={-45}
          textAnchor="end"
          height={60} // Увеличил высоту для наклонных меток
          tick={{ fontSize: 11 }} // Уменьшил размер шрифта
        />
        <YAxis 
          domain={yAxisDomain}
          tickFormatter={formatYAxis}
          width={60}
          tick={{ fontSize: 12 }}
        />
        <Tooltip 
          labelFormatter={(date) => formatDate(new Date(date))}
          formatter={(value: number) => {
            const roundedValue = Math.round(value * 100) / 100;
            return [`$${roundedValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, 'Amount'];
          }}
        />
        <Line 
          type="monotone"
          dataKey="amount"
          stroke="#00E676" 
          strokeWidth={3}
          dot={false}
          isAnimationActive={false}
          connectNulls={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}