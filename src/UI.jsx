const { h, render, Component, Color } = require('ink');

const Foo = require('import-jsx')('./Foo.jsx')
const TextInput = require('ink-text-input');
const {List, ListItem} = require('ink-checkbox-list');

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
        return <div></div>
    }

}

class Result extends Component {
    render() {
        return <div>

        </div>
    }
}


class UI extends Component {
    constructor() {
        super();

        this.state = {
            node: 0
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
                        this.json;
                        this.advanceNode();
                    }}
                />
            }
            case 5: {
                return <Result
                    onSubmit={value => {
                        this.json;
                        this.advanceNode();
                    }}
                />
            }
            default: {
                return <div>Done</div>
            }
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    advanceNode() {
        let {node} = this.state;
        node += 1;
        this.setState({node});
    }
}

module.exports = UI;
