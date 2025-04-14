import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const SearchAndFilter = () => {
  const [query, setQuery]=useState('');
  const users = useSelector(state => state.users);

  const handleChange=(e)=>setQuery(e.target.value);

  const filteredUsers = users.filter(user =>
    [user.name, user.email, user.description, user.specialization]
      .some(field => field.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search by name, email, description, specialization"
        value={query}
        onChange={handleChange}
      />
      <p>Showing {filteredUsers.length} of {users.length} users</p>
    </div>
  );
};

export default SearchAndFilter;
