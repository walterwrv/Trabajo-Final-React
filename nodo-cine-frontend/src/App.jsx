
import { AppRouter } from './routes/AppRouter';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <div className='bg-gray-300'>
        <AppRouter />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
    
         
  );
}

export default App;

