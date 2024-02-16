import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { DisplayMovieData } from './DisplayMovieData';

export interface SeriesAndMoviesInterface {
    id: number;
    type: string;
    title: string;
    description: string;
    path: string;
    extension: string;
    date: string;
}

export const MarvelMoviesSeries = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [series, setSeries] = useState<SeriesAndMoviesInterface[]>([]);

    useEffect( () => {
        fetchMoviesAndSeries();
    }, []);

    const fetchMoviesAndSeries = async () => {
        const responseSeries = await fetch(`${import.meta.env.VITE_API_URL}/api/marvels/series`);
        const responseMovies = await fetch(`${import.meta.env.VITE_API_URL}/api/marvels/movies`);
        const series = await responseSeries.json();
        const movies = await responseMovies.json();

        setSeries([...series, ...movies]);
        console.log(series)
    };

    return (
        <div>
            <button onClick={() => setModalIsOpen(true)}>Obtener películas y series de Marvel</button>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2 className="text-2xl font-bold text-center mb-4">Películas y Series de Marvel</h2>
                <div className="flex flex-wrap justify-center items-start gap-4">
                    {
                        series.map( (item, index) => <DisplayMovieData key={index} movieData={item} /> )
                    }
                </div>
                <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded" onClick={() => setModalIsOpen(false)}>Cerrar</button>
            </Modal>

        </div>
    );
};

