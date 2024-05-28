import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  photo: string;
}

interface UsersListProps {
  updateTrigger: boolean;
}

export const UsersList: React.FC<UsersListProps> = ({ updateTrigger }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchUsers(1, true);
  }, [updateTrigger]);

  useEffect(() => {
    if (page > 1) {
      fetchUsers(page);
    }
  }, [page]);

  const fetchUsers = async (page: number, reset = false) => {
    const response = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`);
    const data = await response.json();
    if (data.users.length < 6) {
      setHasMore(false);
    }
    setUsers((prevUsers) => reset ? data.users : [...prevUsers, ...data.users]);
  };

  return (
    <div className='mt-[140px] container mx-auto px-4'>
      <h2 className='text-[40px] text-center' id="users">Working with GET request</h2>
      <div className="mt-[50px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {users.map(user => (
          <div key={user.id} className='bg-white text-center w-[328px] lg:w-[370px] mx-auto mb-6 box-border'>
            <img src={user.photo} alt={user.name} className='rounded-full mx-auto mt-5' />
            <h3 className='mt-5'>{user.name}</h3>
            <p className='mt-5'>{user.position}</p>
            <p className='truncate max-w-full'>{user.email}</p>
            <p className='mb-5'>{user.phone}</p>
          </div>
        ))}
      </div>
      <div className='text-center mt-[50px]'>
        {hasMore && (
          <button onClick={() => setPage(page + 1)} className="py-1 px-6 bg-yellow-300 rounded-2xl">
            Show more
          </button>
        )}
      </div>
    </div>
  );
};
