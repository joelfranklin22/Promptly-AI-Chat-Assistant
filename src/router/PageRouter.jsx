import { Routes, Route } from "react-router-dom";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import axios from "axios";
import { lazy, Suspense, useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";

const Chat = lazy(() => import("../Pages/Chat.jsx"));
const ChatHistory = lazy(() => import("../Pages/chatHistory.jsx"));

function PageRouter() {
  const { accessTokens, setAccessTokens } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    async function checkTokens() {
      try {
        const res = await axios.post(
          "http://localhost:4000/api/refreshtokens/generate",
          {},
          { withCredentials: true },
        );
        setAccessTokens(res.data.accessToken);
        console.log(res);
        console.log(accessTokens);

        console.log(res.data.tokens);
      } catch (error) {
        console.log(error.response.data.msg);

        console.log("login again to get tokens", error);
      } finally {
        setLoading(false);
      }
    }
    checkTokens();
  }, []);
  if (loading) return <div>Loading....</div>;
  return (
    <>
      <Suspense fallback={<div>Loading Page....</div>}>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/history" element={<ChatHistory />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default PageRouter;
