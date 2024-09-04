import CustomSelect from './components/custom-select';
import Header from './components/header';
import Section from './components/section';
import { useCpu } from './hooks/useCpu';
import { useGpu } from './hooks/useGpu';
import { useRam } from './hooks/useRam';
import { useStorage } from './hooks/useStorage';

function App() {
  const {
    cpuBrandsOptions,
    cpuModelOptions,
    setSelectedBrand,
    setSelectedCpuModel,
  } = useCpu();

  const {
    gpuBrandsOptions,
    gpuModelOptions,
    setSelectedGpuBrand,
    setSelectedGpuModel,
  } = useGpu();

  const {
    ramAmountOptions,
    setSelectedAmount,
    ramBrandsOptions,
    ramModelOptions,
    setSelectedRamBrand,
    setSelectedRamModel,
  } = useRam();

  const {
    storageOptions,
    setSelectedStorage,
    storageKindsOptions,
    setSelectedStorageKind,
    storageBrandOptions,
    setSelectedStorageBrand,
    storageModelOptions,
    setSelectedStorageModel,
  } = useStorage();

  return (
    <>
      <Header />
      <main>
        <Section title="step1: Select Your CPU">
          <div className="ml-2 flex gap-4 py-2">
            <CustomSelect
              options={cpuBrandsOptions}
              label="Brand"
              onChange={setSelectedBrand}
            />
            <CustomSelect
              options={cpuModelOptions}
              label="Model"
              onChange={setSelectedCpuModel}
            />
          </div>
        </Section>
        <Section title="step2: Select Your GPU">
          <div className="ml-2 flex gap-4 py-2">
            <CustomSelect
              options={gpuBrandsOptions}
              label="Brand"
              onChange={setSelectedGpuBrand}
            />
            <CustomSelect
              options={gpuModelOptions}
              label="Model"
              onChange={setSelectedGpuModel}
            />
          </div>
        </Section>
        <Section title="step3: Select Your Memory Card">
          <div className="ml-2 flex gap-4 py-2">
            <CustomSelect
              options={ramAmountOptions}
              label="How many?"
              onChange={setSelectedAmount}
            />
            <CustomSelect
              options={ramBrandsOptions}
              label="Brand"
              onChange={setSelectedRamBrand}
            />
            <CustomSelect
              options={ramModelOptions}
              label="Model"
              onChange={setSelectedRamModel}
            />
          </div>
        </Section>
        <Section title="step3: Select Your Memory Card">
          <div className="ml-2 flex gap-4 py-2">
            <CustomSelect
              options={storageOptions}
              label="HDD or SSD"
              onChange={setSelectedStorage}
            />
            <CustomSelect
              options={storageKindsOptions}
              label="Storage"
              onChange={setSelectedStorageKind}
            />
            <CustomSelect
              options={storageBrandOptions}
              label="Brand"
              onChange={setSelectedStorageBrand}
            />
            <CustomSelect
              options={storageModelOptions}
              label="Model"
              onChange={setSelectedStorageModel}
            />
          </div>
        </Section>
      </main>
    </>
  );
}

export default App;
