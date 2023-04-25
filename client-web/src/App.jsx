import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Note from "./pages/Note";
import Majors from './pages/Majors';
import Result from './pages/Result'
import ResultAnonym from './pages/ResultAnonym';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';



import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react'

function App() {
  return (
  <ChakraProvider theme={theme}>
        <Router>
        {/* <div class="min-h-screen bg-gray-100 min-w-screen"> */}
        <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/notes" element={<Note />} />
              <Route path="/majors" element={<Majors />} />
              <Route path="/result" element={<Result />} />
              <Route path="/resultanonym" element={<ResultAnonym />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            
          {/* </div> */}
        </Router>
    </ChakraProvider>
  );
}
export default App;
