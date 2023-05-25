export default {
  defaultBuilderData: {
    apiEndpoint: "/dune/query/2360815",
    options: {
      title: 'ETH Withdrawals after Shanghai Unlock',
      options: {
        xColumn: {
          key: 'time',
          type: 'time'
        },
        yColumns: [
          'ETH',
        ],
        groupBy: 'category',
        stacking: true,
        legend: {
          show: true
        },
        seriesOptions: [
          {
            key: 'Reward',
            color: '#378944'
          },
          {
            key: 'Full Withdraw',
            color: '#b03030'
          }
        ],
        xAxis: {
          title: 'Date',
          tickFormat: 'MMM DD'
        },
        yAxis: {
          title: 'ETH',
          position: 'left',
          labelFormat: '0,000.ma'
        }
      }
    }
  }
}
