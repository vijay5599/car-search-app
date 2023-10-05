import "./App.css";
import Cars from "./components/Cars";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: `/cars/:id`,
      element: <Cars></Cars>,
    },
  ]);

  return (
    <div className="h-screen overflow-y-auto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
