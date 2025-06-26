export interface PetProfile {
  id: string;
  petType: string;
  color: string;
  species: string;
  age: string;
  plan: string[];
  photoUrl?: string;
  createdAt: string;
  notAnimal?: boolean;
}

export interface PetCardProps {
  photoUrl?: string;
  species?: string;
  age?: string;
}
