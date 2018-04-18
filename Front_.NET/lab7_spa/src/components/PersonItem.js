import React from 'react';

export default class PersonItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false
        };
        this.onSaveClick = this.onSaveClick.bind(this);
    }

    renderPersonChangeSection() {
        const name = this.props.name;
        const category = this.props.category;
        const mark = this.props.mark;        
        
        if(this.state.isEditing) {
            return(
                <form onSubmit={this.onSaveClick}>
                    <input className="inputChange" type="text" ref="editName" defaultValue={name}/> <br />
                    <input className="inputChange" type="text" ref="editCategory" defaultValue={category}/> <br />
                    <input className="inputChange" type="text" ref="editMark" defaultValue={mark}/> <br /> <br />
                    <hr /> 
                </form>
            );
        }
    }

    renderItemActionSection() {
        if(this.state.isEditing) {
            return(
                <td>
                    <br /> <br /> <br />
                    <button className="bnSave" onClick={this.onSaveClick}>Save</button>
                </td>
            );
        }
        return(
            <div>
                {this.props.person.name} <br/>
                {this.props.person.category} <br/>
                {this.props.person.mark} <br />
                <button className="removePerson" onClick={(e) => this.removePerson(this.props.id)}>Delete</button>
                <button className="bnEdit" onClick={(e) => this.editPerson(this.props.id)}>Edit</button>                
            </div>
        );

    }

    onSaveClick() {
        //added curId 06.04.2018
        const curId = this.props.id;
        const oldName = this.props.name;
        const newName = this.refs.editName.value;

        const oldCategory = this.props.category;
        const newCategory = this.refs.editCategory.value;

        const oldMark = this.props.mark;
        const newMark = this.refs.editMark.value;

        this.props.saveTask(oldName, newName, curId, oldCategory, newCategory, oldMark, newMark);
        this.setState({isEditing: false});
    }
    removePerson(id) {
        this.props.removePerson(id);
    }

    editPerson(id) {
        this.setState({isEditing: !this.state.isEditing});
    }

    render() {
        return(
            <tr className="personItem">
                {this.renderPersonChangeSection()}
                {this.renderItemActionSection()}
                <hr />
            </tr>
        );
    }
}