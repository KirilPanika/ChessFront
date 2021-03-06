// MOVE FLAGS
// 'n' - a non-capture
// 'b' - a pawn push of two squares
// 'e' - an en passant capture
// 'c' - a standard capture
// 'p' - a promotion
// 'k' - kingside castling
// 'q' - queenside castling

import Chess from "chess.js"
import MoveService from "../services/move.service";

var chess,gameId;
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", 'c', 'd', 'e', 'f', 'g', 'h'];
var lastMove = null;


export default class MoveValidator {

    constructor(fen,id) {
        gameId = id;
        chess = new Chess(fen);
    }


    /**
     * Returns chess board object
     * @returns {*} chess.js objects
     */
    getChess() {
        if (chess) {
            return chess
        }
    }


    /**
     * Check if move that user is trying to make is valid
     * @param px from x coordinate
     * @param py from y coordinate
     * @param x to x coordinate
     * @param y to y coordinate
     * @param type piece type
     * @returns {boolean} True if valid, false if invalid move
     */
    isValidMove(px, py, x, y, type) {
        var move = chess.move(horizontalAxis[px] + verticalAxis[py] + horizontalAxis[x] + verticalAxis[y], {sloppy: true});

        if (move != null) {
             console.log(chess.ascii());
            // console.log(chess.fen());
            if (chess.game_over()) {
                console.log("GG");
            }
            lastMove = move;
            console.log(gameId);
            if(gameId)
            {
                MoveService.makeMove(gameId,chess.fen()).then(res =>
                {
                    console.log("MOVE");
                }).catch(error => {

                    console.error(error);
                });
            }

            return true
        }
        return false;
    }
}