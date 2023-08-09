export default [
    {
        "id": 0,
        "title": "[Counter] Ethereum Beacon Chain Deposits",
        "path": "scom-counter",
        "properties": {
            "apiEndpoint": "https://api.dune.com/api/v1/query/2030584/results?api_key=GZ0R7Jim7TWLY7umXitxtiswiaD4eM7j",
            "title": "Ethereum Beacon Chain Deposits",
            "options": {
                "counterColName": "deposited",
                "counterLabel": "ETH deposited"
            }
        }
    },
    {
        "id": 1,
        "title": "[Table] Ethereum Beacon Chain Deposits Entity",
        "path": "scom-table",
        "properties": {
            "apiEndpoint": "https://api.dune.com/api/v1/query/2030664/results?api_key=GZ0R7Jim7TWLY7umXitxtiswiaD4eM7j",
            "title": "Ethereum Beacon Chain Deposits Entity",
            "options": {
                "columns": [
                    {
                        "name": "ranking",
                        "title": "Rnk"
                    },
                    {
                        "name": "entity",
                        "title": "Pool name"
                    },
                    {
                        "name": "eth_deposited",
                        "type": "progressbar",
                        "title": "ETH deposited",
                        "numberFormat": "0,000."
                    },
                    {
                        "name": "validators",
                        "title": "Validators",
                        "numberFormat": "0,000"
                    },
                    {
                        "name": "marketshare",
                        "title": "Share",
                        "numberFormat": "0,000.00%"
                    }
                ]
            }
        }
    },
    {
        "id": 2,
        "title": "[Table] Top ETH withdraw recipients after Shanghai Unlock",
        "description": "Reward",
        "path": "scom-table",
        "properties": {
            "apiEndpoint": "https://api.dune.com/api/v1/query/2377402/results?api_key=GZ0R7Jim7TWLY7umXitxtiswiaD4eM7j",
            "title": "Top ETH withdraw recipients after Shanghai Unlock",
            "description": "Reward",
            "options": {
                "columns": [
                    {
                        "name": "address",
                        "title": "ETH receivers"
                    },
                    {
                        "name": "validators",
                        "title": "Validators",
                        "numberFormat": "0,000.ma"
                    },
                    {
                        "name": "ETH",
                        "title": "ETH received",
                        "numberFormat": "0,000.ma"
                    }
                ]
            }
        }
    },
    {
        "id": 3,
        "type": "table",
        "title": "[Table] Top ETH withdraw recipients after Shanghai Unlock",
        "description": "Full withdraw",
        "path": "scom-table",
        "properties": {
            "apiEndpoint": "https://api.dune.com/api/v1/query/2377304/results?api_key=GZ0R7Jim7TWLY7umXitxtiswiaD4eM7j",
            "title": "Top ETH withdraw recipients after Shanghai Unlock",
            "description": "Full withdraw",
            "options": {
                "columns": [
                    {
                        "name": "address",
                        "title": "ETH receivers"
                    },
                    {
                        "name": "validators",
                        "title": "Validators",
                        "numberFormat": "0,000.ma"
                    },
                    {
                        "name": "ETH",
                        "title": "ETH received",
                        "numberFormat": "0,000.ma"
                    }
                ]
            }
        }
    },
    {
        "id": 4,
        "title": "[Pie Chart] Ethereum Beacon Chain Deposits Entity",
        "path": "scom-pie-chart",
        "properties": {
            "apiEndpoint": "https://api.dune.com/api/v1/query/2030664/results?api_key=GZ0R7Jim7TWLY7umXitxtiswiaD4eM7j",
            "title": "Ethereum Beacon Chain Deposits Entity",
            "options": {
                "xColumn": "entity",
                "yColumn": "eth_deposited",
                "serieName": "ETH deposited",
                "numberFormat": "0,000.00ma",
                "showDataLabels": true,
                "valuesOptions": [
                    { "name": "Lido", "color": "#e58f8f" },
                    { "name": "Other", "color": "#a9a4a4" },
                    { "name": "Kraken", "color": "#0077ff" },
                    { "name": "Binance", "color": "#f4f000" },
                    { "name": "Coinbase", "color": "#0c22e3" }
                ]
            }
        }
    },
    {
        "id": 5,
        "title": "[Pie Chart] Liquid Staking validators - All",
        "path": "scom-pie-chart",
        "properties": {
            "apiEndpoint": "https://api.dune.com/api/v1/query/2360788/results?api_key=GZ0R7Jim7TWLY7umXitxtiswiaD4eM7j",
            "title": "Liquid Staking validators - All",
            "options": {
                "xColumn": "depositor_entity_category",
                "yColumn": "staked",
                "serieName": "ETH Staked",
                "numberFormat": "0,000",
                "showDataLabels": true,
                "valuesOptions": [
                    { "name": "CEX", "color": "#f00c0c" },
                    { "name": "Other", "color": "#000000" },
                    { "name": "Others", "color": "#000000" },
                    { "name": "Staking Pools", "color": "#3995ce" },
                    { "name": "Liquid Staking", "color": "#c1ba2a" }
                ]
            }
        }
    },
    {
        "id": 6,
        "title": "[Bar Chart] ETH Withdrawals after Shanghai Unlock",
        "path": "scom-bar-chart",
        "properties": {
            "apiEndpoint": "https://api.dune.com/api/v1/query/2360815/results?api_key=324WhvsCHWCji2pkgtfa0JDqDu8j0FdD",
            "title": "ETH Withdrawals after Shanghai Unlock",
            "options": {
                "xColumn": {
                    "key": "time",
                    "type": "time"
                },
                "yColumns": [
                    "ETH"
                ],
                "groupBy": "category",
                "stacking": true,
                "legend": {
                    "show": true
                },
                "seriesOptions": [
                    {
                        "key": "Reward",
                        "color": "#378944"
                    },
                    {
                        "key": "Full Withdraw",
                        "color": "#b03030"
                    }
                ],
                "xAxis": {
                    "title": "Date",
                    "tickFormat": "MMM DD"
                },
                "yAxis": {
                    "title": "ETH",
                    "position": "left",
                    "labelFormat": "0,000.ma"
                }
            }
        }
    },
    {
        "id": 7,
        "title": "[Line Chart] ETH Withdrawals after Shanghai Unlock vs ETH price",
        "path": "scom-line-chart",
        "properties": {
            "apiEndpoint": "https://api.dune.com/api/v1/query/2360905/results?api_key=324WhvsCHWCji2pkgtfa0JDqDu8j0FdD",
            "title": "ETH Withdrawals after Shanghai Unlock vs ETH price",
            "options": {
                "xColumn": {
                    "key": "time",
                    "type": "time"
                },
                "yColumns": [
                    "eth_price"
                ],
                "seriesOptions": [
                    {
                        "key": "eth_price",
                        "title": "ETH Price",
                        "color": "#000"
                    }
                ],
                "xAxis": {
                    "title": "Date",
                    "tickFormat": "MMM DD"
                },
                "yAxis": {
                    "labelFormat": "$0,000.00",
                    "position": "left"
                }
            }
        }
    },
    {
        "id": 8,
        "title": "[Area Chart] LP Value Overtime",
        "description": "RDNT/WETH LP Value",
        "path": "scom-area-chart",
        "properties": {
            "apiEndpoint": "https://api.dune.com/api/v1/query/284022/results?api_key=324WhvsCHWCji2pkgtfa0JDqDu8j0FdD",
            "title": "LP Value Overtime",
            "description": "RDNT/WETH LP Value",
            "options": {
                "xColumn": {
                    "key": "time",
                    "type": "time"
                },
                "yColumns": [
                    "rdnt_value",
                    "weth_value"
                ],
                "stacking": true,
                "legend": {
                    "show": true
                },
                "seriesOptions": [
                    {
                        "key": "rdnt_value",
                        "title": "RDNT",
                        "color": "#2793cb"
                    },
                    {
                        "key": "weth_value",
                        "title": "WETH",
                        "color": "#aaace6"
                    }
                ],
                "xAxis": {
                    "tickFormat": "MMM YYYY"
                },
                "yAxis": {
                    "labelFormat": "$0[,].00",
                    "tickerFormat": "$0[,].00ma",
                    "position": "left"
                }
            }
        }
    },
    {
        "id": 9,
        "title": "[Area Chart] ETH Withdrawals after Shanghai Unlock",
        "description": "ETH withdrawals cumsum",
        "path": "scom-area-chart",
        "properties": {
            "apiEndpoint": "https://api.dune.com/api/v1/query/2360815/results?api_key=324WhvsCHWCji2pkgtfa0JDqDu8j0FdD",
            "title": "ETH Withdrawals after Shanghai Unlock",
            "description": "ETH withdrawals cumsum",
            "options": {
                "xColumn": {
                    "key": "time",
                    "type": "time"
                },
                "yColumns": [
                    "ETH_cum"
                ],
                "stacking": true,
                "legend": {
                    "show": true
                },
                "seriesOptions": [
                    {
                        "key": "ETH_cum",
                        "title": "ETH total",
                        "color": "#000000"
                    }
                ],
                "xAxis": {
                    "tickFormat": "MMM YYYY"
                },
                "yAxis": {
                    "labelFormat": "$0[,].00",
                    "tickerFormat": "$0[,].00ma",
                    "position": "left"
                }
            }
        }
    },
    {
        "id": 10,
        "title": "[Area Chart] RDNT/WETH LP Staked Supply",
        "description": "Radiant Capital Pool2 Staking LP",
        "path": "scom-area-chart",
        "properties": {
            "apiEndpoint": "https://api.dune.com/api/v1/query/283918/results?api_key=324WhvsCHWCji2pkgtfa0JDqDu8j0FdD",
            "title": "RDNT/WETH LP Staked Supply",
            "description": "Radiant Capital Pool2 Staking LP",
            "options": {
                "xColumn": {
                    "key": "time",
                    "type": "time"
                },
                "yColumns": [
                    "masterchef_pool",
                    "non_masterchef_pool"
                ],
                "stacking": true,
                "percentage": true,
                "legend": {
                    "show": true
                },
                "seriesOptions": [
                    {
                        "key": "masterchef_pool",
                        "title": "Staked",
                        "color": "#2793cb"
                    },
                    {
                        "key": "non_masterchef_pool",
                        "title": "Unstaked",
                        "color": "#ff0000"
                    }
                ],
                "xAxis": {
                    "tickFormat": "MMM YYYY"
                }
            }
        }
    },
    {
        "id": 11,
        "title": "[Scatter Chart] ETH Withdrawals after Shanghai Unlock vs ETH price",
        "path": "scom-scatter-chart",
        "properties": {
            "apiEndpoint": "https://api.dune.com/api/v1/query/2360905/results?api_key=324WhvsCHWCji2pkgtfa0JDqDu8j0FdD",
            "title": "ETH Withdrawals after Shanghai Unlock vs ETH price",
            "options": {
                "xColumn": {
                    "key": "time",
                    "type": "time"
                },
                "yColumns": [
                    "eth_price"
                ],
                "seriesOptions": [
                    {
                        "key": "eth_price",
                        "title": "ETH Price"
                    }
                ],
                "xAxis": {
                    "title": "Date",
                    "tickFormat": "MMM DD"
                },
                "yAxis": {
                    "labelFormat": "$0[].0a",
                    "position": "left"
                }
            }
        }
    },
    {
        "id": 12,
        "title": "[Mixed Chart] Reserve Cumulative Value",
        "path": "scom-mixed-chart",
        "properties": {
            "apiEndpoint": "https://api.dune.com/api/v1/query/1333833/results?api_key=324WhvsCHWCji2pkgtfa0JDqDu8j0FdD",
            "title": "Reserve Cumulative Value",
            "description": "Radiant Capital Reserve Markets (Weekly % change)",
            "options": {
                "xColumn": {
                    "key": "time",
                    "type": "time"
                },
                "yColumns": [
                    "cumulative_dai",
                    "cumulative_usdc",
                    "cumulative_usdt",
                    "cumulative_wbtc",
                    "cumulative_weth",
                    "cumulative_tokens_value",
                    "cumulative_diff"
                ],
                "globalSeriesType": "area",
                "stacking": true,
                "seriesOptions": [
                    {
                        "key": "cumulative_dai",
                        "title": "DAI",
                        "type": "area",
                        "yAxis": "left"
                    },
                    {
                        "key": "cumulative_usdc",
                        "title": "USDC",
                        "type": "area",
                        "yAxis": "left"
                    },
                    {
                        "key": "cumulative_usdt",
                        "title": "USDT",
                        "type": "area",
                        "yAxis": "left"
                    },
                    {
                        "key": "cumulative_wbtc",
                        "title": "WBTC",
                        "type": "area",
                        "yAxis": "left"
                    },
                    {
                        "key": "cumulative_weth",
                        "title": "WETH",
                        "type": "area",
                        "yAxis": "left"
                    },
                    {
                        "key": "cumulative_tokens_value",
                        "title": "Total",
                        "type": "scatter",
                        "yAxis": "left"
                    },
                    {
                        "key": "cumulative_diff",
                        "title": "% Change",
                        "type": "line",
                        "yAxis": "right",
                        "color": "#ff0000"
                    }
                ],
                "xAxis": {
                    "title": "Date",
                    "tickFormat": "MMM DD"
                },
                "leftYAxis": {
                    "labelFormat": "$0[].0a"
                },
                "rightYAxis": {
                    "tickFormat": "0[].0%",
                    "labelFormat": "0[].0%"
                }
            }
        }
    },
    {
        "id": 13,
        "title": "[Mixed Chart] $RDNT Price Chart",
        "description": "RDNT Price Chart on Arbitrum and BSC",
        "path": "scom-mixed-chart",
        "properties": {
            "apiEndpoint": "https://api.dune.com/api/v1/query/1154848/results?api_key=324WhvsCHWCji2pkgtfa0JDqDu8j0FdD",
            "title": "$RDNT Price Chart",
            "description": "RDNT Price Chart on Arbitrum and BSC",
            "options": {
                "xColumn": {
                    "key": "time",
                    "type": "time"
                },
                "yColumns": [
                    "rdnt_price",
                    "red_volume",
                    "green_volume"
                ],
                "globalSeriesType": "area",
                "seriesOptions": [
                    {
                        "key": "rdnt_price",
                        "title": "Price",
                        "type": "area",
                        "color": "#aaaacd",
                        "yAxis": "left",
                        "zIndex": 0
                    },
                    {
                        "key": "red_volume",
                        "title": "$USD Volume",
                        "type": "bar",
                        "color": "#f51818",
                        "yAxis": "right",
                        "zIndex": 1
                    },
                    {
                        "key": "green_volume",
                        "title": "$USD Volume",
                        "type": "bar",
                        "color": "#4fa0e0",
                        "yAxis": "right",
                        "zIndex": 2
                    }
                ],
                "xAxis": {
                    "title": "Date",
                    "tickFormat": "MMM DD"
                },
                "leftYAxis": {
                    "tickFormat": "$0[].000",
                    "labelFormat": "$0[.,].00"
                },
                "rightYAxis": {
                    "tickFormat": "$0[].00a",
                    "labelFormat": "$0[.,].00"
                }
            }
        }
    },
    {
        "id": 14,
        "title": "[Mixed Chart] Holders OverTime",
        "description": "RDNT and RDNT V2 Holders Overtime",
        "path": "scom-mixed-chart",
        "properties": {
            "apiEndpoint": "https://api.dune.com/api/v1/query/947867/results?api_key=324WhvsCHWCji2pkgtfa0JDqDu8j0FdD",
            "title": "Holders OverTime",
            "description": "RDNT and RDNT V2 Holders Overtime",
            "options": {
                "xColumn": {
                    "key": "time",
                    "type": "time"
                },
                "yColumns": [
                    "red_change",
                    "green_change",
                    "total_holders"
                ],
                "globalSeriesType": "line",
                "seriesOptions": [
                    {
                        "key": "red_change",
                        "title": "Change",
                        "type": "bar",
                        "color": "#ff0000",
                        "yAxis": "right",
                        "zIndex": 2
                    },
                    {
                        "key": "green_change",
                        "title": "Change",
                        "type": "bar",
                        "color": "#00ff17",
                        "yAxis": "right",
                        "zIndex": 1
                    },
                    {
                        "key": "total_holders",
                        "title": "Total Holders",
                        "type": "line",
                        "yAxis": "left",
                        "zIndex": 0
                    }
                ],
                "xAxis": {
                    "title": "Date",
                    "tickFormat": "MMM DD"
                }
            }
        }
    }
] as {
    id: number;
    title: string;
    description?: string;
    path: string;
    properties: {
        [key: string]: string | number | object
    }
}[]
