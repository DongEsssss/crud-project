import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Edituser from "../user/\bEditUser/edituser";
import { Users } from "../../feature/user/apislice";

const UserDetail = () => {
  const { id } = useParams(); // URL에서 파라미터 값 추출
  const [user, setUser] = useState<Users | null>(null);
  const navigate = useNavigate();
  //edit-modal
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
              <Typography variant="h6">유저 정보</Typography>
              <tbody>
                <tr>
                  <th>ID</th>
                  <td>{user.id}</td>
                </tr>
                <tr>
                  <th>이름</th>
                  <td>{user.name}</td>
                </tr>
                <tr>
                  <th>유저 이름</th>
                  <td>{user.username}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{user.email}</td>
                </tr>
                <tr>
                  <th>전화번호</th>
                  <td>{user.phone}</td>
                </tr>
                <tr>
                  <th>홈페이지</th>
                  <td>
                    <a href="#">{user.website}</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <table>
              <Typography variant="h6">주소</Typography>
              <tbody>
                <tr>
                  <th>도시 이름</th>
                  <td>{user.address?.city}</td>
                </tr>
                <tr>
                  <th>도로 이름</th>
                  <td> {user.address?.street}</td>
                </tr>
                <tr>
                  <th>상세 주소</th>
                  <td>{user.address?.suite}</td>
                </tr>
                <tr>
                  <th>우편 번호</th>
                  <td>{user.address?.zipcode}</td>
                </tr>
                <Typography variant="h6">회사 주소</Typography>
                <tr>
                  <th>회사 이름</th>
                  <td>{user.company?.name}</td>
                </tr>
                <tr>
                  <th>회사 한 줄 소개</th>
                  <td>{user.company?.catchPhrase}</td>
                </tr>
                <tr>
                  <th>직업</th>
                  <td>{user.company?.bs}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{ backgroundColor: "blue", color: "white" }}
            onClick={openModal}
          >
            수정
          </Button>
          <Button
            sx={{ backgroundColor: "red", color: "white", marginLeft: "10px" }}
            onClick={userdelete}
          >
            삭제
          </Button>
        </div>
      </section>
      {/* 모달 */}
      <Modal open={isModalOpen}>
        <Edituser isOpen={isModalOpen} onClose={closeModal} />
      </Modal>
    </main>
  );
};

export default UserDetail;
