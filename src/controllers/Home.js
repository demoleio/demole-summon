import Header from "../components/Header";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import Info from "../components/Info";
import Summon from "../components/Summon";
import { useWeb3React } from "@web3-react/core";
import { getCookie, setCookie } from "../utils";
import connectors from "../constants/connectors";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setChainName } from "../redux/chainName";
import { CHAIN_CONFIG } from "../constants";
import WrongNetworkModal from "../components/WrongNetworkModal";

const Wrapper = styled.section`
    background-color: #0F1323;
    min-height: 100vh;
    font-family: 'Georama', sans-serif;
    color: white;
    padding-bottom: 50px;
`;

const ContainerStyled = styled(Container)`
    @media (min-width: 1288px) {
        width: 1288px;
    }
`;

function Home() {
    const {connector, active, activate, chainId} = useWeb3React()
    const connectorName = getCookie("connector")
    const chainName = getCookie("chainName")
    const [isOpen, setisOpen] = useState(false);
    const dispatch = useDispatch();

    if(chainName) {
        dispatch(setChainName(chainName))
    }

    useEffect(() => {
        if(!active) {
            if(connectorName) {
                activate(connectors[connectorName])
            } else {
                connectors["network"].changeChainId(CHAIN_CONFIG[chainName].CHAIN_ID)
                activate(connectors["network"])
            }
        }

        if(active && !connectorName) {
            Object.keys(connectors).map(key => {
                if(connector === connectors[key] && key !== "network") {
                    setCookie("connector", key)
                }
                return key
            })
        }
    }, [chainId]);

    return (
        <Wrapper>
            <Header />
            <ContainerStyled>
                <Row>
                    <Col md={6} xs={12}>
                        <Summon isOpen={isOpen}/>
                    </Col>
                    <Col md={6} xs={12}>
                        <Info isOpen={isOpen} setisOpen={setisOpen}/>
                    </Col>
                </Row>
                {CHAIN_CONFIG[chainName].CHAIN_ID !== chainId && <WrongNetworkModal></WrongNetworkModal>}
            </ContainerStyled>
        </Wrapper>
    );
}

export default Home;
