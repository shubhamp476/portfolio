type Props = {
  value: string;
  limit: number;
  label?: string;
};

export default function WordCounter({ value, limit, label }: Props) {
  const count = value.length;
  const isOver = count > limit;

  return (
    <div className="text-sm mt-1 flex justify-between">
      <span className="text-neutral-500">
        {label}
      </span>
      <span className={isOver ? "text-red-600" : "text-neutral-500"}>
        {count}/{limit}
      </span>
    </div>
  );
}
