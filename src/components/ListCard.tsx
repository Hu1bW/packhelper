// src/components/ListCard.tsx
import React from "react";
import type { PackList } from "../types";
import { Link } from "react-router-dom";

function calcProgress(list: PackList) {
  const total = list.items.length;
  if (total === 0) return 0;
  const done = list.items.filter((i) => i.done).length;
  return Math.round((done / total) * 100);
}

export default function ListCard({
  list,
  onDelete,
}: {
  list: PackList;
  onDelete: () => void;
}) {
  const progress = calcProgress(list);
  return (
    <div className="card h-100 w-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{list.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted text-capitalize">
          {list.tripType} • {new Date(list.startDate).toLocaleDateString()}
        </h6>

        <div className="mb-3 mt-auto w-100 row-cols-1">
          <div className="progress" style={{ height: 18 }}>
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

        <div className="d-flex justify-content-between">
          <Link
            to={`/list/${list.id}`}
            className="btn btn-outline-primary btn-sm"
          >
            Open
          </Link>
          <button className="btn btn-outline-danger btn-sm" onClick={onDelete}>
            Verwijder
          </button>
        </div>
      </div>
    </div>
  );
}
