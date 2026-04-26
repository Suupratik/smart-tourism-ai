import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Paper, Button, Stack } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getPlaceById } from "../api/api";
import api from "../api/api";
import { motion } from "framer-motion";

const PlaceDetails = () => {
  const { id } = useParams();

  const [place, setPlace] = useState(null);
  const [aiTips, setAiTips] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const fetchPlace = async () => {
    try {
      const res = await getPlaceById(id);
      setPlace(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPlace();
  }, []);

  const handlePayment = async () => {
    try {
      const amount = place.ticketPrice * 100;

      const res = await api.post("/payments/create-order", {
        amount,
        placeId: place._id
      });

      const { order, key } = res.data;

      const options = {
        key: key,
        amount: order.amount,
        currency: order.currency,
        name: "Smart Tourism Ticket",
        description: place.name,
        order_id: order.id,

        handler: async function (response) {
          try {
            await api.post("/payments/verify", {
              placeId: place._id,
              amount,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            alert("Payment Successful");
          } catch (err) {
            console.error(err);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  const getAITips = async () => {
    try {
      setLoadingAI(true);

      const res = await api.post("/chat", {
        message: `Give travel tips for visiting ${place.name}. Include best time to visit, nearby attractions, and travel tips.`
      });

      if (res.data?.reply) {
        setAiTips(res.data.reply);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAI(false);
    }
  };

  const getAIRecommendation = async () => {
    try {
      const res = await api.post("/chat", {
        message: `Give travel recommendations for visiting ${place.name} in ${place.location}. Include best time to visit, nearby attractions, and travel tips.`
      });

      if (res.data?.reply) {
        setRecommendation(res.data.reply);
      }

    } catch (err) {
      console.log(err);
    }
  };

  if (!place) return <Typography>Loading...</Typography>;

  const position = [
    place.latitude || 22.5390,
    place.longitude || 88.3960
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 4,
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)"
        }}
      >
        {/* TITLE */}
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {place.name}
        </Typography>

        <Typography sx={{ mt: 1, color: "#ccc" }}>
          Location: {place.location}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          Ticket Price: ₹{place.ticketPrice}
        </Typography>

        <Typography sx={{ mt: 2 }}>
          {place.description}
        </Typography>

        {/* IMAGE */}
        {place.image && (
          <motion.img
            src={`http://localhost:5600${place.image}`}
            alt="place"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            style={{
              width: "100%",
              marginTop: "20px",
              borderRadius: "12px"
            }}
          />
        )}

        {/* MAP */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MapContainer
            center={position}
            zoom={13}
            style={{
              height: "300px",
              marginTop: "20px",
              borderRadius: "12px"
            }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position}>
              <Popup>{place.name}</Popup>
            </Marker>
          </MapContainer>
        </motion.div>

        {/* BUTTONS */}
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button variant="contained" onClick={handlePayment}>
              Buy Ticket
            </Button>
          </motion.div>

          <motion.div whileTap={{ scale: 0.9 }}>
            <Button variant="outlined" onClick={getAITips}>
              AI Travel Tips
            </Button>
          </motion.div>

          <motion.div whileTap={{ scale: 0.9 }}>
            <Button variant="contained" onClick={getAIRecommendation}>
              AI Recommendation
            </Button>
          </motion.div>
        </Stack>

        {/* LOADING */}
        {loadingAI && (
          <Typography sx={{ mt: 2 }}>
            Generating AI insights...
          </Typography>
        )}

        {/* AI TIPS */}
        {aiTips && (
          <Paper
            sx={{
              mt: 3,
              p: 2,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 3
            }}
          >
            <Typography variant="h6">AI Travel Guide</Typography>

            <Typography sx={{ mt: 1, whiteSpace: "pre-line" }}>
              {aiTips}
            </Typography>
          </Paper>
        )}

        {/* AI RECOMMENDATION */}
        {recommendation && (
          <Paper
            sx={{
              mt: 3,
              p: 2,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 3
            }}
          >
            <Typography variant="h6">
              AI Travel Recommendation
            </Typography>

            <Typography sx={{ mt: 1, whiteSpace: "pre-line" }}>
              {recommendation}
            </Typography>
          </Paper>
        )}

      </Paper>
    </motion.div>
  );
};

export default PlaceDetails;