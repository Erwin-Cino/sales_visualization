import React from 'react';
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

interface DataProps {
    chartData: {
        product: string;
        salesRevenue: number;
        region: string;
        targetSales: number;
        productCategory: string;
    }[];
}
const SalesByProductCategory:React.FC<DataProps> = ({chartData}) => {

    const categories = ["Food", "Shoes", "Shirt", "Dress", "Toy", "House Item"];

    const dataSet:number[] = categories.map((category, index) => {
        return chartData.filter(item => item.productCategory === categories[index]).reduce((prev, next) => {
            return prev + next.salesRevenue;
        }, 0);
    })


    const data = {
        labels: categories,
        datasets: [
            {
                label: 'Sales by Product Category',
                data: dataSet,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Sales vs. Product Category',
            },
        },
    };

    return (
        <Box
            sx={{
                width: 1200,
            }}
        >
            <Card variant="outlined" style={{padding: 30, display: "flex", justifyContent: 'center'}}>
                <div style={{width: 600}}>
                    <Pie data={data} style={{margin: "0 auto"}} options={options}/>
                </div>
            </Card>
        </Box>
    )

}

export default SalesByProductCategory