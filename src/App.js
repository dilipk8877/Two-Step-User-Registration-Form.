import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './componet/Navbar';
import PersonalDetail from './page/PersonalDetail';
import AddressDetails from './page/AddressDetails';
import ReactDataTable from './page/dataTable/ReactDataTable';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<PersonalDetail/>} />
      <Route path='/address' element={<AddressDetails/>} />
      <Route path='/data-table' element={<ReactDataTable/>} />
    </Routes>
    </>
  );
}

export default App;
