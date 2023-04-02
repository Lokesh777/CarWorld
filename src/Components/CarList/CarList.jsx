import React, { useState, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import "./CarList.css"

const CarList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(10);
  const [selectedCar, setSelectedCar] = useState(null);
  const [carUsers, setCarUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const users = useContext(UserContext);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  
  const handleCarClick = async (car) => {
    setSelectedCar(car)    
    const result = users.filter(user => user.vehicle_make === car.vehicle_make);
    setCarUsers(result);
    togglePopup() 
  }
console.log(carUsers)

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = users.slice(indexOfFirstCar, indexOfLastCar);

  const renderCarList = () => {
    return currentCars.map((car, index) => {
      return (
        <p key={index} 
            onClick={() => handleCarClick(car)}>
            {index+1} {". "}
            {car.vehicle_make}
          </p>
      );
    });
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const renderSelectedCarUsers = () => {
    if (selectedCar) {
      if (carUsers.length > 0) {
        return (
          <div >
              <p className='carRightHeading'>
                Users with <span style={{color:"yellow"}}>
                  {selectedCar.vehicle_make}</span> 
              </p>
            <ul className='userListBtn'>
              {carUsers.map((user, index) => (
                <button key={index}>{user.username}</button>
              ))}
            </ul>
          </div>
        );
      } else {
        return <p className='carRightHeading'>No users found with {selectedCar.vehicle_make}</p>;
      }
    } else {
      return <p className='carRightHeading'>Select a car to view users</p>;
    }
  }

  const renderPagination = () => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(users.length / carsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div className='pagination'>
        {pageNumbers.map((number) => (
          <button  key={number} onClick={() => handlePageChange(number)}>{number}</button>
        ))}
      </div>
    );
  }

  return (
    <div className='carList'>
      <div className='carContainer'>
        
        <div className='carLeftList'>
          <h1>Car List</h1>
          <ul>{renderCarList()}</ul>

          {renderPagination()}
        </div>

        <div className='carListRight'>
        { users.map((ele)=>(
           <div className='carCard'>
              <img src={ele.vehicle_image} alt={ele.vehicle_make} />
              <h2>{ele.vehicle_make}</h2>
              <p>Model: {ele.vehicle_model}</p>
              <p>Age: {ele.vehicle_age} Years</p>
              <p>Category: {ele.category}</p>
              <p>Country: {ele.country}</p>
              <p>Launch on: {ele.vehicle_year}</p>
          </div>
         ))}
       </div>
       
       {isOpen && (
          <div className="popup">
            <div  >
              {renderSelectedCarUsers()}
            </div>
            <button onClick={togglePopup}>❌</button>
          </div>
        )}
     
      </div> 
    </div>
  );
}

export default CarList;
