import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartProduits({ produits }) {
  // Calcul des données à partir des produits mockés
  const categories = produits.reduce((acc, produit) => {
    acc[produit.categorie] = (acc[produit.categorie] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: [
          '#4e73df',
          '#1cc88a',
          '#36b9cc',
          '#f6c23e',
          '#e74a3b',
          '#858796'
        ],
        hoverBackgroundColor: [
          '#2e59d9',
          '#17a673',
          '#2c9faf',
          '#dda20a',
          '#be2617',
          '#6c6e7e'
        ],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  return <Pie data={data} options={options} />;
}