interface GridProps {
  depth: number;
  limit?: number;
}

export default function Grid({ depth, limit = 3 }: GridProps) {
  if (depth <= 0) {
    return null;
  }

  return (
    <div className="flex flex-col w-full">
      {Array.from({ length: limit }, (_, i) => (
        <div className="w-full flex" key={i + 15}>
          {Array.from({ length: limit }, (_, j) => (
            <div
              className={`${i === limit - 1 ? '' : 'border-b-4'}  ${
                j === limit - 1 ? '' : 'border-r-4'
              } border-black w-full p-6`}
              key={j}
            >
              <Grid depth={depth - 1} limit={limit} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
