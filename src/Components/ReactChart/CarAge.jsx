import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import "./AllChart.css"

ChartJS.register(ArcElement, Tooltip, Legend);

const ageRanges = [
  { label: 'All', value: 'all' },
  { label: '20 - 25', value: '20-25' },
  { label: '26 - 30', value: '26-30' },
  { label: '31 - 35', value: '31-35' },
  { label: '36 - 40', value: '36-40' },
  { label: '41 - 45', value: '41-45' },
  { label: '46 - 50', value: '46-50' },
];

export default function CarAgePieChart() {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: '# of Votes',
        data: [],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        borderWidth: 1,
      },
    ],
  });

  const users = useContext(UserContext);
  const [selectedAgeRange, setSelectedAgeRange] = useState('all');

  useEffect(() => {
    const fetchData = () => {
      let filteredUsers = users;
      if (selectedAgeRange !== 'all') {
        const [minAge, maxAge] = selectedAgeRange.split('-').map(Number);
        filteredUsers = users.filter(
          (user) => user.age >= minAge && user.age <= maxAge
        );
      }

      const vehicleAges = {};
      filteredUsers.forEach((vehicle) => {
        const age = vehicle.vehicle_year;
        if (vehicleAges[age]) {
          vehicleAges[age]++;
        } else {
          vehicleAges[age] = 1;
        }
      });

      setData({
        labels: Object.keys(vehicleAges),
        datasets: [
          {
            data: Object.values(vehicleAges),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
            ],
          },
        ],
      });
    };

    fetchData();
  }, [users, selectedAgeRange]);

  return (
    <div className='ageContainer'>

      <div className='carAgeNav' >
         
          <div className='ageSelect' >
            <label htmlFor="age-range">Age range:</label>
            <select
              id="age-range"
              value={selectedAgeRange}
              onChange={(e) => setSelectedAgeRange(e.target.value)}
            >
              {ageRanges.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
       
          <div>
            <h2> Pie Chart by Years</h2>
          </div>

      </div>

      <div className='chartage'>
        <Pie data={data} />     
      </div>

    </div>
  );
}
