import React, {Component} from "react";
import './inventories.css'

interface InventoriesState {
    inventories: any,
    inventoryId: string,
    storeId: string,
    filmId: string,
    filmTitle: string
}

interface InventoriesProps {

}

class Inventories extends Component<InventoriesProps, InventoriesState> {

    constructor(props: any) {
        super(props);
        this.state = {
            inventories: {},
            inventoryId: "",
            storeId: "",
            filmId: "",
            filmTitle: ""
        }
    }

    async componentDidMount() {
        let ignore = await this.getInventories();
        this.displayInventories(document.getElementById("tableBody"));
    }

    getInventories = async () => {
        let url = "http://localhost:8080/inventory";
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
            let inventoriesObject = await response.json();
            let inventoriesArray = []
            for (let i = 0; i < inventoriesObject.length; i++) {
                inventoriesArray.push(inventoriesObject[i]);
            }
            this.setState({
                inventories: inventoriesArray
            })
        } catch (e) {
            alert("There was an error contacting the server.");
        }
    }

    displayInventories = (table: any) => {
        if (this.state.inventories.length == 0) {
            return;
        }
        console.log(this.state.inventories);
        for (let i = 0; i < this.state.inventories.length; i++) {
            let inventoryId = this.state.inventories[i].inventoryId;
            let storeId = this.state.inventories[i].storeId;
            let filmId = this.state.inventories[i].filmId;
            let filmTitle = this.state.inventories[i].filmTitle;
            let row = `<tr>
                           <td>${inventoryId}</td>
                           <td>${storeId}</td>
                           <td>${filmId}</td>
                           <td>${filmTitle}</td>
                       </tr>`;
            table.innerHTML += row;
        }
    }

    onInputChangeInventoryId = (e: any) => {
        let inventoryId: string = e.target.value;
        this.setState({
            inventoryId: inventoryId
        });
    }

    onInputChangeStoreId = (e: any) => {
        let storeId: string = e.target.value;
        this.setState({
            storeId: storeId
        });
    }

    onInputChangeFilmId = (e: any) => {
        let filmId: string = e.target.value;
        this.setState({
            filmId: filmId
        });
    }

    onInputChangeFilmTitle = (e: any) => {
        let filmTitle: string = e.target.value;
        this.setState({
            filmTitle: filmTitle
        });
    }

    addInventory = async () => {
        if (this.state.inventoryId === "" || this.state.storeId === "" || this.state.filmId === "" ||
            this.state.filmTitle === "") {
            alert("All fields must be filled.");
            return;
        }
        let url = "http://localhost:8080/inventory"
        let httpBody = {
            inventoryId: this.state.inventoryId,
            storeId: this.state.storeId,
            filmId: this.state.filmId,
            filmTitle: this.state.filmTitle
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
        let ignore = await this.getInventories();
        this.displayInventories(document.getElementById("tableBody"));
    }

    editInventory = async () => {
        let url = "http://localhost:8080/inventory/" + this.state.inventoryId + "?";
        if (this.state.storeId !== "") {
            url += "storeId=" + this.state.storeId + "&";
        }
        if (this.state.filmId !== "") {
            url += "filmId=" + this.state.filmId + "&";
        }
        if (this.state.filmTitle !== "") {
            url += "filmTitle=" + this.state.filmTitle;
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
        let ignore = await this.getInventories();
        this.displayInventories(document.getElementById("tableBody"));
    }

    deleteInventory = async () => {
        let url = "http://localhost:8080/inventory/" + this.state.inventoryId;
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
        let ignore = await this.getInventories();
        this.displayInventories(document.getElementById("tableBody"));
    }

    render() {
        return (
            <div id="parent">
                <h1>Inventories</h1>
                <form id="inputFields">
                    <div>
                        <div id="inventoryIdField">
                            <label htmlFor="inventoryId">Inventory ID:</label>
                            <br></br>
                            <input type="text" id="inventoryId" name="inventoryId"
                                   value={this.state.inventoryId} onChange={this.onInputChangeInventoryId}></input>
                        </div>
                        <div id="storeIdField">
                            <label htmlFor="storeId">Store ID:</label>
                            <br></br>
                            <input type="text" id="storeId" name="storeId"
                                   value={this.state.storeId} onChange={this.onInputChangeStoreId}></input>
                        </div>
                        <div id="filmIdField">
                            <label htmlFor="filmId">Film ID:</label>
                            <br></br>
                            <input type="text" id="filmId" name="filmId"
                                   value={this.state.filmId} onChange={this.onInputChangeFilmId}></input>
                        </div>
                        <div id="filmTitleField">
                            <label htmlFor="filmTitle">Film Title:</label>
                            <br></br>
                            <input type="text" id="filmTitle" name="filmTitle"
                                   value={this.state.filmTitle} onChange={this.onInputChangeFilmTitle}></input>
                        </div>
                    </div>
                </form>
                <br></br><br></br>
                <form id="buttons">
                    <button onClick={this.addInventory} id="addButton">Add Inventory</button>
                    <button onClick={this.editInventory} id="editButton">Edit Inventory</button>
                    <button onClick={this.deleteInventory} id="deleteButton">Delete Inventory</button>
                </form>
                <br></br><br></br>
                <div>
                    <table align="center" border={1} cellPadding={10} cellSpacing={0} width={1000} bgcolor="#5cbef2">
                        <thead>
                        <tr>
                            <th>Inventory ID</th>
                            <th>Store ID</th>
                            <th>Film ID</th>
                            <th>Film Title</th>
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

export default Inventories;