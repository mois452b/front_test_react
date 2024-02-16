import { SeriesAndMoviesInterface } from "./MarvelMoviesSeries";

export const DisplayMovieData: React.FC<{ movieData: SeriesAndMoviesInterface }> = ({ movieData }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-4 w-64">
            <div className="flex justify-center">
                {movieData.path && (
                    <img src={movieData.path+'.'+movieData.extension} alt={movieData.title} className="h-32 w-auto object-cover mb-4" />
                )}
            </div>
            <h3 className="text-lg font-semibold mb-2">{movieData.title}</h3>
            {/* <p className="text-sm text-gray-700">{movieData.description}</p> */}
        </div>
    )
}