// import Applayout from "./components/Applayout";
import { AuthProvider } from "./context/AuthContext";
import PageRouter from "./router/PageRouter";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Applayout /> */}
      <BrowserRouter>
        <AuthProvider>
          <PageRouter />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
