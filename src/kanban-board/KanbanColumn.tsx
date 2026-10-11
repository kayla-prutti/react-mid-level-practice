import type { Card, Column } from "./types";
import KanbanCard from "./KanbanCard";

interface Props {
  column: Column;
  cards: Card[];
  onAddCard: (columnId: Column["id"], title: string) => void;
  onDeleteCard: (cardId: string) => void;
  // TODO: onDropCard(cardId, toColumn, toIndex)
}

export default function KanbanColumn({ column, cards, onAddCard, onDeleteCard }: Props) {
  // TODO: onDragOver (preventDefault), onDrop, highlight while dragging over
  // TODO: compute drop index (e.g. from the card being hovered)
  // TODO: add-card input / button using onAddCard
  return (
    <div style={{ background: "#f4f5f7", borderRadius: 6, padding: 12, width: 260 }}>
      <h3>{column.title} ({cards.length})</h3>
      {cards.map((card) => (
        <KanbanCard key={card.id} card={card} onDelete={onDeleteCard} />
      ))}
    </div>
  );
}
