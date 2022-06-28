import React, {Component} from "react";
import './locations.css';

interface LocationsState {
    locations: any
    storeId: string
    managerId: string
    addressId: string

}

interface LocationsProps {

}

class Locations extends Component<LocationsProps, LocationsState> {

    constructor(props: any) {
        super(props);
        this.state = {
            locations: [],
            storeId: "",
            managerId: "",
            addressId: "",
        }
    }

    async componentDidMount() {
        let ignore = await this.getLocations();
        this.displayLocations(document.getElementById("tableBody"));
    }

    getLocations = async () => {
        let url = "http://localhost:8080/locations";
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
            let locationsObject = await response.json();
            let locationsArray = []
            for (let i = 0; i < locationsObject.length; i++) {
                locationsArray.push(locationsObject[i]);
            }
            this.setState({
                locations: locationsArray
            })
        } catch (e) {
            alert("There was an error contacting the server.");
        }
    }

    displayLocations = (table: any) => {
        if (this.state.locations.length == 0) {
            return;
        }
        for (let i = 0; i < this.state.locations.length; i++) {
            let storeId = this.state.locations[i].storeId;
            let managerId = this.state.locations[i].managerId;
            let addressId = this.state.locations[i].addressId;
            let row = `<tr>
                           <td>${storeId}</td>
                           <td>${managerId}</td>
                           <td>${addressId}</td>
                       </tr>`;
            table.innerHTML += row;
        }
    }

    onInputChangeStoreId = (e: any) => {
        let storeId: string = e.target.value;
        this.setState({
            storeId: storeId
        });
    }

    onInputChangeManagerId = (e: any) => {
        let managerId: string = e.target.value;
        this.setState({
            managerId: managerId
        });
    }

    onInputChangeAddressId = (e: any) => {
        let addressId: string = e.target.value;
        this.setState({
            addressId: addressId
        });
    }

    addLocations = async () => {
        if (this.state.storeId === "" || this.state.addressId === "" || this.state.managerId === "") {
            alert("All fields must be filled.");
            return;
        }
        let url = "http://localhost:8080/locations"
        let httpBody = {
            storeId: this.state.storeId,
            managerId: this.state.managerId,
            addressId: this.state.addressId
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
        let ignore = await this.getLocations();
        this.displayLocations(document.getElementById("tableBody"));
    }

    editLocations = async () => {
        let url = "http://localhost:8080/locations/" + this.state.storeId + "?";
        if (this.state.addressId !== "") {
            url += "addressId=" + this.state.addressId + "&";
        }
        if (this.state.managerId !== "") {
            url += "firstName=" + this.state.managerId;
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
        let ignore = await this.getLocations();
        this.displayLocations(document.getElementById("tableBody"));
    }

    deleteLocations = async () => {
        let url = "http://localhost:8080/locations/" + this.state.storeId;
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
        let ignore = await this.getLocations();
        this.displayLocations(document.getElementById("tableBody"));
    }

    render() {
        return (
            <div id="parent">
                <h1>Locations</h1>
                <form id="inputFields">
                    <div>
                        <div id="managerIdField">
                            <label htmlFor="managerId">Managing Staff ID:</label>
                            <br></br>
                            <input type="text" id="managerId" name="managerId"
                                   value={this.state.managerId} onChange={this.onInputChangeManagerId}></input>
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
                    </div>
                </form>
                <br></br><br></br>
                <form id="buttons">
                    <button onClick={this.addLocations} id="addButton">Add Locations</button>
                    <button onClick={this.editLocations} id="editButton">Edit Locations</button>
                    <button onClick={this.deleteLocations} id="deleteButton">Delete Locations</button>
                </form>
                <br></br><br></br>
                <div>
                    <table align="center" border={1} cellPadding={10} cellSpacing={0} width={1000} bgcolor="#5cbef2">
                        <thead>
                        <tr>
                            <th>Store ID</th>
                            <th>Manager ID</th>
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

export default Locations;