"use client"
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaEllipsisH } from "react-icons/fa";
const data = [
    {
        name: 'Mon',
        absent: 4000,
        present: 2400,
    },
    {
        name: 'Tue',
        absent: 3000,
        present: 1398,
    },
    {
        name: 'Wed',
        absent: 2000,
        present: 9800,
    },
    {
        name: 'Thur',
        absent: 2780,
        present: 3908,
        amt: 2000,
    },
    {
        name: 'Fri',
        absent: 1890,
        present: 4800,
    },
    {
        name: 'sat',
        absent: 2390,
        present: 3800,
    },
    {
        name: 'sun',
        absent: 3490,
        present: 4300,
    },
];

const Attendance = () => {
    return (
        <div className='bg-white rounded-lg p-4 h-full '>
            {/* title */}
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>Attendance</h1>
                <FaEllipsisH />
            </div>
            <div className='relative w-full h-[75%]'>
                <ResponsiveContainer width="100%" height="120%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                       barSize={20}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd'/>
                        <XAxis dataKey="name" axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false}/>
                        <YAxis axisLine={false} tick={{fill:"#d1d5db"}} tickLine={false}/>
                        <Tooltip />
                        <Legend align='left' verticalAlign='top' wrapperStyle={{paddingTop:"20px", paddingBottom:"40px"}}/>
                        <Bar dataKey="present" fill="#FAE27C" legendType='circle' radius={[10,10,0,0]}/>
                        <Bar dataKey="absent" fill="#C3EBFA" legendType='circle' radius={[10,10,0,0]}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
export default Attendance;