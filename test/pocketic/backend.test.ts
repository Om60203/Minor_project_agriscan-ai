import { PocketIc } from "@dfinity/pic";
import { afterAll, beforeAll, expect, it } from "vitest";

import { idlFactory } from "../../src/frontend/src/declarations/backend.did.js";
import type { _SERVICE } from "../../src/frontend/src/declarations/backend.did";

const PIC_URL = process.env.POCKET_IC_URL ?? "";
const BACKEND_WASM = process.env.BACKEND_WASM ?? "";

let pic: PocketIc | undefined;
let actor: _SERVICE;

beforeAll(async () => {
  pic = await PocketIc.create(PIC_URL);
  ({ actor } = await pic.setupCanister<_SERVICE>({ idlFactory, wasm: BACKEND_WASM }));
});

afterAll(async () => {
  await pic?.tearDown();
});

it("answers an empty-state read for scans instead of trapping", async () => {
  await expect(actor.listScans()).resolves.toEqual([]);
});

it("answers an empty-state read for chat history instead of trapping", async () => {
  await expect(actor.getChatHistory()).resolves.toEqual([]);
});

it("seeds the disease library with the six supported crops", async () => {
  const diseases = await actor.getDiseases();
  expect(diseases.length).toBeGreaterThan(0);
  const crops = new Set(diseases.map((d) => d.crop));
  for (const crop of ["Tomato", "Potato", "Corn", "Apple", "Pepper", "Grape"]) {
    expect(crops.has(crop)).toBe(true);
  }
});

it("filters diseases by crop", async () => {
  const tomato = await actor.getDiseasesByCrop("Tomato");
  expect(tomato.length).toBeGreaterThan(0);
  expect(tomato.every((d) => d.crop === "Tomato")).toBe(true);
});

it("searches diseases by name", async () => {
  const results = await actor.searchDiseases("blight");
  expect(results.length).toBeGreaterThan(0);
  expect(results.some((d) => d.name.toLowerCase().includes("blight"))).toBe(true);
});

it("returns a structured disease entry with symptoms, causes, treatment, and prevention", async () => {
  const tomato = await actor.getDiseasesByCrop("Tomato");
  const entry = tomato[0];
  expect(entry.name.length).toBeGreaterThan(0);
  expect(entry.symptoms.length).toBeGreaterThan(0);
  expect(entry.causes.length).toBeGreaterThan(0);
  expect(entry.treatment.length).toBeGreaterThan(0);
  expect(entry.prevention.length).toBeGreaterThan(0);
});
