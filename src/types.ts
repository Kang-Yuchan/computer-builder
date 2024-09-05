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

export type SelectedOption = { value: string; label: string };

export type SelectedPart = { name: string; benchMark: number; brand: string };

export type PcPartBenchMarks = {
  cpuBenchMark: number;
  gpuBenchMark: number;
  ramBenchMark: number;
  storageBenchMark: number;
  storageType: StorageType;
};

export type Pc = {
  cpu: { brand: string; name: string };
  gpu: { brand: string; name: string };
  ram: { brand: string; name: string };
  storage: {
    kind: string;
    storageCapacity: string;
    brand: string;
    name: string;
  };
  gamingPower: number;
  workingPower: number;
};
