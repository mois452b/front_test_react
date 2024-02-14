import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

export const MarvelMoviesSeries = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [series, setSeries] = useState([]);

    useEffect( () => {
        fetchMoviesAndSeries();
    }, []);

    const fetchMoviesAndSeries = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/marvels');
            const data = await response.json();
            setSeries(data);
            console.log(data);
        } catch (error) {
            console.error('Error al obtener las series:', error);
        }
    };

    return (
        <div>
            <button onClick={() => setModalIsOpen(true)}>Obtener películas y series de Marvel</button>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2 className="text-2xl font-bold text-center mb-4">Películas y Series de Marvel</h2>
                <div className="flex flex-wrap justify-center items-start gap-4">
                    {series.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-4 w-64">
                            <div className="flex justify-center">
                                {item.thumbnail.path && (
                                    <img src={item.thumbnail.path+'.'+item.thumbnail.extension} alt={item.title} className="h-32 w-auto object-cover mb-4" />
                                )}
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            {/* <p className="text-sm text-gray-700">{item.description}</p> */}
                        </div>
                    ))}
                </div>
                <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded" onClick={() => setModalIsOpen(false)}>Cerrar</button>
            </Modal>

        </div>
    );
};

