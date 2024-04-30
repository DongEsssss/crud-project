import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, Divider } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserDetail = () => {
  const { id } = useParams(); // URL에서 파라미터 값 추출
  const [user, setUser] = useState<Users | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/user/${id}`);
        setUser(response.data); // 단일 사용자 객체로 설정
      } catch (error) {
        console.error("Error fetching user detail:", error);
      }
    };

    fetchUserDetail(); // 함수 호출
  }, [id]); // id가 변경될 때마다 다시 호출

  // 사용자 정보가 로드되지 않았을 경우 처리
  if (!user) {
    return <div>Loading...</div>;
  }

  //navigate
  const backlist = () => {
    navigate("/user");
  };
  // userdelete
  const userdelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/user/${id}`);
      navigate("/user");
      console.log("유저 삭제 성공", response.data);
    } catch (error) {
      console.error("유저 삭제 실패", error);
    }
  };
  return (
    <main>
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>유저 정보</h2>
          <Button onClick={backlist}>리스트로 돌아가기</Button>
        </div>
        <div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "80px 0px",
            }}
          >
            <AccountCircleIcon sx={{ fontSize: "100px" }} />
          </Box>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)" }}
          >
            <table>
              <tbody>
                <tr>
                  <th>ID</th>
                  <td>{user.id}</td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>{user.name}</td>
                </tr>
                <tr>
                  <th>Username</th>
                  <td>{user.username}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{user.phone}</td>
                </tr>
                <tr>
                  <th>Website</th>
                  <td>
                    <a href="#">{user.website}</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <tbody>
                <tr>
                  <th>Address</th>
                  <td>
                    <p>Street: {user.address?.street}</p>
                    <p>Suite: {user.address?.suite}</p>
                    <p>City: {user.address?.city}</p>
                    <p>Zipcode: {user.address?.zipcode}</p>
                  </td>
                </tr>
                <tr>
                  <th>Company</th>
                  <td>
                    <p>Name: {user.company?.name}</p>
                    <p>Catch Phrase: {user.company?.catchPhrase}</p>
                    <p>Business: {user.company?.bs}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
        <Button
          sx={{ backgroundColor: "red", color: "white" }}
          onClick={userdelete}
        >
          삭제
        </Button>
      </section>
    </main>
  );
};

export default UserDetail;
