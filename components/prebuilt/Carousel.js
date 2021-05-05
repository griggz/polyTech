import React from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";

// Css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel({ children }) {
  var settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
  };
  return <Slider {...settings}>{children}</Slider>;
}

Carousel.propTypes = {
  children: PropTypes.array.isRequired,
};
