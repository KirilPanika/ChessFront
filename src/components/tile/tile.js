import "./tile.css"
import React from "react";
import BishopBlackImg from "../../assets/bishop_black.png";

export default function Tile({number, image}) {
    console.log(image)

    if (number % 2 === 0) {
        return (
            <div className="tile black-tile">
                {image && <div style={{backgroundImage: `url(${image})`}} className="chess-piece"></div>}
            </div>
        );

    } else {

        return (
            <div className="tile white-tile">
                {image && <div style={{backgroundImage: `url(${image})`}} className="chess-piece"></div>}
            </div>
        );
    }
}