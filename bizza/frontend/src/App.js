
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminPage from "./pages/Admin/AdminPage/AdminPage";
import Dashboard from "./pages/Admin/Dashboard"; // placeholder
import Speakers from "./pages/Speakers/ViewSpeakers"; // <== our main component
import EventRegistrationPage from './pages/EventRegistration/EventRegistrationPage';
import CreateSpeakerPage  from "./pages/Speakers/CreateSpeakerPage";
import EditSpeakerPage  from "./pages/Speakers/EditSpeakerPage";
import DeleteSpeakerPage  from "./pages/Speakers/DeleteSpeakerPage";

const router = createBrowserRouter([


  {
    path: "/admin",
    element: <AdminPage />,
    children: [
      { path: "/admin/dashboard", element: <Dashboard /> },
      { path: "/admin/speakers", element: <Speakers /> },
      {path: "/admin/EventRegistration", element: <EventRegistrationPage />,},
      {path: '/admin/speakers/create', element: <CreateSpeakerPage />,},
      { path: '/admin/speakers/update/:speakerId',  element: <EditSpeakerPage />},
      { path: '/admin/speakers/delete/:speakerId',  element: <DeleteSpeakerPage />}
    ],
   


  },


]);

export default function App() {
  return <RouterProvider router={router} />;
}