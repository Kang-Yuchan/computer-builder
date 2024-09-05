import { PcPartBenchMarks } from '../types';

export const getMachinePower = (
  pc: PcPartBenchMarks,
  type: 'gaming' | 'work',
) => {
  let cpuScore: number;
  let gpuScore: number;
  let ramScore: number;
  let storageScore: number;
  if (type === 'gaming') {
    cpuScore = pc.cpuBenchMark * 0.25;
    gpuScore = pc.gpuBenchMark * 0.6;
    ramScore = pc.ramBenchMark * 0.125;
    storageScore =
      pc.storageType === 'SSD'
        ? pc.storageBenchMark * 0.1
        : pc.storageBenchMark * 0.025;
  } else {
    cpuScore = pc.cpuBenchMark * 0.6;
    gpuScore = pc.gpuBenchMark * 0.25;
    ramScore = pc.ramBenchMark * 0.1;
    storageScore = pc.storageBenchMark * 0.05;
  }

  return (
    Math.floor(cpuScore) +
    Math.floor(gpuScore) +
    Math.floor(ramScore) +
    Math.floor(storageScore)
  );
};
