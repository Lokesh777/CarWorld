import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import "./AllChart.css"

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CarModelPieChart() {
  const [data, setData] = useState(    {
    labels: ['No Data Available'],
    datasets: [
      {
        label: '# of Votes',
        data: [0],
        backgroundColor: ['rgba(128,128,128, 0.2)'],
        borderColor: ['rgba(128,128,128, 1)'],
        borderWidth: 1,
      },
    ],
    }
  );

  const [ageRange, setAgeRange] = useState(null);
  const users = useContext(UserContext);

  useEffect(() => {
    const fetchData = () => {
      let filteredVehicles = users;
      if (ageRange) {
        const [minAge, maxAge] = ageRange.split('-').map(Number);
        filteredVehicles = filteredVehicles.filter(
          vehicle => vehicle.age >= minAge && vehicle.age < maxAge
        );
      }

      const vehicleMakers = {};
      filteredVehicles.forEach(vehicle => {
        const maker = vehicle.vehicle_make;
        if (vehicleMakers[maker]) {
          vehicleMakers[maker]++;
        } else {
          vehicleMakers[maker] = 1;
        }
      });

      setData({
        labels: Object.keys(vehicleMakers),
        datasets: [{
          data: Object.values(vehicleMakers),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#C9DE00',
            '#4CAF50',
            '#E7E9ED',
            '#8A2BE2',
          ],
        }],
      });
    };

    fetchData();
  }, [users, ageRange]);

  const handleAgeRangeChange = event => {
    setAgeRange(event.target.value);
  };

  return (
    <div className='ageContainer'>

        <div className='carAgeNav' >
            <div className='modelSelect' >
              <label htmlFor="ageRange">Filter by Age:</label>
                <select id="ageRange" onChange={handleAgeRangeChange}>
                <option value="">All Ages</option>
                <option value="18-25">18-25</option>
                <option value="25-30">25-30</option>
                <option value="30-35">30-35</option>
                <option value="35-40">35-40</option>
                </select>
            </div>
          
            <div className='ageHead'>
                <h2>  Car Model Pie Chart </h2>
            </div>
        </div>


      <div className='chartage'>
        <Pie data={data} />     
      </div>
      
    </div>
  );
}
