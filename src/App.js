import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './componet/Navbar';
import PersonalDetail from './page/PersonalDetail';
import AddressDetails from './page/AddressDetails';
import DataTablePage from './page/DataTablePage';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<PersonalDetail/>} />
      <Route path='/address' element={<AddressDetails/>} />
      <Route path='/data-table' element={<DataTablePage/>} />
    </Routes>
    </>
  );
}

export default App;
