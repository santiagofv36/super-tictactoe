export default function InnerGrid() {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div
          role="button"
          className="border-b-4 border-r-4 border-black p-8"
        ></div>
        <div
          role="button"
          className="border-b-4 border-r-4 border-black p-8"
        ></div>
        <div role="button" className="border-b-4 border-black p-8"></div>
      </div>
      <div className="flex">
        <div
          role="button"
          className="border-b-4 border-r-4 border-black p-8"
        ></div>
        <div
          role="button"
          className="border-b-4 border-r-4 border-black p-8"
        ></div>
        <div role="button" className="border-b-4 border-black p-8"></div>
      </div>
      <div className="flex">
        <div role="button" className="border-r-4 border-black p-8"></div>
        <div role="button" className="border-r-4 border-black p-8"></div>
        <div role="button" className="border-black p-8"></div>
      </div>
    </div>
  );
}
