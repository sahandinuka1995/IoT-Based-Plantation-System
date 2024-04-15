import React, {useEffect, useState} from "react"
import {Button, Col, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap"
import classnames from "classnames"
import Select from "react-select"
import {USER_ROLES_DROPDOWN} from "../../../consts/consts"
import {findObject} from "../../../utility/Utils"
import {userFormValidation} from "../../../validations/user"
import {userFormError} from "../../../consts/error"
import {addNewUser, updateUser} from "../../../services/userService"

const initialFormData = {
    name: '',
    username: '',
    role: null,
    password: '',
    confirmPassword: ''
}

const AddUpdateModal = (props) => {
    const {toggle, className, selectedRow, refresh} = props
    const [formData, setFormData] = useState({...initialFormData})
    const [error, setError] = useState({...userFormError})

    useEffect(() => {
        if (selectedRow) {
            setFormData({
                ...formData,
                name: selectedRow.name,
                username: selectedRow.username,
                role: findObject(USER_ROLES_DROPDOWN, selectedRow.role)
            })
        }
    }, [])

    const onSave = async () => {
        const validate = userFormValidation(formData, selectedRow)
        setError(validate)
        for (const key in validate) {
            if (validate[key]) {
                return
            }
        }

        const body = {
            name: formData.name,
            username: formData.username,
            password: formData.password,
            role: formData?.role?.value
        }

        const res = selectedRow ? await updateUser(body, selectedRow.id) : await addNewUser(body)
        if (res?.status === 200) {
            refresh()
            toggle()
        }
    }

    return <Modal
        isOpen={true}
        toggle={toggle}
        className={className}
        centered
    >
        <ModalHeader toggle={toggle}>{selectedRow ? 'Update' : 'Add'} User</ModalHeader>
        <ModalBody>
            <Row>
                <Col md={12}>
                    <FormGroup>
                        <Label>Name</Label>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            invalid={error.name && formData?.name?.trim() === ''}
                        />
                    </FormGroup>
                </Col>

                <Col md={6}>
                    <FormGroup>
                        <Label>Username</Label>
                        <Input
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            invalid={error.username && formData?.username?.trim() === ''}
                        />
                    </FormGroup>
                </Col>

                <Col md={6}>
                    <FormGroup>
                        <Label>Role</Label>
                        <Select
                            menuPortalTarget={document.body}
                            className={classnames('react-select', {'is-invalid': error.role && formData?.role === null})}
                            classNamePrefix='select'
                            value={formData.role}
                            options={USER_ROLES_DROPDOWN}
                            isClearable={false}
                            placeholder={'Select role'}
                            onChange={(e) => setFormData({...formData, role: e})}
                            styles={{menuPortal: base => ({...base, zIndex: 9999})}}
                        />
                    </FormGroup>
                </Col>

                <Col md={6}>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input
                            type={'password'}
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            invalid={error.password && formData?.password?.trim() === ''}
                        />
                    </FormGroup>
                </Col>

                <Col md={6}>
                    <FormGroup>
                        <Label>Confirm Password</Label>
                        <Input
                            type={'password'}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            invalid={error.confirmPassword || (error.confirmPassword && formData?.confirmPassword?.trim() === '')}
                        />
                    </FormGroup>
                </Col>
            </Row>
        </ModalBody>
        <ModalFooter>
            <Button outline>Cancel</Button>
            <Button color={'primary'} onClick={onSave}>Save Changes</Button>
        </ModalFooter>
    </Modal>
}

export default AddUpdateModal