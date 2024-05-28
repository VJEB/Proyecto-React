import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { tasks } from './data/tasks'
import { columns } from './components/columns'
import { useEffect, useState } from 'react'
import { cargarAduanas } from './data/data'

export default function PagAduanas({ title = 'Aduanas' }: { title?: string }) {
  const [aduanas, setAduanas] = useState()
  useEffect(() => {
    cargarAduanas()
      .then((data) => {
        setAduanas(data)
      })
      .catch((err) => {
        console.log('Error al cargar las aduanas: ' + err)
      })
  }, [])

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        {/* <Search /> */}
        <h1 className='text-4xl'>{title}</h1>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className='flex flex-col' fixedHeight>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Listado de {title.toLowerCase()}
            </h2>
          </div>
        </div>
        {aduanas && (
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <DataTable data={aduanas} columns={columns} />
          </div>
        )}
      </LayoutBody>
    </Layout>
  )
}
