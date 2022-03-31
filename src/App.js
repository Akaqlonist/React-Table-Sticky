import React from "react";
import styled from "styled-components";
import { useTable, useBlockLayout } from "react-table";
import { stickyHeaderGroups, stickyRow } from "react-table-sticky";

import makeData from "./makeData";

const Styles = styled.div`
  .table {
    border: 1px solid #ddd;

    .tr {
      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th,
    .td {
      padding: 5px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      background-color: #fff;

      :last-child {
        border-right: 0;
      }
    }

    &.sticky {
      overflow: scroll;

      .header {
        position: sticky;
        top: 0;
        z-index: 1;
      }

      .body {
        position: relative;
        z-index: 0;
      }

      .tr[data-sticky-last-header-tr] {
        box-shadow: 0px 3px 3px #ccc;
      }

      .td,
      .th {
        overflow: hidden;

        &[data-sticky-last-left-td] {
          box-shadow: 2px 0px 3px #ccc;
        }

        &[data-sticky-first-right-td] {
          box-shadow: -2px 0px 3px #ccc;
        }
      }
    }
  }
`;

function Table({ columns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 150,
      width: 150,
      maxWidth: 400
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      defaultColumn
    },
    useBlockLayout
  );

  return (
    <Styles>
      <div
        {...getTableProps()}
        className="table sticky"
        style={{ width: "100%", height: 400 }}
      >
        <div className="header">
          {stickyHeaderGroups(headerGroups).map(headerGroup => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map(column => (
                <div {...column.getHeaderProps()} className="th">
                  {column.render("Header")}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div {...getTableBodyProps()} className="body">
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="tr">
                {stickyRow(row).cells.map(cell => {
                  return (
                    <div {...cell.getCellProps()} className="td">
                      {cell.render("Cell")}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Styles>
  );
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName"
          },
          {
            Header: "Last Name",
            accessor: "lastName"
          }
        ]
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age",
            sticky: "left",
            width: 50
          },
          {
            Header: "Visits",
            accessor: "visits",
            width: 60
          },
          {
            Header: "Status",
            accessor: "status"
          }
        ]
      },
      {
        Header: " ",
        sticky: "right",
        columns: [
          {
            Header: "Profile Progress",
            accessor: "progress"
          }
        ]
      }
    ],
    []
  );

  const data = React.useMemo(() => makeData(40), []);

  return <Table columns={columns} data={data} />;
}

export default App;
