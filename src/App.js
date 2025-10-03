import './App.css';
import { AllRoutes } from './routes/AllRoutes';
import { useState } from 'react';
import { SnackbarProvider } from "notistack"


function App() {

  const [adminCheck, setAdminCheck] = useState(true)

  return (
    <>
      <SnackbarProvider>
        <AllRoutes adminCheck={adminCheck} setAdminCheck={setAdminCheck} />
      </SnackbarProvider>
    </>
  );
}

export default App;
