import { useState, useContext } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { UserContext } from "../../contexts/UserContext";
import useApi from "../../hooks/useApi";

import "./Mood.css";

const MoodContainer = () => {
  const navigate = useNavigate();

  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const { userInfo } = useContext(UserContext);
  const api = useApi();

  const cardData = [
    { backgroundColor: "#f5b0cb", emoji: "😄", text: "Feliz" },
    { backgroundColor: "#fef6c9", emoji: "😢", text: "Triste" },
    { backgroundColor: "#bfdbf7", emoji: "😡", text: "Enojado" },
    { backgroundColor: "#9448bc", emoji: "😱", text: "Shock" },
    { backgroundColor: "#fff", emoji: "😐", text: "Neutral" },
  ];

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setIsModalOpen(false);
    setMessage("");
  };

  const closeAnalysisModal = () => {
    setIsAnalysisModalOpen(false);
  };

  const handleSendMessage = async () => {
    // Implement logic to send the message
    try {
      const data = await api.fetchData("dailyEntry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": userInfo.token,
        },
        body: JSON.stringify({
          mood: selectedCard.text,
          entry: message,
        }),
      });

      if (data.isSuccesful) {
        setAnalysis({
          emoji: data.emoji,
          analysis: data.analysis,
        });
        setIsModalOpen(false);
        setIsAnalysisModalOpen(true);
      }
    } catch (error) {
      // Handle error
      console.error("Error during entry:", error);
    }
  };

  const handleAnalysisClose = () => {
    navigate("/dashboard");
    return;
  };

  if (!userInfo.isLoggedin) {
    return <Navigate to='/signin' />;
  }

  return (
    <div className='moodContainer'>
      <Container>
        <Link to={"/dashboard"}>
          <Button
            id='exitButton'
            variant='contained'
            size='large'
            startIcon={<KeyboardReturnIcon />}>
            Regresar
          </Button>
        </Link>
        <Typography
          variant='h4'
          align='center'
          style={{ margin: "30px", color: "#fff" }}>
          Hola {userInfo.userInfo.name}, ¿Cómo te sientes hoy?
        </Typography>
        <Box className='boxContainer'>
          {cardData.map((card, index) => (
            <Card
              key={index}
              onClick={() => handleCardClick(card)}
              sx={{
                backgroundColor: card.backgroundColor,
                borderRadius: "10px",
                width: "150px",
                height: "150px",
                textAlign: "center",
                marginTop: "40px",
                cursor: "pointer",
              }}>
              <CardContent>
                <Typography
                  variant='h4'
                  style={{ fontSize: "50px", marginBottom: "10px" }}>
                  {card.emoji}
                </Typography>
                <Typography variant='h5'>{card.text} </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby='modal-title'>
          <Box
            sx={{
              backgroundColor: selectedCard && selectedCard.backgroundColor,
            }}
            className='modalContainer'>
            {selectedCard && (
              <>
                <Typography variant='h4' id='modal-title'>
                  {selectedCard.emoji} {selectedCard.text}
                </Typography>
                <Typography style={{ textAlign: "left" }}>
                  Hoy es {new Date().toLocaleDateString()}
                </Typography>
                <TextareaAutosize
                  placeholder='Ingresa el entrada del diario para hoy'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  minRows={2.5}
                  style={{
                    width: "100%",
                    minHeight: "100px",
                    margin: "10px 0",
                    borderRadius: "8px",
                    padding: "5px",
                  }}
                />
                <Button
                  variant='contained'
                  style={{ backgroundColor: "#0c7489" }}
                  onClick={handleSendMessage}
                  disabled={api.loading}>
                  {api.loading ? "Ingresando..." : "Guardar"}
                </Button>
                {api.error && <div>Se presentó un error: {api.error}</div>}
              </>
            )}
          </Box>
        </Modal>
        {analysis && (
          <Modal
            open={isAnalysisModalOpen}
            onClose={closeAnalysisModal}
            aria-labelledby='modal-title'>
            <Box
              sx={{
                backgroundColor: "#fff",
              }}
              className='modalCloseContainer'>
              <>
                <Typography variant='h4' id='modal-title'>
                  Hoy estás {analysis.emoji}
                </Typography>
                <Typography style={{ textAlign: "center", padding: "5px" }}>
                  {analysis.analysis}
                </Typography>
                <Button
                  variant='contained'
                  style={{ backgroundColor: "#0c7489", margin: "10px" }}
                  onClick={handleAnalysisClose}>
                  Finalizar
                </Button>
              </>
            </Box>
          </Modal>
        )}
      </Container>
    </div>
  );
};

export default MoodContainer;
