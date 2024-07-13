export type Plant = {
  id: number;
  name: string;
  species: string;
  summary: string;
  description: string;
  wateringFrequency: string;
  maintenance: string;
  image: string;
  imageAlt: string;
};

export type Profile = {
  id: number;
  name: string;
  email: string;
  plants: Individual[];
};

export type Individual = {
  plantId: number;
  date: date;
  age: number;
  customName: string;
  customImage: string;
};
