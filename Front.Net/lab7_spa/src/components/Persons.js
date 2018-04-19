import React, { Component } from 'react';
import '../App.css';
import PersonInput from './PersonInput';
import PersonItem from './PersonItem';

class Person extends Component {
  constructor(props) {
    super(props);

    this.state = {
        persons: [],
    }

    this.addPerson = this.addPerson.bind(this);
    this.removePerson = this.removePerson.bind(this);
    this.saveTask = this.saveTask.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:60225/api/people/")
      .then(response => response.json())
      .then(data => this.setState({
        persons: data
      }));
  }


  addPerson(Name, Category, Mark) {
    var persons = this.state.persons;
    persons.push({name: Name, category: Category, mark: Mark});
    this.setState({
      persons: persons,
    });

    fetch("http://localhost:60225/api/people", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: Name,
        category: Category,
        mark: Mark,
      }),
    });
  }

  removePerson(id) {
    this.setState({
      persons: this.state.persons.filter((person) => person.id !== id)
    });
    fetch("http://localhost:60225/api/people/" + id + "/", {
      method: 'DELETE'
    });
  }

  saveTask(oldName, newName, curId, oldCategory, newCategory, oldMark, newMark) {
    let token1 = this.state.persons.find(function(curName) {
      return curName.name === oldName;
    });
    token1.name = newName;

    let token2 = this.state.persons.find(function(curCategory) {
      return curCategory.category === oldCategory;
    });
    token2.category = newCategory;

    let token3 = this.state.persons.find(function(curMark) {
      return curMark.mark === oldMark;
    });
    token3.mark = newMark;

    console.log(newName);
    this.setState({persons: this.state.persons});
    var dataToServer = [];
    dataToServer.push({ name : newName, category: newCategory, mark: newMark});
    fetch("http://localhost:60225/api/people/"+ curId, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: curId,
        name: newName,
        category: newCategory,
        mark: newMark,
      }),
    });
  }

  render() {
    return (
      <div className="App">
            <PersonInput Name="" addPerson={this.addPerson} />
            <ul> 
              <li>
                { this.state.persons.map((person) => {
                    return <PersonItem person={person} key={person.id} 
                              id={person.id} 
                              removePerson={this.removePerson}
                              saveTask={this.saveTask}
                              name={person.name} 
                              category={person.category}
                              mark={person.mark}/>
                  }) }
                </li>
            </ul>
      </div>
    );
  }
}

export default Person;
