const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { name: string; field: string; className?: string; visible: boolean }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="w-full mx-auto mt-4 font-['Inter','Inter_Fallback'] font-medium text-[0.9375rem]">

      <thead>
        <tr className="text-left font-medium bg-slate-50 text-2xl h-15 uppercase tracking-wide text-sm">
          {columns.map((col) => (
            <th key={col.field} className={col.className}>{col.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>

  );
};
export default Table;