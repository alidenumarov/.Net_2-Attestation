import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
interface MyComponentProps { addPerson: any,
    /* declare your component's props here */
}
interface addPerson {
    name: string    
}
interface MyComponentState { value: any }

interface PersonState {
    
}

export class AddPerson extends React.Component<any, any> {
    //handleChange: any;
    constructor(props: any) {
        super(props);
        this.state = {
            value: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }
    public handleChange(e: any): void {
        this.setState({ value: e.target.value });
    }

    public addPerson(person: any) : void {
        this.props.addPerson(person);
        this.setState({ value: '' })
    }

    public render() {
        return (
            <div>
                <input className="input" type="text" value={this.state.value} onChange={this.handleChange} />
                <button className="button" onClick={e => this.addPerson(this.state.value)}>Add</button>
            </div>
        );
    }
}