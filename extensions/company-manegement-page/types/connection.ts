export interface Connection<T> {
    nodes: T[];
    edges: {
        node: T;
    }[];
    pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string;
        endCursor: string;
    }
}