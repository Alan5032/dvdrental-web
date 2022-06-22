import React, {Component} from "react";
import './rentals.css';

interface RentalsState {
    rentals: any
    rentalId: string
    inventoryId: string
    customerId: string
    staffId: string
    rentalDate: string
    returnDate: string

}

interface RentalsProps {

}

class Rentals extends Component<RentalsProps, RentalsState> {

    constructor(props: any) {
        super(props);
        this.state = {
            rentals: [],
            rentalId: "",
            inventoryId: "",
            customerId: "",
            staffId: "",
            rentalDate: "",
            returnDate: ""
        }
    }

    async componentDidMount() {
        let ignore = await this.getRentals();
        this.displayRentals(document.getElementById("tableBody"));
    }

    getRentals = async () => {
        let url = "http://localhost:8080/rentals";
        try {
            let responsePromise = fetch(url);
            let response = await responsePromise;
            if (!response.ok) {
                alert("The status is wrong. Expected: 200. Was: " + response.status);
                return;
            }
            let rentalsObject = await response.json();
            let rentalsArray = []
            for (let i = 0; i < rentalsObject.length; i++) {
                rentalsArray.push(rentalsObject[i]);
            }
            this.setState({
                rentals: rentalsArray
            })
            console.log(this.state.rentals);
        } catch (e) {
            alert("There was an error contacting the server.");
        }
    }

    displayRentals = (table: any) => {
        if (this.state.rentals.length == 0) {
            return;
        }
        for (let i = 0; i < this.state.rentals.length; i++) {
            let rentalId = this.state.rentals[i].rentalId;
            let inventoryId = this.state.rentals[i].inventoryId;
            let staffId = this.state.rentals[i].staffId;
            let rentalDate = this.state.rentals[i].rentalDate;
            let returnDate = this.state.rentals[i].returnDate;
            let customerId = this.state.rentals[i].customerId
            let row = `<tr>
                           <td>${rentalId}</td>
                           <td>${inventoryId}</td>
                           <td>${customerId}</td>
                           <td>${staffId}</td>
                           <td>${rentalDate}</td>
                           <td>${returnDate}</td>
                       </tr>`;
            table.innerHTML += row;
        }
    }

    onInputChangeRentalId = (e: any) => {
        let rentalId: string = e.target.value;
        this.setState({
            rentalId: rentalId
        });
    }

    onInputChangeInventoryId = (e: any) => {
        let inventoryId: string = e.target.value;
        this.setState({
            inventoryId: inventoryId
        });
    }

    onInputChangeCustomerId = (e: any) => {
        let customerId: string = e.target.value;
        this.setState({
            customerId: customerId
        });
    }

    onInputChangeFirstName = (e: any) => {
        let staffId: string = e.target.value;
        this.setState({
            staffId: staffId
        });
    }

    onInputChangeLastName = (e: any) => {
        let rentalDate: string = e.target.value;
        this.setState({
            rentalDate: rentalDate
        });
    }

    onInputChangeReturnDate = (e: any) => {
        let returnDate: string = e.target.value;
        this.setState({
            returnDate: returnDate
        });
    }

