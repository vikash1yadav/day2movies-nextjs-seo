import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

function ListItem({ result }) {
    const BASE_URL = "https://image.tmdb.org/t/p/original/";
    const router = useRouter();

    return (
        <Link href={`/movie/${result.id}`}>
        <div
            className="flex min-w-[250px] min-h-[170px] md:min-w-[330px] md:min-h-[210px] rounded-lg overflow-hidden shadow-xl cursor-pointer border-[3px] border-[#f9f9f9] border-opacity-10  hover:border-opacity-80 hover:shadow-2xl transform hover:scale-105 transition duration-300"
            // onClick={() => router.push(`/movie/${result.id}`)}
        >
            <Image
                src={
                    `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
                    `${BASE_URL}${result.poster_path}`
                }
                width={330}
                height={210}
                objectFit="cover"
                className="rounded-lg"
            />
            <div className="absolute inset-y-32 lg:inset-y-40 md:bottom-1 background-blur inset-x-4 md:inset-x-12 space-y-6 z-50">
                <h1 className="text-xl sm:text-xl md:text-xl font-bold">
                    {/* md:inset-y-1 */}
                    {result.title || result.original_name}
                </h1>
                <p style={{ display: 'none' }}>{result.overview}</p>
            </div>
            </div>
        </Link>
    );
}

export default ListItem;
