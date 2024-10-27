import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import MemoryMatch from "./components/memorymatch.js";
import JigsawPuzzleGame from "./components/Jigsaw.js";

function MemoryGame() {
    return (
        <div>
         <Routes>
              <Route path="/" element={<>
                        <div className="mem1">
                    <Link to="/memory-game/memory-match" style={{textDecoration:'none'}}>
                    <div className="text-game">Memory Match</div>
                    </Link>
                    </div>
                    <div className="mem2">
                    <Link to="/memory-game/jigsaw" style={{textDecoration:'none'}}>
                    <div className="text-game">Jigsaw</div>
                    </Link>
                    </div>
                   </>
                } />
                <Route path="/memory-match" element={<MemoryMatch />} />
                <Route path="/jigsaw" element={<JigsawPuzzleGame />} />
         </Routes>
        </div>
    );
}

export default MemoryGame;
