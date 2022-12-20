export const networksSliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplaySpeed: 3000,
  autoplay: true,
  arrows: false,
  appendDots: dots => {
    return (
      <div>
        <ul>
          {dots.map((item, index) => {
            return (
              <li style={{ color: "red" }} key={index}>{item.props.children}</li>
            );
          })}
        </ul>
      </div>
    )
  },
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};
export const platformSliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplaySpeed: 3000,
  autoplay: true,
  arrows: false,
  appendDots: dots => {
    return (
      <div>
        <ul>
          {dots.map((item, index) => {
            return (
              <li style={{ color: "red" }} key={index}>{item.props.children}</li>
            );
          })}
        </ul>
      </div>
    )
  },
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const multiChainSliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplaySpeed: 3000,
  autoplay: true,
  arrows: false,
  appendDots: dots => {
    return (
      <div>
        <ul>
          {dots.map((item, index) => {
            return (
              <li style={{ color: "red" }} key={index}>{item.props.children}</li>
            );
          })}
        </ul>
      </div>
    )
  },
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};