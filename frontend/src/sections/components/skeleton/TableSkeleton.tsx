export function TableSkeleton () {
  return (
    <table>
      <thead>
        <tr>
          <th>...header loading</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Loading...</td>          
        </tr>
        <tr>
          <td>Loading...</td>          
        </tr>
        <tr>
          <td>Loading...</td>          
        </tr>
      </tbody>
    </table>
  );
}

export default TableSkeleton;