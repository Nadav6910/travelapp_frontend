import "../styling/navbar.css"
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";


export default function Navbar() {

    return (
        <div className="navbar-container">
            <Link to="/">
                <div className="app-logo">
                    <LoyaltyIcon fontSize="large" color="warning" className="app-icon"/>
                    <h1>TravelApp</h1>
                </div>
            </Link>
            <Button style={{marginRight: "5px", marginTop: "5px", float: "right"}} variant="outlined" color="warning">Sign In</Button>
        </div>
    )
}