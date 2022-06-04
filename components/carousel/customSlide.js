import React from "react";
import { useRouter } from "next/router";

// //import "./style.css";

export default function CustomSlide(props) {
  const { backdrop, title, overview, genres, id, ...otherprops } = props;
  const router = useRouter();
  return (
    <div {...otherprops}>
      <div className="mx-1 mx-lg-1 mx-xl-2 cursor-pointer carousel-container"
        onClick={() => router.push(`/movie/${id}`)}
      >
        <div className="carousel-description">
          <h2>{title}</h2>
          {/* <h6>{genres.slice(0, 3).join(" . ")}</h6> */}
          <p>{overview}</p>
        </div>
        <div className="carousel-overlay"></div>
        <div className="carousel-img">
          <img
            src={`https://image.tmdb.org/t/p/w1280${backdrop}`}
            alt=""
            className="d-inline"
            // loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
