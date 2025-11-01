import "@/assets/styles/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "../../pages/Router.tsx";
import Providers from "./Providers.tsx";

const App = () => {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};

export default App;
