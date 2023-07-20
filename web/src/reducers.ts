export const initialState = {
    data: {
        items: [],
        loading: false,
        error: null,
    },
};

interface DataState {
    items: {
        product: string;
        salesRevenue: number;
        region: string;
        targetSales: number;
        productCategory: string;
    }[];
    loading: boolean;
    error: string | null;
}
export interface RootState {
    data: DataState;
}

interface Action {
    type: string;
    payload: any;
}
const reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'FETCH_DATA':
            return {
                ...state,
                data: {
                    ...state.data,
                    loading: true,
                    error: null,
                },
            };
        case 'FETCH_DATA_SUCCESS':
            return {
                ...state,
                data: {
                    ...state.data,
                    items: action.payload,
                    loading: false,
                    error: null,
                },
            };
        case 'FETCH_DATA_FAILURE':
            return {
                ...state,
                data: {
                    ...state.data,
                    loading: false,
                    error: action.payload,
                },
            };
        default:
            return state;
    }
};

export default reducer;