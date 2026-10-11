import type { Card } from "./types";

interface Props {
  card: Card;
  onDelete: (cardId: string) => void;
  // TODO: drag handlers (onDragStart, onDragEnd) or pass via props
}

export default function KanbanCard({ card, onDelete }: Props) {
  // TODO: draggable, onDragStart -> e.dataTransfer.setData("text/plain", card.id)
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 4, padding: 8, marginBottom: 8, background: "#fff" }}>
      {card.title}
      <button onClick={() => onDelete(card.id)} aria-label={`Delete ${card.title}`} style={{ float: "right" }}>
        ×
      </button>
    </div>
  );
}
