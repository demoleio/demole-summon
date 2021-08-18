import { useEffect, useState } from "react";

export function useBalance(account, library) {
    const [balance, setbalance] = useState(0);

    useEffect(() => {
        async function getBalance() {
            if(account && library) {
                const result = await library.getBalance(account)
                setbalance(result.toString() / 10**18)
            }
        }
        getBalance()

    }, [account, library]);

    return balance
}