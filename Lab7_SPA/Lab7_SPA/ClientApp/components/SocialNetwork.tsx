import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { AddPerson } from './AddPerson';

interface PersonState {
    people: PersonInterface[];
    loading: boolean;
}

export class SocialNetwork extends React.Component<RouteComponentProps<{}>, PersonState> {
    constructor() {
        super();
        this.state = {
            people: [], 
            loading: true 
        };

        fetch('api/people')
            .then(response => response.json() as Promise<PersonInterface[]>)
            .then(data => {
                this.setState({ people: data, loading: false });
            });
    }
    addPerson(personName: any) {
           
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : SocialNetwork.renderForecastsTable(this.state.people);

        return <div>
            <h1>Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <AddPerson addPerson={this.addPerson} />
            {contents}
        </div>;
    }

    private static renderForecastsTable(people: PersonInterface[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Mark</th>
                </tr>
            </thead>
            <tbody>
            {people.map(person =>
                    <tr key={person.name}>
                        <td>{person.name}</td>
                        <td>{person.category}</td>
                        <td>{person.mark}</td>
                </tr>
            )}
            </tbody>
        </table>;
    }
}

interface PersonInterface {
    name: string;
    category: string;
    mark: number;
}