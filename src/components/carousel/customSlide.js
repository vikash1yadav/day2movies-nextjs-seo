import React from "react";
import { useRouter } from "next/navigation";
import Const from "../../helper/constant";
import slugify from "../../../utils/slugify";

export default function CustomSlide(props) {
  const { backdrop, title, overview, genres, id, original_title, original_name, ...otherprops } = props; 
  const IMG_URL = `${Const.TMDB.IMAGE_BASE_URL}/${Const.SLIDER_IMG_SIZE}${backdrop}`
  const router = useRouter();
  const checkTvOrMovieFromTitle = (original_title, original_name) => {
    if (original_title) {
      return "movie";
    } else if (original_name) {
      return "series";
    }
  };
  const reformatTitle = (title) => {
    return slugify(title) ||title.replace(/ /g, "-").toLowerCase();
  };
  const getCurrentUrl = `/${checkTvOrMovieFromTitle(original_title, original_name)}/${checkTvOrMovieFromTitle(original_title, original_name) == "movie" ? reformatTitle(title) : reformatTitle(props?.name)}/${id}`;
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
            src={IMG_URL}
            title={title||"day2movies"}
            alt={Const.ATTRIBUTES.IMG}
            className="d-inline"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
