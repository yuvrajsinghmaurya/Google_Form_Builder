import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";

import CreateForm from "./pages/Admin/CreateForm.jsx";
import FormList from "./pages/Admin/FormList.jsx";
import EditForm from "./pages/Admin/EditForm.jsx";
import ViewSubmissions from "./pages/Admin/ViewSubmissions.jsx";

import RenderForm from "./pages/User/RenderForm.jsx";
import SubmitSuccess from "./pages/User/SubmitSuccess.jsx";

function App() {
  const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem("token");
    return token ? element : <Navigate to="/login" />;
  };

  return (
    <div>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main Pages */}
        <Route path="/"  element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Admin Panel */}
        <Route
          path="/admin/forms"
          element={<PrivateRoute element={<FormList />} />}
        />
        <Route
          path="/admin/create-form"
          element={<PrivateRoute element={<CreateForm />} />}
        />
       <Route
  path="/admin/forms/:id/edit"
  element={<PrivateRoute element={<EditForm />} />}
/>

        <Route
          path="/admin/forms/:id/submissions"
          element={<PrivateRoute element={<ViewSubmissions />} />}
        />

        {/* Public User Routes */}
        <Route path="/form/:id" element={<RenderForm />} />
        <Route path="/submit-success" element={<SubmitSuccess />} />
      </Routes>
    </div>
  );
}

export default App;
