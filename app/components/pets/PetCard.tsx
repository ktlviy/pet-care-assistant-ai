import { PetCardProps } from "@/app/types/pet";

export default function PetCard({ photoUrl, species, age }: PetCardProps) {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-4 flex flex-col items-center min-w-[180px]">
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={species || "Pet"}
          className="w-24 h-24 object-cover rounded-full border mb-3 bg-gray-100"
        />
      ) : (
        <div className="w-24 h-24 rounded-full border mb-3 bg-gray-100 flex items-center justify-center text-gray-400 text-3xl">
          🐾
        </div>
      )}
      <div className="text-base font-semibold text-gray-800 mb-1">
        {species || "Unknown species"}
      </div>
      <div className="text-xs text-gray-500">
        {age ? `Age: ${age}` : "Age: Unknown"}
      </div>
    </div>
  );
}
