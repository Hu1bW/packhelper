// src/pages/ListDetail.tsx
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../utils/storage";
import type { PackList, Item } from "../types";
import { uid } from "../utils/id";

export default function ListDetail() {
  const { id } = useParams<{ id: string }>();
  const [lists, setLists] = useLocalStorage<PackList[]>("packhelper:lists", []);
  const navigate = useNavigate();
  const list = lists.find((l) => l.id === id);
  const [newItemName, setNewItemName] = useState("");

  if (!list) {
    return (
      <div>
        <div className="alert alert-warning">Lijst niet gevonden.</div>
        <Link to="/">Terug naar home</Link>
      </div>
    );
  }

  const updateList = (updated: PackList) => {
    setLists(lists.map((l) => (l.id === updated.id ? updated : l)));
  };

  const toggleDone = (itemId: string) => {
    const updated = {
      ...list,
      items: list.items.map((i) =>
        i.id === itemId ? { ...i, done: !i.done } : i
      ),
    };
    updateList(updated);
  };

  const addItem = () => {
    if (!newItemName.trim()) return;
    const item: Item = { id: uid(), name: newItemName.trim(), done: false };
    const updated = { ...list, items: [...list.items, item] };
    updateList(updated);
    setNewItemName("");
  };

  const removeItem = (itemId: string) => {
    if (!confirm("Verwijder dit item?")) return;
    const updated = {
      ...list,
      items: list.items.filter((i) => i.id !== itemId),
    };
    updateList(updated);
  };

  const total = list.items.length;
  const done = list.items.filter((i) => i.done).length;
  const progress = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2>{list.name}</h2>
          <small className="text-muted">
            {list.tripType} • {list.durationDays} dagen •{" "}
            {new Date(list.startDate).toLocaleDateString()}
          </small>
        </div>
        <div>
          <button
            className="btn btn-secondary me-2"
            onClick={() => navigate("/")}
          >
            Terug
          </button>
        </div>
      </div>

      <div className="mb-3">
        <div className="progress" style={{ height: 20 }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {progress}%
          </div>
        </div>
      </div>

      <ul className="list-group mb-3">
        {list.items.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex align-items-center"
          >
            <input
              className="form-check-input me-3"
              type="checkbox"
              checked={item.done}
              onChange={() => toggleDone(item.id)}
            />
            <span
              style={{ textDecoration: item.done ? "line-through" : "none" }}
              className="flex-grow-1"
            >
              {item.name}
            </span>
            <button
              className="btn btn-sm btn-outline-danger ms-2"
              onClick={() => removeItem(item.id)}
            >
              Verwijder
            </button>
          </li>
        ))}
      </ul>

      <div className="input-group mb-5">
        <input
          type="text"
          className="form-control"
          placeholder="Voeg eigen item toe"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addItem}>
          Toevoegen
        </button>
      </div>
    </div>
  );
}
