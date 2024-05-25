import InnerGrid from './InnerGrid';

export default function Grid() {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex">
        <div className="border-b-4 border-r-4 border-black w-full p-4">
          <InnerGrid />
        </div>
        <div className="border-b-4 border-r-4 border-black w-full p-4">
          <InnerGrid />
        </div>
        <div className="border-b-4 border-black w-full p-4">
          <InnerGrid />
        </div>
      </div>
      <div className="w-full flex">
        <div className="border-b-4 border-r-4 border-black w-full p-4">
          <InnerGrid />
        </div>
        <div className="border-b-4 border-r-4 border-black w-full p-4">
          <InnerGrid />
        </div>
        <div className="border-b-4 border-black w-full p-4">
          <InnerGrid />
        </div>
      </div>
      <div className="w-full flex">
        <div className="border-r-4 border-black w-full p-4">
          <InnerGrid />
        </div>
        <div className="border-r-4 border-black w-full p-4">
          <InnerGrid />
        </div>
        <div className="border-black w-full p-4">
          <InnerGrid />
        </div>
      </div>
    </div>
  );
}
