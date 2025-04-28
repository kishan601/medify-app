import { Box, Typography } from "@mui/material";

export default function SpecialistCard({ img, title, designation }) {
    return (
        <Box textAlign='center' sx={{ height: '250px' }}> {/* Fixed height */}
            <Box
                component='img'
                src={img}
                sx={{ 
                    width: '100%',
                    height: '180px', // Fixed height for image
                    maxWidth: '180px', 
                    boxShadow: '0 10px 25px -10px rgba(0,0,0,0.09)', 
                    borderRadius: '180px 180px 4px 4px',
                    objectFit: 'cover'
                }}
                mb={1} // Reduced margin
            />
            <Typography
                fontSize={{ xs: 14, md: 16 }}
                fontWeight="bold"
                color='#1B3C74'
                sx={{ lineHeight: 1.2 }}
            >
                {title}
            </Typography>
            <Typography
                fontSize={{ xs: 12, md: 14 }}
                fontWeight={500}
                color='primary.main'
            >
                {designation}
            </Typography>
        </Box>
    )
}