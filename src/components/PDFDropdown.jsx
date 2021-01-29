import React, { Component } from 'react'
import {DropdownButton,  Dropdown} from "react-bootstrap";

export default class PDFDropdown extends Component {
    state = {
        PDF:null,
    }
    /**this.props.id */
    fetchPDF = () => {
        console.log(this.props.id)
        try {
            let req = new XMLHttpRequest();
            let URLtoPDF = `${process.env.REACT_APP_URL}profile/cv/${this.props.id}`
            req.open("GET",URLtoPDF,true);
            req.responseType = "blob";
            req.onload = function() {
                let file = new Blob([req.response],{ type: 'application/pdf' })
                let fileURL = URL.createObjectURL(file);
                console.log(fileURL)
                window.open(fileURL, "_blank");
            }
            req.send();
        } catch (e) {
            console.log("ERROR fetching HERE " + e)
        }
    }
    render() {
        return (
            <div>
                <DropdownButton variant="Secondary"
                  title="More..."
                >
                  <Dropdown.Item as="button" onClick={this.fetchPDF}>Download your resume as PDF</Dropdown.Item>
                </DropdownButton>
            </div>
        )
    }
}
