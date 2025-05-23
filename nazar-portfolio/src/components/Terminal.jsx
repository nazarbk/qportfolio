import React, {useState, useRef, useEffect} from "react";
import '../styles/Terminal.css';
import { motion } from "motion/react";
import { Typewriter } from "react-simple-typewriter";
//import { motion } from 'framer-motion';

const validCommand = "npm run dev";
const errorMessages = [
    "Error: command not found",
    "npm ERR! missing script: run-dev",
    "SyntaxError: Unexpected identifier",
    "node: bad option: --dev",
    "npm WARN config global --global, --local are deprecated",
];

const commandResponses = {
    help: (
        <div>
            <div>Available commands:</div>
            <div>- <b>npm run dev</b> : Start the portfolio</div>
            <div>- <b>help</b> : Show this help</div>
            <div>- <b>about</b> : Who is Nazar Blanco</div>
            <div>- <b>cv</b> : View my resume</div>
            <div>- <b>clear</b> : Clear the terminal</div>
            <div>- <b>contact</b> : My contact information</div>
        </div>
    ),
    about: (
        <>I'm Nazar Blanco, a multimedia engineer and web developer passionate about creativity, interactivity, and currently developing skills on quantum computing.</>
    ),
    cv: (
        <a>View my resume</a>
    ),
    contact: (
        <>You can contact me at: <a href="mailto:nazarblanco@gmail.com">nazarblanco@gmail.com</a></>
    )
}

const sequence = [
    {text: "Compiling...", color: "#A1A6B4"},
    {text: "Optimizing...", color: "#A1A6B4"},
    {text: "All systems operational!", color: "#55e4a6"}
];

export default function Terminal({ onSuccess }) {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [showSequence, setShowSequence] = useState(false);
    const [sequenceStep, setSequenceStep] = useState(0);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const historyRef = useRef(null);

    useEffect(() => {
        if (historyRef.current) {
            historyRef.current.scrollTop = historyRef.current.scrollHeight;
        }
    }, [history]);

    useEffect(() => {
        if(showSequence && sequenceStep < sequence.length) {
            const delay = sequence[sequenceStep].text.length * 38 + 550;
            const timeout = setTimeout(() => {
                setSequenceStep(prev => prev + 1);
            }, delay);
            return () => clearTimeout(timeout);
        }
        if(showSequence && sequenceStep === sequence.length) {
            setTimeout(() => {
                onSuccess();
            }, 800);
        }
    }, [showSequence, sequenceStep, onSuccess]);

    function handleSubmit (e) {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();

        if(cmd === validCommand) {
            setHistory([...history, {command: input, response: <span style={{color: '#55e4a6'}}>Running portfolio...</span> }]);
            setInput('');
            setError('');
            setTimeout(() => {
                setShowSequence(true);
                setSequenceStep(0);
            }, 700);
        }else if (cmd === 'clear') {
            setHistory([]);
            setInput('');
            setError('');
        }else if (commandResponses[cmd]) {
            setHistory([...history, {command: input, response: commandResponses[cmd] }]);
            setInput('');
            setError('');
        }else if (cmd) {
            const randomError = errorMessages[Math.floor(Math.random() * errorMessages.length)];
            setError(randomError);
            setHistory([...history, {command: input, response: <span style={{color: '#F67280'}}>{randomError}</span> }]);
            setInput('');
            inputRef.current && inputRef.current.focus();
        }
    };

    return (
            <motion.div 
                initial={{ opacity: 0, transform: "translateY(200px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="terminal-backdrop"
            >
                {/* Logo or illustration */}
                <div className="terminal-window">
                    <div className="terminal-bar">
                        <span className="dot red"></span>
                        <span className="dot yellow"></span>
                        <span className="dot green"></span>
                        <span className="terminal-title">nazarblanco@dev:~</span>
                    </div>
                    <div className="terminal-content">
                        <div className="terminal-prompt">
                            To run the portfolio execute: <span className="command-example">npm run dev</span>
                        </div>
                        <div className="terminal-tip">
                            💡 Type <b>help</b> to see a list of available commands.
                        </div>

                        <div className="terminal-history" ref={historyRef}>
                            {history.map((item, i) => (
                                <div key={i} className="history-item">
                                    <div>
                                        <span className="prompt">&gt; </span>
                                        <span className="entered-command">{item.command}</span>
                                    </div>
                                    <div className="history-response">{item.response}</div>
                                </div>
                            ))}
                            {showSequence && 
                                sequence.map((line, idx) =>
                                    idx <= sequenceStep ? (
                                        <div
                                            key={idx}
                                            style={{color: line.color}}>
                                            {idx === sequenceStep ?
                                                <Typewriter 
                                                    words={[line.text]}
                                                    loop={1}
                                                    cursor={false}
                                                    typeSpeed={40}
                                                    deleteSpeed={45}
                                                    delaySpeed={1000}
                                                /> :
                                                line.text
                                            }
                                        </div>
                                    ) : null
                                )
                            }
                        </div>

                        <form onSubmit={handleSubmit} autoComplete="off" style={{marginTop: '1.1em'}}>
                            <span className="prompt">&gt; </span>
                            <input
                                ref={inputRef}
                                className={`terminal-input${error ? " error" : ""}`}
                                type="text"
                                value={input}
                                onChange={e => {
                                    setInput(e.target.value);
                                    setError("");
                                }}
                                autoFocus
                                disabled={loading}
                                spellCheck={false}
                            />
                        </form>
                    </div>
                </div>
            </motion.div>
    );
}