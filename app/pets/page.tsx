"use client";
import { useQuery } from "@tanstack/react-query";
import PetCard from "../components/pets/PetCard";
import Link from "next/link";
import { PetProfile } from "../types/pet";
import Protected from "../components/ui/Protected";
import { fetchPets } from "../services/parsePetInfo";

export default function PetsPage() {
  const {
    data: pets,
    isLoading,
    isError,
  } = useQuery<PetProfile[]>({
    queryKey: ["pets"],
    queryFn: fetchPets,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <Protected>
      <div className="min-h-screen bg-gray-50 py-10 px-4 mt-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            My Pets
          </h1>
          {isError ? (
            <div className="text-center text-red-500 text-lg mt-20">
              Failed to load pets.
            </div>
          ) : !pets || pets.length === 0 ? (
            <div className="text-center text-gray-500 text-lg mt-20">
              You have no saved pets yet.
              <br />
              Upload a photo and generate a care plan to save your first pet
              profile!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {pets.map((pet, idx) => (
                <Link
                  key={pet.id || idx}
                  href={`/pets/${pet.id}`}
                  className="block"
                >
                  <PetCard
                    photoUrl={pet.photoUrl}
                    species={pet.species}
                    age={pet.age}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </Protected>
  );
}
