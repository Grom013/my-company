import { TableHeader, TableBody } from "./index";

const Table = ({ onSort, selectedSort, columns, data, children }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader {...{ onSort, selectedSort, columns }} />
          <TableBody {...{ columns, data }} />
        </>
      )}
    </table>
  );
};

export default Table;
