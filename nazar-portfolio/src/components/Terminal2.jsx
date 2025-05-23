import { useState } from "react";

const Terminal2 = () => {
    const [lines, setLines] = useState(["Welcome to nazar.dev", "Type `help` to begin"]);
    const [input, setInput] = useState("");


    const handleInput = (e) => {
        if (e.key === "Enter") {
            processCommand(input);
            setInput("");
        }
    };

    const processCommand = (cmd) => {
        const newLines = [...lines, `$ ${cmd}`];

        switch(cmd.trim()){
            case "help":
                newLines.push("Available commands: about, skills, projects, contact");
                break;
            case "about":
                newLines.push("I'm a multimedia engineer passionate about interactive web experiences.");
                break;
            default:
                newLines.push(`Command not found: ${cmd}`);
        }

        setLines(newLines);
    };

    return (
        <div className="bg-gray-900 text-green-400 font-mono p-4 rounded-lg shadow-lg h-[80vh] overflow-y-auto">
            {lines.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap"> {line} </div>
            ))}
            <div className="flex">
                <span>$</span>
                <input 
                type="text" 
                value={input}
                onChange={(e) => {setInput(e.target.value)}}
                onKeyDown={handleInput}
                className="bg-transparent outline-none text-green-400 ml-2 flex-grow"
                autoFocus
                />
                <span className="animate-pulse">█</span>
            </div>
        </div>
    );
};


export default Terminal2;