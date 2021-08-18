import blockies from "ethereum-blockies";
import { useEffect } from "react";
blockies.create()

export default function useAvatar (account) {
    useEffect(() => {
        if(!account) return
        const elements = document.getElementsByClassName("blockie")

        for(let i = 0; i < elements.length; i++) {
            blockies.render({seed: account, color: "#38A7C8", bgcolor: "#FCE24A", spotcolor: "#0084B4", size: 5, scale: 10}, elements[i])
        }

    }, [account]);
}