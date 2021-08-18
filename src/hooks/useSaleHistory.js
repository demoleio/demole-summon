import { gql, useQuery } from "@apollo/client";

export default function useSaleHistories(amount) {
    const SALE_HISTORIES = gql`
        query saleHistories($amount: Int!) {
            saleHistories(last: $amount, orderBy: time, orderDirection: desc) {
                user
                tokenId
                value
                time
            }
        }
    `;

    const { data } = useQuery(SALE_HISTORIES, {
        variables: { amount },
        pollInterval: 10000
    });

    if(!data) return []

    return data.saleHistories
}