import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoadingScreen from "../components/LoadingScreen";
import { BASE_URL } from "../contants/url";
import { LoginContext } from "../contexts/LoginContext";
export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { user, setUser } = useContext(LoginContext);
  const [showPage, setShowPage] = useState(false);
  const navigate = useNavigate()

  function tryToLogin(e) {
    e.preventDefault();
    axios.post(`${BASE_URL}/sign-in`, form)
      .then(res => {
        const token = res.data.token;
        const newUser = {
          token
        }
        setUser(newUser);
        localStorage.setItem("token", token)
        navigate('/main')
      })
      .catch(err => {
        localStorage.clear();
        alert(err.response.data)
      })
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const newUser = {
        token: localStorage.getItem('token')
      }
      setUser(newUser)
      navigate('/main');
    }
    else {
      setShowPage(true)
    }
  }, [])

  if (!showPage) {
    <>
      <LoadingScreen />
    </>
  }
  else {
    return (
      <>
        <CenteredContainer>
          <CenteredDiv>
            <h1>MyWallet</h1>
            <form onSubmit={tryToLogin}>
              <StyledInput placeholder="E-mail" name="email" type="email" value={form.email} required onChange={handleChange} />
              <StyledInput placeholder="Senha" name="password" type="password" value={form.password} required onChange={handleChange} />
              <StyledButton type="submit">Entrar</StyledButton>
            </form>
            <Link to={'/register'}>Primeira vez? Cadastre-se</Link>
          </CenteredDiv>
        </CenteredContainer>
      </>
    );
  }
}

const CenteredContainer = styled.div`
  width: 326px;
  height: 326px;
  
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  font-family: "Raleway", sans-serif;
  font-size: 20px;
  color: #000;

  box-sizing: border-box;
  border: none;
  padding: 0px;
  width: 326px;
  height: 58px;
  background: #ffffff;

  border-radius: 5px;
  margin-bottom: 13px;
  padding-left: 15px;
  padding-right: 15px;
  ::placeholder {
    font-family: "Raleway", sans-serif;
  }
`;

const StyledButton = styled.button`
  font-family: "Raleway", sans-serif;
  box-sizing: border-box;
  border: none;
  width: 326px;
  height: 58px;
  background: #a328d6;
  border-radius: 5px;
  margin-bottom: 36px;

  font-size: 20px;
  font-weight: 700;
  color: #fff;
`;

const CenteredDiv = styled.div`
  h1 {
    font-family: "Saira Stencil One", cursive;
    color: white;
    font-size: 32px;
    text-align: center;
    margin-bottom: 24px;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: white;
    font-weight: 700;
    font-size: 15px;
  }
`;
