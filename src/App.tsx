import CustomSelect from './components/custom-select';
import Header from './components/header';
import MyPc from './components/my-pc';
import Section from './components/section';
import { useComputer } from './hooks/useComputer';
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
    cpuModel,
  } = useCpu();

  const {
    gpuBrandsOptions,
    gpuModelOptions,
    setSelectedGpuBrand,
    setSelectedGpuModel,
    gpuModel,
  } = useGpu();

  const {
    ramAmountOptions,
    setSelectedAmount,
    ramBrandsOptions,
    ramModelOptions,
    setSelectedRamBrand,
    setSelectedRamModel,
    ramModel,
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
    storageModel,
  } = useStorage();

  const { handleClickAddPc, pcArr } = useComputer({
    cpu: cpuModel,
    gpu: gpuModel,
    ram: ramModel,
    storage: storageModel,
  });

  return (
    <>
      <Header />
      <main>
        <div>
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
        </div>
        <button
          className="my-3 ml-3 flex w-[200px] cursor-pointer items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-base text-white transition hover:bg-blue-600"
          onClick={handleClickAddPc}
        >
          Add PC
        </button>
        <div className="flex w-full flex-col p-2">
          {pcArr.length > 0 &&
            pcArr.map((pc, i) => <MyPc key={i} pc={pc} number={i + 1} />)}
        </div>
      </main>
    </>
  );
}

export default App;
