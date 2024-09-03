import CustomSelect from './components/custom-select';
import Header from './components/header';
import Section from './components/section';
import { useCpu } from './hooks/useCpu';
import { useGpu } from './hooks/useGpu';

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
      </main>
    </>
  );
}

export default App;
