import React from 'react';

export default class TodoInput extends React.Component {
    constructor() {
        super();
        this.state = {
            valueName: "",
            valueCategory: "",
            valueMark: "",
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleChangeMark = this.handleChangeMark.bind(this);
        
        this.addPerson = this.addPerson.bind(this);
    }

    handleChangeName(e) {
        this.setState({valueName: e.target.value});
    }
    handleChangeCategory(e) {
        this.setState({valueCategory: e.target.value});
    }
    handleChangeMark(e) {
        this.setState({valueMark: e.target.value});
    }

    addPerson(name, category, mark) {
        this.props.addPerson(name, category, mark);
        this.setState({valueName: '', valueCategory: '', valueMark: ''})
    }

    render() {
        return(
            <div>
                <label>Name: </label>
                <input className="input" type="text" value={this.state.valueName} onChange={this.handleChangeName} /> <br />
                <label>Category: </label>
                <input className="input" type="text" value={this.state.valueCategory} onChange={this.handleChangeCategory} /> <br />
                <label>Mark: </label>
                <input className="input" type="text" value={this.state.valueMark} onChange={this.handleChangeMark} /> <br />

                <button className="button" onClick={() => this.addPerson(this.state.valueName, this.state.valueCategory, this.state.valueMark)}>Add</button>
            </div>
        );
    }
}