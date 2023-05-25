export interface IAreaChartOptions {
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
    smooth?: boolean,
    legend?: {
      show?: boolean,
      scroll?: boolean,
      position?: 'top' | 'bottom' | 'left' | 'right'
    },
    showSymbol?: boolean,
    showDataLabels?: boolean,
    percentage?: boolean
  }
}

export interface IAreaChartConfig {
  apiEndpoint: string,
  options: IAreaChartOptions
}