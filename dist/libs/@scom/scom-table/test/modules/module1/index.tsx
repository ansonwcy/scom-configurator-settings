import { Module, customModule, Container } from '@ijstech/components';
import ScomTable from '@scom/scom-table';

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
            <i-scom-table
                margin={{ left: 'auto', right: 'auto' }}
                data={{
                    apiEndpoint: "/dune/query/2030664",
                    options: {
                        title: 'Ethereum Beacon Chain Deposits Entity',
                        columns: [
                            {
                                name: 'ranking',
                                title: 'Rnk'
                            },
                            {
                                name: 'entity',
                                title: 'Pool name'
                            },
                            {
                                name: 'eth_deposited',
                                type: 'progressbar',
                                title: 'ETH deposited',
                                numberFormat: '0,000.'
                            },
                            {
                                name: 'validators',
                                title: 'Validators',
                                numberFormat: '0,000'
                            },
                            {
                                name: 'marketshare',
                                title: 'Share',
                                numberFormat: '0,000.00%'
                            }
                        ]
                    }
                }}
            />
        </i-panel>
    }
}