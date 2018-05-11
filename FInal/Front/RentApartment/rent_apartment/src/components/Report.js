import React, { Component } from 'react';
import '../App.css';

export default class Report extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            items: [
                                  
            ],
        }
      }

    componentWillMount() {
    fetch("http://localhost:57281/api/reports")
        .then(response => response.json())
        .then(data => this.setState({
            items: data             
        }));
        console.log(this.state.items);        
    }

    render() {
        return(
            <div>
                <table className="table">
                    <tr>
                        <th>Region <hr /> </th>
                        <th>Total Amount of all orders<hr /> </th>
                        <th>Percentage from all orders <hr /> </th>
                    </tr>
                        { this.state.items.map((item) => {
                            return <tr>
                                <th className="thItem">{item.region} <hr /> </th>
                                <th className="thItem">{item.totalAmountOfAllOrders} <hr /> </th>
                                <th className="thItem">{item.percentageFromAllOrders}% <hr /> </th>                            
                            </tr>
                        })}
                </table>
            </div>
        );
    }
}