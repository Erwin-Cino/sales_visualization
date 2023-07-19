import React, {useEffect} from 'react';
import './App.css';
import { useDispatch } from "react-redux";
import { connect } from 'react-redux';
import { fetchData } from './actions';
import { RootState } from './reducers';

interface AppProps {
    data: {
        loading: boolean;
        error: string | null;
        items: { product: string; salesRevenue: number; region: string }[];
    };
}
const App:React.FC<AppProps> = ({data}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchData());
    },[dispatch])
  return (
    <div className="App">
      <h1>Lets do this</h1>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
    data: state.data,
});

export default connect(mapStateToProps)(App);
