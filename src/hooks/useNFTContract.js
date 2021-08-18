import { useSelector } from "react-redux";
import Contract from "web3-eth-contract"
import { selectChainName } from "../redux/chainName";
import nftABI from "../constants/abis/nft.abi.json"
import { CHAIN_CONFIG } from "../constants";
import { useEffect, useState } from "react";

function useNFTContract(library) {
    const chainName = useSelector(selectChainName)
    const [contract, setcontract] = useState(null);

    useEffect(() => {
        if (library) {
            Contract.setProvider(library.provider);
            setcontract(new Contract(nftABI, CHAIN_CONFIG[chainName].NFT_CONTRACT))
        }
    }, [chainName, library]);

    return contract
}

export default useNFTContract