    addRental = async () => {
        if (this.state.rentalId === "" || this.state.inventoryId === "" || this.state.customerId === "" ||
            this.state.staffId === "" || this.state.rentalDate === "" || this.state.returnDate === "") {
            alert("All fields must be filled.");
            return;
        }
        let url = "http://localhost:8080/rentals"
        let httpBody = {
            id: this.state.rentalId,
            inventoryId: this.state.inventoryId,
            customerId: this.state.customerId,
            staffId: this.state.staffId,
            rentalDate: this.state.rentalDate,
            returnDate: this.state.returnDate
        }
        try {
            let responsePromise = fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(httpBody)
            });
            let response = await responsePromise;
            if (!response.ok) {
                alert("The status is wrong. Expected: 200. Was: " + response.status);
                return;
            }
        } catch (e) {
            console.log(e);
        }
        let ignore = await this.getRentals();
        this.displayRentals(document.getElementById("tableBody"));
    }

    editRental = async () => {
        let url = "http://localhost:8080/rentals/" + this.state.rentalId + "?";
        if (this.state.inventoryId !== "") {
            url += "inventoryId=" + this.state.inventoryId + "&";
        }
        if (this.state.customerId !== "") {
            url += "customerId=" + this.state.customerId + "&";
        }
        if (this.state.staffId !== "") {
            url += "staffId=" + this.state.staffId + "&";
        }
        if (this.state.rentalDate !== "") {
            url += "rentalDate=" + this.state.rentalDate + "&";
        }
        if (this.state.returnDate !== "") {
            url += "returnDate=" + this.state.returnDate;
        }
        try {
            let responsePromise = fetch(url, {
                method: 'PUT'
            });
            let response = await responsePromise;
            if (!response.ok) {
                alert("The status is wrong. Expected: 200. Was: " + response.status);
                return;
            }
        } catch (e) {
            console.log(e);
        }
        let ignore = await this.getRentals();
        this.displayRentals(document.getElementById("tableBody"));
    }

    deleteRental = async () => {
        let url = "http://localhost:8080/rentals/" + this.state.rentalId;
        try {
            let responsePromise = fetch(url, {
                method: 'DELETE'
            })
            let response = await responsePromise;
            if (!response.ok) {
                alert("The status is wrong. Expected: 200. Was: " + response.status);
                return;
            }
        } catch (e) {
            console.log(e);
        }
        let ignore = await this.getRentals();
        this.displayRentals(document.getElementById("tableBody"));
    }

    render() {
        return (
            <div id="parent">
                <h1>Rentals</h1>
                <form id="inputFields">
                    <div>
                        <div id="rentalIdField">
                            <label htmlFor="rentalId">Rental ID:</label>
                            <br></br>
                            <input type="text" id="rentalId" name="rentalId"
                                   value={this.state.rentalId} onChange={this.onInputChangeRentalId}></input>
                        </div>
                        <div id="inventoryIdField">
                            <label htmlFor="inventoryId">Inventory ID:</label>
                            <br></br>
                            <input type="text" id="inventoryId" name="inventoryId"
                                   value={this.state.inventoryId} onChange={this.onInputChangeInventoryId}></input>
                        </div>
                        <div id="customerIdField">
                            <label htmlFor="customerId">Customer ID:</label>
                            <br></br>
                            <input type="text" id="customerId" name="customerId"
                                   value={this.state.customerId} onChange={this.onInputChangeCustomerId}></input>
                        </div>
                        <br></br>
                        <div id="staffIdField">
                            <label htmlFor="staffId">Staff ID:</label>
                            <br></br>
                            <input type="text" id="staffId" name="staffId"
                                   value={this.state.staffId} onChange={this.onInputChangeFirstName}></input>
                        </div>
                        <div id="rentalDateField">
                            <label htmlFor="rentalDate">Rental Date:</label>
                            <br></br>
                            <input type="text" id="rentalDate" name="rentalDate"
                                   value={this.state.rentalDate} onChange={this.onInputChangeLastName}></input>
                        </div>
                        <div id="returnDateField">
                            <label htmlFor="returnDate">Return Date:</label>
                            <br></br>
                            <input type="text" id="returnDate" name="returnDate"
                                   value={this.state.returnDate} onChange={this.onInputChangeReturnDate}></input>
                        </div>
                    </div>
                </form>
                <br></br><br></br>
                <form id="buttons">
                    <button onClick={this.addRental} id="addButton">Add Rental</button>
                    <button onClick={this.editRental} id="editButton">Edit Rental</button>
                    <button onClick={this.deleteRental} id="deleteButton">Delete Rental</button>
                </form>
                <br></br><br></br>
                <div>
                    <table align="center" border={1} cellPadding={10} cellSpacing={0} width={1000} bgcolor="#5cbef2">
                        <thead>
                        <tr>
                            <th>Rental ID</th>
                            <th>Inventory ID</th>
                            <th>Customer ID</th>
                            <th>Staff ID</th>
                            <th>Rental Date</th>
                            <th>Return Date</th>
                        </tr>
                        </thead>
                        <tbody id="tableBody">
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Rentals;