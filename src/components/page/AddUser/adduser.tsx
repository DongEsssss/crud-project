import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Divider,
} from "@mui/material";

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
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      address: {
        ...prevUserData.address,
        [name]: value,
      },
    }));
  };

  const handleCompanyChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      company: {
        ...prevUserData.company,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3001/user", userData);
      console.log("데이터 추가 성공!", response.data);
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("데이터 추가 실패!", error);
    }
  };

  const isButtonDisabled = Object.values(userData).some(
    (value) =>
      value === "" ||
      (typeof value === "object" &&
        Object.values(value).some((innerValue) => innerValue === ""))
  );

  return (
    <Modal open={isOpen} onClose={onClose} sx={{ overflow: "scroll" }}>
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translate(-50%, 00%)",
          bgcolor: "white",
          padding: "20px",
        }}
      >
        <Typography variant="h5">새 사용자 추가</Typography>
        <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
        <Typography variant="h6">유저 정보</Typography>
        <TextField
          name="name"
          label="이름을 입력해주세요."
          value={userData.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="username"
          label="유저 이름을 입력해주세요."
          value={userData.username}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="email"
          label="이메일을 입력해주세요."
          value={userData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
        <Typography variant="h6">주소</Typography>
        <TextField
          name="street"
          label="거리 이름을 입력주세요."
          value={userData.address.street}
          onChange={handleAddressChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="suite"
          label="상세 주소를 입력해주세요."
          value={userData.address.suite}
          onChange={handleAddressChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="city"
          label="도시 이름을 입력해주세요."
          value={userData.address.city}
          onChange={handleAddressChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="zipcode"
          label="우편번호를 입력해주세요."
          value={userData.address.zipcode}
          onChange={handleAddressChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="phone"
          label="전화번호를 입력해주세요."
          value={userData.phone}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="website"
          label="홈페이지를 입력해주세요."
          value={userData.website}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
        <Typography variant="h6">회사 정보</Typography>
        <TextField
          name="name"
          value={userData.company.name}
          label="회사 이름을 입력주세요."
          onChange={handleCompanyChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="catchPhrase"
          label="회사 한 줄 소개"
          value={userData.company.catchPhrase}
          onChange={handleCompanyChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="bs"
          label="직업을 입력해주세요."
          value={userData.company.bs}
          onChange={handleCompanyChange}
          fullWidth
          margin="normal"
          required
        />
        <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            onClick={handleSubmit}
            disabled={isButtonDisabled}
          >
            추가
          </Button>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{ marginLeft: "20px", background: "red", color: "white" }}
          >
            취소
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default AddUser;
