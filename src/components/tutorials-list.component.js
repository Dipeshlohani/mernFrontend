import React, { Component } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import MyVerticallyCenteredModal from "./modal";
import TutorialDataService from "../services/tutorial.service";
// import { Modal } from 'react-bootstrap';

library.add(faTrashCan, faPenToSquare);


export default class TutorialsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveTutorials = this.retrieveTutorials.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.updateTutorial = this.updateTutorial.bind(this);
        this.deleteTutorial = this.deleteTutorial.bind(this);
        this.removeAllTutorials = this.removeAllTutorials.bind(this);
        this.searchTitle = this.searchTitle.bind(this);
        this.state = {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
            searchTitle: "",
            modalShow: false
        };
    }
    setModalShow(state) {
        this.setState({
            modalShow: state
        })
    }
    componentDidMount() {
        this.retrieveTutorials();
    }
    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;
        this.setState({
            searchTitle: searchTitle
        });
    }
    retrieveTutorials() {
        TutorialDataService.getAll()
            .then(response => {
                this.setState({
                    tutorials: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    refreshList() {
        this.retrieveTutorials();
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        });
    }
    setActiveTutorial(tutorial, index) {
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index
        });
    }
    deleteTutorial(tutorial) {
        TutorialDataService.delete(tutorial._id)
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }
    handleUpdate(tutorial, index) {
        console.log(tutorial, index, '------------------------')
        this.setState({
            currentTutorial: tutorial,
            currentIndex: index,
            modalShow: true
        })
    }
    updateTutorial(id, data) {
        console.log(id, '---this is going to get updated-')
        TutorialDataService.update(id, data)
            .then(response => {
                this.setModalShow(false);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    removeAllTutorials() {
        TutorialDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }
    searchTitle() {
        TutorialDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    tutorials: response.data ? [response.data] : []
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    render() {
        const { searchTitle, tutorials, currentTutorial, currentIndex } = this.state;
        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Tutorials List</h4>
                    <ul className="list-group">
                        {tutorials &&
                            tutorials.map((tutorial, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveTutorial(tutorial, index)}
                                    key={index}
                                >
                                    {tutorial.title} &nbsp;
                                    <FontAwesomeIcon icon="fa-solid fa-trash-can" onClick={() => this.deleteTutorial(tutorial, index)} /> &nbsp;
                                    {/* <FontAwesomeIcon icon="fa-solid fa-pen-to-square" onClick={() => this.updateTutorial(tutorial, index)} /> &nbsp; */}
                                    <FontAwesomeIcon icon="fa-solid fa-pen-to-square" onClick={() => this.handleUpdate(tutorial, index)} /> &nbsp;
                                    <MyVerticallyCenteredModal
                                        show={this.state.modalShow}
                                        id={currentTutorial?._id}
                                        title={currentTutorial?.title}
                                        description={currentTutorial?.description}
                                        updatetutorial={this.updateTutorial}
                                        onHide={() => {
                                            this.setState({
                                                // currentTutorial: currentTutorial,
                                                // currentIndex: currentIndex,
                                                modalShow: false
                                            })
                                            // this.setModalShow(false)
                                        }} />
                                </li>
                            ))}
                    </ul>
                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllTutorials}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentTutorial ? (
                        <div>
                            <h4>Tutorial</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentTutorial.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentTutorial.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentTutorial.published ? "Published" : "Pending"}
                            </div>
                            <Link
                                to={"/tutorials/" + currentTutorial.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Tutorial...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}