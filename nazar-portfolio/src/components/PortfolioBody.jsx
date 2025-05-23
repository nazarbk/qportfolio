import { Typewriter } from 'react-simple-typewriter';
import '../styles/PortfolioBody.css';

export default function PortfolioBody() {
    return (
        <div className='portfolio-body'>
            <div className='title-block'> 
                <span className='greeting'>Hi, I'm</span>
                <h1 className='main-title'>
                    Nazar <span className='outlined'>Blanco</span>
                </h1>
                <span className='and-im'>
                    and I'm{' '}
                    <span className='typing-title'>
                        <Typewriter 
                        words={[
                            'Multimedia Engineer',
                            'Fullstack Developer',
                            'Quantum Computing Engineer',
                            'Software Developer'
                        ]}
                        loop={0}
                        cursor
                        cursorStyle="|"
                        typeSpeed={65}
                        deleteSpeed={45}
                        delaySpeed={1200}
                        />
                    </span>
                </span>
            </div>
        </div>
    )
}