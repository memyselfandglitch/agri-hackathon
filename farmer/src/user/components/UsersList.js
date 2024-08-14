import React from 'react';
// import { useNavigate } from 'react-router-dom';

import UserItem from './UserItem';
import './UsersList.css';
import Card from '../../shared/components/UIElements/Card';

const UsersList = props => {
  if (props.items.length === 0) {
   
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="content">
      <div className="row users-list">
        {props.items.map(user => (
          <li key={user.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <UserItem
              id={user.id}
              image={user.image}
              name={user.name}
              productCount={user.products.length}
            />
          </li>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
