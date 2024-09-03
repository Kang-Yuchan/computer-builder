import { useEffect, useMemo, useState } from 'react';
import { fetchCpus } from '../lib/api';
import { ComputerPart, Option } from '../types';

export const useCpu = () => {
  const [cpuBrandsOptions, setCpuBrandsOptions] = useState<Option[]>([]);
  const [cpus, setCpus] = useState<ComputerPart[]>([]);

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCpuModel, setSelectedCpuModel] = useState('');

  const cpuModelOptions: Option[] = useMemo(() => {
    const filteredCpus = cpus.filter((cpu) => cpu.Brand === selectedBrand);
    return filteredCpus.map((cpu) => ({ value: cpu.Model, label: cpu.Model }));
  }, [selectedBrand]);

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
  };
};
