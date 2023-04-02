import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { faker } from '@faker-js/faker';
import { Bar } from 'react-chartjs-2';
import "./AllChart.css"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'User/Country Bar Chart',
    },
  },
  
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];



export default function BarChartByCountry() {
  const [data, setData] = useState(
{
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
})
  const users = useContext(UserContext);

  useEffect(() => {
    const fetchData = () => {
      const personCountry = {};
      const vehiclePerson = {};

      const country = users.map(e=>e.address)
      const userCountry=(country[6].split(",")[2])
       console.log(userCountry)

      users.forEach(vehicle => {
        const person = vehicle.username
        const maker = vehicle.address.split(",")[2];
       
        if (personCountry[maker]) {
          personCountry[maker]++;
        } else {
          personCountry[maker] = 1;
        }
        if (vehiclePerson[person]) {
          vehiclePerson[person]++;
        } else {
          vehiclePerson[person] = 1;
        }
      });

      setData(
      {
        labels:Object.keys(personCountry),
        datasets: [
          {
            label: 'Car User',
            data: Object.values(vehiclePerson),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'User Country',
            data: Object.values(personCountry),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      }
      
      );
    }
  
    fetchData();
  }, [users]);

  return (
  <div className='ageContainer'>
       <div className='carAgeNav'>
        <h1>Bar Chart by users country</h1>
       </div>
       <div>
        <Bar options={options} data={data} />
       </div>
  </div>
  )
}
