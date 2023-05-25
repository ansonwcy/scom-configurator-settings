import { Module, customModule, Container } from '@ijstech/components';
import ScomBarChart from '@scom/scom-bar-chart';

@customModule
export default class Module1 extends Module {
    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }

    async init() {
        super.init();
    }

    render() {
        return <i-panel>
            <i-scom-bar-chart
                margin={{ left: 'auto', right: 'auto' }}
                data={{
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
                            legend: true,
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
                }}
            />
        </i-panel>
    }
}