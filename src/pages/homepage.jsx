import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { landingUrl } from "../server";
import axios from "axios";
import { useEffect, useState } from "react";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



export const Home = () => {
    const go = useNavigate()
    const [text, setText] = useState("");


    const getLanding = async () => {
        try {
            const { data } = await axios.get(`${landingUrl}/all`);
            console.log(data);
            setText(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getLanding()
    }, [])


    const settings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        arrows: false
    };


    return (
        <>
            <div className="Home">
                <section className="write-up">
                    <div>
                        <h2>Welcome to the Note Zone</h2>
                        <Slider {...settings} >
                            {
                                text && text.map((data) => ((
                                        <div key={data._id}>
                                            <h1>
                                                {data.topic}
                                            </h1>
                                            <p>
                                                {data.subtopic}
                                            </p>
                                        </div>
                                    )
                                ))
                            }
                        </Slider>
                    </div>

                    <motion.button
                        onClick={() => go("/register")}
                        className="btn-j"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            borderRadius: '5px',
                            border: 'none',
                            cursor: 'pointer',
                            background: 'red',
                            color: 'white',
                        }}
                    >
                        Join now
                    </motion.button>
                </section>


                <section className="home-images">
                    <img src="./images/note_1.jpg" alt="" />
                    <img src="./images/note_2.jpg" alt="" />
                    <img src="./images/note_3.jpg" alt="" />
                    <img src="./images/note_10.jpg" alt="" />
                </section>
            </div>


            <div className="home-content">
                <h1>Updates</h1>
                <section className="home-content-center">
                    <div className="det-cen">
                        <img src="./images/note_4.jpg" alt="" />
                        <p>
                            Lorem ipsum dolor sit amet consectetur,
                            adipisicing elit. Eveniet fugiat magnam cupiditate fugit qui
                        </p>
                    </div>
                    <div className="det-cen">
                        <img src="./images/note_6.webp" alt="" />
                        <p>
                            Lorem ipsum dolor sit amet consectetur,
                            adipisicing elit. Eveniet fugiat magnam cupiditate fugit qui
                        </p>
                    </div>
                    <div className="det-cen">
                        <img src="./images/note_7.webp" alt="" />
                        <p>
                            Lorem ipsum dolor sit amet consectetur,
                            adipisicing elit. Eveniet fugiat magnam cupiditate fugit qui
                        </p>
                    </div>
                    <div className="det-cen">
                        <img src="./images/note_8.jpg" alt="" />
                        <p>
                            Lorem ipsum dolor sit amet consectetur,
                            adipisicing elit. Eveniet fugiat magnam cupiditate fugit qui
                        </p>
                    </div>
                </section>
            </div>
        </>
    )
}