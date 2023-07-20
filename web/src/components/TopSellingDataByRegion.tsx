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
    topSellingRegion: { product: string; salesRevenue: number; region: string }[];
}
const TopSellingDataByRegion: React.FC<DataProps> = ({topSellingRegion}) => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Top Sales Revenue By Region',
            },
        },
    };
    let dataSet: number[] = []
    const topTenSelling = topSellingRegion.slice(0, 10)
    const labels = topTenSelling.slice(0, 10).map(item => {
        dataSet.push(item.salesRevenue)
        return item.region
    })
    const data = {
        labels,
        datasets: [
            {
                label: 'Sales Revenue',
                data: dataSet,
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

export default TopSellingDataByRegion