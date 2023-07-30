import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import SingupSingIn from './pages/singup';
import Dashboard from './pages/dashboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
     <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<SingupSingIn/>}/>
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      </Router>
    </>
    
    
  );
}

export default App;
