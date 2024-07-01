export interface TransactionsEntity {
    dateSettlement: string
    datePreference: string
    code: {
        code: string
    },
    name: string
    amount: number
}

export interface ResponseFactory {
    accountId: string
    transactions: TransactionsEntity[]
}


const makeItems = () => {
    const totalItems = 36
    const response = {
        accountId: 'account123',
        transactions: [],
        pageInfo: {
            isFirst: true,
            hasNext: true
        }
    };

    const transactions = []
    for(let i = 0; i < totalItems; i++) {
        transactions.push({
            dateSettlement: '21-01-2023',
            datePreference: '22-01-2023',
            code: {
                code: `CODE-${i}`
            },
            name: 'PRODUCT-INVESTMENT',
            amount: Math.round(Math.random() * 2000).toFixed(2)
        })
    }

    return {...response, transactions}
}

export function getTransactionsFactory(page: number) {
    const chunkSize = 10;
    const { transactions, pageInfo, accountId } = makeItems()
    let pageChunkIndex = 0;
    const result = transactions.reduce((acc, item, index) => {
        const chunkIndex = Math.floor(index / chunkSize);
        pageChunkIndex = chunkIndex
        if (!acc[chunkIndex]) {
            acc[chunkIndex] = [];
        }
        
        acc[chunkIndex].push(item);
        
        return acc;
    }, []);
    
    if(page < pageChunkIndex) {
        const _pageInfo = { ...pageInfo, hasNext: page < pageChunkIndex }
        return { accountId, pageInfo: _pageInfo, transactions: result }
    }
    return {}
}


import { ColumnSort, SortingState } from '@tanstack/react-table'

export type Person = {
  id: number
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: string
  createdAt: string
}

export type PersonApiResponse = {
  data: Person[]
  meta: {
    totalRowCount: number
  }
}

const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = (index: number): Person => {
  return {
    id: index + 1,
    firstName: `abc ${index +1}`,
    lastName: `cxz  ${index +1}`,
    age: index + 1,
    visits:  index +1,
    progress: 80,
    createdAt: '22-10-2022',
    status: 'up',
  }
}

export function makeData(lens: number) {
    const items = []
    for(let i = 0; i < lens; i++) {
        items.push(newPerson(i))
    }
    console.log(items[12])

    return items
}

const data = makeData(1000)

//simulates a backend api
export const fetchData = async (
  start: number,
  sorting: SortingState
) => {
    console.log({start})
    const size = 10
    const startIndex = (start * size) - size
    let isLoading = false

  const dbData = [...data]
  if (sorting.length) {
    const sort = sorting[0] as ColumnSort
    const { id, desc } = sort as { id: keyof Person; desc: boolean }
    dbData.sort((a, b) => {
      if (desc) {
        return a[id] < b[id] ? 1 : -1
      }
      return a[id] > b[id] ? 1 : -1
    })
  }

  //simulate a backend api
  isLoading = true
  await new Promise(resolve => setTimeout(resolve, 430))
  isLoading = false

  if(start < Math.floor(data.length / size)) {
    return {
        isFirst: start === 0,
        isLoading,
        hasNext: start < Math.floor(data.length / size),
        isFetching: true,
        data: dbData.slice(startIndex, (start + size) -1),
        meta: {
            totalRowCount: dbData.length,
        },
    }
  }
  return {
    isFirst: false,
    hasNext: false,
    isLoading,
    isFetching: false,
    data: [],
    meta: {
        totalRowCount: dbData.length,
    }
  }
}
