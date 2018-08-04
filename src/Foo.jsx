const { h, Component, Color } = require('ink');

class Foo extends Component {

    render() {
        return (
            <Color red>
                Foo
            </Color>
        );
    }
}

module.exports = Foo;
