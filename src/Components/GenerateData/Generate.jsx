import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import "./Generator.css"

const UserTable = () => {
  const users = useContext(UserContext);

  return (
    <div >
      <table className='tableBox' >
     
        <thead>
          <tr>
            <th className='rowHead' >ID</th>
            <th className='rowHead' >Username</th>
            <th className='rowHead' >Address</th>
            <th className='rowHead' >Country</th>
            <th className='rowHead' >Age</th>
            <th className='rowHead' >Phone Number</th>
            <th className='rowHead' >Occupation</th>
            <th className='rowHead' >Vehicle Make</th>
            <th className='rowHead' >Vehicle Model</th>
            <th className='rowHead' >Vehicle Age</th>
            <th className='rowHead' >Vehicle Year</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td className='row' >{user.id}</td>
              <td className='row' >{user.username}</td>
              <td className='row' >{user.address}</td>
              <td className='row' >{user.country}</td>
              <td className='row' >{user.age}</td>
              <td className='row' >{user.phone_number}</td>
              <td className='row' >{user.occupation}</td>
              <td className='row' >{user.vehicle_make}</td>
              <td className='row' >{user.vehicle_model}</td>
              <td className='row' >{user.vehicle_age}</td>
              <td className='row' >{user.vehicle_year}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default UserTable;
