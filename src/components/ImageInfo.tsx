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
            <span>
                <input ref={refFile} type="file" accept="image/*" onChange={handleImageUpload} className='hidden'/>
                <button onClick={updateFile}>Subir Archivo</button>
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
