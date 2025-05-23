import { Typewriter } from 'react-simple-typewriter';
import '../styles/PortfolioBody.css';
import { motion } from "motion/react";

export default function PortfolioBody() {
    return (
        <motion.div
            initial={{ opacity: 0, transform: "translateY(-60px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className='portfolio-body'
        >
            <div className='title-block'> 
                <span className='greeting'>Hi, I'm</span>
                <motion.h1 
                    initial={{ opacity: 0, transform: "translateX(-60px)" }}
                    animate={{ opacity: 1, transform: "translateX(0px)" }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className='main-title'
                >
                    Nazar <span className='outlined'>Blanco</span>
                </motion.h1>
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
        </motion.div>
    );
}