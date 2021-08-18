import { useEffect, useState } from "react";
import { getState } from "../ServerAPI";

export default function useUserState(chain, address) {
    const [userState, setuserState] = useState({state: "NOT_CONNECTED"});
    
    useEffect(() => {
        if(!chain || !address) {
            setuserState({state: "NOT_CONNECTED"})
        } else {
            getState(chain, address).then(result => {
                setuserState(result)
            })
        }
    }, [chain, address]);

    return userState;
}