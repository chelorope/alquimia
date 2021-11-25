import { createSlice } from "@reduxjs/toolkit";

type MousePosition = { x: number; y: number; down: boolean };
type ElementPosition = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export interface State {
  mousePosition: MousePosition;
  canvasPosition: ElementPosition;
  squareInitialPositions: ElementPosition[];
  squareTranslatedPositions: ElementPosition[][];
  translation: {
    square: [number, number];
    initialX: number;
    initialY: number;
  };
}

const initialState: State = {
  mousePosition: { x: 0, y: 0, down: false },
  canvasPosition: { top: 0, bottom: 0, right: 0, left: 0 },
  squareInitialPositions: [],
  squareTranslatedPositions: [],
  translation: {
    square: [-1, -1],
    initialX: 0,
    initialY: 0,
  },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMouseDown: (state, action) => {
      if (action.payload[1] === undefined) {
        const initialSquare = action.payload[0];
        state.squareTranslatedPositions[initialSquare].push(
          state.squareInitialPositions[initialSquare]
        );
        state.translation.square = [
          initialSquare,
          state.squareTranslatedPositions[initialSquare].length - 1,
        ];
      } else {
        state.translation.square = action.payload;
      }

      const selectedSquare = state.translation.square;
      if (selectedSquare[0] !== -1 && selectedSquare[1] !== -1) {
        const translatedPosition =
          state.squareTranslatedPositions[selectedSquare[0]][selectedSquare[1]];
        const initialPosition = state.squareInitialPositions[selectedSquare[0]];
        state.translation = {
          ...state.translation,
          initialX:
            state.mousePosition.x +
            translatedPosition.top -
            initialPosition.top,
          initialY:
            state.mousePosition.x +
            translatedPosition.left -
            initialPosition.left,
        };
      }
    },
    setMouseUp: (state, action) => {
      const { square } = state.translation;
      if (square[0] !== -1 && square[1] !== -1) {
        const translatedPositions =
          state.squareTranslatedPositions[square[0]][square[1]];

        if (
          translatedPositions.top < state.canvasPosition.top ||
          translatedPositions.left < state.canvasPosition.left ||
          translatedPositions.right > state.canvasPosition.right ||
          translatedPositions.bottom > state.canvasPosition.bottom
        ) {
          state.squareTranslatedPositions[square[0]].splice(square[1], 1);
        }

        state.translation = {
          square: [-1, -1],
          initialX: 0,
          initialY: 0,
        };
      }
    },
    setMousePosition: (state, action) => {
      state.mousePosition = { ...state.mousePosition, ...action.payload };
      const { square } = state.translation;
      if (square[0] !== -1 && square[1] !== -1) {
        state.squareTranslatedPositions[square[0]][square[1]] = {
          top:
            state.squareInitialPositions[square[0]].top +
            state.mousePosition.y -
            state.translation.initialY,
          right:
            state.squareInitialPositions[square[0]].right +
            state.mousePosition.x -
            state.translation.initialX,
          bottom:
            state.squareInitialPositions[square[0]].bottom +
            state.mousePosition.y -
            state.translation.initialY,
          left:
            state.squareInitialPositions[square[0]].left +
            state.mousePosition.x -
            state.translation.initialX,
        };
      }
    },
    setCanvasPosition: (state, action) => {
      state.canvasPosition = action.payload;
    },
    setSquareInitialPosition: (state, action) => {
      state.squareInitialPositions[action.payload.id] = action.payload.position;
      state.squareTranslatedPositions[action.payload.id] = [];
    },
  },
});

export const {
  setMouseDown,
  setMouseUp,
  setMousePosition,
  setCanvasPosition,
  setSquareInitialPosition,
} = globalSlice.actions;

export default globalSlice.reducer;
