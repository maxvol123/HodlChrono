'use client';
import { getCryptoHistory } from "@/actions/crypto-data";
import { DatePicker } from "@heroui/date-picker";
import { Button } from "@heroui/react";
import { useState } from "react";
import { parseDate, CalendarDate } from "@internationalized/date";
import ChipGreen from "../components/common/chip-green";
import {getLocalTimeZone, today} from "@internationalized/date";
import { AnimatedChart } from "../components/common/animatedChart";

export function Simulator() {
  const [startDate, setStartDate] = useState<CalendarDate>(parseDate('2024-01-01'));
  const [endDate, setEndDate] = useState<CalendarDate>(parseDate(new Date().toISOString().split('T')[0]));
  const [interval, setInterval] = useState<number>(7); // 1, 7, 30
  const [chartdate, setChartDate] = useState<Date[]>([]);
  const [chartamount, setChartAmount] = useState<number[]>([]);
  const [totalinvest, setTotalinvest] = useState<number>();
  const [totalworth, setTotalworth] = useState<number>();
  const [investmentamount, setInvestmentamount] = useState<number>(100);



  const handleStartDateChange = (value: CalendarDate | null) => {
    if (value) setStartDate(value);
  };

  const handleEndDateChange = (value: CalendarDate | null) => {
    if (value) setEndDate(value);
  };

  const fetchChartData = async () => {
    const start = new Date(startDate.year, startDate.month - 1, startDate.day);
    const end = new Date(endDate.year, endDate.month - 1, endDate.day);
    
    const result = await getCryptoHistory({
      startDate: start,
      endDate: end,
      symbol: 'BTC'
    });
    if (result.success && result.data) {
      const filteredData = result.data.filter((_, index) => index % interval === 0);
      let totalBTC:number = 0
      let ArrayAmount:any = []
      let ArrayDate:any = []
      
      filteredData.map((el)=>{
        totalBTC = totalBTC + investmentamount/el.open
        ArrayAmount = ArrayAmount.concat(Math.floor(totalBTC*el.open))
        ArrayDate = ArrayDate.concat(new Date(`${el.date}`))
    })
    console.log(totalBTC);
    console.log(ArrayAmount[ArrayAmount.length-1]);

    console.log(ArrayAmount[ArrayAmount.length-1]);
    
    setTotalworth(ArrayAmount[ArrayAmount.length-1])
    
    setTotalinvest((ArrayAmount.length+1)*investmentamount)
    
const shortDates = ArrayDate.map((dateString:any) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit', 
    year: 'numeric'
  });
});
      
setChartAmount(ArrayAmount)
setChartDate(shortDates)

    }
  };

  return (
    <div>
        <div className="w-full flex justify-center mt-10">
        <ChipGreen>Simulate. Learn. Grow.</ChipGreen>
        </div>
        <div className="w-full text-center pt-10" >
        
        <div className="text-3xl">Crypto Investment Calculator</div>
        <div className="mt-3 text-xl">See how your Bitcoin investment could grow over time. Enter your details and calculate your potential returns!</div>
      </div>
        <div className="p-10 border border-[#00E676] mt-5 center focus:border-[#00E676] focus:ring-0 focus:outline-none">

     <div>
        <div className="flex">
        <div className="w-[50%] flex items-center">Start Date</div>
        <DatePicker
        showMonthAndYearPickers 
          className="w-38 h-[56px] border-2 rounded-2xl border-green-500 focus:border-[#00E676] focus:ring-0 focus:outline-none" 
          label="Start Date" 
          value={startDate}
          onChange={handleStartDateChange}
          maxValue={today(getLocalTimeZone())}
          minValue={parseDate('2017-08-17')}
        />
        </div>
        <div className="flex mt-7">
        <div className="w-[50%] flex items-center">End Date</div>
        <DatePicker 
        showMonthAndYearPickers 
          className="w-38 h-[56px] border-2 rounded-2xl border-green-500 focus:border-[#00E676] focus:ring-0 focus:outline-none"
          label="End Date" 
          value={endDate}
          onChange={handleEndDateChange}
          maxValue={today(getLocalTimeZone())}
          minValue={parseDate('2017-08-17')}
        />
        </div>
        <div className="flex mt-7">
        <div className="w-[50%] flex items-center">Investment frequency</div>
                <select className="w-38 h-[56px] text-center border-2 rounded-2xl border-[#00E676] no-arrow focus:border-[#00E676] focus:ring-0 focus:outline-none" value={interval} onChange={(e) => setInterval(Number(e.target.value))}>
          <option value={7}>Every Week</option>
          <option value={30}>Every Month</option>
        </select>
        </div>

                <div className="flex mt-7">
        <div className="w-[50%] flex items-center">Investment amount per period</div>
                <input type="number"
                value={investmentamount || ''}
                onChange={(e) => setInvestmentamount(+e.target.value)}
                className="w-38 h-14 text-center border-2 rounded-2xl border-green-500 no-arrow focus:border-[#00E676] focus:ring-0 focus:outline-none"
/>
          
        </div>
        <Button className="bg-[#00E676] text-white border rounded-xl text-medium w-[250px] h-[43px] mt-10" onPress={fetchChartData}>
          Calculate
        </Button>
      </div>
      
      <div className="flex justify-center">
        <AnimatedChart dates={chartdate} amounts={chartamount}/>
      </div>
<div className="">Total invested: {totalinvest?.toFixed(1)}$</div>
<div className="">Total Amount: {totalworth?.toFixed(1)}$</div>
        </div>
    </div>
  );
}

export default Simulator;





 