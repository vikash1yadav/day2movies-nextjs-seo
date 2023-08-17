// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
// import { useRouter } from "next/router";
import CAROUSEL from "./carousel"

function Slider(result) {
  // const router = useRouter();
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const poster = result.results;
  const post = poster.slice(0, 5);
  // console.log("post", post);
  // resource={carousel} genres={genres}
  return (
    <section className="relative mt-1 shadow-2xl max-w-screen-2xl mx-auto">
      <div />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        {post.map((item) => (
          <div
            className="sliderImg"
            onClick={() => router.push(`/movie/${item.id}`)}
          >
            <img
              loading="lazy"
              src={`${BASE_URL}${item.backdrop_path}`}
              // {`https://image.tmdb.org/t/p/w780/${poster[0].poster_path}`}
              alt=""
            />
            <div className="absolute h-[50%] inset-y-28 md:inset-y-auto md:bottom-10 inset-x-4 md:inset-x-12 space-y-6 z-50">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold pointer">
                {item.title || item.original_name}
              </h1>
              <p className="whitespace-normal text-ellipsis overflow-hidden ...">{item.overview}</p>
            </div>
          </div>
        ))}
      </Carousel>
      
    </section>
    // <CAROUSEL resource={result} />
  );
}

export default Slider;
