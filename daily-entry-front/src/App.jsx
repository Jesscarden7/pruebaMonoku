import "./App.css";
import "./styles/variables.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import MainContent from "./components/mainContent/MainContent";
import NotFound from "./components/notfound/NotFound";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import MoodContainer from "./pages/mood/MoodContainer";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<MainContent />} />
            <Route path='/signin' element={<Login />} />
            <Route path='/signup' element={<Register />} />
            <Route path='/mood' element={<MoodContainer />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
