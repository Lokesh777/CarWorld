import React from 'react';
import Navbar from './AllRoute/Navbar';
import { UserProvider } from './Context/UserContext';
import { Route, Routes } from "react-router-dom"
import UserTable from './Components/GenerateData/Generate';
import BarChartByCountry from './Components/ReactChart/BarChart';
import UserList from './Components/UserList/UserList';
import CarAgePieChart from './Components/ReactChart/CarAge';
import CarList from './Components/CarList/CarList';
import CarModelPieChart from './Components/ReactChart/ModelPieChart';


function App() {
  return (
    <div>
      
         <Navbar />
       <UserProvider>
          <Routes>
              <Route path='/'element={<UserList />} />
              <Route path='/carlist' element={<CarList />} />
              <Route path='/cardata' element={<UserTable />} />
              <Route path='/barchart'element={<BarChartByCountry />} />
              <Route path='/carmodel'element={<CarModelPieChart />} />
              <Route path='/carage'element={<CarAgePieChart />} />
          </Routes>
       </UserProvider>
       
     
    </div>
  );
}

export default App;
