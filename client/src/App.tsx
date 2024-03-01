import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ApplicationContainer from './applicationContainer';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ApplicationContainer />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
