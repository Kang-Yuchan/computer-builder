export type ComputerPart = {
  Type: string;
  'Part Number': string;
  Brand: string;
  Model: string;
  Rank: number;
  Benchmark: number;
};

export type PartType = 'cpu' | 'gpu' | 'ram' | 'ssd' | 'hdd';

export type Option = {
  value: string;
  label: string;
};

export type StorageType = 'HDD' | 'SSD';
