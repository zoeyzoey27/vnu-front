import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
