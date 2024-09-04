import { ComputerPart, PartType, StorageType } from '../types';

const BASE_URL = 'https://api.recursionist.io/builder/computers?type=';

const fetcher = async <T>(part: PartType): Promise<T> => {
  const response = await fetch(`${BASE_URL}${part}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${part} data`);
  }
  return response.json();
};

export const fetchCpus = async (): Promise<ComputerPart[]> => {
  return fetcher<ComputerPart[]>('cpu');
};

export const fetchGpus = async (): Promise<ComputerPart[]> => {
  return fetcher<ComputerPart[]>('gpu');
};

export const fetchRams = async (): Promise<ComputerPart[]> => {
  return fetcher<ComputerPart[]>('ram');
};

export const fetchStorages = async (
  storage: StorageType,
): Promise<ComputerPart[]> => {
  return fetcher<ComputerPart[]>(storage.toLocaleLowerCase() as PartType);
};
