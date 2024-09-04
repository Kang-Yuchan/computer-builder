import { useEffect, useMemo, useState } from 'react';
import { ComputerPart, Option, StorageType } from '../types';
import { fetchStorages } from '../lib/api';

const storageOptions: Option[] = ['HDD', 'SSD'].map((storage) => ({
  value: storage,
  label: storage,
}));

export const useStorage = () => {
  const [storageKindsOptions, setStorageKindsOptions] = useState<Option[]>([]);
  const [storageModels, setStorageModels] = useState<ComputerPart[]>([]);

  const [selectedStorage, setSelectedStorage] = useState('');
  const [selectedStorageKind, setSelectedStorageKind] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedStorageModel, setSelectedStorageModel] = useState('');

  const storageBrandOptions: Option[] = useMemo(() => {
    if (storageModels.length > 0 && selectedStorageKind) {
      const brandSet = new Set(
        storageModels
          .filter((storage) => storage.Type === selectedStorage)
          .map((storage) => storage.Brand),
      );
      const brandArray = Array.from(brandSet);

      return brandArray.map((brand) => ({ value: brand, label: brand }));
    }
    return [];
  }, [selectedStorage, storageModels, selectedStorageKind]);

  const storageModelOptions: Option[] = useMemo(() => {
    if (selectedBrand && selectedStorageKind) {
      const filteredStorageModels = storageModels.filter(
        (storage) =>
          storage.Brand === selectedBrand &&
          storage.Type === selectedStorage &&
          storage.Model.includes(selectedStorageKind),
      );
      return filteredStorageModels.map((storage) => ({
        value: storage.Benchmark.toString(),
        label: storage.Model,
      }));
    }
    return [];
  }, [selectedBrand, selectedStorage, selectedStorageKind]);

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
      fetchData(selectedStorage as StorageType);
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
    selectedStorageModel,
  };
};
