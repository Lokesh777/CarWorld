import React, { useContext, useState } from 'react';
import { List, AutoSizer, WindowScroller } from 'react-virtualized';
import { UserContext } from '../../Context/UserContext';
import "./UserList.css";

const UserList = () => {
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const users = useContext(UserContext);
  const lengths=(users.length);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  

  const handleUserClick = (user) => {
    setSelectedUser(user);
    togglePopup() 
  };

  const rowRenderer = ({ key, index, style }) => {
    const user = users[index];
    return (
      <div key={key} style={style} className='userLeft' onClick={() => handleUserClick(user)}>
        <div>{user.username}</div>
        <div>Age: {user.age}</div>
      </div>
    );
  };
console.log(users);
  return (
    <div className='userList'>

      <div className='userListLeft' >
        <WindowScroller>
          {({ height, isScrolling, registerChild, scrollTop }) => (
            <AutoSizer disableHeight>
              {({ width }) => (
                <List
                  ref={registerChild}
                  width={width}
                  height={height}
                  isScrolling={isScrolling}
                  scrollTop={scrollTop}
                  rowHeight={60}
                  rowRenderer={rowRenderer}
                  rowCount={lengths}
                />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      </div>

     <div className='usersRight'>  
       <h1>Car Users List</h1>

       <div className='userListRight'>
        { users.map((ele)=>(
           <div className='userCard'>
              <img src={ele.avatar} alt={ele.username} />
              <h2>{ele.username}</h2>
              <p>Occupation: {ele.occupation}</p>
              <p>Age: {ele.age} Years</p>
              <p>Phone: {ele.phone_number}</p>
              <p>Address: {ele.address}</p>
              <p>Car: {ele.vehicle_make} - {ele.vehicle_model} model</p>
          </div>
         ))}
       </div>

     </div>
      
     {isOpen && (
      <div className="popup">
        {selectedUser && (
        <div className='UserPupCard' >
          <img src={selectedUser.avatar} alt={selectedUser.username} />
          <h2>{selectedUser.username}</h2>
          <p>Occupation: {selectedUser.occupation}</p>
          <p>Age: {selectedUser.age} Years</p>
          <p>Phone: {selectedUser.phone_number}</p>
          <p>Address: {selectedUser.address}</p>
          <p>Car: {selectedUser.vehicle_make} - {selectedUser.vehicle_model} model</p>
        </div>
      )}
        <button onClick={togglePopup}>❌</button>
      </div>
    )}

      
    </div>
  );
};

export default UserList;
