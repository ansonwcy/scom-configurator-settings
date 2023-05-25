export interface ITableOptions {
  title: string,
  description?: string,
  columns: {
    name: string,
    title?: string,
    alignContent?: string,
    isHidden?: boolean,
    numberFormat?: string,
    type?: 'normal' | 'progressbar',
    coloredPositiveValues?: boolean,
    coloredNegativeValues?: boolean
  }[]
}

export interface ITableConfig {
  apiEndpoint: string,
  options: ITableOptions
}