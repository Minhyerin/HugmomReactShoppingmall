import "./App.css";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import ProductAll from "./Components/ProductAll";
import Login from "./Components/Login";
import PrivatRouter from "./Components/PrivatRouter";

const Container = styled.div`
  width: 100vw;
`;

function App() {
  const [authenticate, setAuthenticate] = useState(false);
  //true- 로그인 false - 로그인 안된 상태
  useEffect(() => {
    console.log("Login", authenticate);
  }, [authenticate]); //로그인값이 변경될때 마다 useEffect 콜백함수 실행

  return (
    <Container>
      <Header authenticate={authenticate} setAuthenticate={setAuthenticate} />
      <Routes>
        <Route path="/" element={<ProductAll />} />
        <Route
          path="/login"
          element={<Login setAuthenticate={setAuthenticate} />}
        />
        <Route
          path="/product/:id"
          element={<PrivatRouter authenticate={authenticate} />}
        />
      </Routes>
    </Container>
  );
}

export default App;
