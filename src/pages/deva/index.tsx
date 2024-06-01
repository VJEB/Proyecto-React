import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useContext, useEffect, useState } from 'react'
import { getDevas } from './data/data'
import { Button } from '@/components/custom/button'
import { IconPlus, IconArrowBack } from '@tabler/icons-react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Deva } from './data/schema'
import { useToast } from '@/components/ui/use-toast'
import { ThemeProviderContext } from '@/components/theme-provider'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { DropdownMenu } from '@/components/ui/dropdown-menu'

export default function PagDeva({
  title = 'Declaración de Valor',
}: {
  title?: string
}) {
  const context = useContext(ThemeProviderContext)
  const [devas, setDevas] = useState<Deva[]>()
  const [mostrarForm, setMostrarForm] = useState(false)

  const { toast } = useToast()
  const [deva, setDeva] = useState<Deva>({
    deva_Id: 0,
    deva_AduanaIngresoId: 0,
    adua_IngresoNombre: '',
    adua_IngresoCodigo: '',
    adua_DespachoCodigo: '',
    regi_Id: 0,
    regi_Codigo: '',
    regi_Descripcion: '',
    inco_Codigo: null,
    duca_No_DUCA: null,
    deva_AduanaDespachoId: 0,
    adua_DespachoNombre: '',
    deva_DeclaracionMercancia: '',
    deva_FechaAceptacion: new Date().toISOString(),
    deva_Finalizacion: false,
    deva_PagoEfectuado: null,
    pais_ExportacionId: null,
    pais_ExportacionNombre: null,
    deva_FechaExportacion: new Date().toISOString(),
    mone_Id: null,
    mone_Otra: null,
    monedaNombre: null,
    deva_ConversionDolares: null,
    emba_Id: null,
    lugarEmbarque: null,
    nico_Id: 0,
    nico_Descripcion: '',
    emba_Codigo: null,
    impo_Id: 0,
    impo_NumRegistro: '',
    impo_RTN: '',
    impo_NivelComercial_Otro: null,
    impo_Nombre_Raso: '',
    impo_Direccion_Exacta: '',
    impo_CiudadNombre: '',
    impo_PaisNombre: '',
    impo_Correo_Electronico: '',
    impo_Telefono: '',
    impo_Fax: null,
    impo_ciudId: 0,
    impo_paisId: 0,
    coco_Id: 0,
    coco_Descripcion: '',
    pvde_Condicion_Otra: null,
    pvde_Id: 0,
    prov_NumeroIdentificacion: '',
    prov_Nombre_Raso: '',
    prov_Direccion_Exacta: '',
    prov_CiudadNombre: '',
    prov_PaisNombre: '',
    prov_Correo_Electronico: '',
    prov_Telefono: '',
    prov_Fax: null,
    prov_ciudId: 0,
    prov_paisId: 0,
    tite_Id: null,
    tipoIntermediario: null,
    inte_Id: null,
    inte_ciudId: null,
    inte_paisId: null,
    inte_Tipo_Otro: null,
    inte_NumeroIdentificacion: null,
    inte_Nombre_Raso: null,
    inte_Direccion_Exacta: null,
    inte_Correo_Electronico: null,
    inte_CiudadNombre: null,
    inte_PaisNombre: null,
    inte_Telefono: null,
    inte_Fax: null,
    deva_LugarEntrega: null,
    pais_EntregaId: null,
    pais_EntregaNombre: null,
    inco_Descripcion: null,
    inco_Version: null,
    deva_NumeroContrato: null,
    deva_FechaContrato: new Date().toISOString(),
    foen_Id: null,
    foen_Descripcion: null,
    deva_FormaEnvioOtra: null,
    fopa_Id: null,
    fopa_Descripcion: null,
    deva_FormaPagoOtra: null,
    codi_Id: null,
    codi_Restricciones_Utilizacion: null,
    codi_Indicar_Restricciones_Utilizacion: null,
    codi_Depende_Precio_Condicion: null,
    codi_Indicar_Existe_Condicion: null,
    codi_Condicionada_Revertir: null,
    codi_Vinculacion_Comprador_Vendedor: null,
    codi_Tipo_Vinculacion: null,
    codi_Vinculacion_Influye_Precio: null,
    codi_Pagos_Descuentos_Indirectos: null,
    codi_Concepto_Monto_Declarado: null,
    codi_Existen_Canones: null,
    codi_Indicar_Canones: null,
    base_Id: null,
    base_PrecioFactura: null,
    base_PagosIndirectos: null,
    base_PrecioReal: null,
    base_MontCondicion: null,
    base_MontoReversion: null,
    base_ComisionCorrelaje: null,
    base_Gasto_Envase_Embalaje: null,
    base_ValoresMateriales_Incorporado: null,
    base_Valor_Materiales_Utilizados: null,
    base_Valor_Materiales_Consumidos: null,
    base_Valor_Ingenieria_Importado: null,
    base_Valor_Canones: null,
    base_Gasto_TransporteM_Importada: null,
    base_Gastos_Carga_Importada: null,
    base_Costos_Seguro: null,
    base_Total_Ajustes_Precio_Pagado: null,
    base_Gastos_Asistencia_Tecnica: null,
    base_Gastos_Transporte_Posterior: null,
    base_Derechos_Impuestos: null,
    base_Monto_Intereses: null,
    base_Deducciones_Legales: null,
    base_Total_Deducciones_Precio: null,
    base_Valor_Aduana: null,
    usua_UsuarioCreacion: 0,
    usua_CreacionNombre: '',
    deva_FechaCreacion: new Date().toISOString(),
    usua_ModificacionNombre: '',
    deva_FechaModificacion: new Date().toISOString(),
    deva_Estado: false,
  })
  useEffect(() => {
    context.setMostrarDetalle(0)
    getDevas()
      .then((data) => {
        setDevas(data)
      })
      .catch((err) => {
        console.log('Error al cargar las devas: ' + err)
      })
  }, [context.refrescar])

  useEffect(() => {
    const devaEncontrado = devas?.find(
      (item) => item.deva_Id === context.devaId
    )

    if (devaEncontrado) {
      setDeva(devaEncontrado)
    }
    if (context.procId) {
      setMostrarForm(true)
    }
  }, [context.devaId])

  useEffect(() => {
    const devaEncontrada = devas?.find(
      (item) => item.deva_Id === context.mostrarDetalle
    )

    if (devaEncontrada) {
      setDeva(devaEncontrada)
    }
  }, [context.mostrarDetalle])

  console.log(mostrarForm)

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

      {context.mostrarDetalle !== 0 ? (
        <LayoutBody className='flex flex-col' fixedHeight>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <h2 className='text-2xl font-bold tracking-tight'>Detalle</h2>
            <Button
              variant={'outline'}
              onClick={() => context.setMostrarDetalle(0)}
            >
              <IconArrowBack stroke={1.5} className='mr-1 h-5 w-5' />
              Regresar
            </Button>
          </div>
          {deva && (
            <div className='mb-2 flex flex-col items-center justify-between space-y-8 rounded border bg-slate-900 p-8'></div>
          )}
        </LayoutBody>
      ) : mostrarForm && devas ? (
        <FormDeva devas={devas} />
      ) : (
        <LayoutBody className='flex flex-col' fixedHeight>
          <div className='mb-2 flex items-center justify-between space-y-2'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>
                Listado de {title.toLowerCase()}
              </h2>
            </div>
          </div>
          {devas && (
            <>
              <div className='mb-2 flex items-center justify-between space-y-2'>
                <Button
                  onClick={() => {
                    setDeva({
                      deva_Id: 0,
                      deva_AduanaIngresoId: 0,
                      adua_IngresoNombre: '',
                      adua_IngresoCodigo: '',
                      adua_DespachoCodigo: '',
                      regi_Id: 0,
                      regi_Codigo: '',
                      regi_Descripcion: '',
                      inco_Codigo: null,
                      duca_No_DUCA: null,
                      deva_AduanaDespachoId: 0,
                      adua_DespachoNombre: '',
                      deva_DeclaracionMercancia: '',
                      deva_FechaAceptacion: new Date().toISOString(),
                      deva_Finalizacion: false,
                      deva_PagoEfectuado: null,
                      pais_ExportacionId: null,
                      pais_ExportacionNombre: null,
                      deva_FechaExportacion: new Date().toISOString(),
                      mone_Id: null,
                      mone_Otra: null,
                      monedaNombre: null,
                      deva_ConversionDolares: null,
                      emba_Id: null,
                      lugarEmbarque: null,
                      nico_Id: 0,
                      nico_Descripcion: '',
                      emba_Codigo: null,
                      impo_Id: 0,
                      impo_NumRegistro: '',
                      impo_RTN: '',
                      impo_NivelComercial_Otro: null,
                      impo_Nombre_Raso: '',
                      impo_Direccion_Exacta: '',
                      impo_CiudadNombre: '',
                      impo_PaisNombre: '',
                      impo_Correo_Electronico: '',
                      impo_Telefono: '',
                      impo_Fax: null,
                      impo_ciudId: 0,
                      impo_paisId: 0,
                      coco_Id: 0,
                      coco_Descripcion: '',
                      pvde_Condicion_Otra: null,
                      pvde_Id: 0,
                      prov_NumeroIdentificacion: '',
                      prov_Nombre_Raso: '',
                      prov_Direccion_Exacta: '',
                      prov_CiudadNombre: '',
                      prov_PaisNombre: '',
                      prov_Correo_Electronico: '',
                      prov_Telefono: '',
                      prov_Fax: null,
                      prov_ciudId: 0,
                      prov_paisId: 0,
                      tite_Id: null,
                      tipoIntermediario: null,
                      inte_Id: null,
                      inte_ciudId: null,
                      inte_paisId: null,
                      inte_Tipo_Otro: null,
                      inte_NumeroIdentificacion: null,
                      inte_Nombre_Raso: null,
                      inte_Direccion_Exacta: null,
                      inte_Correo_Electronico: null,
                      inte_CiudadNombre: null,
                      inte_PaisNombre: null,
                      inte_Telefono: null,
                      inte_Fax: null,
                      deva_LugarEntrega: null,
                      pais_EntregaId: null,
                      pais_EntregaNombre: null,
                      inco_Descripcion: null,
                      inco_Version: null,
                      deva_NumeroContrato: null,
                      deva_FechaContrato: new Date().toISOString(),
                      foen_Id: null,
                      foen_Descripcion: null,
                      deva_FormaEnvioOtra: null,
                      fopa_Id: null,
                      fopa_Descripcion: null,
                      deva_FormaPagoOtra: null,
                      codi_Id: null,
                      codi_Restricciones_Utilizacion: null,
                      codi_Indicar_Restricciones_Utilizacion: null,
                      codi_Depende_Precio_Condicion: null,
                      codi_Indicar_Existe_Condicion: null,
                      codi_Condicionada_Revertir: null,
                      codi_Vinculacion_Comprador_Vendedor: null,
                      codi_Tipo_Vinculacion: null,
                      codi_Vinculacion_Influye_Precio: null,
                      codi_Pagos_Descuentos_Indirectos: null,
                      codi_Concepto_Monto_Declarado: null,
                      codi_Existen_Canones: null,
                      codi_Indicar_Canones: null,
                      base_Id: null,
                      base_PrecioFactura: null,
                      base_PagosIndirectos: null,
                      base_PrecioReal: null,
                      base_MontCondicion: null,
                      base_MontoReversion: null,
                      base_ComisionCorrelaje: null,
                      base_Gasto_Envase_Embalaje: null,
                      base_ValoresMateriales_Incorporado: null,
                      base_Valor_Materiales_Utilizados: null,
                      base_Valor_Materiales_Consumidos: null,
                      base_Valor_Ingenieria_Importado: null,
                      base_Valor_Canones: null,
                      base_Gasto_TransporteM_Importada: null,
                      base_Gastos_Carga_Importada: null,
                      base_Costos_Seguro: null,
                      base_Total_Ajustes_Precio_Pagado: null,
                      base_Gastos_Asistencia_Tecnica: null,
                      base_Gastos_Transporte_Posterior: null,
                      base_Derechos_Impuestos: null,
                      base_Monto_Intereses: null,
                      base_Deducciones_Legales: null,
                      base_Total_Deducciones_Precio: null,
                      base_Valor_Aduana: null,
                      usua_UsuarioCreacion: 0,
                      usua_CreacionNombre: '',
                      deva_FechaCreacion: new Date().toISOString(),
                      usua_ModificacionNombre: '',
                      deva_FechaModificacion: new Date().toISOString(),
                      deva_Estado: false,
                    })
                    setMostrarForm(true)
                  }}
                >
                  <IconPlus stroke={1.5} className='mr-1 h-5 w-5' /> Nuevo
                </Button>
              </div>
              <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                <DataTable data={devas} columns={columns} />
              </div>
            </>
          )}
        </LayoutBody>
      )}
    </Layout>
  )
}

