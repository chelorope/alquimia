import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface State {
  mousePosition: { x: number; y: number; down: boolean };
  canvasPosition: { top: number; right: number; bottom: number; left: number };
  squarePositions: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  }[];
}

const initialState: State = {
  mousePosition: { x: 0, y: 0, down: false },
  canvasPosition: { top: 0, bottom: 0, right: 0, left: 0 },
  squarePositions: [],
};

export const globalSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setMousePosition: (state, action) => {
      state.mousePosition = { ...state.mousePosition, ...action.payload };
    },
    setCanvasPosition: (state, action) => {
      state.canvasPosition = action.payload;
    },
    setSquarePosition: (state, action) => {
      state.squarePositions[action.payload.id] = action.payload.position;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMousePosition, setCanvasPosition, setSquarePosition } =
  globalSlice.actions;

export default globalSlice.reducer;
