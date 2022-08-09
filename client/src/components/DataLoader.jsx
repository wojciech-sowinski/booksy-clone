import { BallTriangle } from 'react-loader-spinner'
import '../styles/DataLoader.scss'

const DataLoader = ({ text }) => {
    return (
        <div className='data-loader'>
            <BallTriangle
                color="#e79c6a" height={60} width={60}

            />
            <span>{text}</span>
        </div>
    );
}

export default DataLoader;