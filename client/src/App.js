import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TokenProvider } from './auth/TokenContext';
import Login from "./components/sign-in";
import Home from "./pages/home";
import Add from "./pages/addProfessor";
import All from "./pages/allProfessors";
import Hists from "./pages/profHistoriques";
import { ProfProvider } from "./context/ProfContext";
import Proffile from "./pages/profProfile";

export default function App() {
  return (
    <TokenProvider>
      <ProfProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="home" element={<Home />} />
        <Route path="add-professor" element={<Add/>} />
        <Route path="all-professors" element={<All/>} />
        <Route path="historiques" element={<Hists/>} />
        <Route path="prof-profile" element={<Proffile/>} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
    </ProfProvider>
    </TokenProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);