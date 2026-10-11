import { useReducer } from "react";
import { boardReducer } from "./boardReducer";
import { initialBoard } from "./initialData";
import KanbanColumn from "./KanbanColumn";

/**
 * Requirements checklist:
 *  [ ] Render columns + cards from normalized state
 *  [ ] Add / delete card
 *  [ ] Drag a card to reorder within a column
 *  [ ] Drag a card to another column at a specific position
 *  [ ] Visual feedback while dragging (dragged card + drop target)
 *  [ ] Bonus: keyboard-accessible move (e.g. buttons / arrow keys)
 *  [ ] Bonus: persist to localStorage
 *  [ ] Bonus: swap native DnD for dnd-kit / react-beautiful-dnd
 */
export default function KanbanBoard() {
  const [board, dispatch] = useReducer(boardReducer, initialBoard);

  return (
    <div>
      <h2>Kanban Board</h2>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        {board.columnOrder.map((colId) => {
          const column = board.columns[colId];
          const cards = column.cardIds.map((id) => board.cards[id]);
          return (
            <KanbanColumn
              key={column.id}
              column={column}
              cards={cards}
              onAddCard={(columnId, title) => dispatch({ type: "ADD_CARD", columnId, title })}
              onDeleteCard={(cardId) => dispatch({ type: "DELETE_CARD", cardId })}
            />
          );
        })}
      </div>
    </div>
  );
}
