'use client'
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
// import { useRouter } from "next/router";
import CAROUSEL from "./carousel"
import "../../public/css/slider.css"
import "../../public/css/slick.min.css";
function Slider(result) {
  // const router = useRouter();
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const poster = result?.results;
  const post = poster?.slice(0, 5);
  // console.log("post", post);
  // resource={carousel} genres={genres}
  return (
    <CAROUSEL resource={result} />
  );
}

export default Slider;
