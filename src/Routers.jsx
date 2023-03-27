import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutAdmin from "./components/LayoutAdmin";
import ClassList from "./pages/ClassList";
import Login from "./pages/Login";
import MajorList from "./pages/MajorList";
import StudentList from "./pages/StudentList";
import UserList from "./pages/UserList";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LayoutAdmin />}>
          <Route path="users" element={<UserList />} />
          <Route path="majors" element={<MajorList />} />
          <Route path="classes" element={<ClassList />} />
          <Route path="students" element={<StudentList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
