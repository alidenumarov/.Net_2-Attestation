import React, { Component } from 'react';
import './App.css';
import Request from 'superagent';

function searchingFor(txt) {
	return function(x) {
	 	return x.name.toLowerCase().includes(txt.toLowerCase());
	}
}
class RentApartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regions: [
        {id:1, name:"R1", tax:1},
        {id:2, name:"R2", tax:2},        
        {id:3, name:"R3", tax:3},      
      ],
      apartments: [
        {id:1, address:"Akniyet 2/4/42", regionID:1, price:150000},
        {id:2, address:"Akniyet 2/15/27", regionID:1, price:140000},
        {id:3, address:"Titanik 5/13/88", regionID:2, price:85000},
        {id:4, address:"Titanik 5/4/53", regionID:2, price:100000},
      ],
      customers: [{username: "user1", password: "user1"}],
      rents: [],
      customerID: 0,
      apartmentsInOrder: [],
      value: '', valueName: '', valuePassword: '', minVal:0, maxVal:1000000,
      clickedRegion: false,
      clickedApartment: false,
      isAuthorized: false,
      curRegionId: 1,
      priceInOrder: 0,
      priceWithTaxInOrder: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }
  componentDidMount() {
		fetch('http://localhost:57281/api/rents')
		.then(Response => Response.json())
		.then((findresponse) => {
			this.setState({
				rents: findresponse,
			})
    })
  }
  componentWillMount() {
		fetch('http://localhost:57281/api/regions')
		.then(Response => Response.json())
		.then((findresponse) => {
			this.setState({
				regions: findresponse,
			})
    })
    fetch('http://localhost:57281/api/apartments')
		.then(Response => Response.json())
		.then((findresponse) => {
			this.setState({
				apartments: findresponse,
			})
    })
    fetch('http://localhost:57281/api/customers')
		.then(Response => Response.json())
		.then((findresponse) => {
			// console.log(findresponse)
			this.setState({
				customers: findresponse,
			})
    })
    fetch('http://localhost:57281/api/rents')
		.then(Response => Response.json())
		.then((findresponse) => {
			// console.log(findresponse)
			this.setState({
				rents: findresponse,
			})
    })
  }
  
  handleChange(event) {
		this.setState({value: event.target.value});
  }
  handleChangeName(event) {
		this.setState({valueName: event.target.value});
  }
  handleChangePassword(event) {
		this.setState({valuePassword: event.target.value});
  }
  onRegionClick(regionId) {
    this.setState({clickedRegion: true, curRegionId: regionId, apartmentsInOrder: [], priceInOrder: 0, priceWithTaxInOrder: 0});
  }
  
  handleSignIn() {
    var ch = false;
    for(var v = 0; v < this.state.customers.length; v++) {
      if(this.state.customers[v].username === this.state.valueName && this.state.customers[v].password === this.state.valuePassword) {
        ch = true;
        this.setState({
          isAuthorized: true,
          customerID: this.state.customers[v].id,
        });
        break;
      }
    }
    if(ch === false) {
      alert("Incorrect username or password!");
    } else {
      alert("Welcome, " + this.state.valueName);      
    }
    this.setState({
      valuePassword: '',
    });
  }

  handleSignOut() {
    this.setState({
      isAuthorized: false,
    });
  }

  handleMakeOrder() {
    if(this.state.isAuthorized) {
      alert("Customer: " + this.state.customerID + "\nTotal Price: " + this.state.priceWithTaxInOrder);

      fetch("http://localhost:57281/api/rents", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "customerID": this.state.customerID,
          "totalPrice": this.state.priceWithTaxInOrder,
          "rentDetails": null
        }),
      });
      // let url = "http://localhost:57281/api/rents"
      //         Request.post(url)
      //         .type('form')
      //         .send({customerID: this.state.customerID})
      //         .send({totalPrice: this.state.priceWithTaxInOrder})
      //         .then((callback) => {console.log("success")})

      console.log("CustomerId: " + this.state.customerID + "\nTotalPrice: " + this.state.priceWithTaxInOrder);
      
      var lastRentId = 0;
      for(var v = 0; v < this.state.rents.length; v++) {
        lastRentId = this.state.rents[v].id;
      }

      for(var v = 0; v < this.state.apartmentsInOrder.length; v++) {
        console.log("RentId: " + (lastRentId + 1) + "\nApartment Id: " + this.state.apartmentsInOrder[v].id);
        
        fetch('http://localhost:57281/api/rentDetails', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              rentID: (lastRentId + 1),
              apartmentID: this.state.apartmentsInOrder[v].id
          }),
        });
        
        // let url = "http://localhost:57281/api/rentDetails"
        //       Request.post(url)
        //       .type('form')
        //       .send({rentID: (lastRentId + 1)})
        //       .send({apartmentID: this.state.apartmentsInOrder[v].id})
        //       .then((callback) => {console.log("success")})
      }

      this.setState({
          apartmentsInOrder: [],
          priceInOrder: 0,
          priceWithTaxInOrder: 0,
      });

    } else {
      alert("Sign In to make order!");      
    }
  }
  handleAddToOrder(apartmentId) {
    this.setState({clickedApartment: true});
    var curApartment;
    for(var a = 0; a < this.state.apartments.length; a++) {
      if(this.state.apartments[a].id === apartmentId) {
        curApartment = this.state.apartments[a];
      }
    }
    var isApartmentExists = false, apartmentsInOrder = this.state.apartmentsInOrder;
    for(var a = 0; a < this.state.apartmentsInOrder.length; a++) {
      if(this.state.apartmentsInOrder[a].id === curApartment.id) {
        isApartmentExists = true;
        break;
      }
    }
    if(isApartmentExists === false) {
      apartmentsInOrder.push({id: curApartment.id, address: curApartment.address, regionId:curApartment.regionID, price: curApartment.price});
    }
    
    var totalPrice = 0, totalPriceWithTax = 0;
    for(var a = 0; a < this.state.apartmentsInOrder.length; a++) {
      // alert(this.state.apartmentsInOrder[a].price);
      totalPrice += this.state.apartmentsInOrder[a].price;
    }
    for(var r = 0; r < this.state.regions.length; r++) {
      if(this.state.regions[r].id === this.state.curRegionId) {
        totalPriceWithTax = this.state.regions[r].tax * totalPrice / 100 + totalPrice;
        break;
      }
    }
    this.setState({
      apartmentsInOrder: apartmentsInOrder,
      priceInOrder: totalPrice,
      priceWithTaxInOrder: totalPriceWithTax,
    });
    // alert("size = " + this.state.apartmentsInOrder.length);
  }
  renderSignInForm() {
    if(this.state.isAuthorized === false) {
      return(
        <div>
          <input className="nameInput" type="text" value={this.state.valueName} onChange={this.handleChangeName} placeholder="Enter Name"/> <br />
          <input className="passwordInput" type="text" value={this.state.valuePassword} onChange={this.handleChangePassword} placeholder="Enter Password"/>        
          <button onClick={(e) => this.handleSignIn()}>Sign In</button> <br />
        </div>
      );
  }
  }
  renderGreeting() {
    if(this.state.isAuthorized) {
      return(
        <div>
          <h3 className="greetingHeader">Welcome, {this.state.valueName}! </h3>
          <button className="signOut" onClick={(e) => this.handleSignOut()}>Sign Out</button>
        </div>
      );
    } else {
      return(
        <div>
          <h3 className="greetingHeaderNonAuth">Please, Sign In </h3>
        </div>
      );
    }
  }
  renderApartment() {
    if(this.state.clickedRegion) {
      return(
        <div>
          <tr>
              <th className="apartH">Apartment:</th>
              <th>Price:</th>                     
          </tr>
        {this.state.apartments.map((a) => {
          if(a.regionID === this.state.curRegionId) {
            return <table>
              <tr>
                  {/* <td>{a.regionID}</td>          */}
                  <td>{a.address}</td>
                  <td>{a.price}тг</td>
                  <td><button onClick={(e) => this.handleAddToOrder(a.id)}> Add to Order </button></td>                                        
              </tr>
            </table>
          }
        })}
        </div>        
      );
    }    
  }

  renderOrder() {
    if(this.state.clickedApartment) {
      return(
        <div>
          <tr>
              <th className="orderH">Apartment:</th>
              <th>Price:</th>                     
          </tr>
          {this.state.apartmentsInOrder.map((a) => {
            return <table>
              <tr>              
                <td>{a.address}</td>
                <td>{a.price}тг</td>                
              </tr>
              </table>
          })}
          <b className="totalPrice">Total Price = {this.state.priceInOrder}тг</b>
          <br/>
          <b className="totalPriceWithTax">Total Price With Tax= {this.state.priceWithTaxInOrder}тг</b>
          <br />
          <button className="makeOrder" onClick={(e) => this.handleMakeOrder()}>Make Order</button>     
        </div>        
      );
    }    
	}

  render() {
    return (
      <div className="App">
        {this.renderGreeting()}
        {this.renderSignInForm()} <hr />
        <ul>
        <input className="filterRegions" type="text" value={this.state.value} onChange={this.handleChange} placeholder="Filter Regions"/>
          <tr>
              <th>Region:</th>
              <th>Tax:</th>          
          </tr>
          { this.state.regions.filter(searchingFor(this.state.value)).map((r) => {
              return <table> 
                  <tr>
                      <td><button onClick={(e) => this.onRegionClick(r.id)}>{r.name}</button></td>
                      <td>{r.tax}%</td>                      
                  </tr>
                  </table>
            }) }
        </ul>
      <hr />
        <div>
          <h3 className="apartHeader">Apartments</h3>
          <hr />
          {this.renderApartment()}
        </div>
      <hr />        
        <div>
          <h3 className="apartHeader"> Orders </h3>
          <hr />
          {this.renderOrder()}
        </div>
      </div>
    );
  }
}

export default RentApartment;
