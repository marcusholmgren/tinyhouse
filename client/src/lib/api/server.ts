interface Body<TVariables> {
    query: string;
    variables?: TVariables
}

export const server = {
    fetch: async <TData = any, TVariables = any>(body: Body<TVariables>) => {
        const res = await fetch('/api', {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(body)
        });
        return res.json() as Promise<{ data: TData}>
    }
};
