import { Module, customModule, Container } from '@ijstech/components';
import ScomLineChart from '@scom/scom-line-chart';

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
            <i-scom-line-chart
                margin={{ left: 'auto', right: 'auto' }}
                data={{
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
                                    color: '#000'
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
                }}
            />
        </i-panel>
    }
}