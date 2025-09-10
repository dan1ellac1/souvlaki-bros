import './App.css';
import { AllRoutes } from './routes/AllRoutes';
import { useState } from 'react';


function App() {

  const [adminCheck, setAdminCheck] = useState(true)

  return (
    <>
      <AllRoutes adminCheck={adminCheck} setAdminCheck={setAdminCheck} />
    </>
  );
}

export default App;
