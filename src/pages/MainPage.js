import styled from "styled-components";
import exitImage from "../assets/images/exit-outline.svg"
import entryImage from "../assets/images/entry.svg"
import expenseImage from "../assets/images/expense.svg"
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../contexts/LoginContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../contants/url";
import Entry from "../components/Entry";
export default function MainPage() {
    const { user, setUser } = useContext(LoginContext);
    const navigate = useNavigate();
    const [showPage, setShowPage] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('token')) {
            const config = {
                headers: {
                    token: localStorage.getItem('token')
                }
            };
            axios.get(`${BASE_URL}/main`, config)
                .then(res => {
                    const newUser = res.data;
                    console.log(newUser);
                    setUser(newUser);
                })
                .catch(err => {
                    console.log(err)
                })
            setShowPage(true)
        } else {
            navigate('/')
        }
    }, [])

    const entries = [0, 1]

    if (!showPage) {
        return (
            <>
            </>
        )
    }
    else {
        if (entries.length === 0) {
            return (
                <>
                    <CenteredContainer>
                        <CenteredDiv>
                            <TopContainer>
                                <h1>Olá {user.name}</h1>
                                <img src={exitImage}></img>
                            </TopContainer>
                            <MainContainer>

                            </MainContainer>
                            <ButtonsContainer>
                                <InputButton>
                                    <img src={entryImage}></img>
                                    <span>Nova Entrada</span>
                                </InputButton>
                                <InputButton>
                                    <img src={expenseImage}></img>
                                    <span>Nova Saída</span>
                                </InputButton>
                            </ButtonsContainer>
                        </CenteredDiv>
                    </CenteredContainer>
                </>
            );
        }
        else {
            //has entries
            return (
                <>
                    <CenteredContainer>
                        <CenteredDiv>
                            <TopContainer>
                                <h1>Olá {user.name}</h1>
                                <img src={exitImage}></img>
                            </TopContainer>
                            <MainContainerWithEntries>
                                <StyledEntries>
                                    <Entry />
                                    <Entry />
                                    <Entry />
                                    <Entry />
                                    <Entry />
                                    <Entry />
                                    <Entry />
                                    <Entry />
                                    <Entry />
                                    <Entry />
                                    <Entry />
                                    <Entry />

                                    <Entry />
                                    <Entry />
                                    <Entry />
                                    <Entry />
                                </StyledEntries>
                                <StyledBalance>
                                    <h1>SALDO</h1>
                                    <h2>1247,78</h2>
                                </StyledBalance>
                            </MainContainerWithEntries>
                            <ButtonsContainer>
                                <InputButton>
                                    <img src={entryImage}></img>
                                    <span>Nova Entrada</span>
                                </InputButton>
                                <InputButton>
                                    <img src={expenseImage}></img>
                                    <span>Nova Saída</span>
                                </InputButton>
                            </ButtonsContainer>
                        </CenteredDiv>
                    </CenteredContainer>
                </>
            );
        }
    }
}


const StyledEntries = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content:flex-start;
    overflow: auto;  
    height: 95%;
`
const ButtonsContainer = styled.div`
    margin-top: 13px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    `

const InputButton = styled.button`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px;
    border: none;
    width: 156px;
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
    img{
        width: 22px;
    }
    span{
        display: inline-block;
        text-align: left;
        width: 64px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #FFFFFF;
    }
`

const MainContainerWithEntries = styled.div`
    position: relative;
    box-sizing: border-box;
    padding:10px;
    border-radius: 5px;
    width: 326px;
    height: 446px;
    background-color: #fff;  
`
const StyledBalance = styled.div`
    position: absolute;
    bottom:10px;
    left: 0px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
h1{
    font-family: Raleway;
    font-size: 17px;
    font-weight: 700;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    margin-left: 10px;

}
h2{
    font-family: Raleway;
    font-size: 17px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: right;
    color: #03AC00;
    margin-right: 10px;
}
`
const MainContainer = styled.div`
    border-radius: 5px;
    width: 326px;
    height: 446px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    h2{
        width: 180px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        color: #868686;
    }
`

const TopContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    line-height: 31px;

    color: #FFFFFF;
    }
    img{
        width: 32px;
    }
    margin-bottom: 26px;
`

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

    `;
