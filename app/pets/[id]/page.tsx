"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { PetProfile } from "@/app/types/pet";

import { capitalizeFirstLetter } from "@/app/utils/formaters";
import { fetchPetById } from "@/app/services/parsePetInfo";

export default function PetDetailsPage() {
  const params = useParams();
  const id = params?.id as string;

  const {
    data: pet,
    isLoading,
    isError,
  } = useQuery<PetProfile | null>({
    queryKey: ["pet", id],
    queryFn: () => fetchPetById(id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-500">
        Loading pet details...
      </div>
    );
  }
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-red-500">
        Failed to load pet details.
      </div>
    );
  }
  if (!pet) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-500">
        Pet not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 mt-16">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
        <div className="flex flex-col items-center mb-6">
          {pet.photoUrl ? (
            <img
              src={pet.photoUrl}
              alt={pet.species || "Pet"}
              className="w-32 h-32 object-cover rounded-full border mb-4 bg-gray-100"
            />
          ) : (
            <div className="w-32 h-32 rounded-full border mb-4 bg-gray-100 flex items-center justify-center text-gray-400 text-5xl">
              🐾
            </div>
          )}
          <h2 className="text-2xl font-bold text-blue-700 mb-1">
            {capitalizeFirstLetter(pet.species)}
          </h2>
          <div className="text-gray-600 mb-1">
            Type: {capitalizeFirstLetter(pet.petType)}
          </div>
          <div className="text-gray-600 mb-1">
            Color: {capitalizeFirstLetter(pet.color)}
          </div>
          <div className="text-gray-600 mb-1">Age: {pet.age}</div>
          <div className="text-xs text-gray-400 mt-2">
            Added: {new Date(pet.createdAt).toLocaleString()}
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Personalized Care Plan
          </h3>
          <div className="prose max-w-none">
            {Array.isArray(pet.plan) && pet.plan.length > 0 ? (
              <ul className="list-disc pl-5">
                {pet.plan.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500">No care plan available.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
