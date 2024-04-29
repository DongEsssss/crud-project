import { Box } from '@mui/material'
import './header.scss'

function Header() {
    return (
        <div className="header-box">
            <Box className='box' mt={3}>
                <h3 >CRUD-Project</h3>
            </Box>
        </div>
    )
}

export default Header