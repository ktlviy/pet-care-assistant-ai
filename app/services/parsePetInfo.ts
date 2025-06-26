import { PetProfile } from "../types/pet";

export function parsePetInfo(content: string) {
  let petInfo = {
    petType: "",
    color: "",
    species: "",
    age: "",
    notAnimal: false,
  };
  try {
    const match = content.match(/\{[\s\S]*\}/);
    if (match) petInfo = JSON.parse(match[0]);
  } catch {}
  return petInfo;
}

export async function fetchPetById(id: string): Promise<PetProfile | null> {
  const res = await fetch(`/api/pets/${id}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error("Failed to fetch pet");
  }
  return await res.json();
}

export async function fetchPets(): Promise<PetProfile[]> {
  const res = await fetch("/api/pets");
  if (!res.ok) {
    throw new Error("Failed to fetch pets");
  }
  return await res.json();
}
