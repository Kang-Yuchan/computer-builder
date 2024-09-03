import { useEffect, useMemo, useState } from 'react';
import { fetchGpus } from '../lib/api';
import { ComputerPart, Option } from '../types';

export const useGpu = () => {
  const [gpuBrandsOptions, setgpuBrandsOptions] = useState<Option[]>([]);
  const [gpus, setGpus] = useState<ComputerPart[]>([]);

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedGpuModel, setSelectedGpuModel] = useState('');

  const gpuModelOptions: Option[] = useMemo(() => {
    const filteredgpus = gpus.filter((gpu) => gpu.Brand === selectedBrand);
    return filteredgpus.map((gpu) => ({ value: gpu.Model, label: gpu.Model }));
  }, [selectedBrand]);

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
  };
};
