export interface IMixedChartOptions {
  title: string,
  description?: string,
  options: {
    xColumn: {
      key: string,
      type: 'time' | 'category'
    },
    yColumns: string[],
    globalSeriesType: 'bar' | 'line' | 'area' | 'scatter',
    groupBy?: string,
    seriesOptions: {
      key: string,
      type: 'bar' | 'line' | 'area' | 'scatter',
      yAxis: 'left' | 'right',
      zIndex?: number,
      title?: string,
      color?: string
    }[],
    stacking?: boolean,
    xAxis?: {
      title?: string,
      tickFormat?: string,
      reverseValues?: boolean
    },
    leftYAxis?: {
      title?: string,
      tickFormat?: string,
      labelFormat?: string,
    },
    rightYAxis?: {
      title?: string,
      tickFormat?: string,
      labelFormat?: string,
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

export interface IMixedChartConfig {
  apiEndpoint: string,
  options: IMixedChartOptions
}