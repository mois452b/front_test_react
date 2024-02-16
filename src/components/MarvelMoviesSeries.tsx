import React, { useEffect, useState } from 'react';
import { MarvelModal } from './MarvelModal';

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

    useEffect(() => {
        fetchMoviesAndSeries();
    }, []);

    const fetchMoviesAndSeries = async () => {
        const responseSeries = await fetch('http://127.0.0.1:8000/api/marvels/series');
        const responseMovies = await fetch('http://127.0.0.1:8000/api/marvels/movies');
        const seriesData = await responseSeries.json();
        const moviesData = await responseMovies.json();

        setSeries([...seriesData, ...moviesData]);
    };

    return (
        <div>
            <button onClick={() => setModalIsOpen(true)}>Obtener películas y series de Marvel</button>
            <MarvelModal isOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} series={series} />
        </div>
    );
};
