const { h, render, Component, Color } = require('ink');

const TextInput = require('ink-text-input');
const { List, ListItem } = require('ink-checkbox-list');
const QuickSearch = require('ink-quicksearch');
const ConfirmInput = require('ink-confirm-input');

class Name extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    render() {
        return <span>
            <span>url: </span>
            <TextInput
                value={this.state.value}
                onChange={value => this.setState({value})}
                onSubmit={value => this.onSubmit(value)}
            />
            <span>.officeroo.io</span>
        </span>
    }

    onSubmit(value) {
        this.props.onSubmit(value)
    }
}

class Offices extends Component {
    render() {
        return <div></div>
    }

    componentDidMount() {
        this.props.onSubmit();
    }

}

class Activities extends Component {
    render() {
        const activities = [
            "ping_pong",
            "table_football",
            "coffee",
            "lunch",
            "pool",
            "fifa",
        ].map(activity => <ListItem value={activity}>{activity}</ListItem>)

        return <span>
            <div>Select activities (select with SPACE, submit with ENTER)</div>
            <span>
                <List
                    onSubmit={list => this.props.onSubmit(list)}
                >
                    {activities}
                </List>
            </span>
        </span>

    }
}

class AllowedEmailDomains extends Component {
    render() {
        return <div></div>
    }

}

class HasLogo extends Component {
    render() {
        return <span>
            <div>Has Logo?</div>
            <span>
                <QuickSearch
                    items={[
                        {value: false, label: 'No'},
                        {value: true, label: 'Yes'},
                    ]}
                    onSelect={d => this.props.onSubmit(d.value)}
                />
            </span>
        </span>
    }

}

class Result extends Component {
    render() {
        return <span>
            <div>
                {JSON.stringify(this.props.value, null, 2)}
            </div>
            <span>
                Press ENTER if Happy
            </span>
            <span>
                <ConfirmInput
                    checked
                    onSubmit={(v) => this.props.onSubmit()}
                />
            </span>
        </span>
    }
}


class UI extends Component {
    constructor() {
        super();

        this.state = {
            node: 5
        };
        this.json = {}
    }

    render() {
        switch (this.state.node) {
            case 0: {
                return <Name
                    onSubmit={value => {
                        this.json.name = value;
                        this.advanceNode();
                    }}
                />
            }
            case 1: {
                return <Offices
                    onSubmit={value => {
                        this.json;
                        this.advanceNode();
                    }}
                />
            }
            case 2: {
                return <Activities
                    onSubmit={activityList => {
                        this.json.activities = activityList;
                        this.advanceNode();
                    }}
                />
            }
            case 3: {
                return <AllowedEmailDomains
                    onSubmit={value => {
                        this.json;
                        this.advanceNode();
                    }}
                />
            }
            case 4: {
                return <HasLogo
                    onSubmit={value => {
                        this.json.has_logo = value;
                        this.advanceNode();
                    }}
                />
            }
            case 5: {
                return <Result
                    value={this.json}
                    onSubmit={value => {
                        this.advanceNode();
                    }}
                />
            }
            default: {
                process.exit(0)
            }
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    advanceNode() {
        let {node} = this.state;
        node += 1;
        this.setState({node});
    }
}

module.exports = UI;
