export default {
  defaultBuilderData: {
    apiEndpoint: "/dune/query/2360905",
    options: {
      title: 'ETH Withdrawals after Shanghai Unlock vs ETH price',
      options: {
        xColumn: {
          key: 'time',
          type: 'time'
        },
        yColumns: [
          'eth_price',
        ],
        seriesOptions: [
          {
            key: 'eth_price',
            title: 'ETH Price'
          }
        ],
        xAxis: {
          title: 'Date',
          tickFormat: 'MMM DD'
        },
        yAxis: {
          labelFormat: '$0[].0a',
          position: 'left'
        }
      }
    }
  }
}
