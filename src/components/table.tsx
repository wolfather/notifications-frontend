'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useVirtualizer } from '@tanstack/react-virtual'

import { fetchData, Person } from  './fakeapi/getdata'

export default function Home() {
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState(1)
  const [data, setData] = useState<Person[]>([])
  const [totalRowCount, setTotalRowCount] = useState<number>(0)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 60,
      },
      {
        accessorKey: 'firstName',
        cell: info => info.getValue(),
      },
      {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        size: 50,
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        size: 50,
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        size: 80,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: info => info.getValue<Date>().toLocaleString(),
        size: 200,
      },
    ],
    []
  )

  const fetchNextPage = useCallback(() => {
    setIsLoading(true)
    fetchData(page, sorting)
    .then(res => {
      setData(prev => [...prev, res.data].flat())
      setTotalRowCount(res.meta.totalRowCount)
      setHasNextPage(res.hasNext)
    })
    .catch(console.log)
    .finally(() => {
      setIsLoading(false)
    })
  }, [page, sorting])

  useEffect(() => {
    fetchData(1, sorting)
      .then(res => {
        setData(res.data)
        setTotalRowCount(res.meta.totalRowCount)
        setHasNextPage(res.hasNext)
      })
      .catch(console.log)

  }, [sorting])
  // console.log({data})

  const totalFetched = data.length
  console.log({ totalFetched })

  const fetchMoreOnBottomReached = useCallback(
    (tableContainerRef?: HTMLDivElement | null) => {
      if (tableContainerRef) {
        const { scrollHeight, scrollTop, clientHeight } = tableContainerRef
        console.log({ totalFetched, totalRowCount }, (scrollHeight - scrollTop - clientHeight), 500)
        if (
          (scrollHeight - scrollTop - clientHeight) < 500 &&
          !isLoading &&
          totalFetched < totalRowCount
        ) {
          setPage(prev => (prev+1))
          //fetchNextPage()
        }
      }
    },
    [isLoading, totalFetched, totalRowCount]
  )

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current)
  }, [fetchMoreOnBottomReached])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    debugTable: true,
  })

  const handleSortingChange: OnChangeFn<SortingState> = updater => {
    setSorting(updater)
    if (!!table.getRowModel().rows.length) {
      rowVirtualizer.scrollToIndex?.(0)
    }
  }

  table.setOptions(prev => ({
    ...prev,
    onSortingChange: handleSortingChange,
  }))

  const { rows } = table.getRowModel()

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  })

  // if (isLoading) {
  //   return <>Loading...</>
  // }

  return (
    <div className="app">
      ({data.length} of {totalRowCount} rows fetched)
      <p>{page}</p>
      <div
        className="container"
        onScroll={e => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
        ref={tableContainerRef}
        style={{
          overflow: 'auto', //our scrollable table container
          position: 'relative', //needed for sticky header
          height: '500px', //should be a fixed height
        }}
      >
        <Table style={{ display: 'grid' }}>
          <TableHeader
            style={{
              display: 'grid',
              position: 'sticky',
              top: 0,
              zIndex: 1,
            }}
          >
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow
                key={headerGroup.id}
                style={{ display: 'flex', width: '100%' }}
              >
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        display: 'flex',
                        width: header.getSize(),
                      }}
                    >
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: '^',
                          desc: 'v',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody
            style={{
              display: 'grid',
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map(virtualRow => {
              const row = rows[virtualRow.index] as Row<Person>
              return (
                <TableRow
                  data-index={virtualRow.index}
                  ref={node => rowVirtualizer.measureElement(node)}
                  key={row.id}
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    transform: `translateY(${virtualRow.start}px)`,
                    width: '100%',
                  }}
                >
                  {row.getVisibleCells().map(cell => {
                    return (
                      <TableCell
                        key={cell.id}
                        style={{
                          display: 'flex',
                          width: cell.column.getSize(),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      {isLoading ? <>{JSON.stringify(hasNextPage)} - {JSON.stringify(isLoading)}</> : <></>}
    </div>
  )
}
