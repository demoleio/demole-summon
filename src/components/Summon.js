import { useWeb3React } from "@web3-react/core";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { fromWei, toWei } from "web3-utils";
import dragon from '../assests/img/dragon2.png'
import openEgg from '../assests/video/open-egg.mp4'
import { useBalance } from "../hooks/useBalance";
import useSaleContract from "../hooks/useSaleContract";
import { selectChainName } from "../redux/chainName";
import ServerAPI from "../ServerAPI";
import ButtonSummon from "./ButtonSummon";
import Alert from "./Alert";
import useNFTContract from "../hooks/useNFTContract";

const Wrapper = styled.section`
    border-radius: 20px;
    background-color: transparent;
    text-align: center;
`;

const Monster = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 593px;
    position: relative;

    & > .dragon {
        margin-left: 70px;
        margin-top: 30px;
        position: absolute;
        width: 400px;
        right: 28px;
        top: 142px;
        opacity: 0;
        transition: all .5s ease;
        -webkit-transition: all .5s ease;
        -moz-transition: all .5s ease;
    }
`

export default function Summon(props) {
    const { isOpen } = props
    const { account, library } = useWeb3React()
    const balance = useBalance(account, library)
    const contract = useSaleContract(library)
    const nftContract = useNFTContract(library)
    const chainName = useSelector(selectChainName)
    const [error, seterror] = useState(false);
    const [loading, setloading] = useState(false);
    const [success, setsuccess] = useState(false);

    const video = useRef(null)
    const character = useRef(null)

    function startAnimation() {
        character.current.style.opacity = 0
        video.current.play()
        character.current.style["z-index"] = 1
        setTimeout(() => {
            character.current.style.opacity = 1
        }, 1200)
    }

    async function summon() {
        // reset states
        seterror(false)
        setloading(false)
        // check connect wallet
        if(!account) {
            return seterror("Please connect wallet")
        }
        // check balance
        const BNBRequireInWei = await contract.methods.getBNBPrice().call()
        const BNBRequire = parseFloat(fromWei(BNBRequireInWei))
        if (balance < BNBRequire) {
            return seterror("Insufficient balance")
        }
        // check address in whitelist
        setloading("Check registration...")
        ServerAPI.getProof(chainName, account).then(async proof => {
            const ordered = await contract.methods.ordered(account).call()
            if(ordered) return seterror("You have already summoned")
            setloading("Waiting for confirmation...")
            contract.methods.order(account.toLowerCase(), proof).send({
                from: account,
                value: toWei((BNBRequire + 0.001).toString())
            }).then(result => {
                setloading("Retrieving tokenId...")
                let interval = setInterval( async () => {
                    const tokensOfOwner = await nftContract.methods.tokensOfOwner(account).call()

                    if(tokensOfOwner.length > 0) {
                        clearInterval(interval)
                        setloading(false)
                        setsuccess(`Congratulations! You have received tokenId #${tokensOfOwner[0]}`)
                        startAnimation()
                    }
                }, 1000)
            }).catch(error => {
                seterror(error.message ? error.message : error)
                setloading(false)
            })
        }).catch(error => {
            seterror(error)
        })
    }

    return (
        <Wrapper>
            <Monster>
                <video preload="true" src={openEgg} playsInline={true} ref={video}></video>
                <img ref={character} className="dragon" src={dragon} alt="character"></img>
            </Monster>
            <ButtonSummon onClick={summon} disabled={!isOpen || loading} />
            {error && <Alert type="error">{error}</Alert>}
            {(loading && !error) && <Alert type="default">{loading}</Alert>}
            {success && <Alert type="success">{success}</Alert>}
        </Wrapper>
    )
}
