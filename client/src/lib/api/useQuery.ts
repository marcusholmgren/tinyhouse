import {useEffect, useState, useCallback} from "react";
import {server} from "./server";

interface State<TData> {
    data: TData | null;
    loading: boolean;
    error: boolean;
}

interface QueryResult<TData> extends State<TData>{
    refresh: () => void;
}

export const useQuery = <TData = any>(query: string): QueryResult<TData> => {
    const [state, setState] = useState<State<TData>>({
        data: null,
        loading: false,
        error: false
    });

    const fetch = useCallback(() => {
        const fetchApi = async () => {
            try {
                setState({data: null, loading: true, error: false})
                const {data, errors } = await server.fetch<TData>({query});

                if (errors && errors.length) {
                    throw Error(errors.map(x => x.message).join(', '));
                }
                setState({data, loading: false, error: false});
            } catch(err) {
                setState({data: null, loading: false, error: true})
                throw err;
            }
        }
        fetchApi()
            .catch(reason => console.error(`[useQuery] -- fetchApi failed: ${reason}`));
    }, [query])

    useEffect(() => {
        fetch()

    }, [fetch])

    return {...state, refresh: fetch};
}
