import { Component } from 'react'

export default class AppController extends Component {
    constructor(props) {
        super(props)
        this.appinfo = props.appinfo;
        this.state = {

        }
    }

    componentDidMount() { }

    render() {
        return (
            <div>
                <h1>Hello World</h1>
            </div>
        );
    }
}