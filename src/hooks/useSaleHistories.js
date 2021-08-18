import { useEffect, useRef, useState } from "react";
import { getHistories } from "../ServerAPI";

export default function useSaleHistories(chain) {
    const [histories, sethistories] = useState([]);
    const interval = useRef(false)
    
    useEffect(() => {
        if(!chain) return;

        getHistories(chain).then(result => {
            sethistories(result)
        })

        interval.current = setInterval ( () => {
            getHistories(chain).then(result => {
                sethistories(result)
            })
        }, 10000)

        return () => {
            clearInterval(interval.current)
        }

    }, [chain]);

    return histories;

}