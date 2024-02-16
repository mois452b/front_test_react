import { useEffect, useState } from "react";
import Modal from 'react-modal';
import { SeriesAndMoviesInterface } from "./MarvelMoviesSeries"
import { DisplayMovieData } from './DisplayMovieData';
import { SelectInput } from "./SelectInput";

export const MarvelModal = ({ isOpen, setModalIsOpen, series }: { isOpen: boolean, setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>, series: SeriesAndMoviesInterface[] }) => {
    const [filterType, setFilterType] = useState<string>('all');
    const [filterDate, setFilterDate] = useState<string>('all');
    const [datas, setDatas] = useState(series);

    useEffect(()=>{
        setDatas(series)
    },[series])

    useEffect(() => {
        const filteredSeries = series.filter( serie => {
            return (
                ( filterType === 'all' || serie.type === filterType) && 
                ( filterDate === 'all' || serie.date == filterDate)
            )
        });
        setDatas(filteredSeries);

    }, [filterType, filterDate]);

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>, type: string) => {
        if (type === 'type') setFilterType(event.target.value);
        else if (type === 'date') setFilterDate(event.target.value);
    };

    const handleSort = (typeSort: string) => {
        const sortedSeries = [...datas];
        if (typeSort === 'name') {
            sortedSeries.sort((a, b) => a.title.localeCompare(b.title));
        } 
        else if (typeSort === 'date') {
            sortedSeries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        }
        setDatas( sortedSeries );
    };

    //fechas desde el 2022 hasta el 2000
    const years = ['all', ...Array(2022-2000 + 2).fill(1).map( (_, index) => (2000+index).toString()).sort(()=>-1)]

    return (
        <Modal isOpen={isOpen} onRequestClose={() => setModalIsOpen(false)}>
            <h2 className="text-2xl font-bold text-center mb-4">Películas y Series de Marvel</h2>
            <div className="flex justify-between mb-4">
                <SelectInput name={'filterType'} label={'Filtrar por tipo'} options={['all', 'movie', 'series']} value={filterType} onChange={(event) => handleFilterChange(event, 'type')} />
                <SelectInput name={'filterDate'} label={'Filtrar por fecha'} options={years} value={filterDate} onChange={(event) => handleFilterChange(event, 'date')} />
            </div>
            <div className="flex justify-between mb-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleSort('name')}>Ordenar por nombre</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleSort('date')}>Ordenar por fecha</button>
            </div>
            <div className="flex flex-wrap justify-center items-start gap-4">
                {datas.map((item, index) => (
                    <DisplayMovieData key={index} movieData={item} />
                ))}
            </div>
            <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded" onClick={() => setModalIsOpen(false)}>Cerrar</button>
        </Modal>
    )
}