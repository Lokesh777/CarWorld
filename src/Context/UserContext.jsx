// Generate.js

import React, { createContext, useState } from 'react';
import { faker } from '@faker-js/faker';

export const UserContext = createContext();

const generateUser = () => ({
  id: faker.datatype.uuid(),
  username: faker.internet.userName(),
  country: faker.address.country(),
  avatar: faker.image.avatar(),
  address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.country()}`,
  age: faker.datatype.number({ min: 18, max: 100 }),
  phone_number: faker.phone.number(),
  occupation: faker.name.jobTitle(),
  vehicle_make: faker.vehicle.manufacturer(),
  vehicle_model: faker.vehicle.model(),
  vehicle_age: faker.datatype.number({ min: 0, max: 20 }),
  category: faker.vehicle.type(),
  vehicle_year: faker.date.past(20).getFullYear(),
  vehicle_image: faker.image.transport(320, 240, true, ['transport'])
});



export const UserProvider = ({ children }) => {
  const [users] = useState(Array.from({ length: 100 }, generateUser));

  return (
    <UserContext.Provider value={users}>
      {children}
    </UserContext.Provider>
  );
};
