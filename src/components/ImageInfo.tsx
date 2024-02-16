import React, { useState } from 'react';
import { DisplayImageInfo } from './DisplayImageInfo';

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
    const [imageData, setImageData] = useState<ImageInterface>();

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if( event.target.files === null ) return;
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/images', {
                method: 'POST',
                body: formData
            });

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
    };

    return (
        <div>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {!imageData && <p>Error al obtener información de la imagen</p>}
          {imageData && <DisplayImageInfo imageData={imageData} />}
        </div>
    );
};
