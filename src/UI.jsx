const fs = require('fs');
const path = require('path');

const { h, render, Component, Color } = require('ink');

const TextInput = require('ink-text-input');
const { List, ListItem } = require('ink-checkbox-list');
const QuickSearch = require('ink-quicksearch');
const ConfirmInput = require('ink-confirm-input');


class TextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buffer: [],
            value: '',
        }
    }

    render() {
        const prevLines = this.state.buffer.map((d, i) => <div key={i}>{this.props.prefix || ''}{d}</div>)
        return <span>
            <span>
                {prevLines}
            </span>
            <span>
                <span>{this.props.prefix || ''}</span>
                <TextInput
                    value={this.state.value}
                    onChange={value => this.setState({value})}
                    onSubmit={value => this.onNewLine(value)}
                />
            </span>
        </span>
    }

    onNewLine(value) {
        if (value === '') {
            this.props.onSubmit(this.state.buffer)
        } else {
            this.setState({
                value: '',
                buffer: [...this.state.buffer, this.state.value]
            })
        }
    }
}


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
                onSubmit={value => {
                    if (value.trim() === '') {
                        console.error("ERROR: Name cannot be empty")
                    } else {
                        this.props.onSubmit(value.trim())
                    }
                }}
            />
            <span>.officeroo.io</span>
        </span>
    }
}

class Offices extends Component {
    render() {
        return <span>
            <div>Enter offices one per line. ENTER for new line. DOUBLE ENTER to submit</div>
            <TextArea
                onSubmit={list => {
                    if (list.length === 0) {
                        console.error("ERROR: Need at least one office")
                    } else {
                        this.props.onSubmit(list)
                    }
                }}
            />
        </span>
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
                    onSubmit={list => {
                        if (list.length === 0) {
                            console.error("ERROR: Must have at least one activity")
                        } else {
                            this.props.onSubmit(list)
                        }
                    }}
                >
                    {activities}
                </List>
            </span>
        </span>

    }
}

class AllowedEmailDomains extends Component {
    render() {
        return <span>
            <div>Enter allowed emails one per line. ENTER for new line. DOUBLE ENTER to submit</div>
            <div>Leave blank to allow everything</div>
            <span>
                <TextArea
                    prefix="example@"
                    onSubmit={list => this.props.onSubmit(list)}
                />
            </span>
        </span>
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
                Press ENTER if happy
            </span>
            <span>
                <ConfirmInput
                    checked
                    onSubmit={(v) => this.props.onSubmit(this.props.value)}
                />
            </span>
        </span>
    }
}


class UI extends Component {
    constructor(props) {
        super(props);
        this.state = { node: 0 };
        this.json = {}
    }

    render() {
        switch (this.state.node) {
            case 0: return <Name onSubmit={value => this.saveAndContinue('name', value)} />
            case 1: return <Offices onSubmit={value => this.saveAndContinue('offices', value)} />
            case 2: return <Activities onSubmit={value => this.saveAndContinue('enabled_activities', value)} />
            case 3: return <AllowedEmailDomains onSubmit={value => this.saveAndContinue('allowed_email_domains', value)} />
            case 4: return <HasLogo onSubmit={value => this.saveAndContinue('has_logo', value)} />
            case 5: return <Result value={this.finish(this.json)} onSubmit={(value) => this.writeAndExit(value)} />
            default: return <span></span>
        }
    }

    advanceNode() {
        let {node} = this.state;
        node += 1;
        this.setState({node});
    }

    saveAndContinue(key, value) {
        this.json[key] = value;
        this.advanceNode();
    }

    finish(data) {
        const ret = {
            offices: {},
            enabled_activities: {},
            allowed_email_domains: {},
            has_logo: data.has_logo,
            superuser: {
                email: "support@officeroo.io",
                password: randomString(),
            },
        }

        data.offices.forEach(key => ret.offices[key] = {})
        data.enabled_activities.forEach(key => ret.enabled_activities[key] = {})
        data.allowed_email_domains.forEach(key => ret.allowed_email_domains[key] = {})

        return {
            apps: {
                [data.name]: ret,
            }
        }
    }

    writeAndExit(value) {
        this.advanceNode();

        const appName = Object.keys(value.apps)[0]
        const dir = path.join(__dirname, '..', 'output')
        const file = `${appName}.json`
        const location = `${dir}/${file}`


        console.log(`Writing file to ${location}`)
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        fs.writeFile(location, JSON.stringify(value, null, 4), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
            process.exit(0);
        });
    }
}

function randomString() {
    length = 32;
    chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var result = '';
    for (var i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

module.exports = UI;
