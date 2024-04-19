import React from 'react'

function Table({ columnNames, dataArray, classNames}) {
    return (
        <table>
            <thead>
                <tr>
                    {
                        columnNames.map((col, ind) => <th>{col}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    //data is an object within dataArray
                    dataArray.map((data, ind) => {

                        let temp = [<td>{ind + 1}</td>]

                        let values = Object.values(data)
                        values.forEach(value => {
                            temp.push(<td>{value}</td>)
                        })

                        return (<tr key={ind}>{temp.map(data => data)}</tr>)
                    })
                }
            </tbody>
        </table>
    )
}

export default Table