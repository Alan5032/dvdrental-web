import React, {Component} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
  from 'react-router-dom';
import Home from './pages/home';
import Customers from './pages/customers';
import Inventories from './pages/inventories';
import Locations from './pages/locations';
import Rentals from './pages/rentals';
import Staffs from './pages/staffs';

class App extends Component<{}, {}> {

    render() {
        return (
            <div>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Home/>} />
                        <Route path='/customers' element={<Customers/>} />
                        <Route path='inventories' element={<Inventories/>} />
                        <Route path='locations' element={<Locations/>} />
                        <Route path='rentals' element={<Rentals/>} />
                        <Route path='/staffs' element={<Staffs/>} />
                    </Routes>
                </Router>
            </div>
        );
    }
}

export default App;
