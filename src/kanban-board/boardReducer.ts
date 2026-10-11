import type { BoardState, ColumnId } from "./types";

export type BoardAction =
  | { type: "ADD_CARD"; columnId: ColumnId; title: string }
  | { type: "DELETE_CARD"; cardId: string }
  | {
      type: "MOVE_CARD";
      cardId: string;
      fromColumn: ColumnId;
      toColumn: ColumnId;
      toIndex: number; // position in the destination column
    };

/**
 * Pure reducer - easy to unit test.
 * TODO: implement each action immutably.
 *  - MOVE_CARD within the same column = reorder (watch the index shift after removal!)
 *  - MOVE_CARD across columns = remove from source, insert into destination
 */
export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case "ADD_CARD":
      // TODO
      return state;
    case "DELETE_CARD":
      // TODO
      return state;
    case "MOVE_CARD":
      // TODO
      return state;
    default:
      return state;
  }
}
