import { useCallback, useMemo, useState } from 'react';
import { getMachinePower } from '../lib/machine-power';
import { Pc, PcPartBenchMarks, SelectedPart, StorageType } from '../types';

type UseComputerProps = {
  cpu?: SelectedPart;
  gpu?: SelectedPart;
  ram?: SelectedPart;
  storage?: SelectedPart & {
    storageType: StorageType;
    storageCapacity: string;
  };
};

export const useComputer = ({ cpu, gpu, ram, storage }: UseComputerProps) => {
  const [pcArr, setPcArr] = useState<Pc[]>([]);

  const pcPartBenchMarks: PcPartBenchMarks | undefined = useMemo(() => {
    if (cpu && gpu && ram && storage) {
      return {
        cpuBenchMark: cpu.benchMark,
        gpuBenchMark: gpu.benchMark,
        ramBenchMark: ram.benchMark,
        storageBenchMark: storage.benchMark,
        storageType: storage.storageType,
      };
    }
    return undefined;
  }, [cpu, gpu, ram, storage]);

  const gamingPower = useMemo(() => {
    return pcPartBenchMarks
      ? getMachinePower(pcPartBenchMarks, 'gaming')
      : undefined;
  }, [pcPartBenchMarks]);

  const workingPower = useMemo(() => {
    return pcPartBenchMarks
      ? getMachinePower(pcPartBenchMarks, 'work')
      : undefined;
  }, [pcPartBenchMarks]);

  const pc: Pc | undefined = useMemo(() => {
    if (cpu && gpu && ram && storage && gamingPower && workingPower) {
      return {
        cpu: { brand: cpu.brand, name: cpu.name },
        gpu: { brand: gpu.brand, name: gpu.name },
        ram: { brand: ram.brand, name: ram.name },
        storage: {
          kind: storage.storageType,
          storageCapacity: storage.storageCapacity,
          brand: storage.brand,
          name: storage.name,
        },
        gamingPower,
        workingPower,
      };
    }
    return undefined;
  }, [cpu, gpu, ram, storage, gamingPower, workingPower]);

  const handleClickAddPc = useCallback(() => {
    if (pc) {
      setPcArr((prevState) => [...prevState, pc]);
    } else {
      alert('Please fill in all forms.');
    }
  }, [pc]);

  return {
    handleClickAddPc,
    pcArr,
  };
};
