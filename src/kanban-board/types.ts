export type ColumnId = "todo" | "in-progress" | "done";

export interface Card {
  id: string;
  title: string;
}

export interface Column {
  id: ColumnId;
  title: string;
  cardIds: string[];
}

/** Normalized state: cards by id + ordered ids per column. */
export interface BoardState {
  cards: Record<string, Card>;
  columns: Record<ColumnId, Column>;
  columnOrder: ColumnId[];
}
