const { h, render, Component, Color } = require('ink');

const Foo = require('import-jsx')('./Foo.jsx')

class Counter extends Component {
    constructor() {
        super();

        this.state = {
            i: 0
        };
    }

    render() {
        return (
            <Color green>
                {this.state.i} tests passed
                <br/>
                <Foo></Foo>
            </Color>
        );
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                i: this.state.i + 1
            });
        }, 100);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
}

module.exports = Counter;
