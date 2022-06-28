import React, {Component} from "react";
import './staffs.css';

interface StaffsState {
    staffs: any
    staffId: string
    firstName: string
    lastName: string
    storeId: string
    addressId: string
    username: string
    password: string

}

interface StaffsProps {

}

class Staffs extends Component<StaffsProps, StaffsState> {

    constructor(props: any) {
        super(props);
        this.state = {
            staffs: [],
            staffId: "",
            firstName: "",
            lastName: "",
            storeId: "",
            addressId: "",
            username: "",
            password: "",
        }
    }

    async componentDidMount() {
        let ignore = await this.getStaffs();
        this.displayStaffs(document.getElementById("tableBody"));
    }

    getStaffs = async () => {
        let url = "http://localhost:8080/staffs";
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
            let staffsObject = await response.json();
            let staffsArray = []
            for (let i = 0; i < staffsObject.length; i++) {
                staffsArray.push(staffsObject[i]);
            }
            this.setState({
                staffs: staffsArray
            })
        } catch (e) {
            alert("There was an error contacting the server.");
        }
    }

    displayStaffs = (table: any) => {
        if (this.state.staffs.length == 0) {
            return;
        }
        for (let i = 0; i < this.state.staffs.length; i++) {
            let staffId = this.state.staffs[i].staffId;
            let firstName = this.state.staffs[i].firstName;
            let lastName = this.state.staffs[i].lastName;
            let storeId = this.state.staffs[i].storeId;
            let addressId = this.state.staffs[i].addressId;
            let username = this.state.staffs[i].username;
            let password = this.state.staffs[i].password;
            let row = `<tr>
                           <td>${staffId}</td>
                           <td>${firstName}</td>
                           <td>${lastName}</td>
                           <td>${storeId}</td>
                           <td>${addressId}</td>
                           <td>${username}</td>
                           <td>${password}</td>
                       </tr>`;
            table.innerHTML += row;
        }
    }

    onInputChangeStaffId = (e: any) => {
        let staffId: string = e.target.value;
        this.setState({
            staffId: staffId
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


    onInputChangeUsername = (e: any) => {
        let username: string = e.target.value;
        this.setState({
            username: username
        });
    }

    onInputChangePassword = (e: any) => {
        let password: string = e.target.value;
        this.setState({
            password: password
        })
    }

    addStaff = async () => {
        if (this.state.staffId === "" || this.state.storeId === "" || this.state.addressId === "" ||
            this.state.firstName === "" || this.state.lastName === "" || this.state.username === "" ||
            this.state.password === "") {
            alert("All fields must be filled.");
            return;
        }
        let url = "http://localhost:8080/staffs"
        let httpBody = {
            staffId: this.state.staffId,
            storeId: this.state.storeId,
            addressId: this.state.addressId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            password: this.state.password
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
        let ignore = await this.getStaffs();
        this.displayStaffs(document.getElementById("tableBody"));
    }

    editStaff = async () => {
        let url = "http://localhost:8080/staffs/" + this.state.staffId + "?";
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
        if (this.state.username !== "") {
            url += "username=" + this.state.username + "&";
        }
        if (this.state.password !== "") {
            url += "password=" + this.state.password;
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
        let ignore = await this.getStaffs();
        this.displayStaffs(document.getElementById("tableBody"));
    }

    deleteStaff = async () => {
        let url = "http://localhost:8080/staffs/" + this.state.staffId;
        try {
            let responsePromise = fetch(url, {
                method: 'DELETE',
                headers: {
                    'X-Tenant-ID': "1"
                }
            })
            let response = await responsePromise;
            if (!response.ok) {
                alert("The status is wrong. Expected: 200. Was: " + response.status);
                return;
            }
        } catch (e) {
            console.log(e);
        }
        let ignore = await this.getStaffs();
        this.displayStaffs(document.getElementById("tableBody"));
    }

    render() {
        return (
            <div id="parent">
                <h1>Staffs</h1>
                <form id="inputFields">
                    <div>
                        <div id="staffIdField">
                            <label htmlFor="staffId">Staff ID:</label>
                            <br></br>
                            <input type="text" id="staffId" name="staffId"
                                   value={this.state.staffId} onChange={this.onInputChangeStaffId}></input>
                        </div>
                        <div id="storeIdField">
                            <label htmlFor="storeId">Store ID:</label>
                            <br></br>
                            <input type="text" id="storeId" name="storeId"
                                   value={this.state.storeId} onChange={this.onInputChangeStoreId}></input>
                        </div>
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
                        <br></br>
                    </div>
                    <div id="bottomFields">
                        <div id="addressIdField">
                            <label htmlFor="addressId">Address ID:</label>
                            <br></br>
                            <input type="text" id="addressId" name="addressId"
                                   value={this.state.addressId} onChange={this.onInputChangeAddressId}></input>
                        </div>
                        <div id="usernameField">
                            <label htmlFor="username">Username:</label>
                            <br></br>
                            <input type="text" id="username" name="username"
                                   value={this.state.username} onChange={this.onInputChangeUsername}></input>
                        </div>
                        <div id="passwordField">
                            <label htmlFor="password">Password:</label>
                            <br></br>
                            <input type="text" id="password" name="password"
                                   value={this.state.password} onChange={this.onInputChangePassword}></input>
                        </div>
                    </div>
                </form>
                <br></br><br></br>
                <form id="buttons">
                    <button onClick={this.addStaff} id="addButton">Add Staff</button>
                    <button onClick={this.editStaff} id="editButton">Edit Staff</button>
                    <button onClick={this.deleteStaff} id="deleteButton">Delete Staff</button>
                </form>
                <br></br><br></br>
                <div>
                    <table align="center" border={1} cellPadding={10} cellSpacing={0} width={1000} bgcolor="#5cbef2">
                        <thead>
                        <tr>
                            <th>Staff ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Store ID</th>
                            <th>Address ID</th>
                            <th>Username</th>
                            <th>Password</th>
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

export default Staffs;