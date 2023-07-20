export const fetchData = () => ({
    type: 'FETCH_DATA',
});

export const fetchDataSuccess = (data: {
    product: string;
    salesRevenue: number;
    region: string;
    targetSales: number;
    productCategory: string;
}[]) => ({
    type: 'FETCH_DATA_SUCCESS',
    payload: data,
});

export const fetchDataFailure = (error: string) => ({
    type: 'FETCH_DATA_FAILURE',
    payload: error,
});