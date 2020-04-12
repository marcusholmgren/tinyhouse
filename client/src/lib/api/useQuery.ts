import {useEffect, useReducer, useCallback} from "react";
import {server} from "./server";

interface State<TData> {
    data: TData | null;
    loading: boolean;
    error: boolean;
}

type Action<TData> =
    | { type: "FETCH" }
    | { type: "FETCH_SUCCESS", payload: TData }
    | { type: "FETCH_ERROR" }

interface QueryResult<TData> extends State<TData>{
    refresh: () => void;
}

// const reducer = <TData>() => <TData>(state: State<TData>, action: Action<TData>): State<TData> => {
const reducer = <TData>() => (state: State<TData>, action: Action<TData>) => {
    switch (action.type) {
        case "FETCH":
            return {...state, loading: true};
        case "FETCH_SUCCESS":
            return {data: action.payload, loading: false, error: false};
        case "FETCH_ERROR":
            return {...state, loading: false, error: true};
        default:
            throw Error();
    }
}

export const useQuery = <TData = any>(query: string): QueryResult<TData> => {
    const fetchReducer = reducer<TData>();
    const [state, dispatch] = useReducer(fetchReducer, {
        data: null,
        loading: false,
        error: false
    });

    const fetch = useCallback(() => {
        const fetchApi = async () => {
            try {
                dispatch({ type: "FETCH"});
                const {data, errors } = await server.fetch<TData>({query});

                if (errors && errors.length) {
                    throw Error(errors.map(x => x.message).join(', '));
                }
                dispatch({ type: "FETCH_SUCCESS", payload: data})
            } catch(err) {
                dispatch({type: "FETCH_ERROR"})
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
