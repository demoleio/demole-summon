import Header from "../components/Header";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import Info from "../components/Info";
import Summon from "../components/Summon";
import { useWeb3React } from "@web3-react/core";
import { getCookie, setCookie } from "../utils";
import connectors from "../constants/connectors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectChainName, setChainName } from "../redux/chainName";
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
    const {connector, active, activate, chainId, error} = useWeb3React()
    const connectorName = getCookie("connector")
    const chainNameSaved = getCookie("chainName")
    const chainName = useSelector(selectChainName)
    const [isOpen, setisOpen] = useState(false);
    const dispatch = useDispatch();

    if(chainNameSaved) {
        dispatch(setChainName(chainNameSaved))
    }

    useEffect(() => {
        if(!active) {
            if(connectorName) {
                activate(connectors[connectorName])
            } else {
                connectors["network"].changeChainId(CHAIN_CONFIG[chainName].CHAIN_ID)
                activate(connectors["network"])
            }
        } else {
            // Auto switch network when change network on wallet
            // if(chainId !== CHAIN_CONFIG[chainName].CHAIN_ID) {
            //     Object.keys(CHAIN_CONFIG).map( key => {
            //         if(chainId === CHAIN_CONFIG[key].CHAIN_ID) {
            //             setCookie("chainName", key)
            //             window.location.reload()
            //         }
            //         return true
            //     })
            // }

            if(CHAIN_CONFIG[chainName].CHAIN_ID !== chainId) {
                document.getElementsByClassName("header-action")[0].style["z-index"] = 11
            }

            if(!connectorName) {
                Object.keys(connectors).map(key => {
                    if(connector === connectors[key] && key !== "network") {
                        setCookie("connector", key)
                    }
                    return key
                })
            }
        }

    }, [chainId, active, activate, chainName, connector, connectorName, error]);

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
                {(chainId && CHAIN_CONFIG[chainName].CHAIN_ID !== chainId) && <WrongNetworkModal></WrongNetworkModal>}
            </ContainerStyled>
        </Wrapper>
    );
}

export default Home;
