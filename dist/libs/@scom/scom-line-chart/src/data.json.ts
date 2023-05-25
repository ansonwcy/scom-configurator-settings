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
            title: 'ETH Price',
            color: '#EE2020'
          }
        ],
        xAxis: {
          title: 'Date',
          tickFormat: 'MMM DD'
        },
        yAxis: {
          labelFormat: '0,000.00$',
          position: 'left'
        }
      }
    }
  }
}
