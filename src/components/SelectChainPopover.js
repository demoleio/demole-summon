import { useDispatch } from "react-redux";
import styled from "styled-components";
import BinanceIcon from '../assests/img/icon_binance.png'
import PolygonIcon from '../assests/img/icon_polygon.png'
import { setChainName } from "../redux/chainName";
import { setCookie } from "../utils";


const Wrapper = styled.div`

    background: #1A1E30;
    border: 1px solid #292F49;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    padding: 16px;
    position: absolute;
    top: 60px;
    right: -40px;

    width: 218px;

    & > div {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        cursor: pointer;
        img {
            margin-right: 10px;
            width: 24px;
        }

        p {
            font-size: 16px;
        }

        &:last-child {
            margin-bottom: 0px;
        }
    }
`;

export default function SelectChainPopover(props) {
    const dispatch = useDispatch()

    function onSetChainName (chainName) {
        dispatch(setChainName(chainName))
        setCookie("chainName", chainName)
        window.location.reload()
    }

    return (
        <Wrapper>
            <div onClick={() => onSetChainName("bsc")}>
                <img src={BinanceIcon} alt="photos"></img>
                <p>Binance Smart Chain</p>
            </div>
            <div onClick={() => onSetChainName("polygon")}>
                <img src={PolygonIcon} alt="photos"></img>
                <p>Polygon</p>
            </div>
        </Wrapper>
    )
}
