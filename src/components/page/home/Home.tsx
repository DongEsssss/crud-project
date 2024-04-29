import React from 'react'
import { Typography } from '@mui/material';

const Home = () => {
    return (
        <main>
            <section>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>CRUD 란 무엇인가?</Typography>
                <Typography variant='body2' mt={1}>CRUD는 대부분의 컴퓨터 소프트웨어가 가지는 기본적인 데이터 처리 기능인 Create(생성), Read(읽기), Update(갱신), Delete(삭제)를 묶어서 일컫는 말이다. 사용자 인터페이스가 갖추어야 할 기능(정보의 참조/검색/갱신)을 가리키는 용어로서도 사용된다.</Typography>
                <a href="/user">CRUD-Project</a>
            </section>
        </main>
    )
}

export default Home