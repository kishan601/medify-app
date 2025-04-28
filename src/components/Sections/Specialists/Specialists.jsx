// Specialists.jsx with direct height limitation
import { Box, Typography, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import img1 from '../../../assets/lesley.png'
import img2 from '../../../assets/ahmad.png'
import img3 from '../../../assets/heena.png'
import img4 from '../../../assets/ankur.png'
import img5 from '../../../assets/ahmad-stevens.png'
import SpecialistCard from './SpecialistCard'

export default function Specialists() {
    const specialist_data = [
        { img: img1, title: 'Dr. Lesley Hull', designation: 'Medicine' },
        { img: img2, title: 'Dr. Ahmad Khan', designation: 'Neurologist' },
        { img: img3, title: 'Dr. Heena Sachdeva', designation: 'Orthopadics' },
        { img: img4, title: 'Dr. Ankur Sharma', designation: 'Medicine' },
        { img: img5, title: 'Dr. Ahmad Stevens', designation: 'Neurologist' },
    ];

    return (
        <Box 
            py={2} 
            id="find-doctors" 
            sx={{ 
                height: '400px', // Force specific height
                overflow: 'hidden' // Prevent content overflow
            }}
        >
            <Typography 
                variant="h4" 
                component="h2" 
                textAlign='center' 
                mb={2} // Reduced bottom margin
            >
                Our Medical Specialist
            </Typography>
            
            <Swiper
                slidesPerView={2}
                spaceBetween={20}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination]}
                pagination={{
                    clickable: true,
                }}
                style={{
                    paddingBottom: '30px', // Space for pagination
                    height: '300px', // Fixed height for swiper
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 3,
                    },
                    768: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                }}
            >
                {specialist_data.map((doc, index) => (
                    <SwiperSlide key={index}>
                        <SpecialistCard
                            img={doc.img}
                            title={doc.title}
                            designation={doc.designation} 
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    )
}