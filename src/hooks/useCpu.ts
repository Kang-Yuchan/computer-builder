import { useEffect, useMemo, useState } from 'react';
import { fetchCpus } from '../lib/api';
import { ComputerPart, Option, SelectedOption, SelectedPart } from '../types';

export const useCpu = () => {
  const [cpuBrandsOptions, setCpuBrandsOptions] = useState<Option[]>([]);
  const [cpus, setCpus] = useState<ComputerPart[]>([]);

  const [selectedBrand, setSelectedBrand] = useState<SelectedOption>({
    value: '',
    label: '',
  });
  const [selectedCpuModel, setSelectedCpuModel] = useState<SelectedOption>({
    value: '',
    label: '',
  });

  const cpuModelOptions: Option[] = useMemo(() => {
    const filteredCpus = cpus.filter(
      (cpu) => cpu.Brand === selectedBrand.value,
    );
    return filteredCpus.map((cpu) => ({
      value: cpu.Benchmark.toString(),
      label: cpu.Model,
    }));
  }, [selectedBrand]);

  const cpuModel: SelectedPart | undefined = useMemo(() => {
    if (selectedBrand.value && selectedCpuModel.value) {
      return {
        name: selectedCpuModel.label,
        brand: selectedBrand.value,
        benchMark: Number(selectedCpuModel.value),
      };
    }
    return undefined;
  }, [selectedBrand, selectedCpuModel]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchCpus();
        const brandsSet = new Set(res.map((cpu) => cpu.Brand));
        const brands = Array.from(brandsSet);
        setCpuBrandsOptions(
          brands.map((brand) => ({ value: brand, label: brand })),
        );
        setCpus(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return {
    cpuBrandsOptions,
    setSelectedBrand,
    cpuModelOptions,
    setSelectedCpuModel,
    selectedCpuModel,
    cpuModel,
  };
};
