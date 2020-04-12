import {useEffect, useState} from "react";
import {server} from "./server";

interface State<TData> {
    data: TData | null;
}

export const useQuery = <TData = any>(query: string) => {
    const [state, setState] = useState<State<TData>>({data: null});

    useEffect(() => {
        const fetchApi = async () => {
            const {data} = await server.fetch<TData>({query});
            setState({data});
        }

        fetchApi()
            .catch(reason => console.error(`[useQuery] -- fetch failed: ${reason}`));
    }, [query])

    return state;
}
