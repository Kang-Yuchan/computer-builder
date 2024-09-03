import CustomSelect from './components/custom-select';
import Header from './components/header';
import Section from './components/section';
import { useCpu } from './hooks/useCpu';

function App() {
  const {
    cpuBrandsOptions,
    cpuModelOptions,
    setSelectedBrand,
    setSelectedCpuModel,
  } = useCpu();
  return (
    <>
      <Header />
      <main>
        <Section title="step1: Select Your CPU">
          <div className="ml-2 py-2 flex gap-4">
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
      </main>
    </>
  );
}

export default App;
