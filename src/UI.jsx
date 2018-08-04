const { h, render, Component, Color } = require('ink');

const Foo = require('import-jsx')('./Foo.jsx')
const TextInput = require('ink-text-input');

class Name extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    render() {
        return <TextInput
            value={this.state.value}
            onChange={value => this.setState({value})}
            onSubmit={value => this.onSubmit(value)}
        />
    }

    onSubmit(value) {
        this.props.onSubmit(value)
    }
}

class Offices extends Component {
    render() {
        return <div></div>
    }

}

class Activities extends Component {
    render() {
        return <div></div>
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
                    onSubmit={value => {}}
                />
            }
            case 2: {
                return <Activities
                    onSubmit={value => {}}
                />
            }
            case 3: {
                return <AllowedEmailDomains
                    onSubmit={value => {}}
                />
            }
            case 4: {
                return <HasLogo
                    onSubmit={value => {}}
                />
            }
            case 5: {
                return <Result
                    onSubmit={value => {}}
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
