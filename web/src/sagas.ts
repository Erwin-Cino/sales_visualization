import { put, takeLatest, all } from 'redux-saga/effects';
import { fetchDataSuccess, fetchDataFailure } from './actions';
import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

function* fetchDataSaga():any {
    try {
        const client = new ApolloClient({
            uri: 'http://localhost:4000',
            cache: new InMemoryCache(),
        });

        const response = yield client.query({
            query: gql`
                query {
                  getTopSellingProduct {
                    product
                    salesRevenue
                    region
                  }
                }
              `,
        });

        yield put(fetchDataSuccess(response.data.getData));
    } catch (error: any) {
        yield put(fetchDataFailure(error?.message || "Error"));
    }
}

function* watchFetchData() {
    yield takeLatest('FETCH_DATA', fetchDataSaga);
}

export default function* rootSaga() {
    yield all([watchFetchData()]);
}
