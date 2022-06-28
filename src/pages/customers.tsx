import React, {Component} from "react";
import './customer.css';

interface CustomersState {
    customers: any
    customerId: string
    storeId: string
    addressId: string
    firstName: string
    lastName: string
    email: string

}

interface CustomersProps {

}

class Customers extends Component<CustomersProps, CustomersState> {

    constructor(props: any) {
        super(props);
        this.state = {
            customers: [],
            customerId: "",
            storeId: "",
            addressId: "",
            firstName: "",
            lastName: "",
            email: ""
        }
    }

    async componentDidMount() {
        let ignore = await this.getCustomers();
        this.displayCustomers(document.getElementById("tableBody"));
    }

    getCustomers = async () => {
        let url = "http://localhost:8080/customers";
        try {
            let responsePromise = fetch(url, {
                headers: {
                    'X-Tenant-ID': "1"
                }
            });
            let response = await responsePromise;
            if (!response.ok) {
                alert("The status is wrong. Expected: 200. Was: " + response.status);
                return;
            }
            let customersObject = await response.json();
            let customersArray = []
            for (let i = 0; i < customersObject.length; i++) {
                customersArray.push(customersObject[i]);
            }
            this.setState({
                customers: customersArray
            })
        } catch (e) {
            alert("There was an error contacting the server.");
        }
    }

    displayCustomers = (table: any) => {
        if (this.state.customers.length == 0) {
            return;
        }
        for (let i = 0; i < this.state.customers.length; i++) {
            let customerId = this.state.customers[i].customerId;
            let storeId = this.state.customers[i].storeId;
            let firstName = this.state.customers[i].firstName;
            let lastName = this.state.customers[i].lastName;
            let email = this.state.customers[i].email;
            let addressId = this.state.customers[i].addressId
            let row = `<tr>
                           <td>${customerId}</td>
                           <td>${storeId}</td>
                           <td>${firstName}</td>
                           <td>${lastName}</td>
                           <td>${email}</td>
                           <td>${addressId}</td>
                       </tr>`;
            table.innerHTML += row;
        }
    }

    onInputChangeCustomerId = (e: any) => {
        let customerId: string = e.target.value;
        this.setState({
            customerId: customerId
        });
    }

    onInputChangeStoreId = (e: any) => {
        let storeId: string = e.target.value;
        this.setState({
            storeId: storeId
        });
    }

    onInputChangeAddressId = (e: any) => {
        let addressId: string = e.target.value;
        this.setState({
            addressId: addressId
        });
    }

    onInputChangeFirstName = (e: any) => {
        let firstName: string = e.target.value;
        this.setState({
            firstName: firstName
        });
    }

    onInputChangeLastName = (e: any) => {
        let lastName: string = e.target.value;
        this.setState({
            lastName: lastName
        });
    }

    onInputChangeEmail = (e: any) => {
        let email: string = e.target.value;
        this.setState({
            email: email
        });
    }

    addCustomer = async () => {
        if (this.state.customerId === "" || this.state.storeId === "" || this.state.addressId === "" ||
            this.state.firstName === "" || this.state.lastName === "" || this.state.email === "") {
            alert("All fields must be filled.");
            return;
        }
        let url = "http://localhost:8080/customers"
        let httpBody = {
            customerId: this.state.customerId,
            storeId: this.state.storeId,
            addressId: this.state.addressId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        }
        try {
            let responsePromise = fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Tenant-ID': "1"
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
        let ignore = await this.getCustomers();
        this.displayCustomers(document.getElementById("tableBody"));
    }

    editCustomer = async () => {
        let url = "http://localhost:8080/customers/" + this.state.customerId + "?";
        if (this.state.storeId !== "") {
            url += "storeId=" + this.state.storeId + "&";
        }
        if (this.state.addressId !== "") {
            url += "addressId=" + this.state.addressId + "&";
        }
        if (this.state.firstName !== "") {
            url += "firstName=" + this.state.firstName + "&";
        }
        if (this.state.lastName !== "") {
            url += "lastName=" + this.state.lastName + "&";
        }
        if (this.state.email !== "") {
            url += "email=" + this.state.email;
        }
        try {
            let responsePromise = fetch(url, {
                method: 'PUT',
                headers: {
                    'X-Tenant-ID': "1"
                }
            });
            let response = await responsePromise;
            if (!response.ok) {
                alert("The status is wrong. Expected: 200. Was: " + response.status);
                return;
            }
        } catch (e) {
            console.log(e);
        }
        let ignore = await this.getCustomers();
        this.displayCustomers(document.getElementById("tableBody"));
    }

    deleteCustomer = async () => {
        let url = "http://localhost:8080/customers/" + this.state.customerId;
        try {
            let responsePromise = fetch(url, {
                method: 'DELETE',
                headers: {
                    'X-Tenant-ID': "1"
                }
            });
            let response = await responsePromise;
            if (!response.ok) {
                alert("The status is wrong. Expected: 200. Was: " + response.status);
                return;
            }
        } catch (e) {
            console.log(e);
        }
        let ignore = await this.getCustomers();
        this.displayCustomers(document.getElementById("tableBody"));
    }

    render() {
        return (
            <div id="parent">
                <h1>Customers</h1>
                <form id="inputFields">
                    <div>
                        <div id="customerIdField">
                        <label htmlFor="customerId">Customer ID:</label>
                        <br></br>
                        <input type="text" id="customerId" name="customerId"
                               value={this.state.customerId} onChange={this.onInputChangeCustomerId}></input>
                        </div>
                        <div id="storeIdField">
                        <label htmlFor="storeId">Store ID:</label>
                        <br></br>
                        <input type="text" id="storeId" name="storeId"
                               value={this.state.storeId} onChange={this.onInputChangeStoreId}></input>
                        </div>
                        <div id="addressIdField">
                            <label htmlFor="addressId">Address ID:</label>
                            <br></br>
                            <input type="text" id="addressId" name="addressId"
                                   value={this.state.addressId} onChange={this.onInputChangeAddressId}></input>
                        </div>
                        <br></br>
                        <div id="firstNameField">
                            <label htmlFor="firstName">First Name:</label>
                            <br></br>
                            <input type="text" id="firstName" name="firstName"
                                   value={this.state.firstName} onChange={this.onInputChangeFirstName}></input>
                        </div>
                        <div id="lastNameField">
                            <label htmlFor="lastName">Last Name:</label>
                            <br></br>
                            <input type="text" id="lastName" name="lastName"
                                   value={this.state.lastName} onChange={this.onInputChangeLastName}></input>
                        </div>
                        <div id="emailField">
                            <label htmlFor="email">Email:</label>
                            <br></br>
                            <input type="text" id="email" name="email"
                                   value={this.state.email} onChange={this.onInputChangeEmail}></input>
                        </div>
                    </div>
                </form>
                <br></br><br></br>
                <form id="buttons">
                    <button onClick={this.addCustomer} id="addButton">Add Customer</button>
                    <button onClick={this.editCustomer} id="editButton">Edit Customer</button>
                    <button onClick={this.deleteCustomer} id="deleteButton">Delete Customer</button>
                </form>
                <br></br><br></br>
                <div>
                    <table align="center" border={1} cellPadding={10} cellSpacing={0} width={1000} bgcolor="#5cbef2">
                        <thead>
                            <tr>
                                <th>Customer ID</th>
                                <th>Store ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Address ID</th>
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

export default Customers;