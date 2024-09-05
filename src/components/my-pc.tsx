import { Pc } from '../types';

type MyPcProps = {
  pc: Pc;
  number: number;
};

export default function MyPc({ pc, number }: MyPcProps) {
  return (
    <div className="mb-2 flex w-full flex-col bg-blue-600 *:text-white">
      <div className="m-2 flex justify-center pt-3">
        <h1 className="text-4xl">Your PC{number}</h1>
      </div>
      <div className="m-2 flex flex-col pt-3">
        <h1 className="text-4xl">CPU</h1>
        <h5 className="text-xl">Brand: {pc.cpu.brand}</h5>
        <h5 className="text-xl">Model: {pc.cpu.name}</h5>
      </div>
      <div className="m-2 flex flex-col pt-3">
        <h1 className="text-4xl">GPU</h1>
        <h5 className="text-xl">Brand: {pc.gpu.brand}</h5>
        <h5 className="text-xl">Model: {pc.gpu.name}</h5>
      </div>
      <div className="m-2 flex flex-col pt-3">
        <h1 className="text-4xl">RAM</h1>
        <h5 className="text-xl">Brand: {pc.ram.brand}</h5>
        <h5 className="text-xl">Model: {pc.ram.name}</h5>
      </div>
      <div className="m-2 flex flex-col pt-3">
        <h1 className="text-4xl">Storage</h1>
        <h5 className="text-xl">Disk: {pc.storage.kind}</h5>
        <h5 className="text-xl">Storage: {pc.storage.storageCapacity}</h5>
        <h5 className="text-xl">Brand: {pc.storage.brand}</h5>
        <h5 className="text-xl">Model: {pc.storage.name}</h5>
      </div>
      <div className="m-2 flex items-center justify-around pt-3">
        <h1 className="text-4xl">Gaming: {pc.gamingPower}%</h1>
        <h1 className="text-4xl">Work: {pc.workingPower}%</h1>
      </div>
    </div>
  );
}
