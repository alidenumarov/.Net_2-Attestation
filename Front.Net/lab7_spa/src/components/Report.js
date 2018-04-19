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
    fetch("http://localhost:60225/api/reports/")
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
                        <th>Category <hr /> </th>
                        <th>Average Mark <hr /> </th>
                        <th>Maximum Mark <hr /> </th>
                        <th>Minimum Mark <hr /> </th>
                        <th>Mark Count <hr /> </th>
                        <th>Marks Sum <hr /> </th>                    
                    </tr>
                        { this.state.items.map((item) => {
                            return <tr>
                                <th className="thItem">{item.category} <hr /> </th>
                                <th className="thItem">{item.avgMark} <hr /> </th>
                                <th className="thItem">{item.maxMark} <hr /> </th>
                                <th className="thItem">{item.minMark} <hr /> </th>                                                       
                                <th className="thItem">{item.cntMark} <hr /> </th>                                                       
                                <th className="thItem">{item.sumMark} <hr /> </th>             
                            </tr>
                        })}
                </table>
            </div>
        );
    }
}