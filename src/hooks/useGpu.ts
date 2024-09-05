import { useEffect, useMemo, useState } from 'react';
import { fetchGpus } from '../lib/api';
import { ComputerPart, Option, SelectedOption, SelectedPart } from '../types';

export const useGpu = () => {
  const [gpuBrandsOptions, setgpuBrandsOptions] = useState<Option[]>([]);
  const [gpus, setGpus] = useState<ComputerPart[]>([]);

  const [selectedBrand, setSelectedBrand] = useState<SelectedOption>({
    value: '',
    label: '',
  });
  const [selectedGpuModel, setSelectedGpuModel] = useState<SelectedOption>({
    value: '',
    label: '',
  });

  const gpuModelOptions: Option[] = useMemo(() => {
    const filteredGpus = gpus.filter(
      (gpu) => gpu.Brand === selectedBrand.value,
    );
    return filteredGpus.map((gpu) => ({
      value: gpu.Benchmark.toString(),
      label: gpu.Model,
    }));
  }, [selectedBrand]);

  const gpuModel: SelectedPart | undefined = useMemo(() => {
    if (selectedBrand.value && selectedGpuModel.value) {
      return {
        name: selectedGpuModel.label,
        brand: selectedBrand.value,
        benchMark: Number(selectedGpuModel.value),
      };
    }
    return undefined;
  }, [selectedBrand, selectedGpuModel]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchGpus();
        const brandsSet = new Set(res.map((gpu) => gpu.Brand));
        const brands = Array.from(brandsSet);
        setgpuBrandsOptions(
          brands.map((brand) => ({ value: brand, label: brand })),
        );
        setGpus(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return {
    gpuBrandsOptions,
    setSelectedGpuBrand: setSelectedBrand,
    gpuModelOptions,
    setSelectedGpuModel,
    selectedGpuModel,
    gpuModel,
  };
};
