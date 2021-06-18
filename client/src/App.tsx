import React, {useEffect} from 'react';
import './App.css';
import {Navbar} from './app/components/Navbar';
import {Wrapper} from './app/components/Wrapper';
import {useAppDispatch} from './app/hooks';
import {whoAmI} from './features/user/userSlice';

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(whoAmI());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Wrapper />
    </div>
  );
};

export default App;
