import React, { Component } from 'react'
import {withRouter} from 'react-router-dom';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reserveTrip } from '../../actions/tripActions/tripActions'
import { closeAcceptReserveTripModal } from '../../actions/modalActions/modalActions'

class AcceptReserveTripModal extends Component {
    constructor(props){
        super(props)
        console.log(this.props)
    }
    handleSubmit = (e) => {
        this.props.closeAcceptReserveTripModal();
        this.props.reserveTrip()
        this.props.history.push({
            pathname: '/Purchase/' + this.props.trip.id
        })
    }
    handleClose = () => {
        this.props.closeAcceptReserveTripModal();
    };
    render() {
        return (
            <>
                <Modal show={this.props.AcceptReserveTripModal}>
                    <Modal.Header closeButton onClick={this.handleClose}>
                        <Modal.Title>Accept Reserve</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        You are about to reserve this trip. This will grant you a 30 minute interval to complete the purchase before the travel package might expire. Are you sure you want to reserve this trip now?
                        <Row>
                            <Col style={{paddingRight: "5px"}}>
                                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                                    Submit
                                </Button>
                            </Col>
                            <Col style={{paddingLeft: "5px"}}>
                                <Button variant="secondary" type="cancel" onClick={this.handleClose}>
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        AcceptReserveTripModal: state.modals.acceptReserveTripModal,
        trip: state.trip.trip
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        reserveTrip: () => dispatch(reserveTrip()),
        closeAcceptReserveTripModal: () => dispatch(closeAcceptReserveTripModal())
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AcceptReserveTripModal))