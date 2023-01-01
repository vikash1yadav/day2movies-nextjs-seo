import React from "react";
import { useRouter } from "next/router";

// //import "./style.css";

export default function CustomSlide(props) {
  const { backdrop, title, overview, genres, id, original_title, original_name, ...otherprops } = props; 
  const router = useRouter();
  const checkTvOrMovieFromTitle = (original_title, original_name) => {
    if (original_title) {
      return "movie";
    } else if (original_name) {
      return "series";
    }
  };

  const reformatTitle = (title) => {
    return title.replace(/ /g, "-").toLowerCase();
  };
  const getCurrentUrl = `/${checkTvOrMovieFromTitle(original_title, original_name)}/${checkTvOrMovieFromTitle(original_title, original_name) == "movie" ? reformatTitle(original_title) : reformatTitle(original_name)}/${id}`;
  return (
    <div {...otherprops}>
      <div className="mx-1 mx-lg-1 mx-xl-2 cursor-pointer carousel-container"
        onClick={() => router.push(getCurrentUrl)}
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
