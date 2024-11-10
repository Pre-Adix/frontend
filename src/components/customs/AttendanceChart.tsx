"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import WraperCards from './WraperCards';

const data = [
  {
    name: "Lun",
    present: 60,
    absent: 40,
  },
  {
    name: "Mar",
    present: 70,
    absent: 60,
  },
  {
    name: "Mie",
    present: 90,
    absent: 75,
  },
  {
    name: "Jue",
    present: 90,
    absent: 75,
  },
  {
    name: "Vie",
    present: 65,
    absent: 55,
  },
];

const AttendanceChart = () => {
  return (
    <>
      <WraperCards title="Asistencia" className='h-full'>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            width={500}
            height={300}
            data={data}
            barSize={20}
          >
            <CartesianGrid strokeDasharray="3 3" stroke='#ddd' vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={{ fill: '#d1d5db' }} />
            <YAxis />
            <Tooltip />
            <Legend
              align='left'
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "10px", paddingBottom: "20px" }}
            />
            <Bar dataKey="present" fill="#2DD2FF" legendType='circle' radius={[10, 10, 0, 0]} />
            <Bar dataKey="absent" fill="#FFC229" legendType='circle' radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </WraperCards>
    </>
  )
}

export default AttendanceChart