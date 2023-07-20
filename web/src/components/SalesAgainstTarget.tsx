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
    chartData: {
        product: string;
        salesRevenue: number;
        region: string;
        targetSales: number;
        productCategory: string;
    }[];
}

const SalesAgainstTarget:React.FC<DataProps> = ({chartData}) => {
    const salesRevenue:number[] = [];
    const targetSales:number[] = []
    const labels = chartData.slice(0, 20).map(item => {
        salesRevenue.push(item.salesRevenue)
        targetSales.push(item.targetSales)
        return item.product
    })

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Sales Revenue vs Target',
            },
        },
    };
    const data = {
        labels,
        datasets: [
            {
                label: 'Sales Revenue',
                data: salesRevenue,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Target Sales Revenue',
                data: targetSales,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
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

export default SalesAgainstTarget