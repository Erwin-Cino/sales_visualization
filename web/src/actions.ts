export const fetchData = () => ({
    type: 'FETCH_DATA',
});

export const fetchDataSuccess = (data: { id: number; name: string }[]) => ({
    type: 'FETCH_DATA_SUCCESS',
    payload: data,
});

export const fetchDataFailure = (error: string) => ({
    type: 'FETCH_DATA_FAILURE',
    payload: error,
});