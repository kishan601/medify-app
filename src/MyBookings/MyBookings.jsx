import { Box, Typography, Container, Stack, Button, Chip, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import HospitalCard from "../components/HospitalCard/HospitalCard";
import { useEffect, useState } from "react";
import cta from "../assets/cta.png";
import SearchBar from "../components/SearchBar/SearchBar";
import NavBar from "../components/NavBar/NavBar";
import { format } from "date-fns";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

  useEffect(() => {
    const localBookings = localStorage.getItem("bookings") || "[]";
    setBookings(JSON.parse(localBookings));
  }, []);

  useEffect(() => {
    filterBookings(selectedFilter);
  }, [bookings, selectedFilter]);

  const filterBookings = (filter) => {
    let filtered = [...bookings];
    
    if (filter === "upcoming") {
      const today = new Date();
      filtered = filtered.filter(booking => {
        if (!booking.bookingDate) return false;
        const bookingDate = new Date(booking.bookingDate);
        return bookingDate >= today;
      });
    } else if (filter === "past") {
      const today = new Date();
      filtered = filtered.filter(booking => {
        if (!booking.bookingDate) return false;
        const bookingDate = new Date(booking.bookingDate);
        return bookingDate < today;
      });
    }
    
    setFilteredBookings(filtered);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const openCancelDialog = (booking) => {
    setBookingToCancel(booking);
    setConfirmDialog(true);
  };

  const handleCancelBooking = () => {
    if (bookingToCancel) {
      const updatedBookings = bookings.filter(
        booking => booking["Hospital Name"] !== bookingToCancel["Hospital Name"]
      );
      
      setBookings(updatedBookings);
      localStorage.setItem("bookings", JSON.stringify(updatedBookings));
      setConfirmDialog(false);
      setBookingToCancel(null);
    }
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{ background: "linear-gradient(#EFF5FE, rgba(241,247,255,0.47))" }}
      >
        <Box
          mb="50px"
          pt={{ xs: 3, md: 1 }}
          sx={{
            position: "relative",
            background: "linear-gradient(90deg, #2AA7FF, #0C8CE5)",
            borderBottomLeftRadius: "1rem",
            borderBottomRightRadius: "1rem",
          }}
        >
          <Container maxWidth="xl" sx={{ px: { xs: 0, md: 5 } }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 0, md: 12 }}
              alignItems={{ xs: "center", md: "flex-end" }}
            >
              <Typography
                component="h1"
                pb={1}
                fontSize={{ xs: 32, md: 40 }}
                fontWeight={700}
                color="#fff"
              >
                My Bookings
              </Typography>
              <Box
                bgcolor="#fff"
                p={3}
                flexGrow={1}
                borderRadius={2}
                boxShadow="0 0 10px rgba(0,0,0,0.1)"
                sx={{ translate: "0 50px" }}
                width={{ xs: 1, md: "auto" }}
              >
                <SearchBar list={bookings} filterList={setFilteredBookings} />
              </Box>
            </Stack>
          </Container>
        </Box>

        <Container maxWidth="xl" sx={{ pt: 8, pb: 10, px: { xs: 0, md: 4 } }}>
          {/* Filter chips */}
          <Stack direction="row" spacing={2} mb={4}>
            <Chip 
              label="All Bookings" 
              color={selectedFilter === "all" ? "primary" : "default"}
              onClick={() => handleFilterChange("all")}
              sx={{ fontWeight: 500 }}
            />
            <Chip 
              label="Upcoming" 
              color={selectedFilter === "upcoming" ? "primary" : "default"}
              onClick={() => handleFilterChange("upcoming")}
              sx={{ fontWeight: 500 }}
            />
            <Chip 
              label="Past" 
              color={selectedFilter === "past" ? "primary" : "default"}
              onClick={() => handleFilterChange("past")}
              sx={{ fontWeight: 500 }}
            />
          </Stack>
          
          <Stack alignItems="flex-start" direction={{ md: "row" }}>
            <Stack
              mb={{ xs: 4, md: 0 }}
              spacing={3}
              width={{ xs: 1, md: "calc(100% - 384px)" }}
              mr="24px"
            >
              {filteredBookings.length > 0 &&
                filteredBookings.map((hospital) => (
                  <Box key={hospital["Hospital Name"]}>
                    <HospitalCard
                      details={hospital}
                      booking={true}
                    />
                    <Stack direction="row" spacing={2} mt={2} justifyContent="flex-end">
                      {hospital.bookingDate && (
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Booked for: {format(new Date(hospital.bookingDate), "dd MMM yyyy")}
                            {hospital.timeSlot && ` at ${hospital.timeSlot}`}
                          </Typography>
                        </Box>
                      )}
                      <Button 
                        variant="outlined" 
                        color="error"
                        onClick={() => openCancelDialog(hospital)}
                      >
                        Cancel Booking
                      </Button>
                    </Stack>
                  </Box>
                ))}

              {filteredBookings.length === 0 && (
                <Typography variant="h3" bgcolor="#fff" p={3} borderRadius={2}>
                  No Bookings Found!
                </Typography>
              )}
            </Stack>

            <img src={cta} width={360} height="auto" alt="Medical assistance" />
          </Stack>
        </Container>
      </Box>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
        <DialogTitle>Cancel Booking</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel your booking at {bookingToCancel?.["Hospital Name"]}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog(false)}>Keep Booking</Button>
          <Button onClick={handleCancelBooking} color="error" variant="contained">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}