import React from "react"
import {Button, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap"
import {Info} from "react-feather"

const ConfirmationBox = (props) => {
    const {title, desc, yesLabel, noLabel, yesAction, noAction, iconColor} = props

    return <Modal isOpen={true} toggle={noAction} centered>
        <ModalHeader toggle={noAction}>{title}</ModalHeader>
        <ModalBody>
            <div className={'d-flex align-items-center'}>
                <Info className={iconColor}/>
                <Label className={'ml-1 font-medium-2 mb-0'}>{desc}</Label>
            </div>
        </ModalBody>
        <ModalFooter>
            <Button onClick={yesAction} color={'primary'}>{yesLabel}</Button>
            <Button onClick={noAction} color={'secondary'} outline>{noLabel}</Button>
        </ModalFooter>
    </Modal>
}

export default ConfirmationBox