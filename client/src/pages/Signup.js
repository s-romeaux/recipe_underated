import React, { useState } from 'react';
import styled from 'styled-components';


const SignUpForm = styled.form`
    width: 100%; /* Set width to 100% */
    max-width: 600px; /* Add max-width to prevent the form from becoming too wide */
    margin: 0 auto;
    padding: 30px 40px 20px 25px; /* Adjusted padding */
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    background-color: #f9f9f9;
    margin-bottom: 120px; /* Added margin-bottom to move the form up */
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
`;

const Button = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    padding: 10px 20px;
    cursor: pointer;
`;

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        city: '',
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert(`'Successful signup`);
                window.location.href = '/';
            } else {
                const errorMessage = await response.text();
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error('Error signing up:', error);
            // Handle error, e.g., display error message to user
        }
    };

    return (
        <div style={{ backgroundColor: '#2A4250', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Applied styles to ensure background color reaches footer */}
            <div style={{ flex: '1', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {/* Form container */}
                <SignUpForm onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="city">City</Label>
                        <Input type="text" id="city" name="city" value={formData.city} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                    </FormGroup>
                    <Button type="submit">Sign Up</Button>
                </SignUpForm>
            </div>
        </div>
    );
};

export default SignUpPage;
