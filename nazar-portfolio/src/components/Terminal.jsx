import React, {useState, useRef} from "react";
import '../styles/Terminal.css';

const validCommand = "npm run dev";
const errorMessages = [
    "Error: command not found",
    "npm ERR! missing script: run-dev",
    "SyntaxError: Unexpected identifier",
    "node: bad option: --dev",
    "npm WARN config global --global, --local are deprecated",
];

export default function Terminal({ onSuccess }) {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(input.trim() === validCommand) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                onSuccess();
            }, 1000);
        }else{
            setError(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
            setInput("");
            inputRef.current.focus();
        }
    };

    return (
        <div className="terminal-backdrop">
            {/* Logo or illustration */}
            <div className="terminal-window">
                <div className="terminal-bar">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                    <span className="terminal-title">nazarblanco@dev:~</span>
                </div>
                <div className="terminal-content">
                    <div className="terminal-prompt">To run the portfolio execute:</div>
                    <div className="terminal-command">
                        <span className="command-example"> {validCommand} </span>
                    </div>
                    <form onSubmit={handleSubmit} autoComplete="off">
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
                    {error && <div className="terminal-error"> {error} </div>}
                    {loading && <div className="terminal-loading">Runing portfolio...</div>}
                </div>
            </div>
        </div>
    );
}