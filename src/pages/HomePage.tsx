// src/pages/HomePage.tsx
import React, { useState } from "react";
import { useLocalStorage } from "../utils/storage";
import type { PackList } from "../types";
import { uid } from "../utils/id";
import { generateDefaultItems } from "../utils/generator";
import ListCard from "../components/ListCard";
import NewListWizard from "../components/NewListWizard";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [lists, setLists] = useLocalStorage<PackList[]>("packhelper:lists", []);
  const [showWizard, setShowWizard] = useState(false);
  const navigate = useNavigate();

  const createList = (payload: {
    name: string;
    tripType: PackList["tripType"];
    temperature: PackList["temperature"];
    durationDays: number;
    startDate: string;
  }) => {
    const items = generateDefaultItems(
      payload.tripType,
      payload.temperature,
      payload.durationDays
    );
    const newList: PackList = {
      id: uid(),
      name: payload.name || `${payload.tripType} trip`,
      tripType: payload.tripType,
      temperature: payload.temperature,
      durationDays: payload.durationDays,
      startDate: payload.startDate,
      items,
      createdAt: new Date().toISOString(),
    };
    setLists([newList, ...lists]);
    setShowWizard(false);
    navigate(`/list/${newList.id}`);
  };

  const deleteList = (id: string) => {
    if (!confirm("Weet je zeker dat je deze lijst wilt verwijderen?")) return;
    setLists(lists.filter((l) => l.id !== id));
  };

  return (
    <div className="container-fluid mt-4">
      <div className="mb-4">
        <h1 className="mb-3">PackHelper</h1>
        <button className="btn btn-primary" onClick={() => setShowWizard(true)}>
          Nieuwe lijst
        </button>
      </div>

      {showWizard && (
        <NewListWizard
          onCancel={() => setShowWizard(false)}
          onCreate={createList}
        />
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
        {lists.length === 0 ? (
          <div className="col">
            <div className="alert alert-info">
              Nog geen lijsten — klik op 'Nieuwe lijst' om te beginnen.
            </div>
          </div>
        ) : (
          lists.map((l) => (
            <div key={l.id} className="row-cols-1 col d-flex">
              <ListCard list={l} onDelete={() => deleteList(l.id)} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
