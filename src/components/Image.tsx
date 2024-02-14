import React, { useState } from 'react';

interface ImageInterface {
    name: string;
    url: string;
    size: number;
    format: string;
    width: number;
    height: number;
    created_at: string;
    updated_at: string;
}

export const ImageInfoComponent = () => {
  const [imageData, setImageData] = useState<ImageInterface>();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if( event.target.files === null ) return;
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    console.log(formData)

    try {
      const response = await fetch('http://127.0.0.1:8000/api/images', {
        method: 'POST',
        body: formData
      });
      console.log(response)
      if (!response.ok) {
        console.log('error')
        throw new Error('Error al obtener información de la imagen');
      }

      const data = await response.json();
      setImageData(data);
      console.log('fin')
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {!imageData && <p>Error al obtener información de la imagen</p>}
      {imageData && (
        <div>
          <h2>Información de la imagen:</h2>
          <p>Nombre: {imageData.name}</p>
          <p>Tamaño: {imageData.size} bytes</p>
          <p>Formato: {imageData.format}</p>
          <p>Dimensiones: {imageData.width}x{imageData.height}</p>
        </div>
      )}
    </div>
  );
};
