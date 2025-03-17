"use client"
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import { FaEllipsisH } from "react-icons/fa";
const data = [
    {
        name: 'Total',
        count: 106,
        fill: 'white',
    },
    {
        name: 'Girls',
        count: 50,
        fill: '#FAE27C',
    },
    {
        name: 'Boys',
        count: 45,
        fill: '#C3EBFA',
    },
];

const CountChart = () => {
    return (
        <div className='bg-white rounded-xl w-full h-full p-4'>
            {/* title */}
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>Staff</h1>
                <FaEllipsisH />
            </div>

            {/* chart */}
            <div className='relative w-full h-[75%]'>
                <ResponsiveContainer >
                    <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
                        <RadialBar                           
                            label={{ position: 'insideStart', fill: '#fff' }}
                            background
                            dataKey="count"
                        />                       
                    </RadialBarChart>
                </ResponsiveContainer>
                
            </div>
            {/* bottom */}
            <div className='flex justify-center gap-16'>
                <div className='flex flex-col gap-1'>
                    <div className='w-5 h-5 bg-sky-100 rounded-full'>
                        <h1 className='font-bold'>1,234</h1>
                        <h2 className='text-xs text-gray-300'>Boys 50%</h2>
                    </div>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='w-5 h-5 bg-yellow-200 rounded-full'>
                        <h1 className='font-bold'>1,234</h1>
                        <h2 className='text-xs text-gray-300'>Girls 45%</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CountChart;