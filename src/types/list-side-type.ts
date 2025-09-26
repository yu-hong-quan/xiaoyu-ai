
export type ListSideChildrenType = {
    id: number;
    content: string;
}

export interface ListSideType {
    id: number;
    title: string;
    data: Array<ListSideChildrenType>;
}

