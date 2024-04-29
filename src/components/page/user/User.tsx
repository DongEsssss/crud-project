import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Card, CardContent, Dialog, Divider, Modal, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './user.scss'
import Adduser from './AddUser/adduser';

export default function User() {
    const navigate = useNavigate()

    const [user, setUser] = useState<Users[]>([])
    useEffect(() => {
        axios.get('http://localhost:3001/user/')
            .then((response) => {
                setUser(response.data)
            })
    }, []);

    //search-user
    const [searchText, setsearchText] = useState<string>('')
    const handleSearchChange = (e: any) => {
        setsearchText(e.target.value)
    }
    const filteredUsers = user.filter(item => {
        return item.name?.toLowerCase().includes(searchText.toLowerCase());
    });

    //go home btn 
    const homebtn = () => {
        navigate('/home')
    }

    //modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // 모달 열기
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <main>
            <section>
                <div className="user-header">
                    <div className="input">
                        <Box sx={{ display: 'flex' }}>
                            <TextField placeholder='이름으로 검색하세요.' variant='outlined'
                                sx={{ minWidth: '300px', maxWidth: '500px', width: '100%' }}
                                value={searchText}
                                onChange={handleSearchChange}
                            />
                            <Button variant="outlined" onClick={openModal} sx={{ marginLeft: '10px' }}>생성</Button>
                        </Box>
                    </div>
                    <div className="back-btn">
                        <Button onClick={homebtn}>뒤로가기</Button>
                    </div>
                </div>
                <div className="user-card">
                    {filteredUsers.map((item) => (
                        <div className='card' key={item.id}>
                            <Card>
                                <CardContent>
                                    <div className="card-header">
                                        <Typography sx={{ color: 'black' }}>
                                            {item.id}. {item.name}
                                        </Typography>
                                        <Link className='user-detail-link' key={item.id} to={`${item.id}`}>자세히보기</Link>
                                    </div>
                                    <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
                                    <table>
                                        <tr>
                                            <th>닉네임</th>
                                            <td>{item.username}</td>
                                        </tr>
                                        <tr>
                                            <th>전화번호</th>
                                            <td>{item.phone}</td>
                                        </tr>
                                        <tr>
                                            <th>이메일</th>
                                            <td>{item.email}</td>
                                        </tr>
                                        <tr>
                                            <th>홈페이지</th>
                                            <td>{item.website}</td>
                                        </tr>
                                    </table>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </section>
            {/* 모달 */}
            <Modal open={isModalOpen} >
                <Adduser isOpen={isModalOpen} onClose={closeModal} />
            </Modal>
        </main>
    )
}
