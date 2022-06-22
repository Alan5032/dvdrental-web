import React, {Component} from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";

interface NavbarState {

}

interface NavbarProps {

}

class Navbar extends Component<NavbarProps, NavbarState> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <>
                <Nav>
                    <NavMenu>
                        <NavLink to="/customers">
                            Customers
                        </NavLink>
                        <NavLink to="/inventories">
                            Inventories
                        </NavLink>
                        <NavLink to="/locations">
                            Locations
                        </NavLink>
                        <NavLink to="/rentals">
                            Rentals
                        </NavLink>
                        <NavLink to="/staffs">
                            Staffs
                        </NavLink>
                    </NavMenu>
                </Nav>
            </>
        )
    }
}

export default Navbar;