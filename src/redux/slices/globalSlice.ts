import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  squareTranslatedPositions: ElementPosition[];
  translation: { square: number; initialX: number; initialY: number };
}

const initialState: State = {
  mousePosition: { x: 0, y: 0, down: false },
  canvasPosition: { top: 0, bottom: 0, right: 0, left: 0 },
  squareInitialPositions: [],
  squareTranslatedPositions: [],
  translation: { square: -1, initialX: 0, initialY: 0 },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMousePosition: (state, action) => {
      const hasPressed =
        action.payload.down === true && !state.mousePosition.down;
      const hasReleased =
        action.payload.down === false && state.mousePosition.down;
      state.mousePosition = { ...state.mousePosition, ...action.payload };

      if (hasPressed) {
        state.translation.square = state.squareTranslatedPositions.findIndex(
          (square) => isInSquare(state.mousePosition, square)
        );
      }
      const translatedSquareInitialPosition =
        state.squareInitialPositions[state.translation.square];
      if (state.translation.square !== -1) {
        state.squareTranslatedPositions[state.translation.square] = {
          top:
            translatedSquareInitialPosition.top +
            (state.mousePosition.y - state.translation.initialY),
          right:
            translatedSquareInitialPosition.right +
            (state.mousePosition.x - state.translation.initialX),
          bottom:
            translatedSquareInitialPosition.bottom +
            (state.mousePosition.y - state.translation.initialY),
          left:
            translatedSquareInitialPosition.left +
            (state.mousePosition.x - state.translation.initialX),
        };
      } else {
        state.translation = {
          ...state.translation,
          initialX: action.payload.x,
          initialY: action.payload.y,
        };
      }

      if (hasReleased) {
        const translatedSquareTranslatedPosition =
          state.squareTranslatedPositions[state.translation.square];
        if (
          translatedSquareTranslatedPosition &&
          translatedSquareTranslatedPosition.left < state.canvasPosition.left &&
          translatedSquareTranslatedPosition.top < state.canvasPosition.top &&
          translatedSquareTranslatedPosition.right >
            state.canvasPosition.right &&
          translatedSquareTranslatedPosition.bottom >
            state.canvasPosition.bottom
        ) {
          console.log("OUT");

          state.squareTranslatedPositions[state.translation.square] =
            state.squareInitialPositions[state.translation.square];
        }
        state.translation.square = -1;
      }
    },
    setCanvasPosition: (state, action) => {
      state.canvasPosition = action.payload;
    },
    setSquareInitialPosition: (state, action) => {
      state.squareInitialPositions[action.payload.id] = action.payload.position;
      state.squareTranslatedPositions[action.payload.id] =
        action.payload.position;
    },
  },
});

const isInSquare = (mouse: MousePosition, square: ElementPosition) =>
  mouse.y > square.top &&
  mouse.y < square.bottom &&
  mouse.x > square.left &&
  mouse.x < square.right;

// Action creators are generated for each case reducer function
export const { setMousePosition, setCanvasPosition, setSquareInitialPosition } =
  globalSlice.actions;

export default globalSlice.reducer;
