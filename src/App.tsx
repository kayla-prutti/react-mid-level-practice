import { useState } from "react";
import SearchAutocomplete from "./search-autocomplete/SearchAutocomplete";
import MultiStepForm from "./multi-step-form/MultiStepForm";
import KanbanBoard from "./kanban-board/KanbanBoard";

const TABS = {
  search: { label: "Search Autocomplete", Component: SearchAutocomplete },
  form: { label: "Multi-Step Form", Component: MultiStepForm },
  kanban: { label: "Kanban Board", Component: KanbanBoard },
} as const;

type TabKey = keyof typeof TABS;

export default function App() {
  const [tab, setTab] = useState<TabKey>("search");
  const { Component } = TABS[tab];

  return (
    <>
      <nav>
        {(Object.keys(TABS) as TabKey[]).map((key) => (
          <button key={key} aria-current={tab === key} onClick={() => setTab(key)}>
            {TABS[key].label}
          </button>
        ))}
      </nav>
      <hr />
      <Component />
    </>
  );
}
