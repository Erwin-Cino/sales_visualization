import React from 'react';
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
interface DataProps {
    topSellingData: { product: string; salesRevenue: number; region: string }[];
}
const TopSellingDataChart: React.FC<DataProps> = ({topSellingData}) => {
    const options = {
        indexAxis: 'y' as const,
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right' as const,
            },
            title: {
                display: true,
                text: 'Top Selling Data Chart',
            },
        },
    };
    let dataSet: number[] = []
    const topTenSelling = topSellingData.slice(0, 10)
    const labels = topTenSelling.slice(0, 10).map(item => {
        dataSet.push(item.salesRevenue)
        return item.product
    })
    const data = {
        labels,
        datasets: [
            {
                label: 'Sales Revenue',
                data: dataSet,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return (
        <Box
            sx={{
                width: 1200,
            }}
        >
            <Card variant="outlined" style={{padding: 30}}>
                <Bar options={options} data={data} />
            </Card>
        </Box>
    )
}

export default TopSellingDataChart