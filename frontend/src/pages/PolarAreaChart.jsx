import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);


export function PolarAreaChart(props) {
console.log(props.data);
const acousticness = props.data['acousticness'];
const danceability = props.data['danceability'];
const energy = props.data['energy'];
const instrumentalness = props.data['instrumentalness'];
const liveness = props.data['liveness'];
const speechiness = props.data['speechiness'];
const valence = props.data['valence'];
var options = {
  }
const data =  {
    labels: ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'speechiness', 'valence'],
    datasets: [

      {
        data: [acousticness, danceability, energy, instrumentalness*20, liveness,speechiness,valence],
        backgroundColor: [
          '#386641',
          '#6a994e',
          '#a7c957',
          '#f2e8cf',
          '#bc4749',
          '#db504a',
          'ff6f59',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  return <PolarArea data={data} options={options} />;
}
