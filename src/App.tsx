import { useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { RegistrationForm } from './components/RegistrationForm/RegistrationForm';
import { UsersList } from './components/UserList/UserList';

function App() {
  const [updateUsers, setUpdateUsers] = useState(false);

  const handleRegister = () => {
    setUpdateUsers(!updateUsers);
  };

  return (
    <>
      <Header />
      <UsersList updateTrigger={updateUsers} />
      <RegistrationForm onRegister={handleRegister} />
    </>
  );
}

export default App;
