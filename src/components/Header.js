import { Container, Nav, NavItem } from "react-bootstrap"
import LogoImg from "../assests/img/logo.png"
import styled from "styled-components"
import { Link } from "react-router-dom";
import Button from "./Button";
import BinanceIcon from '../assests/img/icon_binance.png'
import PolygonIcon from '../assests/img/icon_polygon.png'
import SelectChainPopover from "./SelectChainPopover";
import { useEffect, useState } from "react";
import WalletInfoPopover from "./WalletInfoPopover";
import { eraseCookie, formatCurrency } from "../utils";
import useAvatar from "../hooks/useAvatar";
import { selectChainName } from "../redux/chainName";
import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { useBalance } from "../hooks/useBalance";
import ConnectWalletModal from "./ConnectWalletModal";
import connectors from "../constants/connectors";
import { CHAIN_CONFIG } from "../constants";

const Wrapper = styled.header`
    background-color: #0F1323;
    height: 120px;
`;

const ContainerStyled = styled(Container)`
    @media (min-width: 1288px) {
        width: 1288px;
    }
`;

const Logo = styled.img`
    height: 70px;
`;

const Menu = styled.div`
    padding-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const NavItemStyled = styled(NavItem)`
    margin-right: 60px;

    &:last-child {
        margin-right: 0;
    }

    & > a {
        text-decoration: none;
        font-size: 20px;
        font-weight: 700;
        color: white;
    }

    & > a:hover {
        color: #FFB337;
    }

    &:first-child > a{
        color: #FFB337;
    }
`;

const ButtonConnect = styled(Button)`
    background: linear-gradient(89.99deg, #FFB337 9.74%, #EA891F 113.58%);
    color: black;
    font-size: 20px;
    font-weight: bold;
`;

const ChainIcon = styled.div`
    position: relative;
    margin-right: 24px;
    & > img {
        cursor: pointer;
    }
`

const ConnectWalletWrapper = styled.div`
    display: flex;
    align-items: center;
`

const ButtonConnected = styled(Button)`
    background: transparent;
    font-size: 16px;
    font-weight: 600;
    border: 1px solid #FFB337;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 6px;

    canvas {
        margin-left: 11px;
        border-radius: 50%;
        height: 38px;
        width: 38px;
    }
`

const WalletInfo = styled.div`
    position: relative;
`

function Header() {
    const [isShowSelectChain, setisShowSelectChain] = useState(false)
    const [isShowWalletInfo, setisShowWalletInfo] = useState(false)
    const [isShowConnectWallet, setisShowConnectWallet] = useState(false)

    const chainName = useSelector(selectChainName)
    const {connector, account, library, deactivate} = useWeb3React()
    const balance = useBalance(account, library)
    useAvatar(account)

    const onClickChain = () => {
        setisShowWalletInfo(false)
        setisShowSelectChain(!isShowSelectChain)
    }

    const onClickWallet = () => {
        setisShowSelectChain(false)
        setisShowWalletInfo(!isShowWalletInfo)
    }

    function onDisconect () {
        eraseCookie("connector")
        deactivate()

        if(connector === connectors.walletconnect) {
            connector.close()
        }
    }

    useEffect(() => {
        if(connector) {
            connector.on("Web3ReactDeactivate", () => {
                eraseCookie("connector")
            })
        }
    }, [connector])

    return (
        <Wrapper>
            <ContainerStyled>
                <Menu>
                    <Link to="/"><Logo src={LogoImg} /></Link>
                    <Nav>
                        <NavItemStyled><Link to="/">Summon</Link></NavItemStyled>
                        <NavItemStyled><a href="https://marketplace.demole.io" target="_blank" rel="noreferrer">Marketplace</a></NavItemStyled>
                        <NavItemStyled><a href="https://stake.demole.io" target="_blank" rel="noreferrer">Stake</a></NavItemStyled>
                        <NavItemStyled><a href="https://demole.io/faq" target="_blank" rel="noreferrer">FAQ</a></NavItemStyled>
                        <NavItemStyled><a href="https://demole.io" target="_blank" rel="noreferrer">Community</a></NavItemStyled>
                    </Nav>

                    <ConnectWalletWrapper>
                        <ChainIcon>
                            <img onClick={() => onClickChain()} src={chainName === "bsc" ? BinanceIcon : PolygonIcon} alt="photos"></img>
                            {isShowSelectChain && <SelectChainPopover></SelectChainPopover>}
                        </ChainIcon>

                        {!account && <ButtonConnect onClick={() => setisShowConnectWallet(true)}>Connect Wallet</ButtonConnect>}

                        {account && <WalletInfo>
                            <ButtonConnected onClick={() => onClickWallet()}>
                                <p>{formatCurrency(balance)} {CHAIN_CONFIG[chainName].COIN_SYMBOL}</p>
                                <canvas className="blockie"></canvas>
                            </ButtonConnected>

                            {isShowWalletInfo && <WalletInfoPopover balance={balance} onDisconect={onDisconect}></WalletInfoPopover>}
                        </WalletInfo>}

                    </ConnectWalletWrapper>
                </Menu>
            </ContainerStyled>
            {(isShowConnectWallet && !account) && <ConnectWalletModal onClose={() => setisShowConnectWallet(false)}></ConnectWalletModal>}
        </Wrapper>
    )
}

export default Header