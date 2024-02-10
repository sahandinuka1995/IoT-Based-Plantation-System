import {Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Row, Col, Button} from 'reactstrap'
import DataTable from "react-data-table-component"
import {ChevronDown, Edit, Trash} from "react-feather"
import {useEffect, useState} from "react"
import {getAllUsers, deleteUser} from "../services/userService"
import {getCookiesData} from "../utility/Utils"
import AddUpdateModal from "../@core/components/user/addUpdateModal"
import ConfirmationBox from "../@core/components/confirmation-box"

const userData = getCookiesData()

const Users = () => {
    const [tableData, setTableData] = useState([])
    const [modal, setModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const [deleteConfirm, setDeleteConfirm] = useState(false)

    const loadAllUsers = async () => {
        const res = await getAllUsers()
        if (res?.status === 200) {
            setTableData(res.data)
        }
    }

    const deleteUserById = async () => {
        const res = await deleteUser(selectedRow.id)
        if (res?.status === 200) {
            setDeleteConfirm(false)
            await loadAllUsers()
        }
    }

    useEffect(() => {
        loadAllUsers()
    }, [])

    const columns = [
        {
            name: 'Name',
            selector: row => row.name
        },
        {
            name: 'Username',
            selector: row => row.username
        },
        {
            name: 'Role',
            selector: row => row.role
        },
        {
            name: 'Actions',
            selector: row => <div>
                <Button size={'sm'} color={'warning'}
                        onClick={() => {
                            setSelectedRow(row)
                            setModal(true)
                        }}>
                    <Edit size={15}/>
                </Button>

                <Button size={'sm'}
                        color={'danger'}
                        onClick={() => {
                            setSelectedRow(row)
                            setDeleteConfirm(true)
                        }}
                        className={'ml-1'} disabled={userData?.id === row?.id}>
                    <Trash size={15}/>
                </Button>
            </div>
        }
    ]

    return (<>
        <Card>
            <CardHeader className={'border-bottom mb-2'}>
                <Row className={'w-100 align-items-center'}>
                    <Col md={6} sm={6} xs={6}>
                        <h4 className={'mb-0'}>Users</h4>
                    </Col>

                    <Col md={6} sm={6} xs={6} align={'right'}>
                        <Button color={'primary'} onClick={() => setModal(true)}>Add New</Button>
                    </Col>
                </Row>
            </CardHeader>
            <CardBody>
                <div className={'react-dataTable'}>
                    <DataTable
                        noHeader
                        pagination
                        columns={columns}
                        data={tableData}
                        className='react-dataTable'
                        sortIcon={<ChevronDown size={10}/>}
                    />
                </div>
            </CardBody>
        </Card>

        {modal && <AddUpdateModal
            isOpen={modal}
            toggle={() => {
                setModal(false)
                setSelectedRow(null)
            }}
            selectedRow={selectedRow}
            refresh={loadAllUsers}
        />}

        {deleteConfirm && <ConfirmationBox
            title={'Confirmation'}
            desc={'Are you sure to delete user?'}
            iconColor={'text-warning'}
            yesLabel={'Yes'}
            noLabel={'No'}
            yesAction={deleteUserById}
            noAction={() => {
                setSelectedRow(null)
                setDeleteConfirm(false)
            }}
        />}
    </>)
}

export default Users
