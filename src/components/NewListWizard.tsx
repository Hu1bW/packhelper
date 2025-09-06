// src/components/NewListWizard.tsx
import React, { useState } from "react";
import type { Temperature, TripType } from "../types";

type Props = {
  onCancel: () => void;
  onCreate: (payload: {
    name: string;
    tripType: TripType;
    temperature: Temperature;
    durationDays: number;
    startDate: string;
  }) => void;
};

export default function NewListWizard({ onCancel, onCreate }: Props) {
  const [step, setStep] = useState(1);
  const [temperature, setTemperature] = useState<Temperature>("warm");
  const [tripType, setTripType] = useState<TripType>("backpack");
  const [durationDays, setDurationDays] = useState<number>(3);
  const [startDate, setStartDate] = useState<string>("");
  const [name, setName] = useState<string>("");

  const warmOptions: TripType[] = [
    "backpack",
    "bikepack",
    "beach",
    "city",
    "roadtrip",
    "hike",
    "other",
  ];
  const coldOptions: TripType[] = [
    "backpack",
    "city",
    "roadtrip",
    "winter",
    "hike",
    "other",
  ];

  const tripOptions = temperature === "warm" ? warmOptions : coldOptions;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Nieuwe lijst aanmaken</h5>

        {step === 1 && (
          <div>
            <p>
              <strong>1. Wordt het koud of warm op vakantie?</strong>
            </p>
            <div className="btn-group" role="group">
              <button
                className={`btn ${
                  temperature === "warm" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setTemperature("warm")}
              >
                Warm
              </button>
              <button
                className={`btn ${
                  temperature === "cold" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setTemperature("cold")}
              >
                Koud
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-3">
            <p>
              <strong>2. Wat voor soort vakantie?</strong>
            </p>
            <div className="d-flex flex-wrap gap-2">
              {tripOptions.map((opt) => (
                <button
                  key={opt}
                  className={`btn ${
                    tripType === opt ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => setTripType(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-3">
            <label className="form-label">
              <strong>3. Hoe lang ga je weg? (aantal dagen)</strong>
            </label>
            <input
              type="number"
              className="form-control"
              min={1}
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
            />
          </div>
        )}

        {step === 4 && (
          <div className="mt-3">
            <label className="form-label">
              <strong>4. Wanneer ga je weg?</strong>
            </label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label className="form-label mt-3">
              Optionele naam voor de lijst
            </label>
            <input
              className="form-control"
              placeholder="Bijv. 'Zomer Kroatië - August' "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className="d-flex justify-content-between mt-3">
          <div>
            {step > 1 && (
              <button
                className="btn btn-outline-secondary me-2"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
              >
                Terug
              </button>
            )}
            <button className="btn btn-outline-danger" onClick={onCancel}>
              Annuleren
            </button>
          </div>

          <div>
            {step < 4 && (
              <button
                className="btn btn-primary"
                onClick={() => setStep((s) => Math.min(4, s + 1))}
              >
                Volgende
              </button>
            )}
            {step === 4 && (
              <button
                className="btn btn-success"
                onClick={() => {
                  if (!startDate) {
                    alert("Kies eerst een startdatum.");
                    return;
                  }
                  onCreate({
                    name,
                    tripType,
                    temperature,
                    durationDays,
                    startDate,
                  });
                }}
              >
                Maak lijst aan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
