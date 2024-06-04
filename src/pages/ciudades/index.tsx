import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useEffect, useState } from 'react'
import { cargarCiudades } from './data/data'

export default function PagCiudades({ title = 'Ciudades' }: { title?: string }) {
  const [ciudades, setCiudades] = useState()
  useEffect(() => {
    cargarCiudades()
      .then((data) => {
        setCiudades(data)
      })
      .catch((err) => {
        console.log('Error al cargar las ciudades:' + err)
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
              Listado de ciudades de aduanas
            </h2>
          </div>
        </div>
        {ciudades && (
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <DataTable data={ciudades} columns={columns} />
          </div>
        )}
      </LayoutBody>
    </Layout>
  )
}
