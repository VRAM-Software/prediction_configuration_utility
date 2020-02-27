import React from 'react';
import { csv } from 'd3';
import { Scatter } from 'react-chartjs-2';
import dataCsv from './data.csv';

export default class Graph extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: null,
      dataIsLoaded: false
    }
  }


  createGraph = obj => {
    const asd = {
      labels: ['Scatter'],
      datasets: [
        {
          label: 'My First dataset',
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 2,
          pointHitRadius: 10,
          data: obj
        }
      ]
    };

    this.setState({
      data: asd,
      dataIsLoaded: true
    })
  }

  handleClick = e => {
    console.log("ciao", this.state.data);
  }

  render() {
    csv(dataCsv, data => {
      this.createGraph(data);
    });
    return (
      <div>
        <h2 onClick={this.handleClick}> Scatter Graph </h2>
        {
          this.state.dataIsLoaded ?
            <Scatter
              data={this.state.data}
              width={50}
              height={400}
              options={{ maintainAspectRatio: false }}
            />
            :
            null
        }
      </div>
    );
  }
}