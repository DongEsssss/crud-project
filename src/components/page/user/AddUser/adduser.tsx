import { useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Modal, TextField, Divider } from '@mui/material';

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

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3001/user', userData);
            console.log('User added:', response.data);
            onClose();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography variant="h5">
                    새 사용자 추가
                </Typography>
                <Divider sx={{marginTop:'20px', marginBottom:'20px'}}/>
                <Typography variant="h6">
                    User Info
                </Typography>
                <TextField
                    name="name"
                    label="Name"
                    value={userData.name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    name="username"
                    label="Username"
                    value={userData.username}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    name="email"
                    label="Email"
                    value={userData.email}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                />
                                <Divider sx={{marginTop:'20px', marginBottom:'20px'}}/>
                <Typography variant="h6">
                    Address
                </Typography>
                <TextField
                    name="street"
                    label="Street"
                    value={userData.address.street}
                    onChange={handleAddressChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    name="suite"
                    label="Suite"
                    value={userData.address.suite}
                    onChange={handleAddressChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    name="city"
                    label="City"
                    value={userData.address.city}
                    onChange={handleAddressChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    name="zipcode"
                    label="Zipcode"
                    value={userData.address.zipcode}
                    onChange={handleAddressChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    name="phone"
                    label="Phone"
                    value={userData.phone}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    name="website"
                    label="Website"
                    value={userData.website}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                />
                                <Divider sx={{marginTop:'20px', marginBottom:'20px'}}/>
                <Typography variant="h6">
                    Company
                </Typography>
                <TextField
                    name="companyName"
                    label="Company Name"
                    value={userData.company.name}
                    onChange={handleCompanyChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    name="catchPhrase"
                    label="Catch Phrase"
                    value={userData.company.catchPhrase}
                    onChange={handleCompanyChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    name="bs"
                    label="BS"
                    value={userData.company.bs}
                    onChange={handleCompanyChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <Divider sx={{marginTop:'20px', marginBottom:'20px'}}/>
                <div style={{display:'flex', justifyContent:'center'}}>
                <Button variant='outlined' onClick={handleSubmit}>추가</Button>
                <Button variant='outlined' onClick={onClose}>취소</Button>
                </div>
            </Box>
        </Modal>
    );
}

export default AddUser;
