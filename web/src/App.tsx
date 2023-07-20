import React, {useEffect} from 'react';
import './App.css';
import { useDispatch } from "react-redux";
import { connect } from 'react-redux';
import { fetchData } from './actions';
import { RootState } from './reducers';
import Grid from '@mui/material/Grid';
import TopSellingDataChart from './components/TopSellingDataChart';
import TopSellingDataByRegion from './components/TopSellingDataByRegion';
import SalesAgainstTarget from './components/SalesAgainstTarget';
import SalesByProductCategory from './components/SalesByProductCategory';
interface AppProps {
    data: {
        loading: boolean;
        error: string | null;
        items: {
            product: string;
            salesRevenue: number;
            region: string;
            targetSales: number;
            productCategory: string;
        }[];
    };
}
const App:React.FC<AppProps> = ({data}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchData());
    },[dispatch]);
    const topSellingData = data.items.slice(0, 10);

  return (
    <div className="App">
      <h1>Sales Dashboard</h1>
        <Grid container justifyContent={"center"} style={{margin: 30}}>
            <TopSellingDataChart topSellingData={topSellingData} />
            <TopSellingDataByRegion topSellingRegion={topSellingData} />
            <SalesAgainstTarget chartData={data.items} />
            <SalesByProductCategory chartData={data.items} />
        </Grid>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
    data: state.data,
});

export default connect(mapStateToProps)(App);
