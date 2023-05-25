export interface IBarChartOptions {
  title: string,
  description?: string,
  options: {
    xColumn: {
      key: string,
      type: 'time' | 'category'
    },
    yColumns: string[],
    groupBy?: string,
    seriesOptions?: {
      key: string,
      title?: string,
      color?: string
    }[],
    stacking?: boolean,
    xAxis?: {
      title?: string,
      tickFormat?: string
      reverseValues?: boolean
    },
    yAxis?: {
      title?: string,
      tickFormat?: string,
      labelFormat?: string,
      position?: 'left' | 'right'
    },
    legend?: {
      show?: boolean,
      scroll?: boolean,
      position?: 'top' | 'bottom' | 'left' | 'right'
    },
    showDataLabels?: boolean,
    percentage?: boolean
  }
}

export interface IBarChartConfig {
  apiEndpoint: string,
  options: IBarChartOptions
}