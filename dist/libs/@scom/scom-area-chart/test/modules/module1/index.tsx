import { Module, customModule, Container } from '@ijstech/components';
import ScomAreaChart from '@scom/scom-area-chart';

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
            <i-scom-area-chart
                margin={{ left: 'auto', right: 'auto' }}
                data={{
                    apiEndpoint: "/dune/query/2030745",
                    options: {
                        title: 'ETH Staked - Cumulative',
                        options: {
                            xColumn: {
                                key: 'date',
                                type: 'time'
                            },
                            yColumns: [
                                'total_eth',
                            ],
                            stacking: true,
                            groupBy: 'depositor_entity_category',
                            seriesOptions: [
                                {
                                    key: 'CEX',
                                    color: '#d52828'
                                },
                                {
                                    key: 'Liquid Staking',
                                    color: '#d2da25'
                                },
                                {
                                    key: 'Others',
                                    color: '#000000'
                                },
                                {
                                    key: 'Staking Pools',
                                    color: '#49a34f'
                                },
                                {
                                    key: 'Unidentified',
                                    color: '#bcb8b8'
                                }
                            ],
                            xAxis: {
                                title: 'Date',
                                tickFormat: 'MMM YYYY'
                            },
                            yAxis: {
                                title: 'ETH deposited',
                                labelFormat: '0,000.00ma',
                                position: 'left'
                            }
                        }
                    }
                }}
            />
        </i-panel>
    }
}