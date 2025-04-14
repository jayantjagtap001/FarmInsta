import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from './redux/actions';
import useLocalStorage from './hooks/useLocalStorage';
import axios from 'axios';
import AddUserForm from './Components/AddUserForm';
import UserCard from './Components/UserCard';
import EditUserModal from './Components/EditUserModal';

const App = () => {
  const dispatch = useDispatch();
  const [localUsers, setLocalUsers] = useLocalStorage('users', []);
  const users = useSelector(state => state.users);
  const [query, setQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get('https://farminsta-b85ba-default-rtdb.firebaseio.com/users.json')
      .then(res => {
        const usersFromDb = res.data ? Object.values(res.data) : [];
        dispatch(setUsers(usersFromDb));
        setLocalUsers(usersFromDb);
      })
      .catch(err => console.error("Error fetching users:", err));
  }, [dispatch, setLocalUsers]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    [user.name, user.email, user.description, user.specialization]
      .some(field => field.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="app-container">
      <h1 style={{display:"flex",alignItems:"center",justifyContent:"center",color:"red",fontFamily:"revert-layer",fontWeight:"2rpm"}}>Profile Manager</h1>
      <AddUserForm/>
      <div className="search-filter" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <label style={{fontWeight:"2rpm"}} htmlFor="">Find The User</label>
        <input style={{borderRadius:"5px",width:"300px",height:"23px"}}
          type="text"
          placeholder="Search by name, email, description, specialization"
          value={query}
          onChange={handleSearchChange}
        />
        <p>Showing {filteredUsers.length} of {users.length} users</p>
      </div>
      <div className="user-grid">
        {filteredUsers.map((user, index) => (
          <UserCard key={index} user={user} onEdit={() => {
            setSelectedUser(user);
            setIsModalOpen(true);
          }} />
        ))}
      </div>
      <EditUserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        user={selectedUser} 
      />
    </div>
  );
};

export default App;
