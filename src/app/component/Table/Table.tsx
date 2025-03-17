const Table = ({ columns }: { columns: { name: string, field: string, visible: boolean } }) => {
    return (
        <table className="w-full mt-4">
            <thead>
                <tr>
                    {/* {columns.map((col)=>(
                        <th key={col.name}></th>
                    )
                    )} */}
                </tr>
            </thead>
        </table>
    );
};
export default Table;