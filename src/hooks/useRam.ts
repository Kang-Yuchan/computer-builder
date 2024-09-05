import { useEffect, useMemo, useState } from 'react';
import { ComputerPart, Option, SelectedOption, SelectedPart } from '../types';
import { fetchRams } from '../lib/api';

const ramAmountOptions: Option[] = [1, 2, 3, 4].map((num) => ({
  value: num.toString(),
  label: num.toString(),
}));

export const useRam = () => {
  const [ramBrandsOptions, setRamBrandOptions] = useState<Option[]>([]);
  const [rams, setRams] = useState<ComputerPart[]>([]);

  const [selectedAmount, setSelectedAmount] = useState<SelectedOption>({
    value: '',
    label: '',
  });
  const [selectedBrand, setSelectedBrand] = useState<SelectedOption>({
    value: '',
    label: '',
  });
  const [selectedRamModel, setSelectedRamModel] = useState<SelectedOption>({
    value: '',
    label: '',
  });

  const ramModelOptions: Option[] = useMemo(() => {
    if (selectedAmount.value && selectedBrand.value) {
      const filteredRams = rams.filter(
        (ram) =>
          ram.Brand === selectedBrand.value &&
          ram.Model.includes(`${selectedAmount.value}x`),
      );
      return filteredRams.map((ram) => ({
        value: ram.Benchmark.toString(),
        label: ram.Model,
      }));
    }
    return [];
  }, [selectedBrand, selectedAmount]);

  const ramModel: SelectedPart | undefined = useMemo(() => {
    if (selectedBrand.value && selectedRamModel.value) {
      return {
        name: selectedRamModel.label,
        brand: selectedBrand.value,
        benchMark: Number(selectedRamModel.value),
      };
    }
    return undefined;
  }, [selectedBrand, selectedRamModel]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchRams();
        const brandsSet = new Set(res.map((cpu) => cpu.Brand));
        const brands = Array.from(brandsSet);
        setRamBrandOptions(
          brands.map((brand) => ({ value: brand, label: brand })),
        );
        setRams(res);
      } catch (err) {
        console.error(err);
      }
    };
    if (selectedAmount) {
      fetchData();
    }
  }, [selectedAmount]);

  return {
    ramAmountOptions,
    ramBrandsOptions,
    setSelectedRamBrand: setSelectedBrand,
    setSelectedAmount,
    ramModelOptions,
    setSelectedRamModel,
    selectedRamModel,
    ramModel,
  };
};
