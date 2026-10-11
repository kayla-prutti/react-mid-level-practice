import type { BoardState } from "./types";

export const initialBoard: BoardState = {
  cards: {
    "c1": { id: "c1", title: "Set up project" },
    "c2": { id: "c2", title: "Design the data model" },
    "c3": { id: "c3", title: "Build the board UI" },
    "c4": { id: "c4", title: "Write tests" },
  },
  columns: {
    "todo": { id: "todo", title: "To Do", cardIds: ["c3", "c4"] },
    "in-progress": { id: "in-progress", title: "In Progress", cardIds: ["c2"] },
    "done": { id: "done", title: "Done", cardIds: ["c1"] },
  },
  columnOrder: ["todo", "in-progress", "done"],
};
