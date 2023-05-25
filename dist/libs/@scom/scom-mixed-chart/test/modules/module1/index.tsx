import { Module, customModule, Container } from '@ijstech/components';
import ScomMixedChart from '@scom/scom-mixed-chart';

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
            <i-scom-mixed-chart
                margin={{ left: 'auto', right: 'auto' }}
                data={{
                    apiEndpoint: "/dune/query/1333833",
                    options: {
                        title: 'Reserve Cumulative Value',
                        description: 'Radiant Capital Reserve Markets (Weekly % change)',
                        options: {
                            xColumn: {
                                key: 'time',
                                type: 'time'
                            },
                            yColumns: [
                                'cumulative_dai',
                                'cumulative_usdc',
                                'cumulative_usdt',
                                'cumulative_wbtc',
                                'cumulative_weth',
                                'cumulative_tokens_value',
                                'cumulative_diff'
                            ],
                            globalSeriesType: 'area',
                            stacking: true,
                            seriesOptions: [
                                {
                                    key: 'cumulative_dai',
                                    title: 'DAI',
                                    type: 'area',
                                    yAxis: 'left'
                                },
                                {
                                    key: 'cumulative_usdc',
                                    title: 'USDC',
                                    type: 'area',
                                    yAxis: 'left'
                                },
                                {
                                    key: 'cumulative_usdt',
                                    title: 'USDT',
                                    type: 'area',
                                    yAxis: 'left'
                                },
                                {
                                    key: 'cumulative_wbtc',
                                    title: 'WBTC',
                                    type: 'area',
                                    yAxis: 'left'
                                },
                                {
                                    key: 'cumulative_weth',
                                    title: 'WETH',
                                    type: 'area',
                                    yAxis: 'left'
                                },
                                {
                                    key: 'cumulative_tokens_value',
                                    title: 'Total',
                                    type: 'scatter',
                                    yAxis: 'left'
                                },
                                {
                                    key: 'cumulative_diff',
                                    title: '% Change',
                                    type: 'line',
                                    yAxis: 'right',
                                    color: '#ff0000'
                                }
                            ],
                            xAxis: {
                                title: 'Date',
                                tickFormat: 'MMM DD'
                            },
                            leftYAxis: {
                                labelFormat: '$0[].0a'
                            },
                            rightYAxis: {
                                tickFormat: '0[].0%',
                                labelFormat: '0[].0%'
                            }
                        }
                    }
                }}
                tag={{
                    width: '100%'
                }}
            />
        </i-panel>
    }
}