import { ImageInterface } from "./ImageInfo"

export const DisplayImageInfo: React.FC<{ imageData: ImageInterface }> = ({ imageData }) => {
    
    return (
        <div>
            <h2>Información de la imagen:</h2>
            <p>Nombre: {imageData.name}</p>
            <p>Tamaño: {imageData.size} bytes</p>
            <p>Formato: {imageData.format}</p>
            <p>Dimensiones: {imageData.width}x{imageData.height}</p>
        </div>
    )
}