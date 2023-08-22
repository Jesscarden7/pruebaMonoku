import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function MainContent() {
  return (
    <Box sx={{ width: "100%", height: "100%", overflowY: "scroll" }}>
      <ImageList variant='masonry' cols={3} gap={8}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading='lazy'
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: "https://img.freepik.com/foto-gratis/diversas-personas-emoticonos-felices_53876-148196.jpg?w=1380&t=st=1692669757~exp=1692670357~hmac=243956777e75cefa28f55350a91328a32750855c321c51c140b0a2fe3a79437c",
    title: "Bed",
  },
  {
    img: "https://img.freepik.com/foto-gratis/mano-sosteniendo-caras-sonrientes-cuadradas_23-2148317138.jpg?w=740&t=st=1692669889~exp=1692670489~hmac=626d8e549891b5e14b13ec7933cf57119a5deb21cb6928544d8d64a97dde43e7",
    title: "Books",
  },
  {
    img: "https://img.freepik.com/foto-gratis/disposicion-vista-superior-emociones_23-2148860282.jpg?w=996&t=st=1692670005~exp=1692670605~hmac=1dfc52055b3393f4731cec1b87ba5d6620a4a485e1e6e1b21f8500a50c0f828c",
    title: "Kitchen",
  },
  {
    img: "https://img.freepik.com/foto-gratis/arreglo-vista-superior-diferentes-sentimientos_23-2148860306.jpg?w=996&t=st=1692669927~exp=1692670527~hmac=fbe332c2c89f9f37befc343d95cc5306cffea856d0f2e357966fff140b6d6813",
    title: "Sink",
  },

  {
    img: "https://img.freepik.com/foto-gratis/arreglo-vista-superior-diferentes-sentimientos_23-2148860304.jpg?w=996&t=st=1692670088~exp=1692670688~hmac=a3ef45acbef03a703a4fad9f136827804d862448ef7c1265df855b65ef1e4dd9",
    title: "Chairs",
  },
  {
    img: "https://img.freepik.com/foto-gratis/rostro-expresiones-ilustraciones-emociones-sentimientos_53876-125619.jpg?w=996&t=st=1692670035~exp=1692670635~hmac=3356f922651225f33a433b0f30eb2be4580bf8cea2776338d96f4276759f0a72",
    title: "Blinds",
  },
  {
    img: "https://img.freepik.com/foto-gratis/papel-hecho-cerebro-persona-cabeza_23-2148857194.jpg?w=1060&t=st=1692670375~exp=1692670975~hmac=7b8d00cff722bdf89b5edfb939e46128aab42372ca982d747813ef96eaa29f4c",
    title: "Laptop",
  },
  {
    img: "https://img.freepik.com/foto-gratis/vista-3d-emoji-amarillo_23-2150473697.jpg?w=996&t=st=1692670582~exp=1692671182~hmac=0fed70c0ea3d45d54a6149199f990891706b0154d7a874d783b94ff6e6d882dc",
    title: "Candle",
  },
];
