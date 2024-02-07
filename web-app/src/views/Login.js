import {Link, Redirect} from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import {Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button} from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import logo from '@src/assets/images/logo/logo_transparent.png'
import {useState} from "react"
import {loginValidation} from "../validations/auth"
import {loginError} from "../consts/error"

const initialFormData = {
    username: '',
    password: ''
}

const Login = () => {
    const source = require(`@src/assets/images/pages/login/login-bg.png`).default

    const [formData, setFormData] = useState({...initialFormData})
    const [error, setError] = useState({...loginError})
    const [isRemember, setIsRemember] = useState(true)

    const onLogin = () => {
        const validate = loginValidation(formData)
        setError(validate)
        for (const key in validate) {
            if (validate[key]) {
                return
            }
        }

        console.log('ffffffff')
    }

    return (
        <div className='auth-wrapper auth-v2'>
            <Row className='auth-inner m-0'>
                <Link className='brand-logo d-flex align-items-center' to='/'>
                    <img src={logo} width={50}/>
                    <h2 className='brand-text text-primary ml-1'>AgroPulse</h2>
                </Link>
                <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
                    <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
                        <img className='img-fluid' src={source} alt='Login V2'/>
                    </div>
                </Col>
                <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
                    <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
                        <CardTitle tag='h2' className='font-weight-bold mb-1'>
                            Welcome to AgroPulse!
                        </CardTitle>
                        <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
                        <Form className='auth-login-form mt-2' onSubmit={e => e.preventDefault()}>
                            <FormGroup>
                                <Label className='form-label' for='login-username'>
                                    Username
                                </Label>
                                <Input value={formData.username}
                                       onChange={e => setFormData({...formData, username: e.target.value})}
                                       invalid={error.username && formData?.username?.trim() === ""}
                                       type='text'
                                       id='login-username' placeholder='admin' autoFocus/>
                            </FormGroup>
                            <FormGroup>
                                <div className='d-flex justify-content-between'>
                                    <Label className='form-label' for='login-password'>
                                        Password
                                    </Label>
                                    <Link to='/'>
                                        <small>Forgot Password?</small>
                                    </Link>
                                </div>
                                <InputPasswordToggle
                                    value={formData.password}
                                    onChange={e => setFormData({
                                        ...formData,
                                        password: e.target.value
                                    })}
                                    invalid={error.password && formData?.password?.trim() === ""}
                                    className='input-group-merge' id='login-password'/>
                            </FormGroup>
                            <FormGroup>
                                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me'
                                             label='Remember Me' checked={isRemember}
                                             onChange={() => setIsRemember(!isRemember)}
                                />
                            </FormGroup>
                            <Button onClick={onLogin} color='primary' block>
                                Sign in
                            </Button>
                        </Form>
                    </Col>
                </Col>
            </Row>
        </div>
    )
}

export default Login
