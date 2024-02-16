import React, { InputHTMLAttributes, useRef, useState } from 'react';
import { DisplayImageInfo } from './DisplayImageInfo';
import Modal from 'react-modal';

export interface ImageInterface {
    name: string;
    url: string;
    size: number;
    format: string;
    width: number;
    height: number;
    created_at: string;
    updated_at: string;
}

export const ImageInfo = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [imageData, setImageData] = useState<ImageInterface>();
    const refFile = useRef<HTMLInputElement>(null)

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if( event.target.files === null ) return;
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/images`, {
                method: 'POST',
                body: formData
            });
            setIsOpen(true)
            if (!response.ok) {
                setImageData(undefined);
                throw new Error('Error al obtener información de la imagen');
            }
            const data = await response.json();
            setImageData(data);
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    const updateFile = () => {
        if( refFile.current ) refFile.current.click()
    }

    return (
        <div>
            <span className='bg-gradient-to-bl from-blue-300 to-blue-500 text-white hover:from-blue-500 hover:to-blue-700 px-4 py-2 rounded-md flex flex-row gap-2'>
                <input ref={refFile} type="file" accept="image/*" onChange={handleImageUpload} className='hidden'/>
                <button onClick={updateFile}>Subir Archivo</button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
            </span>
            <Modal isOpen={isOpen} onRequestClose={()=>setIsOpen(false)} style={{
                content:{
                    width:'50%',
                    height: '50%',
                    margin: 'auto'
                }
            }}>
                <div className=''>
                    {!imageData && <p>Error al obtener información de la imagen</p>}
                    {imageData && <DisplayImageInfo imageData={imageData} />}
                </div>
            </Modal>
        </div>
    );
};
