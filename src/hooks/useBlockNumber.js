import { useEffect, useState } from "react"

export default function useBlockNumber(library) {
    const [blockNumber, setblockNumber] = useState(null);

    useEffect(() => {
        if (!library) return setblockNumber(null);

        library.getBlockNumber()
            .then((number) => {
                setblockNumber(number)
            })
            .catch(() => {
                setblockNumber(null)
            })

        library.on('block', (number) => {
            setblockNumber(number)
        })
    }, [library]);

    return blockNumber
}