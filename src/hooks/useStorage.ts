import { useEffect, useMemo, useState } from 'react';
import {
  ComputerPart,
  Option,
  SelectedOption,
  SelectedPart,
  StorageType,
} from '../types';
import { fetchStorages } from '../lib/api';

const storageOptions: Option[] = ['HDD', 'SSD'].map((storage) => ({
  value: storage,
  label: storage,
}));

export const useStorage = () => {
  const [storageKindsOptions, setStorageKindsOptions] = useState<Option[]>([]);
  const [storageModels, setStorageModels] = useState<ComputerPart[]>([]);

  const [selectedStorage, setSelectedStorage] = useState<SelectedOption>({
    value: '',
    label: '',
  });
  const [selectedStorageKind, setSelectedStorageKind] =
    useState<SelectedOption>({
      value: '',
      label: '',
    });
  const [selectedBrand, setSelectedBrand] = useState<SelectedOption>({
    value: '',
    label: '',
  });
  const [selectedStorageModel, setSelectedStorageModel] =
    useState<SelectedOption>({
      value: '',
      label: '',
    });

  const storageBrandOptions: Option[] = useMemo(() => {
    if (storageModels.length > 0 && selectedStorageKind) {
      const brandSet = new Set(
        storageModels
          .filter((storage) => storage.Type === selectedStorage.value)
          .map((storage) => storage.Brand),
      );
      const brandArray = Array.from(brandSet);

      return brandArray.map((brand) => ({ value: brand, label: brand }));
    }
    return [];
  }, [selectedStorage, storageModels, selectedStorageKind]);

  const storageModelOptions: Option[] = useMemo(() => {
    if (selectedBrand.value && selectedStorageKind.value) {
      const filteredStorageModels = storageModels.filter(
        (storage) =>
          storage.Brand === selectedBrand.value &&
          storage.Type === selectedStorage.value &&
          storage.Model.includes(selectedStorageKind.value),
      );
      return filteredStorageModels.map((storage) => ({
        value: storage.Benchmark.toString(),
        label: storage.Model,
      }));
    }
    return [];
  }, [selectedBrand, selectedStorage, selectedStorageKind]);

  const storageModel:
    | (SelectedPart & { storageType: StorageType; storageCapacity: string })
    | undefined = useMemo(() => {
    if (selectedStorageModel.value && selectedBrand.value) {
      return {
        name: selectedStorageModel.label,
        brand: selectedBrand.value,
        benchMark: Number(selectedStorageModel.value),
        storageType: selectedStorage.value as StorageType,
        storageCapacity: selectedStorageKind.value,
      };
    }
    return undefined;
  }, [selectedStorageModel, selectedBrand]);

  useEffect(() => {
    const fetchData = async (storage: StorageType) => {
      try {
        const res = await fetchStorages(storage);
        setStorageModels(res);
        const storageKindSet = new Set(
          res.map((storage) => {
            const storageModelSplit = storage.Model.split(' ');
            const storageKind = storageModelSplit[storageModelSplit.length - 1];

            return storageKind;
          }),
        );
        const storageKinds = Array.from(storageKindSet);
        const storageTB = storageKinds
          .filter((storage) => storage.includes('TB'))
          .sort((a, b) => Number(b.split('TB')[0]) - Number(a.split('TB')[0]));
        const storageGB = storageKinds
          .filter((storage) => storage.includes('GB'))
          .sort((a, b) => Number(b.split('GB')[0]) - Number(a.split('GB')[0]));
        setStorageKindsOptions(
          [...storageTB, ...storageGB].map((storageKind) => ({
            value: storageKind,
            label: storageKind,
          })),
        );
      } catch (err) {
        console.error(err);
      }
    };
    if (selectedStorage) {
      fetchData(selectedStorage.value as StorageType);
    }
  }, [selectedStorage]);

  return {
    storageOptions,
    setSelectedStorage,
    storageKindsOptions,
    setSelectedStorageKind,
    storageBrandOptions,
    setSelectedStorageBrand: setSelectedBrand,
    storageModelOptions,
    setSelectedStorageModel,
    storageModel,
  };
};
