import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  Chart,
  RadarController,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartConfiguration,
} from 'chart.js';

@Component({
  selector: 'opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.scss'], // Ensure this file has necessary styles
})
export class OpportunitiesComponent implements OnInit, AfterViewInit {
  @ViewChild('riskChart') riskChart: ElementRef<HTMLCanvasElement> | undefined;

  // Chart configuration
  public radarChartConfig: ChartConfiguration<'radar'> = {
    type: 'radar',
    data: {
      labels: [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
        'Running',
      ],
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 90, 81, 56, 55, 40],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'My Second Dataset',
          data: [28, 48, 40, 19, 96, 27, 100],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)',
        },
      ],
    },
    options: {
      elements: {
        line: {
          borderWidth: 3,
        },
      },
      scales: {
        r: {
          angleLines: {
            display: false,
          },
          suggestedMin: 50,
          suggestedMax: 100,
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem: any) {
              return ` ${tooltipItem.dataset.label}: ${tooltipItem.raw} `;
            },
          },
        },
        legend: {
          position: 'top',
        },
      },
    },
  };

  constructor() {
    // Register Chart.js components
    Chart.register(
      RadarController,
      PointElement,
      LinearScale,
      Title,
      Tooltip,
      Legend
    );
  }

  ngOnInit(): void {
    // Initialization logic...
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
    // Initialize Radar Chart
    const canvas = this.riskChart?.nativeElement;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      new Chart(ctx, this.radarChartConfig);
    }
  }
}
