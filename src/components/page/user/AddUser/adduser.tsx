import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';

interface AddUserProps {
    isOpen: boolean;
    onClose: () => void;
}

interface UserData {
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}

function AddUser({ isOpen, onClose }: AddUserProps) {
    const [userData, setUserData] = useState<UserData>({
        name: '',
        username: '',
        email: '',
        address: {
            street: '',
            suite: '',
            city: '',
            zipcode: ''
        },
        phone: '',
        website: '',
        company: {
            name: '',
            catchPhrase: '',
            bs: ''
        }
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setUserData(prevUserData => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const handleAddressChange = (e: any) => {
        const { name, value } = e.target;
        setUserData(prevUserData => ({
            ...prevUserData,
            address: {
                ...prevUserData.address,
                [name]: value
            }
        }));
    };

    const handleCompanyChange = (e: any) => {
        const { name, value } = e.target;
        setUserData(prevUserData => ({
            ...prevUserData,
            company: {
                ...prevUserData.company,
                [name]: value
            }
        }));
    };

    const validateForm = () => {
        const { name, username, email, address, phone, website, company } = userData;
        const { street, suite, city, zipcode } = address;
        return name && username && email && street && suite && city && zipcode && phone && website && company.name && company.catchPhrase && company.bs;
    };

    // Update validity state when form changes
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setIsValid(validateForm());
    }, [userData]);

    const handleSubmit = async () => {
        try {
            const response = await axios.post<UserData>('http://localhost:3001/user', userData);
            window.onload
            console.log('User added:', response.data);
            onClose();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography variant="h5" gutterBottom>
                    새 사용자 추가
                </Typography>
                {['name', 'username', 'email', 'phone', 'website'].map((field) => (
                    <TextField
                        key={field}
                        name={field}
                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                ))}
                <Typography variant="h6" gutterBottom>
                    Address
                </Typography>
                {['street', 'suite', 'city', 'zipcode'].map((field) => (
                    <TextField
                        key={field}
                        name={field}
                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                        onChange={handleAddressChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                ))}
                <Typography variant="h6" gutterBottom>
                    Company
                </Typography>
                {['name', 'catchPhrase', 'bs'].map((field) => (
                    <TextField
                        key={field}
                        name={field}
                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                        onChange={handleCompanyChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                ))}
                <Button onClick={handleSubmit} disabled={!isValid}>추가</Button>
                <Button onClick={onClose}>취소</Button>
            </Box>
        </Modal>
    );
}

export default AddUser;
