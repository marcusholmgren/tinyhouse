import {useEffect, useState, useCallback} from "react";
import {server} from "./server";

interface State<TData> {
    data: TData | null;
}

export const useQuery = <TData = any>(query: string) => {
    const [state, setState] = useState<State<TData>>({data: null});

    const fetch = useCallback(() => {
        const fetchApi = async () => {
        const {data} = await server.fetch<TData>({query});
        setState({data});
    }
    fetchApi()
        .catch(reason => console.error(`[useQuery] -- fetch failed: ${reason}`));
    }, [query])

    useEffect(() => {
        fetch()

    }, [fetch])

    return { ...state, refresh: fetch };
}
