export const CHAIN_CONFIG = {
    bsc: {
        CHAIN_ID: 56,
        RPC_URL: "https://bsc-dataseed.binance.org",
        EXPLORER_URL: "https://bscscan.com",
        COIN_SYMBOL: "BNB",
        SALE_CONTRACT: "0xc3aec10a97e311f3bb17e68817fef70d285de2c7",
        NFT_CONTRACT: "0xa5002922187a09d773d59eff39eee3050e6cbcd9",
    },
    polygon: {
        CHAIN_ID: 137,
        RPC_URL: "https://rpc-mainnet.matic.network",
        EXPLORER_URL: "https://polygonscan.com",
        COIN_SYMBOL: "MATIC",
        SALE_CONTRACT: "0xaa4a5b087ea99f48613f9ea27e91dc27f082fb74",
        NFT_CONTRACT: "0xc819d6b0ac1ab2ec2779da443ae9dfd8cad3fe94",
    }
}

export const API_ENDPOINT = "http://localhost:5000"