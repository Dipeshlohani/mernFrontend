import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';

export default class MyVerticallyCenteredModal extends Component {
    constructor(props) {
        super(props);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.modifyTutorial = this.modifyTutorial.bind(this);
        this.state = {
            title: props.title,
            description: props.description
        }
    }
    modifyTutorial() {
        // console.log(this.props.id, this.state);
        console.log(this.props.id, "THIS IS PROPS ID IN MODAL;");
        this.props.updatetutorial(this.props.id, this.state);
    }
    handleTitleChange(e) {
        this.setState({
            title: e.target.value
        });
    }
    handleDescriptionChange(e) {    
        this.setState({
            description: e.target.value
        })
    }
    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Tutorial
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" defaultValue={this.props.title} autoComplete="off" onChange={this.handleTitleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" defaultValue={this.props.description} autoComplete="off" onChange={this.handleDescriptionChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.modifyTutorial}>Confirm</Button>
                    <Button onClick={this.props.onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    // let state = {
    //     title: "",
    //     description: ""
    // }
    // handleTitleChange = (e) => {
    //     this.setState({ title: e.target.value });
    // }
    // handleDescriptionChange = (e) => {
    //     this.setState({ description: e.target.value });
    // }
}