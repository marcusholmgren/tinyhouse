interface Body<TVariables> {
    query: string;
    variables?: TVariables
}

interface Error {
    message: string
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

        if (!res.ok) {
            throw new Error("failed to fetch from server.");
        }

        return await res.json() as Promise<{ data: TData, errors: Error[]}>
    }
};
