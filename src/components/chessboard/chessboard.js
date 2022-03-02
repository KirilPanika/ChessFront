import React from "react";
import Tile from "../tile/tile"
import {useSpring, animated} from '@react-spring/web'
import {useDrag} from '@use-gesture/react'
import './chessboard.css'
import BishopBlackImg from "../../assets/bishop_black.png";
import BishopWhiteImg from "../../assets/bishop_white.png";
import PawnBlackImg from "../../assets/pawn_black.png";
import PawnWhiteImg from "../../assets/pawn_white.png";
import KingBlackImg from "../../assets/king_black.png";
import KingWhiteImg from "../../assets/king_white.png";
import QueenBlackImg from "../../assets/queen_black.png";
import QueenWhiteImg from "../../assets/queen_white.png";
import RookWhiteImg from "../../assets/rook_white.png";
import RookBlackImg from "../../assets/rook_black.png";
import KnightBlackImg from "../../assets/knight_black.png";
import KnightWhiteImg from "../../assets/knight_white.png";

let activePiece: HTMLElement | null = null;

function grabPiece(e: React.MouseEvent)
{
    const element = e.target;

    if (element.classList.contains("chess-piece")) {
        console.log(e.target)
        const x = e.clientX - 50;
        const y = e.clientY - 50;
        element.style.position = "absolute";
        element.style.left = `${x}px`
        element.style.top = `${y}px`
        activePiece = element;
    }
    e.stopPropagation();

}

function movePiece(e: React.MouseEvent) {
    const element = e.target;
    if (activePiece) {

        const x = e.clientX - 50;
        const y = e.clientY - 50;
        activePiece.style.position = "absolute";
        activePiece.style.left = `${x}px`
        activePiece.style.top = `${y}px`
    }
    e.stopPropagation();
}

function dropPiece(e: React.MouseEvent) {
    const element = e.target;
    if (activePiece) {
        activePiece = null;
    }
    e.stopPropagation();
}

const pieces: Piece[] = [];

pieces.push({x: 2, y: 0, image: BishopWhiteImg})
pieces.push({x: 5, y: 0, image: BishopWhiteImg})
pieces.push({x: 2, y: 7, image: BishopBlackImg})
pieces.push({x: 5, y: 7, image: BishopBlackImg})

pieces.push({x: 0, y: 0, image: RookWhiteImg})
pieces.push({x: 7, y: 0, image: RookWhiteImg})
pieces.push({x: 7, y: 7, image: RookBlackImg})
pieces.push({x: 0, y: 7, image: RookBlackImg})

pieces.push({x: 1, y: 0, image: KnightWhiteImg})
pieces.push({x: 6, y: 0, image: KnightWhiteImg})
pieces.push({x: 1, y: 7, image: KnightBlackImg})
pieces.push({x: 6, y: 7, image: KnightBlackImg})

pieces.push({x: 4, y: 0, image: QueenWhiteImg})
pieces.push({x: 3, y: 7, image: QueenBlackImg})

pieces.push({x: 3, y: 0, image: KingWhiteImg})
pieces.push({x: 4, y: 7, image: KingBlackImg})


for (let i = 0; i < 8; i++) {
    pieces.push({x: i, y: 6, image: PawnBlackImg})
    pieces.push({x: i, y: 1, image: PawnWhiteImg})
}

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", 'c', 'd', 'e', 'f', 'g', 'h'];


export default function Chessboard() {
    let board = [];
    for (let i = verticalAxis.length - 1; i >= 0; i--) {
        for (let j = 0; j < horizontalAxis.length; j++) {
            var number = j + i;
            let img = undefined;

            pieces.forEach((piece) => {

                if ((piece.x === j && piece.y === i)) {
                    img = piece.image;

                }
            })
            board.push(<Tile number={number} image={img} key={`${i},${j}`}/>)
        }
    }


    // addEventListener("touchmove", drag, false);

    return <div
        onMouseDown={e => grabPiece(e)}
        onMouseUp={e => dropPiece(e)}
        onMouseMove={e => movePiece(e)}
        // onTouchStart={e => grabPiece(e)}
        // onTouchEnd={e => dropPiece(e)}
        // onTouchMove={e => movePiece(e)}
        id="chessboard">{board}</div>
}