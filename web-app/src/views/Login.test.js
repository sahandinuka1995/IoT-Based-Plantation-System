import React from 'react'
import {screen, render} from '@testing-library/react'
import Login from "./Login"

it('User Login Form Validation', async () => {
    render(<Login/>)
    const helloWorldText = screen.getByText('Hello World');
    expect(helloWorldText).toBeInTheDocument();
})