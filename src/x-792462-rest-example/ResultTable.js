const ResultTable = ({data}) => {
  return (
    <table>
      <thead>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
      </thead>
      <tbody>
        {data.map(row => {
          return <tr>
            <td>{row.first_name}</td>
            <td>{row.last_name}</td>
            <td>{row.email}</td>
          </tr>
        })}
      </tbody>
    </table>
  )
}

export default ResultTable