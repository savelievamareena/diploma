import './styles/App.css';
import Homepage from "./pages/Homepage"
import Account from "./pages/Account";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route index element={<Homepage />} />
                    <Route path="account" element={<Account />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
