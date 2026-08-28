import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import router from "./routes/router.jsx";
function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1a1c24",
            color: "#eceef2",
            border: "1px solid #2a2d38",
          },
        }}
      />
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
