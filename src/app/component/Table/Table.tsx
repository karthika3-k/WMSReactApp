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
        <table className="w-full mt-4">
      <thead>
        <tr className="text-left font-medium bg-slate-50 text-gray-500 h-15 text-sm">
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