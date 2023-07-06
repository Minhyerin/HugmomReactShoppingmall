import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoginBox = styled.div`
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Header = styled.div`
  h1 {
    color: #72981e;
    font-size: 24px;
    font-weight: 400;
  }
  border-bottom: 2px solid #72981e;
  margin-bottom: 20px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Email = styled.div`
  border: 1px solid #72981e;
  padding: 10px 15px;
  border-radius: 10px;
  input {
    border: none;
    margin-left: 10px;
    &:focus {
      outline: none;
    }
  }
`;
const Password = styled.div`
  border: 1px solid #72981e;
  padding: 10px 15px;
  border-radius: 10px;
  input {
    border: none;
    margin-left: 10px;
    &:focus {
      outline: none;
    }
  }
`;
const Button = styled.button`
  cursor: pointer;
  margin-top: 20px;
  border: none;
  border-radius: 10px;
  padding: 10px;
  background-color: #72981e;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

const Login = ({ setAuthenticate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();
  const handleOnLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setAuthenticate(true);
      navigate("/");
    } else {
      alert("이메일과 비밀번호를 입력해주세요");
      return;
    }
  };

  return (
    <Container>
      <LoginBox>
        <Header>
          <h1>허그맘 로그인</h1>
        </Header>
        <Form onSubmit={(e) => handleOnLogin(e)}>
          <Email>
            <FontAwesomeIcon color=" #72981e" icon={faUser} />
            <input
              onChange={onChangeEmail}
              value={email}
              type="email"
              placeholder="이메일을 입력해주세요"
            />
          </Email>
          <Password>
            <FontAwesomeIcon color=" #72981e" icon={faLock} />
            <input
              onChange={onChangePassword}
              value={password}
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
          </Password>
          <Button type="submit">로그인</Button>
        </Form>
      </LoginBox>
    </Container>
  );
};

export default Login;