function FormDeva({ devas }: { devas: Deva[] }) {
  const [aduseling, setAduseling] = useState('Seleccionar Aduana de Ingreso')
  const [aduselect, setAduselect] = useState('Seleccionar Aduana de Despacho')
  const [dropdownOpen1, setDropdownOpen1] = useState(false)
  const [dropdownOpen2, setDropdownOpen2] = useState(false)

  const toggleDropdown1 = () => setDropdownOpen1((prevState) => !prevState)
  const toggleDropdown2 = () => setDropdownOpen2((prevState) => !prevState)

  const aduSelectIn = (id: number, aduana: string) => {
    setAduseling(aduana)
    // Handle selection logic
  }

  const aduSelect = (id: number, aduana: string) => {
    setAduselect(aduana)
    // Handle selection logic
  }

  const GuardarDeva = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission
  }
  return (
    <LayoutBody className='flex flex-col' fixedHeight>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>
            Formulario de Declaración de Valor
          </h2>
        </div>
      </div>
      <Card className='p-3'>
        <h6>I. Información General</h6>
        <h6>A. Información General de la Aduana</h6>
        <div className='flex'>
          <div className='flex flex-col'>
            <Label>1. Aduana de Ingreso</Label>
            {/* <DropdownMenu isOpen={dropdownOpen1} toggle={toggleDropdown1}>
                    <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
                      <DropdownMenu>
                        {aduanas.map((pais) => (
                          <DropdownItem
                            key={pais.Id}
                            onClick={() => aduSelectIn(pais.Id, pais.Aduana)}
                          >
                            {pais.Aduana}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </DropdownMenu> */}
          </div>
          <div className='flex flex-col'>
            {/* <FormGroup>
                  <Label for='aduanaDespacho'>2. Aduana de Despacho</Label>
                  <Dropdown isOpen={dropdownOpen2} toggle={toggleDropdown2}>
                    <DropdownToggle caret>{aduselect}</DropdownToggle>
                    <DropdownMenu>
                      {aduanas.map((pais) => (
                        <DropdownItem
                          key={pais.Id}
                          onClick={() => aduSelect(pais.Id, pais.Aduana)}
                        >
                          {pais.Aduana}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </FormGroup> */}
          </div>
        </div>
        <Button type='submit'>Guardar</Button>
      </Card>
    </LayoutBody>
  )
}
