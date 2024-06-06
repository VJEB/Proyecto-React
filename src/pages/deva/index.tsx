import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { FactDataTable } from './facturaComponents/data-table'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { factColumns } from './facturaComponents/columns'
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  getAduanas,
  getAranceles,
  getCiudades,
  getCondicionesComerciales,
  getDevas,
  getEmbarques,
  getEstadosMercancia,
  getFacturas,
  getFormasDeEnvio,
  getFormasDePago,
  getIncoterms,
  getMonedas,
  getNivelesComerciales,
  getPaises,
  getTiposDeIntermediarios,
  getUnidadesDeMedida,
  guardarFactura,
  guardarItem,
  guardarTab1,
  guardarTab2,
  guardarTab3,
} from './data/data'
import { Button } from '@/components/custom/button'
import {
  IconPlus,
  IconArrowBack,
  IconCaretUpDown,
  IconCheck,
} from '@tabler/icons-react'
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
import {
  Aduana,
  AranDetalle,
  Arancel,
  Ciudad,
  CondicionComercial,
  Deva,
  DevaCompuesta,
  Embarque,
  EstadoDeMercancia,
  Factura,
  FormaDeEnvio,
  FormaDePago,
  Incoterm,
  Item,
  Moneda,
  NivelComercial,
  Pais,
  TipoDeIntermediario,
  UnidadDeMedida,
} from './data/schema'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from '@radix-ui/react-icons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { aranColumns } from './arancelesDatatable/columns'
import { AranDataTable } from './arancelesDatatable/data-table'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'

export default function PagDeva({
  title = 'Declaración de Valor',
}: {
  title?: string
}) {
  const context = useContext(ThemeProviderContext)
  const [devas, setDevas] = useState<Deva[]>()
  const [mostrarForm, setMostrarForm] = useState(false)

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
    if (context.devaId) {
      setMostrarForm(true)
    }
  }, [context.devaId])

  // useEffect(() => {
  //   const devaEncontrada = devas?.find(
  //     (item) => item.deva_Id === context.mostrarDetalle
  //   )

  //   if (devaEncontrada) {
  //     setDeva(devaEncontrada)
  //   }
  // }, [context.mostrarDetalle])

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
          {devaId && (
            <div className='mb-2 flex flex-col items-center justify-between space-y-8 rounded border bg-slate-900 p-8'></div>
          )}
        </LayoutBody>
      ) : mostrarForm ? (
        <FormDeva devas={devas} setMostrarForm={setMostrarForm} />
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

function FormDeva({
  devas,
  setMostrarForm,
}: {
  devas: Deva[]
  setMostrarForm: (bool: boolean) => void
}) {
  const context = useContext(ThemeProviderContext)
  const [deva, setDeva] = useState<DevaCompuesta>({
    declaraciones_ValorViewModel: {
      deva_Id: 0,
      deva_AduanaIngresoId: 0,
      adua_IngresoNombre: '',
      deva_AduanaDespachoId: 0,
      adua_DespachoNombre: '',
      deva_DeclaracionMercancia: 'Nuevo',
      deva_FechaAceptacion: new Date().toISOString(),
      regi_Id: 1,
      regi_Codigo: '',
      regi_Descripcion: '',
      impo_RTN: '',
      impo_Id: 0,
      impo_NumRegistro: '',
      nico_Id: 0,
      nico_Descripcion: '',
      impo_NivelComercial_Otro: '',
      impo_Nombre_Raso: '',
      impo_Direccion_Exacta: '',
      impo_Correo_Electronico: '',
      impo_Telefono: '',
      impo_Fax: '',
      impo_ciudId: 0,
      pvde_Id: 0,
      prov_Nombre_Raso: '',
      prov_Direccion_Exacta: '',
      prov_Correo_Electronico: '',
      prov_Telefono: '',
      prov_Fax: '',
      prov_ciudId: 0,
      coco_Id: 0,
      coco_Descripcion: '',
      pvde_Condicion_Otra: '',
      inte_Id: 0,
      tite_Id: 0,
      inte_Nombre_Raso: '',
      inte_Direccion_Exacta: '',
      inte_Correo_Electronico: '',
      inte_Telefono: '',
      inte_Fax: '',
      inte_ciudId: 0,
      deva_LugarEntrega: '',
      pais_EntregaId: 0,
      inco_Id: 0,
      inco_Descripcion: '',
      inco_Version: '',
      deva_NumeroContrato: '',
      deva_FechaContrato: new Date().toISOString(),
      foen_Id: 0,
      foen_Descripcion: '',
      deva_FormaEnvioOtra: '',
      deva_PagoEfectuado: false,
      fopa_Id: 0,
      deva_FormaPagoOtra: '',
      emba_Id: 0,
      pais_ExportacionId: 0,
      deva_FechaExportacion: new Date().toISOString(),
      mone_Id: 0,
      mone_Otra: '',
      deva_ConversionDolares: 0,
      deva_Condiciones: '',
      usua_UsuarioCreacion: 1,
      usua_CreacionNombre: '',
      deva_FechaCreacion: new Date().toISOString(),
      usua_UsuarioModificacion: 1,
      usua_ModificacionNombre: '',
      deva_FechaModificacion: new Date().toISOString(),
      deva_Estado: false,
      usua_UsuarioEliminacion: 1,
      deva_FechaEliminacion: new Date().toISOString(),
    },
    declarantesImpo_ViewModel: {
      decl_Id: 0,
      decl_NumeroIdentificacion: '',
      decl_Nombre_Raso: '',
      decl_Direccion_Exacta: '',
      ciud_Id: 0,
      decl_Correo_Electronico: '',
      decl_Telefono: '',
      decl_Fax: '',
      usua_UsuarioCreacion: 1,
      decl_FechaCreacion: new Date().toISOString(),
      usua_UsuarioModificacion: 1,
      decl_FechaModificacion: new Date().toISOString(),
      usua_UsuarioEliminacion: 1,
      decl_FechaEliminacion: new Date().toISOString(),
      decl_Estado: false,
      nico_Id: 0,
      impo_NivelComercial_Otro: '',
      impo_RTN: '',
      impo_NumRegistro: '',
      tite_Id: 0,
      inte_Tipo_Otro: '',
      coco_Id: 0,
      pvde_Condicion_Otra: '',
    },
    declarantesProv_ViewModel: {
      decl_Id: 0,
      decl_NumeroIdentificacion: '',
      decl_Nombre_Raso: '',
      decl_Direccion_Exacta: '',
      ciud_Id: 0,
      decl_Correo_Electronico: '',
      decl_Telefono: '',
      decl_Fax: '',
      usua_UsuarioCreacion: 1,
      decl_FechaCreacion: new Date().toISOString(),
      usua_UsuarioModificacion: 1,
      decl_FechaModificacion: new Date().toISOString(),
      usua_UsuarioEliminacion: 1,
      decl_FechaEliminacion: new Date().toISOString(),
      decl_Estado: false,
      nico_Id: 0,
      impo_NivelComercial_Otro: '',
      impo_RTN: '',
      impo_NumRegistro: '',
      tite_Id: 0,
      inte_Tipo_Otro: '',
      coco_Id: 0,
      pvde_Condicion_Otra: '',
    },
    declarantesInte_ViewModel: {
      decl_Id: 0,
      decl_NumeroIdentificacion: '',
      decl_Nombre_Raso: '',
      decl_Direccion_Exacta: '',
      ciud_Id: 0,
      decl_Correo_Electronico: '',
      decl_Telefono: '',
      decl_Fax: '',
      usua_UsuarioCreacion: 1,
      decl_FechaCreacion: new Date().toISOString(),
      usua_UsuarioModificacion: 1,
      decl_FechaModificacion: new Date().toISOString(),
      usua_UsuarioEliminacion: 1,
      decl_FechaEliminacion: new Date().toISOString(),
      decl_Estado: false,
      nico_Id: 0,
      impo_NivelComercial_Otro: '',
      impo_RTN: '',
      impo_NumRegistro: '',
      tite_Id: 0,
      inte_Tipo_Otro: '',
      coco_Id: 0,
      pvde_Condicion_Otra: '',
    },
    importadoresViewModel: {
      impo_Id: 0,
      nico_Id: 0,
      decl_Id: 0,
      impo_NivelComercial_Otro: '',
      impo_RTN: '',
      impo_NumRegistro: '',
      usua_UsuarioCreacion: 1,
      impo_FechaCreacion: new Date().toISOString(),
      usua_UsuarioModificacion: 1,
      impo_FechaModificacion: new Date().toISOString(),
      usua_UsuarioEliminacion: 1,
      impo_FechaEliminacion: new Date().toISOString(),
      impo_Estado: false,
    },
    proveedoresDeclaracionViewModel: {
      pvde_Id: 0,
      coco_Id: 0,
      pvde_Condicion_Otra: '',
      decl_Id: 0,
      usua_UsuarioCreacion: 1,
      pvde_FechaCreacion: new Date().toISOString(),
      usua_UsuarioModificacion: 1,
      pvde_FechaModificacion: new Date().toISOString(),
      usua_UsuarioEliminacion: 1,
      pvde_FechaEliminacion: new Date().toISOString(),
      pvde_Estado: false,
    },
    intermediarioViewModel: {
      inte_Id: 0,
      tite_Id: 0,
      inte_Tipo_Otro: '',
      decl_Id: 0,
      usua_UsuarioCreacion: 1,
      inte_FechaCreacion: new Date().toISOString(),
      usua_UsuarioModificacion: 1,
      inte_FechaModificacion: new Date().toISOString(),
      usua_UsuarioEliminacion: 1,
      inte_FechaEliminacion: new Date().toISOString(),
      inte_Estado: false,
    },
  })

  const [paisImportador, setPaisImportador] = useState<{
    pais_Id: number
    pais_Codigo: string
    pais_Nombre: string
  } | null>(null)
  const [paisProveedor, setPaisProveedor] = useState<{
    pais_Id: number
    pais_Codigo: string
    pais_Nombre: string
  } | null>(null)
  const [paisIntermediario, setPaisIntermediario] = useState<{
    pais_Id: number
    pais_Codigo: string
    pais_Nombre: string
  } | null>(null)

  const [paisEmbarque, setPaisEmbarque] = useState<{
    pais_Id: number
    pais_Codigo: string
    pais_Nombre: string
  } | null>(null)

  const [ciudades, setCiudades] = useState<Ciudad[]>([])
  const [validar, setValidar] = useState(false)
  const [paises, setPaises] = useState<
    { pais_Id: number; pais_Codigo: string; pais_Nombre: string }[]
  >([])

  const tabs = [
    'general',
    'proveedor',
    'caracteristicas',
    'facturas',
    'condiciones',
    'valorAduana',
    'finalizar',
  ]
  const [tab, setTab] = useState('general')
  const [tabObjetivo, setTabObjetivo] = useState(0)

  const onTabChange = (str: string) => {
    setTabObjetivo(tabs.indexOf(str))
    if (tabs.indexOf(str) < tabs.indexOf(tab)) {
      setTab(str)
    } else {
      setValidar((prev) => !prev)
    }
  }

  const { toast } = useToast()

  const errorToast = (message: string) => {
    toast({
      title: 'Error: ',
      variant: 'destructive',
      description: message,
    })
  }

  useEffect(() => {
    getCiudades()
      .then((data: Ciudad[]) => {
        setCiudades(data)
        const paisesReduced = data.reduce(
          (
            acc: {
              pais_Id: number
              pais_Codigo: string
              pais_Nombre: string
            }[],
            ciudad: Ciudad
          ) => {
            const existingPais = acc.find(
              (pais) => pais.pais_Codigo === ciudad.pais_Codigo
            )
            if (!existingPais) {
              acc.push({
                pais_Id: ciudad.pais_Id,
                pais_Codigo: ciudad.pais_Codigo,
                pais_Nombre: ciudad.pais_Nombre,
              })
            }
            return acc
          },
          []
        )
        setPaises(paisesReduced)
        const dev = devas.find((de) => de.deva_Id === context.devaId)

        if (dev?.impo_ciudId) {
          const ciudad = data.find((ciud) => ciud.ciud_Id === dev.impo_ciudId)
          if (ciudad) {
            const pai = paisesReduced.find(
              (pais) => pais.pais_Id === ciudad.pais_Id
            )
            if (pai) {
              setPaisImportador(pai)
            }
          }
        }

        if (dev?.prov_ciudId) {
          const ciudad = data.find((ciud) => ciud.ciud_Id === dev.prov_ciudId)
          if (ciudad) {
            const pai = paisesReduced.find(
              (pais) => pais.pais_Id === ciudad.pais_Id
            )
            if (pai) {
              setPaisProveedor(pai)
            }
          }
        }

        if (dev?.inte_ciudId) {
          const ciudad = data.find((ciud) => ciud.ciud_Id === dev.inte_ciudId)
          if (ciudad) {
            const pai = paisesReduced.find(
              (pais) => pais.pais_Id === ciudad.pais_Id
            )
            if (pai) {
              setPaisIntermediario(pai)
            }
          }
        }
      })
      .catch((err) => {
        console.log('Error al cargar las ciudades: ' + err)
      })
  }, [])

  useEffect(() => {
    if (context.devaId) {
      const dev = devas.find((de) => de.deva_Id === context.devaId)
      if (dev) {
        context.setEditandoTab3(dev.deva_LugarEntrega ? true : false)
        setDeva((prev) => {
          return {
            ...prev,
            declarantesInte_ViewModel: {
              ...prev.declarantesInte_ViewModel,
              decl_Nombre_Raso: dev.inte_Nombre_Raso ?? '',
              decl_NumeroIdentificacion: dev.inte_NumeroIdentificacion ?? '',
              decl_Direccion_Exacta: dev.inte_Direccion_Exacta ?? '',
              ciud_Id: dev.inte_ciudId ?? 0,
              decl_Correo_Electronico: dev.inte_Correo_Electronico ?? '',
              decl_Telefono: dev.inte_Telefono ?? '',
              decl_Fax: dev.inte_Fax ?? '',
              tite_Id: dev.tite_Id ?? 0,
              decl_Id: dev.inte_Id ?? 0,
              inte_Tipo_Otro: dev.inte_Tipo_Otro ?? '',
            },
            intermediarioViewModel: {
              ...prev.intermediarioViewModel,
              inte_Id: dev.inte_Id ?? 0,
              inte_Tipo_Otro: dev.inte_Tipo_Otro ?? '',
              decl_Id: dev.inte_Id ?? 0,
              tite_Id: dev.tite_Id ?? 0,
            },
            declarantesProv_ViewModel: {
              ...prev.declarantesProv_ViewModel,
              decl_Nombre_Raso: dev.prov_Nombre_Raso ?? '',
              decl_NumeroIdentificacion: dev.prov_NumeroIdentificacion ?? '',
              decl_Direccion_Exacta: dev.prov_Direccion_Exacta ?? '',
              ciud_Id: dev.prov_ciudId ?? 0,
              decl_Correo_Electronico: dev.prov_Correo_Electronico ?? '',
              decl_Telefono: dev.prov_Telefono ?? '',
              decl_Fax: dev.prov_Fax ?? '',
              decl_Id: dev.pvde_Id ?? 0,
              coco_Id: dev.coco_Id ?? 0,
              pvde_Condicion_Otra: dev.pvde_Condicion_Otra ?? '',
            },
            proveedoresDeclaracionViewModel: {
              ...prev.proveedoresDeclaracionViewModel,
              pvde_Id: dev.pvde_Id ?? 0,
              pvde_Condicion_Otra: dev.pvde_Condicion_Otra ?? '',
              coco_Id: dev.coco_Id ?? 0,
              decl_Id: dev.pvde_Id ?? 0,
            },
            declarantesImpo_ViewModel: {
              ...prev.declarantesImpo_ViewModel,
              decl_Nombre_Raso: dev.impo_Nombre_Raso ?? '',
              impo_RTN: dev.impo_RTN ?? '',
              impo_NumRegistro: dev.impo_NumRegistro ?? '',
              decl_Direccion_Exacta: dev.impo_Direccion_Exacta ?? '',
              ciud_Id: dev.impo_ciudId ?? 0,
              decl_Correo_Electronico: dev.impo_Correo_Electronico ?? '',
              decl_Telefono: dev.impo_Telefono ?? '',
              decl_Fax: dev.impo_Fax ?? '',
              nico_Id: dev.nico_Id ?? 0,
              decl_Id: dev.impo_Id ?? 0,
              impo_NivelComercial_Otro: dev.impo_NivelComercial_Otro ?? '',
            },
            importadoresViewModel: {
              ...prev.importadoresViewModel,
              impo_Id: dev.impo_Id ?? 0,
              impo_NivelComercial_Otro: dev.impo_NivelComercial_Otro ?? '',
              impo_RTN: dev.impo_RTN ?? '',
              impo_NumRegistro: dev.impo_NumRegistro ?? '',
              nico_Id: dev.nico_Id ?? 0,
            },
            declaraciones_ValorViewModel: {
              ...prev.declaraciones_ValorViewModel,
              usua_UsuarioModificacion: 1,
              impo_Telefono: dev.impo_Telefono ?? '',
              impo_Fax: dev.impo_Fax ?? '',
              nico_Id: dev.nico_Id ?? 0,
              impo_Id: dev.impo_Id ?? 0,
              impo_NivelComercial_Otro: dev.impo_NivelComercial_Otro ?? '',
              impo_Direccion_Exacta: dev.impo_Direccion_Exacta ?? '',
              deva_Id: context.devaId,
              impo_Correo_Electronico: dev.impo_Correo_Electronico ?? '',
              impo_Nombre_Raso: dev.impo_Nombre_Raso ?? '',
              deva_DeclaracionMercancia:
                dev.deva_DeclaracionMercancia ?? 'Nuevo',
              deva_FechaAceptacion:
                dev.deva_FechaAceptacion ?? new Date().toISOString(),
              deva_AduanaIngresoId: dev.deva_AduanaIngresoId ?? 0,
              adua_IngresoNombre: dev.adua_IngresoNombre ?? '',
              deva_AduanaDespachoId: dev.deva_AduanaDespachoId ?? 0,
              adua_DespachoNombre: dev.adua_DespachoNombre ?? '',
              deva_FormaPagoOtra: dev.deva_FormaPagoOtra ?? '',
              fopa_Id: dev.fopa_Id ?? 0,
              deva_FormaEnvioOtra: dev.deva_FormaEnvioOtra ?? '',
              foen_Descripcion: dev.foen_Descripcion ?? '',
              foen_Id: dev.foen_Id ?? 0,
              deva_FechaContrato:
                dev.deva_FechaContrato ?? new Date().toISOString(),
              deva_NumeroContrato: dev.deva_NumeroContrato ?? '',
              inco_Descripcion: dev.inco_Descripcion ?? '',
              deva_PagoEfectuado: dev?.deva_PagoEfectuado ?? false,
              pais_ExportacionId: dev?.pais_ExportacionId ?? 0,
              deva_FechaExportacion:
                dev?.deva_FechaExportacion ?? new Date().toISOString(),
              mone_Id: dev?.mone_Id ?? 0,
              mone_Otra: dev?.mone_Otra ?? '',
              deva_ConversionDolares: dev?.deva_ConversionDolares ?? 1,
              emba_Id: dev?.emba_Id ?? 0,
              pvde_Condicion_Otra: dev?.pvde_Condicion_Otra ?? '',
              prov_Fax: dev?.prov_Fax ?? '',
              tite_Id: dev?.tite_Id ?? 0,
              inte_Id: dev?.inte_Id ?? 0,
              inte_ciudId: dev?.inte_ciudId ?? 0,
              inte_Nombre_Raso: dev?.inte_Nombre_Raso
                ? dev?.inte_Nombre_Raso.toString()
                : '',
              inte_Direccion_Exacta: dev.inte_Direccion_Exacta ?? '',
              inte_Correo_Electronico: dev.inte_Correo_Electronico ?? '',
              inte_Telefono: dev.inte_Telefono ?? '',
              inte_Fax: dev.inte_Fax ?? '',
              deva_LugarEntrega: dev.deva_LugarEntrega ?? '',
              pais_EntregaId: dev.pais_EntregaId ?? 0,
              inco_Version: dev.inco_Version ?? '',
              emba_Codigo: dev.emba_Codigo ?? '',
            },
          }
        })
      }
    } else {
      context.setEditandoTab3(false)
      setDeva({
        declaraciones_ValorViewModel: {
          deva_Id: 0,
          deva_AduanaIngresoId: 0,
          adua_IngresoNombre: '',
          deva_AduanaDespachoId: 0,
          adua_DespachoNombre: '',
          deva_DeclaracionMercancia: 'Nuevo',
          deva_FechaAceptacion: new Date().toISOString(),
          regi_Id: 1,
          regi_Codigo: '',
          regi_Descripcion: '',
          impo_RTN: '',
          impo_Id: 0,
          impo_NumRegistro: '',
          nico_Id: 0,
          nico_Descripcion: '',
          impo_NivelComercial_Otro: '',
          impo_Nombre_Raso: '',
          impo_Direccion_Exacta: '',
          impo_Correo_Electronico: '',
          impo_Telefono: '',
          impo_Fax: '',
          impo_ciudId: 0,
          pvde_Id: 0,
          prov_Nombre_Raso: '',
          prov_Direccion_Exacta: '',
          prov_Correo_Electronico: '',
          prov_Telefono: '',
          prov_Fax: '',
          prov_ciudId: 0,
          coco_Id: 0,
          coco_Descripcion: '',
          pvde_Condicion_Otra: '',
          inte_Id: 0,
          tite_Id: 0,
          inte_Nombre_Raso: '',
          inte_Direccion_Exacta: '',
          inte_Correo_Electronico: '',
          inte_Telefono: '',
          inte_Fax: '',
          inte_ciudId: 0,
          deva_LugarEntrega: '',
          pais_EntregaId: 0,
          inco_Id: 0,
          inco_Descripcion: '',
          inco_Version: '',
          deva_NumeroContrato: '',
          deva_FechaContrato: new Date().toISOString(),
          foen_Id: 0,
          foen_Descripcion: '',
          deva_FormaEnvioOtra: '',
          deva_PagoEfectuado: false,
          fopa_Id: 0,
          deva_FormaPagoOtra: '',
          emba_Id: 0,
          pais_ExportacionId: 0,
          deva_FechaExportacion: new Date().toISOString(),
          mone_Id: 0,
          mone_Otra: '',
          deva_ConversionDolares: 0,
          deva_Condiciones: '',
          usua_UsuarioCreacion: 1,
          usua_CreacionNombre: '',
          deva_FechaCreacion: new Date().toISOString(),
          usua_UsuarioModificacion: 1,
          usua_ModificacionNombre: '',
          deva_FechaModificacion: new Date().toISOString(),
          deva_Estado: false,
          usua_UsuarioEliminacion: 1,
          deva_FechaEliminacion: new Date().toISOString(),
        },
        declarantesImpo_ViewModel: {
          decl_Id: 0,
          decl_NumeroIdentificacion: '',
          decl_Nombre_Raso: '',
          decl_Direccion_Exacta: '',
          ciud_Id: 0,
          decl_Correo_Electronico: '',
          decl_Telefono: '',
          decl_Fax: '',
          usua_UsuarioCreacion: 1,
          decl_FechaCreacion: new Date().toISOString(),
          usua_UsuarioModificacion: 1,
          decl_FechaModificacion: new Date().toISOString(),
          usua_UsuarioEliminacion: 1,
          decl_FechaEliminacion: new Date().toISOString(),
          decl_Estado: false,
          nico_Id: 0,
          impo_NivelComercial_Otro: '',
          impo_RTN: '',
          impo_NumRegistro: '',
          tite_Id: 0,
          inte_Tipo_Otro: '',
          coco_Id: 0,
          pvde_Condicion_Otra: '',
        },
        declarantesProv_ViewModel: {
          decl_Id: 0,
          decl_NumeroIdentificacion: '',
          decl_Nombre_Raso: '',
          decl_Direccion_Exacta: '',
          ciud_Id: 0,
          decl_Correo_Electronico: '',
          decl_Telefono: '',
          decl_Fax: '',
          usua_UsuarioCreacion: 1,
          decl_FechaCreacion: new Date().toISOString(),
          usua_UsuarioModificacion: 1,
          decl_FechaModificacion: new Date().toISOString(),
          usua_UsuarioEliminacion: 1,
          decl_FechaEliminacion: new Date().toISOString(),
          decl_Estado: false,
          nico_Id: 0,
          impo_NivelComercial_Otro: '',
          impo_RTN: '',
          impo_NumRegistro: '',
          tite_Id: 0,
          inte_Tipo_Otro: '',
          coco_Id: 0,
          pvde_Condicion_Otra: '',
        },
        declarantesInte_ViewModel: {
          decl_Id: 0,
          decl_NumeroIdentificacion: '',
          decl_Nombre_Raso: '',
          decl_Direccion_Exacta: '',
          ciud_Id: 0,
          decl_Correo_Electronico: '',
          decl_Telefono: '',
          decl_Fax: '',
          usua_UsuarioCreacion: 1,
          decl_FechaCreacion: new Date().toISOString(),
          usua_UsuarioModificacion: 1,
          decl_FechaModificacion: new Date().toISOString(),
          usua_UsuarioEliminacion: 1,
          decl_FechaEliminacion: new Date().toISOString(),
          decl_Estado: false,
          nico_Id: 0,
          impo_NivelComercial_Otro: '',
          impo_RTN: '',
          impo_NumRegistro: '',
          tite_Id: 0,
          inte_Tipo_Otro: '',
          coco_Id: 0,
          pvde_Condicion_Otra: '',
        },
        importadoresViewModel: {
          impo_Id: 0,
          nico_Id: 0,
          decl_Id: 0,
          impo_NivelComercial_Otro: '',
          impo_RTN: '',
          impo_NumRegistro: '',
          usua_UsuarioCreacion: 1,
          impo_FechaCreacion: new Date().toISOString(),
          usua_UsuarioModificacion: 1,
          impo_FechaModificacion: new Date().toISOString(),
          usua_UsuarioEliminacion: 1,
          impo_FechaEliminacion: new Date().toISOString(),
          impo_Estado: false,
        },
        proveedoresDeclaracionViewModel: {
          pvde_Id: 0,
          coco_Id: 0,
          pvde_Condicion_Otra: '',
          decl_Id: 0,
          usua_UsuarioCreacion: 1,
          pvde_FechaCreacion: new Date().toISOString(),
          usua_UsuarioModificacion: 1,
          pvde_FechaModificacion: new Date().toISOString(),
          usua_UsuarioEliminacion: 1,
          pvde_FechaEliminacion: new Date().toISOString(),
          pvde_Estado: false,
        },
        intermediarioViewModel: {
          inte_Id: 0,
          tite_Id: 0,
          inte_Tipo_Otro: '',
          decl_Id: 0,
          usua_UsuarioCreacion: 1,
          inte_FechaCreacion: new Date().toISOString(),
          usua_UsuarioModificacion: 1,
          inte_FechaModificacion: new Date().toISOString(),
          usua_UsuarioEliminacion: 1,
          inte_FechaEliminacion: new Date().toISOString(),
          inte_Estado: false,
        },
      })
    }
  }, [context.devaId])

  return (
    <LayoutBody className='flex flex-col' fixedHeight>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>
            Formulario de Declaración de Valor
          </h2>
        </div>
      </div>

      <Tabs value={tab} onValueChange={onTabChange}>
        <TabsList className='flex h-auto w-full flex-wrap'>
          <TabsTrigger value={'general'}>Información General</TabsTrigger>
          <TabsTrigger value={'proveedor'}>Proveedor</TabsTrigger>
          <TabsTrigger value={'caracteristicas'}>Características</TabsTrigger>
          <TabsTrigger value={'facturas'}>Facturas</TabsTrigger>
          <TabsTrigger value={'condiciones'}>Condiciones</TabsTrigger>
          <TabsTrigger value={'valorAduana'}>Valor Aduana</TabsTrigger>
          <TabsTrigger value={'finalizar'}>Finalizar</TabsTrigger>
        </TabsList>
        <TabsContent value={'general'}>
          <FormGeneral
            validar={validar}
            tabIndex={0}
            tabObjetivo={tabObjetivo}
            tabs={tabs}
            setTab={setTab}
            ciudades={ciudades}
            paises={paises}
            paisImportador={paisImportador}
            setPaisImportador={setPaisImportador}
            deva={deva}
            setDeva={setDeva}
            errorToast={errorToast}
            setMostrarForm={setMostrarForm}
          />
        </TabsContent>
        <TabsContent value={'proveedor'}>
          <FormProveedor
            validar={validar}
            tabIndex={1}
            tabObjetivo={tabObjetivo}
            setTabObjetivo={setTabObjetivo}
            tabs={tabs}
            setTab={setTab}
            paisProveedor={paisProveedor}
            setPaisProveedor={setPaisProveedor}
            paisIntermediario={paisIntermediario}
            setPaisIntermediario={setPaisIntermediario}
            ciudades={ciudades}
            paises={paises}
            deva={deva}
            setDeva={setDeva}
            errorToast={errorToast}
          />
        </TabsContent>
        <TabsContent value={'caracteristicas'}>
          <FormCaracteristicas
            deva={deva}
            setDeva={setDeva}
            validar={validar}
            paisEmbarque={paisEmbarque}
            setPaisEmbarque={setPaisEmbarque}
            tabIndex={2}
            setTabObjetivo={setTabObjetivo}
            tabObjetivo={tabObjetivo}
            tabs={tabs}
            setTab={setTab}
            errorToast={errorToast}
          />
        </TabsContent>
        <TabsContent value={'facturas'}>
          <FormFactura
            validar={validar}
            tabIndex={3}
            tabObjetivo={tabObjetivo}
            setTabObjetivo={setTabObjetivo}
            tabs={tabs}
            setTab={setTab}
            deva={deva}
            errorToast={errorToast}
          />
        </TabsContent>
        <TabsContent value={'condiciones'}>
          <FormCondiciones
            validar={validar}
            tabIndex={4}
            tabObjetivo={tabObjetivo}
            tabs={tabs}
            setTab={setTab}
            errorToast={errorToast}
          />
        </TabsContent>
        <TabsContent value={'valorAduana'}>
          <FormValorAduana
            validar={validar}
            tabIndex={5}
            tabObjetivo={tabObjetivo}
            tabs={tabs}
            setTab={setTab}
            errorToast={errorToast}
          />
        </TabsContent>
        <TabsContent value={'finalizar'}>
          <FormFinalizar
            tabIndex={6}
            tabObjetivo={tabObjetivo}
            tabs={tabs}
            setTab={setTab}
          />
        </TabsContent>
      </Tabs>
    </LayoutBody>
  )
}

function FormGeneral({
  validar,
  tabIndex,
  tabs,
  tabObjetivo,
  setTab,
  ciudades,
  paises,
  paisImportador,
  setPaisImportador,
  deva,
  setDeva,
  errorToast,
  setMostrarForm,
}: {
  validar: boolean
  tabIndex: number
  tabs: string[]
  tabObjetivo: number
  setTab: Dispatch<SetStateAction<string>>
  ciudades: Ciudad[]
  paises: { pais_Id: number; pais_Nombre: string; pais_Codigo: string }[]
  paisImportador: {
    pais_Id: number
    pais_Codigo: string
    pais_Nombre: string
  } | null
  setPaisImportador: Dispatch<
    SetStateAction<{
      pais_Id: number
      pais_Codigo: string
      pais_Nombre: string
    } | null>
  >
  deva: DevaCompuesta
  setDeva: Dispatch<SetStateAction<DevaCompuesta>>
  errorToast: (message: string) => void
  setMostrarForm: (bool: boolean) => void
}) {
  const [aduanas, setAduanas] = useState<Aduana[]>([])
  const [nicos, setNicos] = useState<NivelComercial[]>([])
  const { toast } = useToast()

  const context = useContext(ThemeProviderContext)

  const [cbbAduaIngresoState, setCbbAduaIngresoState] = useState(false)
  const [cbbAduaDespachoState, setCbbAduaDespachoState] = useState(false)

  const [cbbPaisImportadorState, setCbbPaisImportadorState] = useState(false)
  const [cbbCiudadImportadorState, setCbbCiudadImportadorState] =
    useState(false)
  const [cbbNicoImportadorState, setCbbNicoImportadorState] = useState(false)
  const [regresarDialogState, setRegresarDialogState] = useState(false)

  const inputGeneralRefs = useRef<
    (HTMLInputElement | HTMLButtonElement | null)[]
  >([])

  // const [bloquearValidacion, setBloquearValidacion] = useState(true)

  const validarInfoGeneral = () => {
    let huboError = false
    inputGeneralRefs.current.forEach((input) => {
      if (huboError) {
        return
      }
      const elementType = input?.tagName
      if (elementType === 'INPUT' && !input?.disabled && !input?.value) {
        errorToast(
          `Por favor ingrese ${input?.parentElement?.children[0].textContent}`
        )
        huboError = true
      } else if (
        elementType === 'BUTTON' &&
        input?.dataset.selected !== 'true'
      ) {
        errorToast(
          `Por favor seleccione ${input?.parentElement?.children[0].textContent}`
        )
        huboError = true
      }
    })
    return huboError
  }

  useEffect(() => {
    getAduanas()
      .then((data) => {
        setAduanas(data)
      })
      .catch((err) => {
        console.log('Error al cargar las aduanas: ' + err)
      })
    getNivelesComerciales()
      .then((data) => {
        setNicos(data)
      })
      .catch((err) => {
        console.log('Error al cargar los niveles comerciales: ' + err)
      })
    // setBloquearValidacion(false)
  }, [])

  useEffect(() => {
    if (tabObjetivo > tabIndex) {
      !validarInfoGeneral() && setTab(tabs[tabIndex + 1])
    }
  }, [validar])

  return (
    <Card className='p-3'>
      <h5>I. Información General</h5>
      <h6>A. Información General de la Aduana</h6>
      <div className='my-2 flex flex-wrap justify-evenly gap-2'>
        <div className='flex flex-col gap-1'>
          <Label>1. Aduana de Ingreso</Label>
          <Popover
            open={cbbAduaIngresoState}
            onOpenChange={setCbbAduaIngresoState}
          >
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                className='mb-2 w-[200px] justify-between overflow-hidden'
                ref={(input) => (inputGeneralRefs.current[0] = input)}
                data-selected={
                  deva.declaraciones_ValorViewModel.adua_IngresoNombre
                    ? true
                    : false
                }
              >
                {deva.declaraciones_ValorViewModel.adua_IngresoNombre
                  ? deva.declaraciones_ValorViewModel.adua_IngresoNombre
                  : '- Seleccione -'}
                <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Buscar aduana...' />
                <CommandList>
                  <CommandEmpty>No hay aduanas.</CommandEmpty>
                  <CommandGroup>
                    {aduanas.map((aduana) => (
                      <CommandItem
                        key={aduana.adua_Id}
                        onSelect={() => {
                          setDeva((deva) => {
                            return {
                              ...deva,
                              declaraciones_ValorViewModel: {
                                ...deva.declaraciones_ValorViewModel,
                                deva_AduanaIngresoId: aduana.adua_Id,
                                adua_IngresoNombre: aduana.adua_Nombre,
                              },
                            }
                          })
                          setCbbAduaIngresoState(false)
                        }}
                      >
                        <IconCheck
                          className={cn(
                            'mr-2 h-4 w-4',
                            deva.declaraciones_ValorViewModel
                              .deva_AduanaIngresoId === aduana.adua_Id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {aduana.adua_Nombre}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex flex-col gap-1'>
          <Label>2. Aduana de Despacho</Label>
          <Popover
            open={cbbAduaDespachoState}
            onOpenChange={setCbbAduaDespachoState}
          >
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                className='mb-2 w-[200px] justify-between overflow-hidden'
                ref={(input) => (inputGeneralRefs.current[1] = input)}
                data-selected={
                  deva.declaraciones_ValorViewModel.adua_DespachoNombre
                    ? true
                    : false
                }
              >
                {deva.declaraciones_ValorViewModel.adua_DespachoNombre
                  ? deva.declaraciones_ValorViewModel.adua_DespachoNombre
                  : '- Seleccione -'}
                <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Buscar aduana...' />
                <CommandList>
                  <CommandEmpty>No hay aduanas.</CommandEmpty>
                  <CommandGroup>
                    {aduanas.map((aduana) => (
                      <CommandItem
                        key={aduana.adua_Id}
                        onSelect={() => {
                          setDeva((deva) => {
                            return {
                              ...deva,
                              declaraciones_ValorViewModel: {
                                ...deva.declaraciones_ValorViewModel,
                                deva_AduanaDespachoId: aduana.adua_Id,
                                adua_DespachoNombre: aduana.adua_Nombre,
                              },
                            }
                          })
                          setCbbAduaIngresoState(false)
                        }}
                      >
                        <IconCheck
                          className={cn(
                            'mr-2 h-4 w-4',
                            deva.declaraciones_ValorViewModel
                              .deva_AduanaDespachoId === aduana.adua_Id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {aduana.adua_Nombre}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex flex-col gap-1'>
          <Label>3. Declaración de Mercancías</Label>
          <RadioGroup
            className='flex w-[200px]'
            value={
              deva.declaraciones_ValorViewModel.deva_DeclaracionMercancia ??
              'Nuevo'
            }
            onValueChange={(val) =>
              setDeva((deva) => {
                return {
                  ...deva,
                  declaraciones_ValorViewModel: {
                    ...deva.declaraciones_ValorViewModel,
                    deva_DeclaracionMercancia: val,
                  },
                }
              })
            }
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='Nuevo' id='declMercNuevo' />
              <Label htmlFor='declMercNuevo'>Nuevo</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='Usado' id='declMercUsado' />
              <Label htmlFor='declMercUsado'>Usado</Label>
            </div>
          </RadioGroup>
        </div>
        <div className='flex flex-col gap-1'>
          <Label>3.1. Fecha de Aceptación</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[200px] justify-start text-left font-normal',
                  !deva.declaraciones_ValorViewModel.deva_FechaAceptacion &&
                    'text-muted-foreground'
                )}
                ref={(input) => (inputGeneralRefs.current[3] = input)}
                data-selected={
                  deva.declaraciones_ValorViewModel.deva_FechaAceptacion
                    ? true
                    : false
                }
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {deva.declaraciones_ValorViewModel.deva_FechaAceptacion ? (
                  <span>
                    {
                      deva.declaraciones_ValorViewModel.deva_FechaAceptacion.split(
                        'T'
                      )[0]
                    }
                  </span>
                ) : (
                  // format(date, 'PPP')
                  <span>Seleccione una fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                selected={
                  deva.declaraciones_ValorViewModel.deva_FechaAceptacion
                    ? new Date(
                        deva.declaraciones_ValorViewModel.deva_FechaAceptacion
                      )
                    : undefined
                }
                onSelect={(e) =>
                  setDeva((deva) => {
                    return {
                      ...deva,
                      declaraciones_ValorViewModel: {
                        ...deva.declaraciones_ValorViewModel,
                        deva_FechaAceptacion: e
                          ? e.toISOString()
                          : new Date().toISOString(),
                      },
                    }
                  })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <h6>B. Información General del Importador</h6>
      <div className='mb-4 mt-2 flex flex-wrap justify-evenly gap-2'>
        <div className='flex flex-col gap-1'>
          <Label>4. Nombre o Razón Social</Label>
          <Input
            ref={(input) => (inputGeneralRefs.current[4] = input)}
            value={
              deva.declaraciones_ValorViewModel.impo_Nombre_Raso
                ? deva.declaraciones_ValorViewModel.impo_Nombre_Raso
                : ''
            }
            onChange={(e) => {
              const regex = /^[\w\s-áéíóú]*$/
              if (regex.test(e.target.value)) {
                setDeva((deva) => {
                  return {
                    ...deva,
                    declaraciones_ValorViewModel: {
                      ...deva.declaraciones_ValorViewModel,
                      impo_Nombre_Raso: e.target.value,
                    },
                    declarantesImpo_ViewModel: {
                      ...deva.declarantesImpo_ViewModel,
                      decl_Nombre_Raso: e.target.value,
                    },
                  }
                })
              }
            }}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>5. Registro Tributario (RTN)</Label>
          <Input
            ref={(input) => (inputGeneralRefs.current[5] = input)}
            value={
              deva.importadoresViewModel.impo_RTN
                ? deva.importadoresViewModel.impo_RTN
                : ''
            }
            onBlur={(e) => {
              const value = e.target.value.replace(/-/g, '')

              setDeva((deva) => {
                return {
                  ...deva,
                  declaraciones_ValorViewModel: {
                    ...deva.declaraciones_ValorViewModel,
                    impo_NumRegistro: value,
                  },
                  importadoresViewModel: {
                    ...deva.importadoresViewModel,
                    impo_NumRegistro: value,
                  },
                  declarantesImpo_ViewModel: {
                    ...deva.declarantesImpo_ViewModel,
                    impo_NumRegistro: value,
                  },
                }
              })
            }}
            onChange={(e) => {
              let value = e.target.value.replace(/-/g, '')

              const regex = /^\d*$/
              if (regex.test(value) && value.length <= 14) {
                if (value.length > 4) {
                  value = value.slice(0, 4) + '-' + value.slice(4)
                }
                if (value.length > 9) {
                  value = value.slice(0, 9) + '-' + value.slice(9)
                }

                setDeva((deva) => ({
                  ...deva,
                  declaraciones_ValorViewModel: {
                    ...deva.declaraciones_ValorViewModel,
                    impo_RTN: value,
                  },
                  importadoresViewModel: {
                    ...deva.importadoresViewModel,
                    impo_RTN: value,
                  },
                  declarantesImpo_ViewModel: {
                    ...deva.declarantesImpo_ViewModel,
                    impo_RTN: value,
                  },
                }))
              }
            }}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>6. Número de Registro</Label>
          <Input
            ref={(input) => (inputGeneralRefs.current[6] = input)}
            value={
              deva.importadoresViewModel.impo_NumRegistro
                ? deva.importadoresViewModel.impo_NumRegistro
                : ''
            }
            onChange={(e) => {
              const regex = /^(\d+)?$/
              if (regex.test(e.target.value) && e.target.value.length <= 14) {
                setDeva((deva) => {
                  return {
                    ...deva,
                    declaraciones_ValorViewModel: {
                      ...deva.declaraciones_ValorViewModel,
                      impo_NumRegistro: e.target.value,
                    },
                    importadoresViewModel: {
                      ...deva.importadoresViewModel,
                      impo_NumRegistro: e.target.value,
                    },
                    declarantesImpo_ViewModel: {
                      ...deva.declarantesImpo_ViewModel,
                      impo_NumRegistro: e.target.value,
                    },
                  }
                })
              }
            }}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>7. Dirección</Label>
          <Input
            ref={(input) => (inputGeneralRefs.current[7] = input)}
            value={
              deva.declaraciones_ValorViewModel.impo_Direccion_Exacta
                ? deva.declaraciones_ValorViewModel.impo_Direccion_Exacta
                : ''
            }
            onChange={(e) => {
              const regex = /^[\w\s-áéíóú]*$/
              if (regex.test(e.target.value)) {
                setDeva((deva) => {
                  return {
                    ...deva,
                    declaraciones_ValorViewModel: {
                      ...deva.declaraciones_ValorViewModel,
                      impo_Direccion_Exacta: e.target.value,
                    },
                    declarantesImpo_ViewModel: {
                      ...deva.declarantesImpo_ViewModel,
                      decl_Direccion_Exacta: e.target.value,
                    },
                  }
                })
              }
            }}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>País del importador</Label>
          <Popover
            open={cbbPaisImportadorState}
            onOpenChange={setCbbPaisImportadorState}
          >
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                className='mb-2 w-[200px] justify-between overflow-hidden'
                ref={(input) => (inputGeneralRefs.current[8] = input)}
                data-selected={paisImportador?.pais_Id ? true : false}
              >
                {paisImportador?.pais_Nombre
                  ? paisImportador?.pais_Codigo +
                    ' | ' +
                    paisImportador?.pais_Nombre
                  : '- Seleccione -'}
                <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Buscar país...' />
                <CommandList>
                  <CommandEmpty>No hay paises.</CommandEmpty>
                  <CommandGroup>
                    {paises.map((pais) => (
                      <CommandItem
                        key={pais.pais_Id}
                        onSelect={() => {
                          setPaisImportador({
                            pais_Id: pais.pais_Id,
                            pais_Codigo: pais.pais_Codigo,
                            pais_Nombre: pais.pais_Nombre,
                          })
                          setCbbPaisImportadorState(false)
                        }}
                      >
                        <IconCheck
                          className={cn(
                            'mr-2 h-4 w-4',
                            paisImportador?.pais_Id === pais.pais_Id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {pais.pais_Codigo} | {pais.pais_Nombre}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Ciudad del importador</Label>
          <Popover
            open={cbbCiudadImportadorState}
            onOpenChange={setCbbCiudadImportadorState}
          >
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                disabled={
                  paisImportador
                    ? !paisImportador?.pais_Id
                      ? true
                      : false
                    : true
                }
                className='mb-2 w-[200px] justify-between overflow-hidden'
                ref={(input) => (inputGeneralRefs.current[9] = input)}
                data-selected={
                  deva.declarantesImpo_ViewModel.ciud_Id ? true : false
                }
              >
                {ciudades.find(
                  (ciud) =>
                    ciud.ciud_Id === deva.declarantesImpo_ViewModel.ciud_Id
                )?.ciud_Nombre
                  ? ciudades.find(
                      (ciud) =>
                        ciud.ciud_Id === deva.declarantesImpo_ViewModel.ciud_Id
                    )?.ciud_Nombre
                  : '- Seleccione -'}
                <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Buscar ciudad...' />
                <CommandList>
                  <CommandEmpty>No hay ciudades.</CommandEmpty>
                  <CommandGroup>
                    {ciudades
                      .filter(
                        (ciud) =>
                          ciud.pais_Codigo === paisImportador?.pais_Codigo
                      )
                      .map((ciudad) => (
                        <CommandItem
                          key={ciudad.ciud_Id}
                          onSelect={() => {
                            setDeva((deva) => {
                              return {
                                ...deva,
                                declaraciones_ValorViewModel: {
                                  ...deva.declaraciones_ValorViewModel,
                                  impo_ciudId: ciudad.ciud_Id,
                                },
                                declarantesImpo_ViewModel: {
                                  ...deva.declarantesImpo_ViewModel,
                                  ciud_Id: ciudad.ciud_Id,
                                },
                              }
                            })
                            setCbbCiudadImportadorState(false)
                          }}
                        >
                          <IconCheck
                            className={cn(
                              'mr-2 h-4 w-4',
                              deva.declaraciones_ValorViewModel.impo_ciudId ===
                                ciudad.ciud_Id
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {ciudad.ciud_Nombre}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Correo del importador</Label>
          <Input
            ref={(input) => (inputGeneralRefs.current[10] = input)}
            value={
              deva.declaraciones_ValorViewModel.impo_Correo_Electronico
                ? deva.declaraciones_ValorViewModel.impo_Correo_Electronico
                : ''
            }
            onChange={(e) => {
              const regex = /^[\w\-.+@]*$/
              if (regex.test(e.target.value)) {
                setDeva((deva) => {
                  return {
                    ...deva,
                    declaraciones_ValorViewModel: {
                      ...deva.declaraciones_ValorViewModel,
                      impo_Correo_Electronico: e.target.value,
                    },
                    declarantesImpo_ViewModel: {
                      ...deva.declarantesImpo_ViewModel,
                      decl_Correo_Electronico: e.target.value,
                    },
                  }
                })
              }
            }}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Teléfono del importador</Label>
          <Input
            ref={(input) => (inputGeneralRefs.current[11] = input)}
            value={
              deva.declaraciones_ValorViewModel.impo_Telefono
                ? deva.declaraciones_ValorViewModel.impo_Telefono
                : ''
            }
            onChange={(e) => {
              const regex = /^[\d\s\-+]*$/
              if (regex.test(e.target.value)) {
                setDeva((deva) => {
                  return {
                    ...deva,
                    declaraciones_ValorViewModel: {
                      ...deva.declaraciones_ValorViewModel,
                      impo_Telefono: e.target.value,
                    },
                    declarantesImpo_ViewModel: {
                      ...deva.declarantesImpo_ViewModel,
                      decl_Telefono: e.target.value,
                    },
                  }
                })
              }
            }}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Fax del importador</Label>
          <Input
            ref={(input) => (inputGeneralRefs.current[12] = input)}
            value={
              deva.declaraciones_ValorViewModel.impo_Fax
                ? deva.declaraciones_ValorViewModel.impo_Fax
                : ''
            }
            onChange={(e) => {
              const regex = /^[\d.]*$/
              if (regex.test(e.target.value)) {
                setDeva((deva) => {
                  return {
                    ...deva,
                    declaraciones_ValorViewModel: {
                      ...deva.declaraciones_ValorViewModel,
                      impo_Fax: e.target.value,
                    },
                    declarantesImpo_ViewModel: {
                      ...deva.declarantesImpo_ViewModel,
                      decl_Fax: e.target.value,
                    },
                  }
                })
              }
            }}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>8. Nivel Comercial</Label>
          <Popover
            open={cbbNicoImportadorState}
            onOpenChange={setCbbNicoImportadorState}
          >
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                className='mb-2 w-[200px] justify-between overflow-hidden'
                ref={(input) => (inputGeneralRefs.current[13] = input)}
                data-selected={
                  deva.declarantesImpo_ViewModel.nico_Id ? true : false
                }
              >
                {nicos.find(
                  (nico) =>
                    nico.nico_Id === deva.declarantesImpo_ViewModel.nico_Id
                )?.nico_Descripcion
                  ? nicos.find(
                      (nico) =>
                        nico.nico_Id === deva.declarantesImpo_ViewModel.nico_Id
                    )?.nico_Descripcion
                  : '- Seleccione -'}
                <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Buscar nivel comercial...' />
                <CommandList>
                  <CommandEmpty>No hay niveles comerciales.</CommandEmpty>
                  <CommandGroup>
                    {nicos.map((nico) => (
                      <CommandItem
                        key={nico.nico_Id}
                        onSelect={() => {
                          setDeva((deva) => {
                            return {
                              ...deva,
                              declaraciones_ValorViewModel: {
                                ...deva.declaraciones_ValorViewModel,
                                nico_Id: nico.nico_Id,
                                nico_Descripcion: nico.nico_Descripcion,
                              },
                              declarantesImpo_ViewModel: {
                                ...deva.declarantesImpo_ViewModel,
                                nico_Id: nico.nico_Id,
                              },
                              importadoresViewModel: {
                                ...deva.importadoresViewModel,
                                nico_Id: nico.nico_Id,
                              },
                            }
                          })
                          setCbbNicoImportadorState(false)
                        }}
                      >
                        <IconCheck
                          className={cn(
                            'mr-2 h-4 w-4',
                            deva.declaraciones_ValorViewModel.nico_Id ===
                              nico.nico_Id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {nico.nico_Descripcion}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Otro nivel comercial</Label>
          <Input
            ref={(input) => (inputGeneralRefs.current[14] = input)}
            value={
              deva.importadoresViewModel.impo_NivelComercial_Otro
                ? deva.importadoresViewModel.impo_NivelComercial_Otro
                : ''
            }
            disabled={
              deva.declaraciones_ValorViewModel.nico_Descripcion !== 'Otros'
            }
            onChange={(e) => {
              const regex = /^[\w\s-áéíóú]*$/
              if (regex.test(e.target.value)) {
                setDeva((deva) => {
                  return {
                    ...deva,
                    declaraciones_ValorViewModel: {
                      ...deva.declaraciones_ValorViewModel,
                      impo_NivelComercial_Otro: e.target.value,
                    },
                    importadoresViewModel: {
                      ...deva.importadoresViewModel,
                      impo_NivelComercial_Otro: e.target.value,
                    },
                    declarantesImpo_ViewModel: {
                      ...deva.declarantesImpo_ViewModel,
                      impo_NivelComercial_Otro: e.target.value,
                    },
                  }
                })
              }
            }}
          />
        </div>
      </div>

      <div className='mr-6 flex justify-end gap-2'>
        <Button
          variant={'outline'}
          onClick={() => {
            context.setRefrescar(!context.refrescar)
            context.setDevaId(0)
            if (!deva.declaraciones_ValorViewModel.deva_Id) {
              setRegresarDialogState(true)
            } else {
              setMostrarForm(false)
            }
          }}
        >
          Regresar
        </Button>
        <Dialog
          open={regresarDialogState}
          onOpenChange={setRegresarDialogState}
        >
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Eliminar factura</DialogTitle>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-1 items-center gap-4'>
                <p>
                  ¿Está seguro de querer regresar? No ha guardado la deva
                  todavía.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  setRegresarDialogState(false)
                }}
                variant='outline'
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  context.setRefrescar(!context.refrescar)
                  context.setDevaId(0)
                  setRegresarDialogState(false)
                  setMostrarForm(false)
                }}
              >
                Regresar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          onClick={() => {
            if (!validarInfoGeneral()) {
              guardarTab1(deva)
                .then((devaId) => {
                  if (deva.declaraciones_ValorViewModel.deva_Id === 0) {
                    setDeva((deva) => {
                      return {
                        ...deva,
                        declaraciones_ValorViewModel: {
                          ...deva.declaraciones_ValorViewModel,
                          deva_Id: devaId,
                        },
                      }
                    })
                  }
                  setTab(tabs[tabIndex + 1])
                  toast({
                    title: 'Éxito: ',
                    description: 'Información general guardada exitosamente!',
                  })
                  context.setRefrescar(!context.refrescar)
                })
                .catch((err) =>
                  console.error('Error al guardar la deva: ' + err)
                )
            }
          }}
        >
          Guardar
        </Button>
      </div>
    </Card>
  )
}

function FormProveedor({
  validar,
  tabIndex,
  tabs,
  tabObjetivo,
  setTabObjetivo,
  setTab,
  paisProveedor,
  setPaisProveedor,
  paisIntermediario,
  setPaisIntermediario,
  paises,
  ciudades,
  deva,
  setDeva,
  errorToast,
}: {
  validar: boolean
  tabIndex: number
  tabs: string[]
  tabObjetivo: number
  setTabObjetivo: Dispatch<SetStateAction<number>>
  paisProveedor: {
    pais_Id: number
    pais_Codigo: string
    pais_Nombre: string
  } | null
  setPaisProveedor: Dispatch<
    SetStateAction<{
      pais_Id: number
      pais_Codigo: string
      pais_Nombre: string
    } | null>
  >
  paisIntermediario: {
    pais_Id: number
    pais_Codigo: string
    pais_Nombre: string
  } | null
  setPaisIntermediario: Dispatch<
    SetStateAction<{
      pais_Id: number
      pais_Codigo: string
      pais_Nombre: string
    } | null>
  >
  setTab: Dispatch<SetStateAction<string>>
  ciudades: Ciudad[]
  paises: { pais_Id: number; pais_Nombre: string; pais_Codigo: string }[]
  deva: DevaCompuesta
  setDeva: Dispatch<SetStateAction<DevaCompuesta>>
  errorToast: (message: string) => void
}) {
  const [condiciones, setCondiciones] = useState<CondicionComercial[]>([])
  const [tiposDeIntermediarios, setTiposDeIntermediarios] = useState<
    TipoDeIntermediario[]
  >([])

  const [cbbPaisProveedorState, setCbbPaisProveedorState] = useState(false)
  const [cbbCiudadProveedorState, setCbbCiudadProveedorState] = useState(false)
  const [cbbCocoProveedorState, setCbbCocoProveedorState] = useState(false)
  const [ckHayIntermediarioState, setCkHayIntermediarioState] = useState(true)

  const [cbbPaisIntermediarioState, setCbbPaisIntermediarioState] =
    useState(false)
  const [cbbCiudadIntermediarioState, setCbbCiudadIntermediarioState] =
    useState(false)
  const [cbbTipoIntermediarioState, setCbbTipoIntermediarioState] =
    useState(false)

  const [bloquearValidacion, setBloquearValidacion] = useState(true)

  const inputProveedorRefs = useRef<
    (HTMLInputElement | HTMLButtonElement | null)[]
  >([])

  const inputIntermediarioRefs = useRef<
    (HTMLInputElement | HTMLButtonElement | null)[]
  >([])

  const validarInputsProveedor = () => {
    let huboError = false
    inputProveedorRefs.current.forEach((input) => {
      if (huboError) {
        return
      }
      const elementType = input?.tagName
      if (elementType === 'INPUT' && !input?.disabled && !input?.value) {
        errorToast(
          `Por favor ingrese ${input?.parentElement?.children[0].textContent}`
        )
        huboError = true
      } else if (
        elementType === 'BUTTON' &&
        input?.dataset.selected !== 'true'
      ) {
        errorToast(
          `Por favor seleccione ${input?.parentElement?.children[0].textContent}`
        )
        huboError = true
      }
    })
    return huboError
  }

  const validarInputsIntermediario = () => {
    let huboError = false
    inputIntermediarioRefs.current.forEach((input) => {
      if (huboError) {
        return
      }
      const elementType = input?.tagName
      if (elementType === 'INPUT' && !input?.disabled && !input?.value) {
        errorToast(
          `Por favor ingrese ${input?.parentElement?.children[0].textContent}`
        )
        huboError = true
      } else if (
        elementType === 'BUTTON' &&
        input?.dataset.selected !== 'true'
      ) {
        errorToast(
          `Por favor seleccione ${input?.parentElement?.children[0].textContent}`
        )
        huboError = true
      }
    })
    return huboError
  }

  useEffect(() => {
    getCondicionesComerciales()
      .then((data) => {
        setCondiciones(data)
      })
      .catch((err) => {
        console.log('Error al cargar las condiciones comerciales: ' + err)
      })
    getTiposDeIntermediarios()
      .then((data) => {
        setTiposDeIntermediarios(data)
      })
      .catch((err) => {
        console.log('Error al cargar los tipos de intermediarios: ' + err)
      })
  }, [])

  useEffect(() => {
    if (tabObjetivo > tabIndex) {
      if (!validarInputsProveedor()) {
        if (ckHayIntermediarioState) {
          !validarInputsIntermediario() && setTab(tabs[tabIndex + 1])
        } else {
          setTab(tabs[tabIndex + 1])
        }
      }
    }
  }, [validar])

  return (
    <Card className='p-3'>
      <h6>C. Información General del Proveedor</h6>
      <div className='mb-4 mt-2 flex flex-wrap justify-evenly gap-2'>
        <div className='flex flex-col gap-1'>
          <Label>9. Nombre o Razón Social</Label>
          <Input
            ref={(input) => (inputProveedorRefs.current[0] = input)}
            value={
              deva.declarantesProv_ViewModel.decl_Nombre_Raso
                ? deva.declarantesProv_ViewModel.decl_Nombre_Raso
                : ''
            }
            onChange={(e) => {
              const regex = /^[\w\s-áéíóú]*$/
              if (regex.test(e.target.value)) {
                setDeva((deva) => {
                  return {
                    ...deva,
                    declaraciones_ValorViewModel: {
                      ...deva.declaraciones_ValorViewModel,
                      prov_Nombre_Raso: e.target.value,
                    },
                    declarantesProv_ViewModel: {
                      ...deva.declarantesProv_ViewModel,
                      decl_Nombre_Raso: e.target.value,
                    },
                  }
                })
              }
            }}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Numero de Identificación</Label>
          <Input
            ref={(input) => (inputProveedorRefs.current[1] = input)}
            value={
              deva.declarantesProv_ViewModel.decl_NumeroIdentificacion
                ? deva.declarantesProv_ViewModel.decl_NumeroIdentificacion
                : ''
            }
            onChange={(e) => {
              const value = e.target.value

              const regex = /^\d*$/
              if (regex.test(value) && value.length <= 13) {
                setDeva((deva) => {
                  return {
                    ...deva,
                    declarantesProv_ViewModel: {
                      ...deva.declarantesProv_ViewModel,
                      decl_NumeroIdentificacion: value,
                      impo_NumRegistro: value,
                    },
                  }
                })
              }
            }}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>10. Dirección</Label>
          <Input
            ref={(input) => (inputProveedorRefs.current[2] = input)}
            value={
              deva.declarantesProv_ViewModel.decl_Direccion_Exacta
                ? deva.declarantesProv_ViewModel.decl_Direccion_Exacta
                : ''
            }
            onChange={(e) => {
              const regex = /^[\w\s-áéíóú]*$/
              if (regex.test(e.target.value)) {
                setDeva((deva) => {
                  return {
                    ...deva,
                    declaraciones_ValorViewModel: {
                      ...deva.declaraciones_ValorViewModel,
                      prov_Direccion_Exacta: e.target.value,
                    },
                    declarantesProv_ViewModel: {
                      ...deva.declarantesProv_ViewModel,
                      decl_Direccion_Exacta: e.target.value,
                    },
                  }
                })
              }
            }}
          />
        </div>

        <div className='flex flex-col gap-1'>
          <Label>País del proveedor</Label>
          <Popover
            open={cbbPaisProveedorState}
            onOpenChange={setCbbPaisProveedorState}
          >
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                className='mb-2 w-[200px] justify-between overflow-hidden'
                ref={(input) => (inputProveedorRefs.current[3] = input)}
                data-selected={paisProveedor?.pais_Id ? true : false}
              >
                {paisProveedor?.pais_Nombre
                  ? paisProveedor?.pais_Codigo +
                    ' | ' +
                    paisProveedor?.pais_Nombre
                  : '- Seleccione -'}
                <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Buscar país...' />
                <CommandList>
                  <CommandEmpty>No hay paises.</CommandEmpty>
                  <CommandGroup>
                    {paises.map((pais) => (
                      <CommandItem
                        key={pais.pais_Id}
                        onSelect={() => {
                          setPaisProveedor({
                            pais_Id: pais.pais_Id,
                            pais_Codigo: pais.pais_Codigo,
                            pais_Nombre: pais.pais_Nombre,
                          })
                          setCbbPaisProveedorState(false)
                        }}
                      >
                        <IconCheck
                          className={cn(
                            'mr-2 h-4 w-4',
                            paisProveedor?.pais_Id === pais.pais_Id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {pais.pais_Codigo} | {pais.pais_Nombre}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Ciudad del proveedor</Label>
          <Popover
            open={cbbCiudadProveedorState}
            onOpenChange={setCbbCiudadProveedorState}
          >
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                disabled={
                  paisProveedor
                    ? !paisProveedor?.pais_Id
                      ? true
                      : false
                    : true
                }
                className='mb-2 w-[200px] justify-between overflow-hidden'
                ref={(input) => (inputProveedorRefs.current[4] = input)}
                data-selected={
                  deva.declarantesProv_ViewModel.ciud_Id ? true : false
                }
              >
                {ciudades.find(
                  (ciud) =>
                    ciud.ciud_Id === deva.declarantesProv_ViewModel.ciud_Id
                )?.ciud_Nombre
                  ? ciudades.find(
                      (ciud) =>
                        ciud.ciud_Id === deva.declarantesProv_ViewModel.ciud_Id
                    )?.ciud_Nombre
                  : '- Seleccione -'}
                <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Buscar ciudad...' />
                <CommandEmpty>No hay ciudades.</CommandEmpty>
                <CommandList>
                  <CommandGroup>
                    {ciudades
                      .filter(
                        (ciud) =>
                          ciud.pais_Codigo === paisProveedor?.pais_Codigo
                      )
                      .map((ciudad) => (
                        <CommandItem
                          key={ciudad.ciud_Id}
                          onSelect={() => {
                            setDeva((deva) => {
                              return {
                                ...deva,
                                declaraciones_ValorViewModel: {
                                  ...deva.declaraciones_ValorViewModel,
                                  prov_ciudId: ciudad.ciud_Id,
                                },
                                declarantesProv_ViewModel: {
                                  ...deva.declarantesProv_ViewModel,
                                  ciud_Id: ciudad.ciud_Id,
                                },
                              }
                            })
                            setCbbCiudadProveedorState(false)
                          }}
                        >
                          <IconCheck
                            className={cn(
                              'mr-2 h-4 w-4',
                              deva.declaraciones_ValorViewModel.prov_ciudId ===
                                ciudad.ciud_Id
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {ciudad.ciud_Nombre}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className='flex flex-col gap-1'>
          <Label>Correo del proveedor</Label>
          <Input
            ref={(input) => (inputProveedorRefs.current[5] = input)}
            value={
              deva.declarantesProv_ViewModel.decl_Correo_Electronico
                ? deva.declarantesProv_ViewModel.decl_Correo_Electronico
                : ''
            }
            onChange={(e) => {
              const regex = /^[\w\-.+@]*$/
              if (regex.test(e.target.value)) {
                setDeva((deva) => {
                  return {
                    ...deva,
                    declaraciones_ValorViewModel: {
                      ...deva.declaraciones_ValorViewModel,
                      prov_Correo_Electronico: e.target.value,
                    },
                    declarantesProv_ViewModel: {
                      ...deva.declarantesProv_ViewModel,
                      decl_Correo_Electronico: e.target.value,
                    },
                  }
                })
              }
            }}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Teléfono del proveedor</Label>
          <Input
            ref={(input) => (inputProveedorRefs.current[6] = input)}
            value={
              deva.declarantesProv_ViewModel.decl_Telefono
                ? deva.declarantesProv_ViewModel.decl_Telefono
                : ''
            }
            onChange={(e) => {
              const regex = /^[\d\s\-+]*$/
              if (regex.test(e.target.value)) {
                setDeva((deva) => {
                  return {
                    ...deva,
                    declaraciones_ValorViewModel: {
                      ...deva.declaraciones_ValorViewModel,
                      prov_Telefono: e.target.value,
                    },
                    declarantesProv_ViewModel: {
                      ...deva.declarantesProv_ViewModel,
                      decl_Telefono: e.target.value,
                    },
                  }
                })
              }
            }}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Fax del proveedor</Label>
          <Input
            ref={(input) => (inputProveedorRefs.current[7] = input)}
            value={
              deva.declarantesProv_ViewModel.decl_Fax
                ? deva.declarantesProv_ViewModel.decl_Fax
                : ''
            }
            onChange={(e) => {
              const regex = /^[\d.]*$/
              if (regex.test(e.target.value)) {
                setDeva((deva) => {
                  return {
                    ...deva,
                    declaraciones_ValorViewModel: {
                      ...deva.declaraciones_ValorViewModel,
                      prov_Fax: e.target.value,
                    },
                    declarantesProv_ViewModel: {
                      ...deva.declarantesProv_ViewModel,
                      decl_Fax: e.target.value,
                    },
                  }
                })
              }
            }}
          />
        </div>

        <div className='flex flex-col gap-1'>
          <Label>11. Condición Comercial</Label>
          <Popover
            open={cbbCocoProveedorState}
            onOpenChange={setCbbCocoProveedorState}
          >
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                className='mb-2 w-[200px] justify-between overflow-hidden'
                ref={(input) => (inputProveedorRefs.current[8] = input)}
                data-selected={
                  deva.declarantesProv_ViewModel.coco_Id ? true : false
                }
              >
                {condiciones.find(
                  (coco) =>
                    coco.coco_Id === deva.declarantesProv_ViewModel.coco_Id
                )?.coco_Descripcion
                  ? condiciones.find(
                      (coco) =>
                        coco.coco_Id === deva.declarantesProv_ViewModel.coco_Id
                    )?.coco_Descripcion
                  : '- Seleccione -'}
                <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Buscar condición comercial...' />
                <CommandList>
                  <CommandEmpty>No hay condiciones comerciales.</CommandEmpty>
                  <CommandGroup>
                    {condiciones.map((coco) => (
                      <CommandItem
                        key={coco.coco_Id}
                        onSelect={() => {
                          setDeva((deva) => {
                            return {
                              ...deva,
                              declaraciones_ValorViewModel: {
                                ...deva.declaraciones_ValorViewModel,
                                coco_Id: coco.coco_Id,
                                coco_Descripcion: coco.coco_Descripcion,
                              },
                              declarantesProv_ViewModel: {
                                ...deva.declarantesProv_ViewModel,
                                coco_Id: coco.coco_Id,
                              },
                              proveedoresDeclaracionViewModel: {
                                ...deva.proveedoresDeclaracionViewModel,
                                coco_Id: coco.coco_Id,
                              },
                            }
                          })
                          setCbbCocoProveedorState(false)
                        }}
                      >
                        <IconCheck
                          className={cn(
                            'mr-2 h-4 w-4',
                            deva.declarantesProv_ViewModel.coco_Id ===
                              coco.coco_Id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {coco.coco_Descripcion}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className='flex flex-col gap-1'>
          <Label>Otra condición</Label>
          <Input
            ref={(input) => (inputProveedorRefs.current[9] = input)}
            value={
              deva.proveedoresDeclaracionViewModel.pvde_Condicion_Otra
                ? deva.proveedoresDeclaracionViewModel.pvde_Condicion_Otra
                : ''
            }
            disabled={deva.declarantesProv_ViewModel.coco_Id !== 4}
            onChange={(e) => {
              const regex = /^[\w\s-áéíóú]*$/
              if (regex.test(e.target.value)) {
                setDeva((deva) => {
                  return {
                    ...deva,
                    declaraciones_ValorViewModel: {
                      ...deva.declaraciones_ValorViewModel,
                      pvde_Condicion_Otra: e.target.value,
                    },
                    proveedoresDeclaracionViewModel: {
                      ...deva.proveedoresDeclaracionViewModel,
                      pvde_Condicion_Otra: e.target.value,
                    },
                    declarantesProv_ViewModel: {
                      ...deva.declarantesProv_ViewModel,
                      pvde_Condicion_Otra: e.target.value,
                    },
                  }
                })
              }
            }}
          />
        </div>
      </div>

      <div className='mb-4 mt-2 flex flex-wrap justify-evenly gap-2'>
        <div className='flex items-center gap-1'>
          <Checkbox
            id='ckHayIntermediario'
            // onClick={() => setCkHayIntermediarioState((prev) => !prev)}
            className='h-[20px] w-[20px]'
          />
          <Label htmlFor='ckHayIntermediario' className='inline-block'>
            Existe Intermediario {ckHayIntermediarioState}
          </Label>
        </div>
      </div>

      <Accordion
        type='single'
        collapsible
        value={ckHayIntermediarioState.toString()}
      >
        <AccordionItem value='true' className='border-b-0'>
          <AccordionContent>
            <h6 className='text-base'>
              D. Información General del Intermediario
            </h6>
            <div className='mb-4 mt-2 flex flex-wrap justify-evenly gap-2'>
              <div className='flex flex-col gap-1'>
                <Label>12. Nombre o Razón Social</Label>
                <Input
                  ref={(input) => (inputIntermediarioRefs.current[0] = input)}
                  value={
                    deva.declaraciones_ValorViewModel.inte_Nombre_Raso
                      ? deva.declaraciones_ValorViewModel.inte_Nombre_Raso
                      : ''
                  }
                  onChange={(e) => {
                    const regex = /^[\w\s-áéíóú]*$/
                    if (regex.test(e.target.value)) {
                      setDeva((deva) => {
                        return {
                          ...deva,
                          declaraciones_ValorViewModel: {
                            ...deva.declaraciones_ValorViewModel,
                            inte_Nombre_Raso: e.target.value,
                          },
                          declarantesInte_ViewModel: {
                            ...deva.declarantesInte_ViewModel,
                            decl_Nombre_Raso: e.target.value,
                          },
                        }
                      })
                    }
                  }}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <Label>Numero de Identificación</Label>
                <Input
                  ref={(input) => (inputIntermediarioRefs.current[1] = input)}
                  value={
                    deva.declarantesInte_ViewModel.decl_NumeroIdentificacion
                      ? deva.declarantesInte_ViewModel.decl_NumeroIdentificacion
                      : ''
                  }
                  onChange={(e) => {
                    const value = e.target.value
                    const regex = /^\d*$/
                    if (regex.test(value) && value.length <= 13) {
                      setDeva((deva) => {
                        return {
                          ...deva,
                          declarantesInte_ViewModel: {
                            ...deva.declarantesInte_ViewModel,
                            decl_NumeroIdentificacion: value,
                            impo_NumRegistro: value,
                          },
                        }
                      })
                    }
                  }}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <Label>13. Dirección</Label>
                <Input
                  ref={(input) => (inputIntermediarioRefs.current[2] = input)}
                  value={
                    deva.declaraciones_ValorViewModel.inte_Direccion_Exacta
                      ? deva.declaraciones_ValorViewModel.inte_Direccion_Exacta
                      : ''
                  }
                  onChange={(e) => {
                    const regex = /^[\w\s-áéíóú]*$/
                    if (regex.test(e.target.value)) {
                      setDeva((deva) => {
                        return {
                          ...deva,
                          declaraciones_ValorViewModel: {
                            ...deva.declaraciones_ValorViewModel,
                            inte_Direccion_Exacta: e.target.value,
                          },
                          declarantesInte_ViewModel: {
                            ...deva.declarantesInte_ViewModel,
                            decl_Direccion_Exacta: e.target.value,
                          },
                        }
                      })
                    }
                  }}
                />
              </div>

              <div className='flex flex-col gap-1'>
                <Label>País del intermediario</Label>
                <Popover
                  open={cbbPaisIntermediarioState}
                  onOpenChange={setCbbPaisIntermediarioState}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      role='combobox'
                      className='mb-2 w-[200px] justify-between overflow-hidden'
                      ref={(input) =>
                        (inputIntermediarioRefs.current[3] = input)
                      }
                      data-selected={paisIntermediario?.pais_Id ? true : false}
                    >
                      {paisIntermediario?.pais_Nombre
                        ? paisIntermediario?.pais_Codigo +
                          ' | ' +
                          paisIntermediario?.pais_Nombre
                        : '- Seleccione -'}
                      <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-[200px] p-0'>
                    <Command>
                      <CommandInput placeholder='Buscar país...' />
                      <CommandList>
                        <CommandEmpty>No hay paises.</CommandEmpty>
                        <CommandGroup>
                          {paises.map((pais) => (
                            <CommandItem
                              key={pais.pais_Id}
                              onSelect={() => {
                                setPaisIntermediario({
                                  pais_Id: pais.pais_Id,
                                  pais_Codigo: pais.pais_Codigo,
                                  pais_Nombre: pais.pais_Nombre,
                                })
                                setCbbPaisIntermediarioState(false)
                              }}
                            >
                              <IconCheck
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  paisIntermediario?.pais_Id === pais.pais_Id
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {pais.pais_Codigo} | {pais.pais_Nombre}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className='flex flex-col gap-1'>
                <Label>Ciudad del intermediario</Label>
                <Popover
                  open={cbbCiudadIntermediarioState}
                  onOpenChange={setCbbCiudadIntermediarioState}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      role='combobox'
                      disabled={
                        paisIntermediario
                          ? !paisIntermediario?.pais_Id
                            ? true
                            : false
                          : true
                      }
                      className='mb-2 w-[200px] justify-between overflow-hidden'
                      ref={(input) =>
                        (inputIntermediarioRefs.current[4] = input)
                      }
                      data-selected={
                        deva.declarantesInte_ViewModel.ciud_Id ? true : false
                      }
                    >
                      {ciudades.find(
                        (ciud) =>
                          ciud.ciud_Id ===
                          deva.declarantesInte_ViewModel.ciud_Id
                      )?.ciud_Nombre
                        ? ciudades.find(
                            (ciud) =>
                              ciud.ciud_Id ===
                              deva.declarantesInte_ViewModel.ciud_Id
                          )?.ciud_Nombre
                        : '- Seleccione -'}
                      <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-[200px] p-0'>
                    <Command>
                      <CommandInput placeholder='Buscar ciudad...' />
                      <CommandList>
                        <CommandEmpty>No hay ciudades.</CommandEmpty>
                        <CommandGroup>
                          {ciudades
                            .filter(
                              (ciud) =>
                                ciud.pais_Codigo ===
                                paisIntermediario?.pais_Codigo
                            )
                            .map((ciudad) => (
                              <CommandItem
                                key={ciudad.ciud_Id}
                                onSelect={() => {
                                  setDeva((deva) => {
                                    return {
                                      ...deva,
                                      declaraciones_ValorViewModel: {
                                        ...deva.declaraciones_ValorViewModel,
                                        inte_ciudId: ciudad.ciud_Id,
                                      },
                                      declarantesInte_ViewModel: {
                                        ...deva.declarantesInte_ViewModel,
                                        ciud_Id: ciudad.ciud_Id,
                                      },
                                    }
                                  })
                                  setCbbCiudadIntermediarioState(false)
                                }}
                              >
                                <IconCheck
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    deva.declaraciones_ValorViewModel
                                      .inte_ciudId === ciudad.ciud_Id
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {ciudad.ciud_Nombre}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className='flex flex-col gap-1'>
                <Label>Correo del intermediario</Label>
                <Input
                  ref={(input) => (inputIntermediarioRefs.current[5] = input)}
                  value={
                    deva.declaraciones_ValorViewModel.inte_Correo_Electronico
                      ? deva.declaraciones_ValorViewModel
                          .inte_Correo_Electronico
                      : ''
                  }
                  onChange={(e) => {
                    const regex = /^[\w\-.+@]*$/
                    if (regex.test(e.target.value)) {
                      setDeva((deva) => {
                        return {
                          ...deva,
                          declaraciones_ValorViewModel: {
                            ...deva.declaraciones_ValorViewModel,
                            inte_Correo_Electronico: e.target.value,
                          },
                          declarantesInte_ViewModel: {
                            ...deva.declarantesInte_ViewModel,
                            decl_Correo_Electronico: e.target.value,
                          },
                        }
                      })
                    }
                  }}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <Label>Teléfono del intermediario</Label>
                <Input
                  ref={(input) => (inputIntermediarioRefs.current[6] = input)}
                  value={
                    deva.declaraciones_ValorViewModel.inte_Telefono
                      ? deva.declaraciones_ValorViewModel.inte_Telefono
                      : ''
                  }
                  onChange={(e) => {
                    const regex = /^[\d\s\-+]*$/
                    if (regex.test(e.target.value)) {
                      setDeva((deva) => {
                        return {
                          ...deva,
                          declaraciones_ValorViewModel: {
                            ...deva.declaraciones_ValorViewModel,
                            inte_Telefono: e.target.value,
                          },
                          declarantesInte_ViewModel: {
                            ...deva.declarantesInte_ViewModel,
                            decl_Telefono: e.target.value,
                          },
                        }
                      })
                    }
                  }}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <Label>Fax del intemediario</Label>
                <Input
                  ref={(input) => (inputIntermediarioRefs.current[7] = input)}
                  value={
                    deva.declaraciones_ValorViewModel.inte_Fax
                      ? deva.declaraciones_ValorViewModel.inte_Fax
                      : ''
                  }
                  onChange={(e) => {
                    const regex = /^[\d.]*$/
                    if (regex.test(e.target.value)) {
                      setDeva((deva) => {
                        return {
                          ...deva,
                          declaraciones_ValorViewModel: {
                            ...deva.declaraciones_ValorViewModel,
                            inte_Fax: e.target.value,
                          },
                          declarantesInte_ViewModel: {
                            ...deva.declarantesInte_ViewModel,
                            decl_Fax: e.target.value,
                          },
                        }
                      })
                    }
                  }}
                />
              </div>

              <div className='flex flex-col gap-1'>
                <Label>14. Tipo Intermediario</Label>
                <Popover
                  open={cbbTipoIntermediarioState}
                  onOpenChange={setCbbTipoIntermediarioState}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      role='combobox'
                      className='mb-2 w-[200px] justify-between overflow-hidden'
                      ref={(input) =>
                        (inputIntermediarioRefs.current[8] = input)
                      }
                      data-selected={
                        deva.declarantesInte_ViewModel.tite_Id ? true : false
                      }
                    >
                      {tiposDeIntermediarios.find(
                        (tite) =>
                          tite.tite_Id ===
                          deva.declarantesInte_ViewModel.tite_Id
                      )?.tite_Descripcion
                        ? tiposDeIntermediarios.find(
                            (tite) =>
                              tite.tite_Id ===
                              deva.declarantesInte_ViewModel.tite_Id
                          )?.tite_Descripcion
                        : '- Seleccione -'}
                      <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-[200px] p-0'>
                    <Command>
                      <CommandInput placeholder='Buscar tipo...' />
                      <CommandList>
                        <CommandEmpty>No hay tipos.</CommandEmpty>
                        <CommandGroup>
                          {tiposDeIntermediarios.map((tite) => (
                            <CommandItem
                              key={tite.tite_Id}
                              onSelect={() => {
                                setDeva((deva) => {
                                  return {
                                    ...deva,
                                    declaraciones_ValorViewModel: {
                                      ...deva.declaraciones_ValorViewModel,
                                      tite_Id: tite.tite_Id,
                                    },
                                    declarantesInte_ViewModel: {
                                      ...deva.declarantesInte_ViewModel,
                                      tite_Id: tite.tite_Id,
                                    },
                                    intermediarioViewModel: {
                                      ...deva.intermediarioViewModel,
                                      tite_Id: tite.tite_Id,
                                    },
                                  }
                                })
                                setCbbTipoIntermediarioState(false)
                              }}
                            >
                              <IconCheck
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  deva.declarantesInte_ViewModel.tite_Id ===
                                    tite.tite_Id
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {tite.tite_Descripcion}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className='flex flex-col gap-1'>
                <Label>Otro Tipo Intermediario</Label>
                <Input
                  ref={(input) => (inputIntermediarioRefs.current[9] = input)}
                  disabled={deva.declarantesInte_ViewModel.tite_Id !== 5}
                  value={
                    deva.intermediarioViewModel.inte_Tipo_Otro
                      ? deva.intermediarioViewModel.inte_Tipo_Otro
                      : ''
                  }
                  onChange={(e) => {
                    console.log()

                    const regex = /^[\w\s-áéíóú]*$/
                    if (regex.test(e.target.value)) {
                      setDeva((deva) => {
                        return {
                          ...deva,
                          intermediarioViewModel: {
                            ...deva.intermediarioViewModel,
                            inte_Tipo_Otro: e.target.value,
                          },
                          declarantesInte_ViewModel: {
                            ...deva.declarantesInte_ViewModel,
                            inte_Tipo_Otro: e.target.value,
                          },
                        }
                      })
                    }
                  }}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className='mr-6 flex justify-end gap-2'>
        <Button
          variant={'outline'}
          onClick={() => {
            setTabObjetivo(tabIndex - 1)
            setTab(tabs[tabIndex - 1])
          }}
        >
          Regresar
        </Button>
        <Button
          onClick={() => {
            if (!validarInputsProveedor()) {
              if (ckHayIntermediarioState) {
                if (!validarInputsIntermediario()) {
                  guardarTab2(deva)
                    .then((response) => {
                      console.log(response)
                      setTab(tabs[tabIndex + 1])
                    })
                    .catch((err) =>
                      console.error(
                        'Error al guardar la información del intermediario: ' +
                          err
                      )
                    )
                }
              } else {
                guardarTab2(deva)
                  .then((response) => {
                    console.log(response)
                    setTab(tabs[tabIndex + 1])
                  })
                  .catch((err) =>
                    console.error(
                      'Error al guardar la información del proveedor: ' + err
                    )
                  )
              }
            }
          }}
        >
          Guardar
        </Button>
      </div>
    </Card>
  )
}

function FormCaracteristicas({
  deva,
  validar,
  tabIndex,
  tabs,
  tabObjetivo,
  setTabObjetivo,
  paisEmbarque,
  setPaisEmbarque,
  setTab,
  setDeva,
  errorToast,
}: {
  deva: DevaCompuesta
  validar: boolean
  tabIndex: number
  tabs: string[]
  paisEmbarque: {
    pais_Id: number
    pais_Codigo: string
    pais_Nombre: string
  } | null
  setPaisEmbarque: Dispatch<
    SetStateAction<{
      pais_Id: number
      pais_Codigo: string
      pais_Nombre: string
    } | null>
  >
  setTabObjetivo: Dispatch<SetStateAction<number>>
  tabObjetivo: number
  setTab: Dispatch<SetStateAction<string>>
  setDeva: Dispatch<SetStateAction<DevaCompuesta>>
  errorToast: (message: string) => void
}) {
  const context = useContext(ThemeProviderContext)

  const [paises2, setPaises2] = useState<Pais[]>([])
  const [incoterms, setIncoterms] = useState<Incoterm[]>([])
  const [formasDeEnvio, setFormasDeEnvio] = useState<FormaDeEnvio[]>([])
  const [formasDePago, setFormasDePago] = useState<FormaDePago[]>([])
  const [embarques, setEmbarques] = useState<Embarque[]>([])
  const [monedas, setMonedas] = useState<Moneda[]>([])

  const [cbbPaisEntregaState, setCbbPaisEntregaState] = useState(false)
  const [cbbIncotermState, setCbbIncotermState] = useState(false)
  const [cbbFoenState, setCbbFoenState] = useState(false)
  const [cbbFopaState, setCbbFopaState] = useState(false)
  const [cbbMonedaState, setCbbMonedaState] = useState(false)
  const [cbbPaisEmbarqueState, setCbbPaisEmbarqueState] = useState(false)
  const [cbbEmbarqueState, setCbbEmbarqueState] = useState(false)
  const [cbbPaisExportacionState, setCbbPaisExportacionState] = useState(false)

  const inputCaracteristicasRefs = useRef<
    (HTMLInputElement | HTMLButtonElement | null)[]
  >([])

  const validarCaracteristicas = () => {
    let huboError = false
    inputCaracteristicasRefs.current.forEach((input) => {
      if (huboError) {
        return
      }
      const elementType = input?.tagName
      if (elementType === 'INPUT' && !input?.disabled && !input?.value) {
        errorToast(
          `Por favor ingrese ${input?.parentElement?.children[0].textContent}`
        )
        huboError = true
      } else if (
        elementType === 'BUTTON' &&
        input?.dataset.selected !== 'true'
      ) {
        errorToast(
          `Por favor seleccione ${input?.parentElement?.children[0].textContent}`
        )
        huboError = true
      }
    })
    return huboError
  }

  useEffect(() => {
    getPaises()
      .then((data) => {
        setPaises2(data)
        const paisEncontrado = data.find(
          (pai) =>
            pai.pais_Codigo ===
            deva.declaraciones_ValorViewModel.emba_Codigo?.substring(0, 2)
        )
        if (paisEncontrado) {
          setPaisEmbarque(paisEncontrado)
          getEmbarques(paisEncontrado.pais_Codigo)
            .then((data) => {
              setEmbarques(data)
            })
            .catch((err) => {
              console.log('Error al cargar los embarques: ' + err)
            })
        }
      })
      .catch((err) => {
        console.log('Error al cargar los paises: ' + err)
      })
    getIncoterms()
      .then((data) => {
        setIncoterms(data)
        setDeva((prev) => {
          return {
            ...prev,
            declaraciones_ValorViewModel: {
              ...prev.declaraciones_ValorViewModel,
              inco_Id: data.find(
                (inco) =>
                  inco.inco_Descripcion ===
                  deva.declaraciones_ValorViewModel.inco_Descripcion
              )?.inco_Id,
            },
          }
        })
      })
      .catch((err) => {
        console.log('Error al cargar los incoterms: ' + err)
      })
    getFormasDeEnvio()
      .then((data) => {
        setFormasDeEnvio(data)
      })
      .catch((err) => {
        console.log('Error al cargar las formas de envío: ' + err)
      })
    getFormasDePago()
      .then((data) => {
        setFormasDePago(data)
      })
      .catch((err) => {
        console.log('Error al cargar las formas de pago: ' + err)
      })
    getMonedas()
      .then((data) => {
        setMonedas(data)
      })
      .catch((err) => {
        console.log('Error al cargar las monedas: ' + err)
      })
  }, [])

  useEffect(() => {
    if (tabObjetivo > tabIndex) {
      !validarCaracteristicas() && setTab(tabs[tabIndex + 1])
    }
  }, [validar])

  return (
    <Card className='p-3'>
      <h6>E. Característica de la Transacción</h6>
      <div className='my-2 flex flex-wrap justify-evenly gap-2'>
        <div className='flex flex-col gap-1'>
          <Label>15. Lugar de Entrega</Label>
          <Input
            ref={(input) => (inputCaracteristicasRefs!.current[0] = input)}
            value={
              deva.declaraciones_ValorViewModel.deva_LugarEntrega
                ? deva.declaraciones_ValorViewModel.deva_LugarEntrega
                : ''
            }
            onChange={(e) => {
              const regex = /^[\w\s-áéíóú]*$/
              if (regex.test(e.target.value)) {
                setDeva((deva) => {
                  return {
                    ...deva,
                    declaraciones_ValorViewModel: {
                      ...deva.declaraciones_ValorViewModel,
                      deva_LugarEntrega: e.target.value,
                    },
                  }
                })
              }
            }}
          />
        </div>

        <div className='flex flex-col gap-1'>
          <Label>País de Entrega</Label>
          <Popover
            open={cbbPaisEntregaState}
            onOpenChange={setCbbPaisEntregaState}
          >
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                className='mb-2 w-[200px] justify-between overflow-hidden'
                ref={(input) => (inputCaracteristicasRefs.current[1] = input)}
                data-selected={
                  deva?.declaraciones_ValorViewModel.pais_EntregaId
                    ? true
                    : false
                }
              >
                {paises2.find(
                  (pais) =>
                    pais.pais_Id ===
                    deva.declaraciones_ValorViewModel.pais_EntregaId
                )?.pais_Nombre
                  ? paises2.find(
                      (pais) =>
                        pais.pais_Id ===
                        deva.declaraciones_ValorViewModel.pais_EntregaId
                    )?.pais_Nombre
                  : '- Seleccione -'}
                <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Buscar país...' />
                <CommandList>
                  <CommandEmpty>No hay paises.</CommandEmpty>
                  <CommandGroup>
                    {paises2.map((pais) => (
                      <CommandItem
                        key={pais.pais_Id}
                        onSelect={() => {
                          setDeva((deva) => {
                            return {
                              ...deva,
                              declaraciones_ValorViewModel: {
                                ...deva.declaraciones_ValorViewModel,
                                pais_EntregaId: pais.pais_Id,
                              },
                            }
                          })
                          setCbbPaisEntregaState(false)
                        }}
                      >
                        <IconCheck
                          className={cn(
                            'mr-2 h-4 w-4',
                            deva.declaraciones_ValorViewModel.pais_EntregaId ===
                              pais.pais_Id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {pais.pais_Codigo} | {pais.pais_Nombre}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className='flex flex-col gap-1'>
          <Label>15.1. Incoterm</Label>
          <Popover open={cbbIncotermState} onOpenChange={setCbbIncotermState}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                className='mb-2 w-[200px] justify-between overflow-hidden'
                ref={(input) => (inputCaracteristicasRefs.current[2] = input)}
                data-selected={
                  deva?.declaraciones_ValorViewModel.inco_Id ? true : false
                }
              >
                {deva?.declaraciones_ValorViewModel.inco_Descripcion
                  ? deva?.declaraciones_ValorViewModel.inco_Descripcion
                  : '- Seleccione -'}
                <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Buscar incoterm...' />
                <CommandList>
                  <CommandEmpty>No hay registros.</CommandEmpty>
                  <CommandGroup>
                    {incoterms.map((inco) => (
                      <CommandItem
                        key={inco.inco_Id}
                        onSelect={() => {
                          setDeva((deva) => {
                            return {
                              ...deva,
                              declaraciones_ValorViewModel: {
                                ...deva.declaraciones_ValorViewModel,
                                inco_Id: inco.inco_Id,
                                inco_Descripcion: inco.inco_Descripcion,
                              },
                            }
                          })
                          setCbbIncotermState(false)
                        }}
                      >
                        <IconCheck
                          className={cn(
                            'mr-2 h-4 w-4',
                            deva.declaraciones_ValorViewModel.inco_Id ===
                              inco.inco_Id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {inco.inco_Descripcion}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className='flex flex-col gap-1'>
          <Label>Versión</Label>
          <Input
            ref={(input) => (inputCaracteristicasRefs.current[3] = input)}
            value={
              deva.declaraciones_ValorViewModel.inco_Version
                ? deva.declaraciones_ValorViewModel.inco_Version
                : ''
            }
            onChange={(e) => {
              const regex = /^[\w\s-áéíóú]*$/
              if (regex.test(e.target.value)) {
                setDeva((deva) => {
                  return {
                    ...deva,
                    declaraciones_ValorViewModel: {
                      ...deva.declaraciones_ValorViewModel,
                      inco_Version: e.target.value,
                    },
                  }
                })
              }
            }}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>17. Número de Contrato</Label>
          <Input
            ref={(input) => (inputCaracteristicasRefs.current[4] = input)}
            value={
              deva.declaraciones_ValorViewModel.deva_NumeroContrato
                ? deva.declaraciones_ValorViewModel.deva_NumeroContrato
                : ''
            }
            onChange={(e) => {
              const regex = /^[\d.-]*$/
              if (regex.test(e.target.value)) {
                setDeva((deva) => {
                  return {
                    ...deva,
                    declaraciones_ValorViewModel: {
                      ...deva.declaraciones_ValorViewModel,
                      deva_NumeroContrato: e.target.value,
                    },
                  }
                })
              }
            }}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>17.1. Fecha de Contrato</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[200px] justify-start text-left font-normal',
                  !deva.declaraciones_ValorViewModel.deva_FechaContrato &&
                    'text-muted-foreground'
                )}
                ref={(input) => (inputCaracteristicasRefs.current[5] = input)}
                data-selected={
                  deva.declaraciones_ValorViewModel.deva_FechaContrato
                    ? true
                    : false
                }
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {deva.declaraciones_ValorViewModel.deva_FechaContrato ? (
                  <span>
                    {
                      deva.declaraciones_ValorViewModel.deva_FechaContrato.split(
                        'T'
                      )[0]
                    }
                  </span>
                ) : (
                  // format(date, 'PPP')
                  <span>Seleccione una fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                selected={
                  deva.declaraciones_ValorViewModel.deva_FechaContrato
                    ? new Date(
                        deva.declaraciones_ValorViewModel.deva_FechaContrato
                      )
                    : undefined
                }
                onSelect={(e) =>
                  setDeva((deva) => {
                    return {
                      ...deva,
                      declaraciones_ValorViewModel: {
                        ...deva.declaraciones_ValorViewModel,
                        deva_FechaContrato: e
                          ? e.toISOString()
                          : new Date().toISOString(),
                      },
                    }
                  })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex flex-col gap-1'>
          <Label>18. Forma de Envío</Label>
          <Popover open={cbbFoenState} onOpenChange={setCbbFoenState}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                className='mb-2 w-[200px] justify-between overflow-hidden'
                ref={(input) => (inputCaracteristicasRefs.current[6] = input)}
                data-selected={
                  deva?.declaraciones_ValorViewModel.foen_Id ? true : false
                }
              >
                {deva?.declaraciones_ValorViewModel.foen_Descripcion
                  ? deva?.declaraciones_ValorViewModel.foen_Descripcion
                  : '- Seleccione -'}
                <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Buscar forma de envío...' />
                <CommandList>
                  <CommandEmpty>No hay registros.</CommandEmpty>
                  <CommandGroup>
                    {formasDeEnvio.map((foen) => (
                      <CommandItem
                        key={foen.foen_Id}
                        onSelect={() => {
                          setDeva((deva) => {
                            return {
                              ...deva,
                              declaraciones_ValorViewModel: {
                                ...deva.declaraciones_ValorViewModel,
                                foen_Id: foen.foen_Id,
                                foen_Descripcion: foen.foen_Descripcion,
                              },
                            }
                          })
                          setCbbFoenState(false)
                        }}
                      >
                        <IconCheck
                          className={cn(
                            'mr-2 h-4 w-4',
                            deva.declaraciones_ValorViewModel.foen_Id ===
                              foen.foen_Id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {foen.foen_Descripcion}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Otra Forma de Envío</Label>
          <Input
            ref={(input) => (inputCaracteristicasRefs.current[7] = input)}
            value={
              deva.declaraciones_ValorViewModel.deva_FormaEnvioOtra
                ? deva.declaraciones_ValorViewModel.deva_FormaEnvioOtra
                : ''
            }
            disabled={
              deva.declaraciones_ValorViewModel.foen_Descripcion !== 'Otro'
            }
            onChange={(e) => {
              const regex = /^[\w\s-áéíóú]*$/
              if (regex.test(e.target.value)) {
                setDeva((deva) => {
                  return {
                    ...deva,
                    declaraciones_ValorViewModel: {
                      ...deva.declaraciones_ValorViewModel,
                      deva_FormaEnvioOtra: e.target.value,
                    },
                  }
                })
              }
            }}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Pago Efectuado</Label>
          <RadioGroup
            className='flex w-[200px]'
            value={
              deva.declaraciones_ValorViewModel.deva_PagoEfectuado ? 'Si' : 'No'
            }
            onValueChange={(val) =>
              setDeva((deva) => {
                return {
                  ...deva,
                  declaraciones_ValorViewModel: {
                    ...deva.declaraciones_ValorViewModel,
                    deva_PagoEfectuado: val === 'Si',
                  },
                }
              })
            }
          >
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='Si' id='paefSi' />
              <Label htmlFor='paefSi'>Si</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <RadioGroupItem value='No' id='paefNo' />
              <Label htmlFor='paefNo'>No</Label>
            </div>
          </RadioGroup>
        </div>
        <div className='flex flex-col gap-1'>
          <Label>19. Forma de Pago</Label>
          <Popover open={cbbFopaState} onOpenChange={setCbbFopaState}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                className='mb-2 w-[200px] justify-between overflow-hidden'
                ref={(input) => (inputCaracteristicasRefs.current[8] = input)}
                data-selected={
                  deva?.declaraciones_ValorViewModel.fopa_Id ? true : false
                }
              >
                {formasDePago.find(
                  (fopa) =>
                    fopa.fopa_Id === deva.declaraciones_ValorViewModel.fopa_Id
                )?.fopa_Descripcion
                  ? formasDePago.find(
                      (fopa) =>
                        fopa.fopa_Id ===
                        deva.declaraciones_ValorViewModel.fopa_Id
                    )?.fopa_Descripcion
                  : '- Seleccione -'}
                <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Buscar forma de pago...' />
                <CommandList>
                  <CommandEmpty>No hay registros.</CommandEmpty>
                  <CommandGroup>
                    {formasDePago.map((fopa) => (
                      <CommandItem
                        key={fopa.fopa_Id}
                        onSelect={() => {
                          setDeva((deva) => {
                            return {
                              ...deva,
                              declaraciones_ValorViewModel: {
                                ...deva.declaraciones_ValorViewModel,
                                fopa_Id: fopa.fopa_Id,
                              },
                            }
                          })
                          setCbbFopaState(false)
                        }}
                      >
                        <IconCheck
                          className={cn(
                            'mr-2 h-4 w-4',
                            deva.declaraciones_ValorViewModel.fopa_Id ===
                              fopa.fopa_Id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {fopa.fopa_Descripcion}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Otra Forma de Pago</Label>
          <Input
            ref={(input) => (inputCaracteristicasRefs.current[9] = input)}
            value={
              deva.declaraciones_ValorViewModel.deva_FormaPagoOtra
                ? deva.declaraciones_ValorViewModel.deva_FormaPagoOtra
                : ''
            }
            disabled={
              deva.declaraciones_ValorViewModel.fopa_Id
                ? formasDePago.find(
                    (fopa) =>
                      fopa.fopa_Id === deva.declaraciones_ValorViewModel.fopa_Id
                  )?.fopa_Descripcion !== 'Otro'
                : true
            }
            onChange={(e) => {
              const regex = /^[\w\s-áéíóú]*$/
              if (regex.test(e.target.value)) {
                setDeva((deva) => {
                  return {
                    ...deva,
                    declaraciones_ValorViewModel: {
                      ...deva.declaraciones_ValorViewModel,
                      deva_FormaPagoOtra: e.target.value,
                    },
                  }
                })
              }
            }}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <Label>21. País de Embarque</Label>
          <Popover
            open={cbbPaisEmbarqueState}
            onOpenChange={setCbbPaisEmbarqueState}
          >
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                className='mb-2 w-[200px] justify-between overflow-hidden'
                ref={(input) => (inputCaracteristicasRefs.current[10] = input)}
                data-selected={
                  paisEmbarque ? (paisEmbarque.pais_Id ? true : false) : false
                }
              >
                {paises2.find((pais) => pais.pais_Id === paisEmbarque?.pais_Id)
                  ?.pais_Nombre
                  ? paises2.find(
                      (pais) => pais.pais_Id === paisEmbarque?.pais_Id
                    )?.pais_Nombre
                  : '- Seleccione -'}
                <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Buscar país...' />
                <CommandList>
                  <CommandEmpty>No hay paises.</CommandEmpty>
                  <CommandGroup>
                    {paises2.map((pais) => (
                      <CommandItem
                        key={pais.pais_Id}
                        onSelect={() => {
                          setPaisEmbarque(pais)
                          getEmbarques(pais.pais_Codigo)
                            .then((data) => {
                              setEmbarques(data)
                            })
                            .catch((err) => {
                              console.log(
                                'Error al cargar los embarques: ' + err
                              )
                            })
                          setCbbPaisEmbarqueState(false)
                        }}
                      >
                        <IconCheck
                          className={cn(
                            'mr-2 h-4 w-4',
                            paisEmbarque?.pais_Id === pais.pais_Id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {pais.pais_Codigo} | {pais.pais_Nombre}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex flex-col gap-1'>
          <Label>20. Lugar de Embarque</Label>
          <Popover open={cbbEmbarqueState} onOpenChange={setCbbEmbarqueState}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                className='mb-2 w-[200px] justify-between overflow-hidden'
                ref={(input) => (inputCaracteristicasRefs.current[11] = input)}
                data-selected={
                  deva?.declaraciones_ValorViewModel.emba_Id ? true : false
                }
              >
                {embarques.find(
                  (emba) =>
                    emba.emba_Id === deva?.declaraciones_ValorViewModel.emba_Id
                )?.emba_Descripcion
                  ? embarques.find(
                      (emba) =>
                        emba.emba_Id ===
                        deva?.declaraciones_ValorViewModel.emba_Id
                    )?.emba_Codigo +
                    ' | ' +
                    embarques.find(
                      (emba) =>
                        emba.emba_Id ===
                        deva?.declaraciones_ValorViewModel.emba_Id
                    )?.emba_Descripcion
                  : '- Seleccione -'}
                <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Buscar embarque...' />
                <CommandList>
                  <CommandEmpty>No hay registros.</CommandEmpty>
                  <CommandGroup>
                    {embarques.map((emba) => (
                      <CommandItem
                        key={emba.emba_Id}
                        onSelect={() => {
                          setDeva((deva) => {
                            return {
                              ...deva,
                              declaraciones_ValorViewModel: {
                                ...deva.declaraciones_ValorViewModel,
                                emba_Id: emba.emba_Id,
                              },
                            }
                          })
                          setCbbEmbarqueState(false)
                        }}
                      >
                        <IconCheck
                          className={cn(
                            'mr-2 h-4 w-4',
                            deva.declaraciones_ValorViewModel.emba_Id ===
                              emba.emba_Id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {emba.emba_Codigo} | {emba.emba_Descripcion}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex flex-col gap-1'>
          <Label>País de Exportación</Label>
          <Popover
            open={cbbPaisExportacionState}
            onOpenChange={setCbbPaisExportacionState}
          >
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                className='mb-2 w-[200px] justify-between overflow-hidden'
                ref={(input) => (inputCaracteristicasRefs.current[12] = input)}
                data-selected={
                  deva.declaraciones_ValorViewModel.pais_ExportacionId
                    ? true
                    : false
                }
              >
                {paises2.find(
                  (pais) =>
                    pais.pais_Id ===
                    deva.declaraciones_ValorViewModel.pais_ExportacionId
                )?.pais_Nombre
                  ? paises2.find(
                      (pais) =>
                        pais.pais_Id ===
                        deva.declaraciones_ValorViewModel.pais_ExportacionId
                    )?.pais_Nombre
                  : '- Seleccione -'}
                <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Buscar país...' />
                <CommandList>
                  <CommandEmpty>No hay paises.</CommandEmpty>
                  <CommandGroup>
                    {paises2.map((pais) => (
                      <CommandItem
                        key={pais.pais_Id}
                        onSelect={() => {
                          setDeva((deva) => {
                            return {
                              ...deva,
                              declaraciones_ValorViewModel: {
                                ...deva.declaraciones_ValorViewModel,
                                pais_ExportacionId: pais.pais_Id,
                              },
                            }
                          })
                          setCbbPaisExportacionState(false)
                        }}
                      >
                        <IconCheck
                          className={cn(
                            'mr-2 h-4 w-4',
                            deva.declaraciones_ValorViewModel
                              .pais_ExportacionId === pais.pais_Id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {pais.pais_Codigo} | {pais.pais_Nombre}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex flex-col gap-1'>
          <Label>Fecha de Exportación</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[200px] justify-start text-left font-normal',
                  !deva.declaraciones_ValorViewModel.deva_FechaExportacion &&
                    'text-muted-foreground'
                )}
                ref={(input) => (inputCaracteristicasRefs.current[13] = input)}
                data-selected={
                  deva.declaraciones_ValorViewModel.deva_FechaExportacion
                    ? true
                    : false
                }
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {deva.declaraciones_ValorViewModel.deva_FechaExportacion ? (
                  <span>
                    {
                      deva.declaraciones_ValorViewModel.deva_FechaExportacion.split(
                        'T'
                      )[0]
                    }
                  </span>
                ) : (
                  // format(date, 'PPP')
                  <span>Seleccione una fecha</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                selected={
                  deva.declaraciones_ValorViewModel.deva_FechaExportacion
                    ? new Date(
                        deva.declaraciones_ValorViewModel.deva_FechaExportacion
                      )
                    : undefined
                }
                onSelect={(e) =>
                  setDeva((deva) => {
                    return {
                      ...deva,
                      declaraciones_ValorViewModel: {
                        ...deva.declaraciones_ValorViewModel,
                        deva_FechaExportacion: e
                          ? e.toISOString()
                          : new Date().toISOString(),
                      },
                    }
                  })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex flex-col gap-1'>
          <Label>22. Moneda</Label>
          <Popover open={cbbMonedaState} onOpenChange={setCbbMonedaState}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                role='combobox'
                className='mb-2 w-[200px] justify-between overflow-hidden'
                ref={(input) => (inputCaracteristicasRefs.current[14] = input)}
                data-selected={
                  deva?.declaraciones_ValorViewModel.mone_Id ? true : false
                }
              >
                {monedas.find(
                  (mone) =>
                    mone.mone_Id === deva?.declaraciones_ValorViewModel.mone_Id
                )?.mone_Descripcion
                  ? monedas.find(
                      (mone) =>
                        mone.mone_Id ===
                        deva?.declaraciones_ValorViewModel.mone_Id
                    )?.mone_Codigo +
                    ' | ' +
                    monedas.find(
                      (mone) =>
                        mone.mone_Id ===
                        deva?.declaraciones_ValorViewModel.mone_Id
                    )?.mone_Descripcion
                  : '- Seleccione -'}
                <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Buscar moneda...' />
                <CommandList>
                  <CommandEmpty>No hay registros.</CommandEmpty>
                  <CommandGroup>
                    {monedas.map((mone) => (
                      <CommandItem
                        key={mone.mone_Id}
                        onSelect={() => {
                          setDeva((deva) => {
                            return {
                              ...deva,
                              declaraciones_ValorViewModel: {
                                ...deva.declaraciones_ValorViewModel,
                                mone_Id: mone.mone_Id,
                              },
                            }
                          })
                          setCbbMonedaState(false)
                        }}
                      >
                        <IconCheck
                          className={cn(
                            'mr-2 h-4 w-4',
                            deva.declaraciones_ValorViewModel.mone_Id ===
                              mone.mone_Id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {mone.mone_Codigo} | {mone.mone_Descripcion}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex flex-col gap-1'>
          <Label>23. Tipo de Cambio de Moneda Extranejera a Dólares USD</Label>
          <Input
            ref={(input) => (inputCaracteristicasRefs.current[15] = input)}
            value={
              deva.declaraciones_ValorViewModel.deva_ConversionDolares
                ? deva.declaraciones_ValorViewModel.deva_ConversionDolares
                : ''
            }
            onChange={(e) => {
              const regex = /^[0-9.]*$/

              console.log(regex.test(e.target.value))

              if (regex.test(e.target.value)) {
                setDeva((deva) => {
                  return {
                    ...deva,
                    declaraciones_ValorViewModel: {
                      ...deva.declaraciones_ValorViewModel,
                      deva_ConversionDolares: e.target.value,
                    },
                  }
                })
              }
            }}
          />
        </div>
      </div>

      <div className='mr-4 flex justify-end gap-2'>
        <Button
          variant={'outline'}
          onClick={() => {
            setTabObjetivo(tabIndex - 1)
            setTab(tabs[tabIndex - 1])
          }}
        >
          Regresar
        </Button>
        <Button
          onClick={() => {
            if (!validarCaracteristicas()) {
              guardarTab3(deva, context.editandoTab3)
                .then((response) => {
                  console.log(response)
                  setTab(tabs[tabIndex + 1])
                })
                .catch((err) =>
                  console.error(
                    'Error al guardar las caracteristicas de la transaccion: ' +
                      err
                  )
                )
            }
          }}
        >
          Guardar
        </Button>
      </div>
    </Card>
  )
}

function FormFactura({
  validar,
  tabIndex,
  tabs,
  setTab,
  tabObjetivo,
  setTabObjetivo,
  deva,
  errorToast,
}: {
  validar: boolean
  tabIndex: number
  tabObjetivo: number
  tabs: string[]
  setTabObjetivo: Dispatch<SetStateAction<number>>
  setTab: Dispatch<SetStateAction<string>>
  deva: DevaCompuesta
  errorToast: (message: string) => void
}) {
  const context = useContext(ThemeProviderContext)

  const [dialogState, setDialogState] = useState(false)
  const [arancelesDialogState, setArancelesDialogState] = useState(false)
  const [factura, setFactura] = useState<Factura>({
    fact_Id: 0,
    fact_Numero: '',
    usua_UsuarioCreacion: 1,
    usua_UsuarioModificacion: 1,
    usuarioCreacionNombre: 'juan',
    usuarioModificacionNombre: 'juan',
    fact_Fecha: new Date().toISOString(),
    deva: null,
    deva_Id: deva.declaraciones_ValorViewModel.deva_Id,
    fact_Estado: true,
    fact_FechaCreacion: new Date().toISOString(),
    fact_FechaModificacion: new Date().toISOString(),
    subRows: [],
    tbItems: [],
  })

  const { toast } = useToast()

  const [item, setItem] = useState<Item>({
    item_Id: 1,
    item_Numero: 0,
    fact_Id: 0,
    item_Cantidad: 0,
    item_Cantidad_Bultos: 0,
    item_ClaseBulto: '',
    item_Acuerdo: '',
    item_PesoNeto: 0,
    item_PesoBruto: 0,
    unme_Id: 0,
    item_IdentificacionComercialMercancias: '',
    item_CaracteristicasMercancias: '',
    item_Marca: '',
    item_Modelo: '',
    merc_Id: 0,
    mate_SubCategoria: 0,
    subc_Descripcion: '',
    mate_Imagen: '',
    pais_IdOrigenMercancia: 0,
    item_ClasificacionArancelaria: '',
    aran_Id: 0,
    aran_Descripcion: '',
    aran_Codigo: '',
    unme_Descripcion: '',
    merc_Descripcion: '',
    item_ValorUnitario: 0,
    item_GastosDeTransporte: 0,
    item_ValorTransaccion: 0,
    item_Seguro: 0,
    item_OtrosGastos: 0,
    item_ValorAduana: 0,
    item_CuotaContingente: 0,
    item_ReglasAccesorias: '',
    item_CriterioCertificarOrigen: '',
    item_EsNuevo: false,
    item_EsHibrido: false,
    item_LitrosTotales: 0,
    item_CigarrosTotales: 0,
    usua_UsuarioCreacion: 1,
    nombrePaisOrigen: '',
    usuarioCreacionNombre: '',
    item_FechaCreacion: new Date().toISOString(),
    usua_UsuarioModificacion: 1,
    usuarioModificacionNombre: '',
    usua_UsuarioEliminacion: 1,
    item_FechaEliminacion: new Date().toISOString(),
    item_FechaModificacion: new Date().toISOString(),
    item_Estado: true,
  })

  const [facturas, setFacturas] = useState<Factura[]>([])
  const [unidadesDeMedida, setUnidadesDeMedida] = useState<UnidadDeMedida[]>([])
  const [estadosDeLaMercancia, setEstadosDeLaMercancia] = useState<
    EstadoDeMercancia[]
  >([])
  const [paises, setPaises] = useState<Pais[]>([])
  const [aranceles, setAranceles] = useState<Arancel[]>([])

  const [cbbUnmeState, setCbbUnmeState] = useState(false)
  const [cbbMercState, setCbbMercState] = useState(false)
  const [cbbPaisState, setCbbPaisState] = useState(false)

  useEffect(() => {
    getFacturas(deva.declaraciones_ValorViewModel.deva_Id)
      .then((data) => setFacturas(data))
      .catch((err) => console.error('Error al cargar las facturas: ' + err))
    getUnidadesDeMedida()
      .then((data) => setUnidadesDeMedida(data))
      .catch((err) =>
        console.error('Error al cargar las unidades de medida: ' + err)
      )
    getEstadosMercancia()
      .then((data) => setEstadosDeLaMercancia(data))
      .catch((err) =>
        console.error('Error al cargar los estados de la mercancía: ' + err)
      )
    getPaises()
      .then((data) => setPaises(data))
      .catch((err) => console.error('Error al cargar los paises: ' + err))
  }, [context.refrescar])

  const inputFacturasRefs = useRef<
    (HTMLInputElement | HTMLButtonElement | null)[]
  >([])

  const inputItemRefs = useRef<(HTMLInputElement | HTMLButtonElement | null)[]>(
    []
  )

  const validarInputsFactura = () => {
    let huboError = false
    inputFacturasRefs.current.forEach((input) => {
      if (huboError) {
        return
      }
      const elementType = input?.tagName
      if (elementType === 'INPUT' && !input?.disabled && !input?.value) {
        errorToast(
          `Por favor ingrese ${input?.parentElement?.children[0].textContent}`
        )
        huboError = true
      } else if (
        elementType === 'BUTTON' &&
        input?.dataset.selected !== 'true'
      ) {
        errorToast(
          `Por favor seleccione ${input?.parentElement?.children[0].textContent}`
        )
        huboError = true
      }
    })
    return huboError
  }

  const validarInputsItem = () => {
    let huboError = false
    inputItemRefs.current.forEach((input) => {
      if (huboError) {
        return
      }
      const elementType = input?.tagName
      if (elementType === 'INPUT' && !input?.disabled && !input?.value) {
        errorToast(
          `Por favor ingrese ${input?.parentElement?.children[0].textContent}`
        )
        huboError = true
      } else if (
        elementType === 'BUTTON' &&
        input?.dataset.selected !== 'true'
      ) {
        errorToast(
          `Por favor seleccione ${input?.parentElement?.children[0].textContent}`
        )
        huboError = true
      }
    })
    return huboError
  }

  useEffect(() => {
    if (context.aranId) {
      let toditosLosAranceles: AranDetalle[] = []

      aranceles.forEach(
        (arancel) =>
          (toditosLosAranceles = [...toditosLosAranceles, ...arancel.subRows])
      )
      const arancelEncontrado = toditosLosAranceles.find(
        (aran) => aran.aran_Id === context.aranId
      )
      console.log(arancelEncontrado, aranceles, context.aranId)
      if (arancelEncontrado) {
        setItem((item) => {
          return {
            ...item,
            aran_Codigo: arancelEncontrado.aran_Codigo,
            item_ClasificacionArancelaria: arancelEncontrado.aran_Codigo,
            aran_Id: context.aranId,
            aran_Descripcion: arancelEncontrado.aran_Descripcion,
          }
        })
        setArancelesDialogState(false)
      }
      context.setAranId(0)
    }
  }, [context.aranId])

  useEffect(() => {
    if (context.factId) {
      const factEncontrada = facturas.find(
        (fact) => fact.fact_Id === context.factId
      )
      if (factEncontrada) {
        setFactura(factEncontrada)
        setDialogState(false)
      }
    }
  }, [context.factId])

  useEffect(() => {
    if (tabObjetivo > tabIndex) {
      if (facturas.length === 0) {
        errorToast('Debe ingresar por lo menos una factura')
        return
      }

      if (!facturas.every((factura) => factura.subRows.length > 0)) {
        errorToast('Todas las facturas deben tener por lo menos un item')
        return
      }
      setTab(tabs[tabIndex + 1])
    }
  }, [validar])

  function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
    let timeout: NodeJS.Timeout
    return function (this: any, ...args: Parameters<T>) {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }
  }

  const arancelChange = (value: string) => {
    const regex = /^[\d.]*$/
    if (regex.test(value)) {
      setItem((prevItem) => ({
        ...prevItem,
        item_ClasificacionArancelaria: value,
      }))
    }
  }

  const handleSearch = async (codigo: string) => {
    getAranceles(codigo)
      .then((data) => setAranceles((prev) => prev.concat(data)))
      .catch((err) => console.error('Error al cargar los aranceles: ' + err))
  }

  const debouncedSearch = debounce(handleSearch, 300)

  const buscarAranceles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    arancelChange(value)
    value.length > 2 && debouncedSearch(value)
  }

  return (
    <>
      <Card className='flex flex-col items-center p-3'>
        <div className='my-3 flex max-w-[500px] flex-wrap justify-center gap-4'>
          <div className='flex flex-col gap-1'>
            <Label>16. Número de Factura</Label>
            <Input
              ref={(input) => (inputFacturasRefs.current[0] = input)}
              value={factura.fact_Numero ?? ''}
              onChange={(e) => {
                const regex = /^[\d]*$/
                if (regex.test(e.target.value)) {
                  setFactura((fact) => {
                    return {
                      ...fact,
                      fact_Numero: e.target.value,
                    }
                  })
                }
              }}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <Label>Fecha de Emisión</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-[200px] justify-start text-left font-normal',
                    !factura.fact_Fecha && 'text-muted-foreground'
                  )}
                  ref={(input) => (inputFacturasRefs.current[1] = input)}
                  data-selected={factura.fact_Fecha ? true : false}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {factura.fact_Fecha ? (
                    <span>{factura.fact_Fecha.split('T')[0]}</span>
                  ) : (
                    // format(date, 'PPP')
                    <span>Seleccione una fecha</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={
                    factura.fact_Fecha
                      ? new Date(factura.fact_Fecha)
                      : undefined
                  }
                  onSelect={(e) =>
                    setFactura((fact) => {
                      return {
                        ...fact,
                        fact_Fecha: e
                          ? e.toISOString()
                          : new Date().toISOString(),
                      }
                    })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button
            onClick={() => {
              if (!validarInputsFactura()) {
                const facturaEncontrada = facturas.find(
                  (fact) => fact.fact_Numero === factura.fact_Numero
                )
                if (facturaEncontrada) {
                  setFactura(facturaEncontrada)
                  setItem((item) => {
                    return {
                      ...item,
                      fact_Id: facturaEncontrada?.fact_Id,
                      item_Numero: facturaEncontrada?.subRows.length + 1,
                    }
                  })
                } else {
                  guardarFactura(factura, false)
                    .then((factId) => {
                      setFacturas((facts) => [
                        ...facts,
                        { ...factura, fact_Id: parseInt(factId) },
                      ])
                      setFactura((fact) => {
                        return {
                          ...fact,
                          fact_Id: parseInt(factId),
                        }
                      })
                      setItem((item) => {
                        return {
                          ...item,
                          fact_Id: parseInt(factId),
                          item_Numero: 1,
                        }
                      })
                    })
                    .catch((err) => {
                      console.error('Error al crear factura: ' + err)
                    })
                }

                setDialogState(true)
              }
            }}
          >
            <IconPlus stroke={1.5} className='mr-1 h-5 w-5' />
            Agregar Item
          </Button>
          <Button
            onClick={() => {
              if (!validarInputsFactura()) {
                guardarFactura(factura, false)
                  .then((factId) => {
                    const idParsed = parseInt(factId) // Log factId
                    if (idParsed === 1) {
                      console.log(facturas, 'facturas') // Log original facts
                      const factsFiltradas = facturas.filter(
                        (fact) => fact.fact_Id !== factura.fact_Id
                      )
                      console.log(factsFiltradas, 'factsFiltradas') // Log filtered facts
                      setFacturas(() => {
                        return [...factsFiltradas, factura]
                      })
                      toast({
                        title: 'Éxito: ',
                        description: 'Factura editada con éxito',
                      })
                    } else {
                      setFacturas((facts) => [
                        ...facts,
                        { ...factura, fact_Id: idParsed },
                      ])
                      toast({
                        title: 'Éxito: ',
                        description: 'Factura creada con éxito',
                      })
                    }
                    setFactura((fact) => {
                      return {
                        ...fact,
                        fact_Id: 0,
                        fact_Numero: '',
                        fact_Fecha: new Date().toISOString(),
                      }
                    })
                    context.setFactId(0)
                  })
                  .catch((err) => {
                    console.error('Error al crear factura: ' + err)
                  })
              }
            }}
          >
            Guardar factura
          </Button>
          <Dialog open={dialogState} onOpenChange={setDialogState}>
            <DialogContent
              className='sm:max-w-[720px]
            '
            >
              <DialogHeader>
                <DialogTitle>Agregar Item</DialogTitle>
              </DialogHeader>
              <div className='flex flex-wrap gap-4 py-4'>
                <div className='flex flex-col gap-1'>
                  <Label className='min-h-[28px]'>Número Item</Label>
                  <Input
                    disabled
                    ref={(input) => (inputItemRefs.current[0] = input)}
                    value={item.item_Numero.toString() ?? ''}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <Label className='min-h-[28px]'>30. Cantidad</Label>
                  <Input
                    ref={(input) => (inputItemRefs.current[1] = input)}
                    value={item.item_Cantidad}
                    onChange={(e) => {
                      const regex = /^[0-9.]*$/
                      if (regex.test(e.target.value)) {
                        setItem((item) => {
                          return {
                            ...item,
                            item_Cantidad: !e.target.value
                              ? 0
                              : parseInt(e.target.value),
                          }
                        })
                      }
                    }}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <Label className='max-w-[200px]'>
                    31. Identificación Comercial de las Mercancías
                  </Label>
                  <Input
                    ref={(input) => (inputItemRefs.current[2] = input)}
                    value={item.item_IdentificacionComercialMercancias ?? ''}
                    onChange={(e) => {
                      const regex = /^[\w\s-áéíóú]*$/
                      if (regex.test(e.target.value)) {
                        setItem((item) => {
                          return {
                            ...item,
                            item_IdentificacionComercialMercancias:
                              e.target.value,
                          }
                        })
                      }
                    }}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <Label className='min-h-[28px]'>30.1. Unidad de Medida</Label>
                  <Popover open={cbbUnmeState} onOpenChange={setCbbUnmeState}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        role='combobox'
                        className='mb-2 w-[200px] justify-between overflow-hidden'
                        ref={(input) => (inputItemRefs.current[3] = input)}
                        data-selected={item.unme_Descripcion ? true : false}
                      >
                        {item.unme_Descripcion
                          ? item.unme_Descripcion
                          : '- Seleccione -'}
                        <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[200px] p-0'>
                      <Command>
                        <CommandInput placeholder='Buscar unidades...' />
                        <CommandList>
                          <CommandEmpty>No hay unidades.</CommandEmpty>
                          <CommandGroup>
                            {unidadesDeMedida.map((unme) => (
                              <CommandItem
                                key={unme.unme_Id}
                                onSelect={() => {
                                  console.log(unidadesDeMedida)

                                  setItem((item) => {
                                    return {
                                      ...item,
                                      unme_Descripcion: unme.unme_Descripcion,
                                      unme_Id: unme.unme_Id,
                                    }
                                  })
                                  setCbbUnmeState(false)
                                }}
                              >
                                <IconCheck
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    item.unme_Id === unme.unme_Id
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {unme.unme_Descripcion}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className='flex flex-col gap-1'>
                  <Label className='max-w-[200px]'>
                    32. Características de la Mercancía
                  </Label>
                  <Input
                    ref={(input) => (inputItemRefs.current[4] = input)}
                    value={item.item_CaracteristicasMercancias ?? ''}
                    onChange={(e) => {
                      const regex = /^[\w\s-áéíóú]*$/
                      if (regex.test(e.target.value)) {
                        setItem((item) => {
                          return {
                            ...item,
                            item_CaracteristicasMercancias: e.target.value,
                          }
                        })
                      }
                    }}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <Label className='min-h-[28px] max-w-[200px]'>
                    33. Marca
                  </Label>
                  <Input
                    ref={(input) => (inputItemRefs.current[5] = input)}
                    value={item.item_Marca ?? ''}
                    onChange={(e) => {
                      const regex = /^[\w\s-áéíóú]*$/
                      if (regex.test(e.target.value)) {
                        setItem((item) => {
                          return {
                            ...item,
                            item_Marca: e.target.value,
                          }
                        })
                      }
                    }}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <Label className='min-h-[28px] max-w-[200px]'>
                    34. Modelo y/o Estilo
                  </Label>
                  <Input
                    ref={(input) => (inputItemRefs.current[6] = input)}
                    value={item.item_Modelo ?? ''}
                    onChange={(e) => {
                      const regex = /^[\w\s-áéíóú]*$/
                      if (regex.test(e.target.value)) {
                        setItem((item) => {
                          return {
                            ...item,
                            item_Modelo: e.target.value,
                          }
                        })
                      }
                    }}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <Label className='min-h-[28px]'>
                    35. Estado de las Mercancías
                  </Label>
                  <Popover open={cbbMercState} onOpenChange={setCbbMercState}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        role='combobox'
                        className='mb-2 w-[200px] justify-between overflow-hidden'
                        ref={(input) => (inputItemRefs.current[7] = input)}
                        data-selected={item.merc_Descripcion ? true : false}
                      >
                        {item.merc_Descripcion
                          ? item.merc_Descripcion
                          : '- Seleccione -'}
                        <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[200px] p-0'>
                      <Command>
                        <CommandInput placeholder='Buscar estado...' />
                        <CommandList>
                          <CommandEmpty>No hay estados.</CommandEmpty>
                          <CommandGroup>
                            {estadosDeLaMercancia.map((merc) => (
                              <CommandItem
                                key={merc.merc_Id}
                                onSelect={() => {
                                  setItem((item) => {
                                    return {
                                      ...item,
                                      merc_Descripcion: merc.merc_Descripcion,
                                      merc_Id: merc.merc_Id,
                                    }
                                  })
                                  setCbbMercState(false)
                                }}
                              >
                                <IconCheck
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    item.merc_Id === merc.merc_Id
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {merc.merc_Codigo} | {merc.merc_Descripcion}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className='flex flex-col gap-1'>
                  <Label className='min-h-[28px]'>
                    36. Origen de las Mercancías
                  </Label>
                  <Popover open={cbbPaisState} onOpenChange={setCbbPaisState}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        role='combobox'
                        className='mb-2 w-[200px] justify-between overflow-hidden'
                        ref={(input) => (inputItemRefs.current[8] = input)}
                        data-selected={item.nombrePaisOrigen ? true : false}
                      >
                        {item.nombrePaisOrigen
                          ? item.nombrePaisOrigen
                          : '- Seleccione -'}
                        <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-[200px] p-0'>
                      <Command>
                        <CommandInput placeholder='Buscar país...' />
                        <CommandList>
                          <CommandEmpty>No hay paises.</CommandEmpty>
                          <CommandGroup>
                            {paises.map((pais) => (
                              <CommandItem
                                key={pais.pais_Id}
                                onSelect={() => {
                                  setItem((item) => {
                                    return {
                                      ...item,
                                      pais_IdOrigenMercancia: pais.pais_Id,
                                      nombrePaisOrigen: pais.pais_Nombre,
                                    }
                                  })
                                  setCbbPaisState(false)
                                }}
                              >
                                <IconCheck
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    deva.declaraciones_ValorViewModel
                                      .pais_EntregaId === pais.pais_Id
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {pais.pais_Codigo} | {pais.pais_Nombre}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className='flex flex-col gap-1'>
                  <Label className='min-h-[28px]'>
                    37. Clasificación Arancelaria
                  </Label>
                  <Dialog
                    open={arancelesDialogState}
                    onOpenChange={setArancelesDialogState}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant='outline'
                        role='combobox'
                        className='mb-2 w-[200px] justify-between overflow-hidden'
                        ref={(input) => (inputItemRefs.current[9] = input)}
                        data-selected={
                          item.item_ClasificacionArancelaria ? true : false
                        }
                        onClick={() => setArancelesDialogState(true)}
                      >
                        {item.item_ClasificacionArancelaria
                          ? item.item_ClasificacionArancelaria
                          : '- Seleccione -'}
                        <IconCaretUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className='max-h-[700px] overflow-y-auto sm:max-w-[720px]
            '
                    >
                      <DialogHeader>
                        <DialogTitle>Seleccionar Arancel</DialogTitle>
                      </DialogHeader>
                      <div className='flex flex-col gap-4 py-4'>
                        <div className='flex flex-col gap-1'>
                          <Label className='min-h-[28px]'>
                            Buscar aranceles por código
                          </Label>
                          <Input
                            value={item.item_ClasificacionArancelaria}
                            placeholder='####.##.##.##'
                            onChange={buscarAranceles}
                          />
                        </div>
                        <div className='mt-6 flex-1 overflow-auto py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                          <AranDataTable
                            data={aranceles}
                            columns={aranColumns}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={() => setArancelesDialogState(false)}
                          variant='outline'
                        >
                          Cancelar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className='flex flex-col gap-1'>
                  <Label className='min-h-[28px]'>38. Valor Unitario</Label>
                  <Input
                    ref={(input) => (inputItemRefs.current[10] = input)}
                    value={item.item_ValorUnitario.toString()}
                    onChange={(e) => {
                      const regex = /^[0-9.]*$/
                      if (regex.test(e.target.value)) {
                        setItem((item) => {
                          return {
                            ...item,
                            item_ValorUnitario: !e.target.value
                              ? 0
                              : parseFloat(e.target.value),
                            item_ValorTransaccion:
                              parseFloat(item.item_Cantidad.toString()) *
                              (!e.target.value
                                ? 0
                                : parseFloat(e.target.value)),
                          }
                        })
                      }
                    }}
                  />
                </div>
                <div className='flex flex-col gap-1'>
                  <Label className='min-h-[28px]'>Total Factura Unitario</Label>
                  <Input
                    disabled
                    ref={(input) => (inputItemRefs.current[11] = input)}
                    value={item.item_ValorTransaccion.toString() ?? ''}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setDialogState(false)} variant='outline'>
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    if (!validarInputsItem()) {
                      guardarItem(item, false)
                        .then((response) => {
                          if (response === '1') {
                            toast({
                              title: 'Éxito',
                              description: 'Item agregado correctamente',
                            })
                            setItem((prev) => {
                              return {
                                item_Id: 1,
                                item_Numero: 0,
                                fact_Id: 0,
                                item_Cantidad: 0,
                                item_Cantidad_Bultos: 0,
                                item_ClaseBulto: '',
                                item_Acuerdo: '',
                                item_PesoNeto: 0,
                                item_PesoBruto: 0,
                                unme_Id: 0,
                                item_IdentificacionComercialMercancias: '',
                                item_CaracteristicasMercancias: '',
                                item_Marca: '',
                                item_Modelo: '',
                                merc_Id: 0,
                                mate_SubCategoria: 0,
                                subc_Descripcion: '',
                                mate_Imagen: '',
                                pais_IdOrigenMercancia: 0,
                                item_ClasificacionArancelaria: '',
                                aran_Id: 0,
                                aran_Descripcion: '',
                                aran_Codigo: '',
                                unme_Descripcion: '',
                                merc_Descripcion: '',
                                item_ValorUnitario: 0,
                                item_GastosDeTransporte: 0,
                                item_ValorTransaccion: 0,
                                item_Seguro: 0,
                                item_OtrosGastos: 0,
                                item_ValorAduana: 0,
                                item_CuotaContingente: 0,
                                item_ReglasAccesorias: '',
                                item_CriterioCertificarOrigen: '',
                                item_EsNuevo: false,
                                item_EsHibrido: false,
                                item_LitrosTotales: 0,
                                item_CigarrosTotales: 0,
                                usua_UsuarioCreacion: 1,
                                nombrePaisOrigen: '',
                                usuarioCreacionNombre: '',
                                item_FechaCreacion: new Date().toISOString(),
                                usua_UsuarioModificacion: 1,
                                usuarioModificacionNombre: '',
                                usua_UsuarioEliminacion: 1,
                                item_FechaEliminacion: new Date().toISOString(),
                                item_FechaModificacion:
                                  new Date().toISOString(),
                                item_Estado: true,
                              }
                            })
                            context.setRefrescar(!context.refrescar)
                          }
                        })
                        .catch((err) => console.log(err))
                      setDialogState(false)
                    }
                  }}
                >
                  Agregar Item
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
      <div className='mt-6 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <FactDataTable data={facturas} columns={factColumns} />
      </div>
    </>
  )
}

function FormCondiciones({
  validar,
  tabIndex,
  tabs,
  tabObjetivo,
  setTab,
  errorToast,
}: {
  validar: boolean
  tabIndex: number
  tabObjetivo: number
  tabs: string[]
  setTab: Dispatch<SetStateAction<string>>
  errorToast: (message: string) => void
}) {
  const inputCondicionesRefs = useRef<
    (HTMLInputElement | HTMLButtonElement | null)[]
  >([])

  const validarInputsCondiciones = () => {
    let huboError = false
    inputCondicionesRefs.current.forEach((input) => {
      if (huboError) {
        return
      }
      const elementType = input?.tagName
      if (elementType === 'INPUT' && !input?.disabled && !input?.value) {
        errorToast(
          `Por favor ingrese ${input?.parentElement?.children[0].textContent}`
        )
        huboError = true
      } else if (
        elementType === 'BUTTON' &&
        input?.dataset.selected !== 'true'
      ) {
        errorToast(
          `Por favor seleccione ${input?.parentElement?.children[0].textContent}`
        )
        huboError = true
      }
    })
    return huboError
  }

  return (
    <Card className='p-3'>
      <h6>II. Condiciones de la Transacción</h6>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>CONDICIÓN</TableHead>
              <TableHead>VALOR ASIGNADO CONDICIÓN</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>24</TableCell>
              <TableCell>
                Existen restricciones a la cesión o utilización de las
                mercancías por el comprador, distintas de las excepciones
                previstas en el artículo 1.1 a) del Acuerdo
              </TableCell>
              <TableCell>
                <RadioGroup className='flex w-[200px]' defaultValue='No'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='Si' id='24Si' />
                    <Label htmlFor='24Si'>Si</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='No' id='24No' />
                    <Label htmlFor='24No'>No</Label>
                  </div>
                </RadioGroup>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>24.1</TableCell>
              <TableCell>
                Indicar en que consiste la o las restricciones
              </TableCell>
              <TableCell>
                <Input id='24.1Input' placeholder='- VALOR -' disabled={true} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>25</TableCell>
              <TableCell>
                Depende la venta o el precio de alguna condición o
                contraprestación, con relación a las mercancías a valorar
              </TableCell>
              <TableCell>
                <RadioGroup className='flex w-[200px]' defaultValue='No'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='Si' id='25Si' />
                    <Label htmlFor='25Si'>Si</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='No' id='25No' />
                    <Label htmlFor='25No'>No</Label>
                  </div>
                </RadioGroup>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>25.1</TableCell>
              <TableCell>
                Indicar en que consiste la condición o contrapresentación, y si
                es cuantificable consignar el monto en la casilla Nro. 42.1
              </TableCell>
              <TableCell>
                <Input id='25.1Input' placeholder='- VALOR -' disabled={true} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>26</TableCell>
              <TableCell>
                Está la venta condicionada a revertir directa o indirectamente
                al vendedor parte alguna del producto de la reventa o de
                cualquier cesión o utilización posterior de las mercancías, por
                el comprador, en caso afirmativo, declara el monto de la
                reversión en la casilla Nro. 42
              </TableCell>
              <TableCell>
                <RadioGroup className='flex w-[200px]' defaultValue='No'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='Si' id='26Si' />
                    <Label htmlFor='26Si'>Si</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='No' id='26No' />
                    <Label htmlFor='26No'>No</Label>
                  </div>
                </RadioGroup>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>27</TableCell>
              <TableCell>
                Existe vinculación entre el vendedor y el comprador
              </TableCell>
              <TableCell>
                <RadioGroup className='flex w-[200px]' defaultValue='No'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='Si' id='27Si' />
                    <Label htmlFor='27Si'>Si</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='No' id='27No' />
                    <Label htmlFor='27No'>No</Label>
                  </div>
                </RadioGroup>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>27.1</TableCell>
              <TableCell>Indicar el tipo de vinculación</TableCell>
              <TableCell>
                <Input
                  id='27.1Input'
                  type='text'
                  placeholder='- VALOR -'
                  disabled={true}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>27.2</TableCell>
              <TableCell>
                Indicar si la vinculación ha influido en el precio
              </TableCell>
              <TableCell>
                <RadioGroup className='flex w-[200px]' defaultValue='No'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='Si' id='27.2Si' />
                    <Label htmlFor='27.2Si'>Si</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='No' id='27.2No' />
                    <Label htmlFor='27.2No'>No</Label>
                  </div>
                </RadioGroup>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>28</TableCell>
              <TableCell>
                Existen pagos indirectos y/o descuentos retroactivos
              </TableCell>
              <TableCell>
                <RadioGroup className='flex w-[200px]' defaultValue='No'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='Si' id='28Si' />
                    <Label htmlFor='28Si'>Si</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='No' id='28No' />
                    <Label htmlFor='28No'>No</Label>
                  </div>
                </RadioGroup>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>28.1</TableCell>
              <TableCell>
                Indicar en que concepto y el monto declarado en la casilla Nro.
                40
              </TableCell>
              <TableCell>
                <Input id='28.1Input' placeholder='- VALOR -' disabled={true} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>29</TableCell>
              <TableCell>
                Existen cánones y derechos de licencia que el comprador tenga
                que pagar directa o indirectamente
              </TableCell>
              <TableCell>
                <RadioGroup className='flex w-[200px]' defaultValue='No'>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='Si' id='29Si' />
                    <Label htmlFor='29Si'>Si</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem value='No' id='29No' />
                    <Label htmlFor='29No'>No</Label>
                  </div>
                </RadioGroup>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>29.1</TableCell>
              <TableCell>
                Indicar su naturaleza y el monto declarado en la casilla Nro.
                42.9
              </TableCell>
              <TableCell>
                <Input id='29.1Input' placeholder='- VALOR -' disabled={true} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className='mr-4 flex justify-end gap-2 self-end'>
        <Button variant={'outline'} onClick={() => setTab(tabs[tabIndex - 1])}>
          Regresar
        </Button>
        <Button
          onClick={() => {
            if (!validarInputs()) {
              setTab(tabs[tabIndex])
            }
          }}
        >
          Guardar
        </Button>
      </div>
    </Card>
  )
}

function FormValorAduana({
  validar,
  tabIndex,
  tabs,
  tabObjetivo,
  setTab,
  errorToast,
}: {
  validar: boolean
  tabIndex: number
  tabObjetivo: number
  tabs: string[]
  setTab: Dispatch<SetStateAction<string>>
  errorToast: (message: string) => void
}) {
  return (
    <Card className='p-3'>
      <h6>III. Determinación del Valor en Aduana, en Pesos Centroamericanos</h6>
      <div className='overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>BASE DE CÁLCULO</TableHead>
              <TableHead>VALOR PESO C.A. (USD)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>39</TableCell>
              <TableCell>Precio según factura</TableCell>
              <TableCell>
                <Input value={'0'} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>40</TableCell>
              <TableCell>
                Pagos indirectos y/o descuentos retroactivos
              </TableCell>
              <TableCell>
                <Input placeholder='0' id='40Input' />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>41</TableCell>
              <TableCell>
                Precio realmente pagado o por pagar por las mercancías
                importadas (39 + 40)
              </TableCell>
              <TableCell>
                <Input placeholder='0' disabled id='41Input' />
              </TableCell>
            </TableRow>
            <TableRow className='font-semibold'>
              <TableCell>42</TableCell>
              <TableCell colSpan={2}>
                ADICIONES AL PRECIO REALMENTE PAGADO O POR PAGAR POR LAS
                MERCANCÍAS IMPORTADAS
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>42.1</TableCell>
              <TableCell>
                Montro de la condición o contraprestación a que se refiere la
                casilla 25.1
              </TableCell>
              <TableCell>
                <Input value='0' id='42.1Input' />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>42.2</TableCell>
              <TableCell>
                Monto de la reversión a la que se refiere la casilla 25
              </TableCell>
              <TableCell>
                <Input value='0' id='42.2Input' />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>42.3</TableCell>
              <TableCell>
                Gastos por comisiones y correlajes, salvo los de comisiones de
                compra
              </TableCell>
              <TableCell>
                <Input value='0' id='42.3Input' />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>42.4</TableCell>
              <TableCell>Gastos y costos de envases y embalajes</TableCell>
              <TableCell>
                <Input value='0' id='42.4Input' />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>42.5</TableCell>
              <TableCell>
                Valor de los materiales consumidos en la producción de las
                mercancías importadas
              </TableCell>
              <TableCell>
                <Input placeholder='0' />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>42.6</TableCell>
              <TableCell>
                Valor de las herramientos, matrices, moldes, y elementos
                análogos utilizados para la producción de las mercancías
              </TableCell>
              <TableCell>
                <Input placeholder='0' />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>42.7</TableCell>
              <TableCell>
                Valor de los materiales consumidos en la producción de las
                mercancías importadas
              </TableCell>
              <TableCell>
                <Input placeholder='0' />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>42.8</TableCell>
              <TableCell>
                Valor de ingeniería, creación y perferccionamiento, trabajos
                artísticos, diseños y planos y croquis realizados fuera del país
                de importación y necesarios para la producción de mercancías
                importadas
              </TableCell>
              <TableCell>
                <Input placeholder='0' />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>42.9</TableCell>
              <TableCell>
                Valor de los cánones y derechos de licencia, a que se refiere la
                casilla 29.1
              </TableCell>
              <TableCell>
                <Input placeholder='0' />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>42.10</TableCell>
              <TableCell>
                Gastos de transporte de la mercadería importada hasta el puerto
                o lugar de importación
              </TableCell>
              <TableCell>
                <Input value='0' id='42.10Input' />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>42.11</TableCell>
              <TableCell>
                Gastos de carga, descarga y manipulación ocasionadas por el
                transporte de las mercaderías importadas hasta el puerto o lugar
                de importación
              </TableCell>
              <TableCell>
                <Input value='0' id='42.11Input' />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>42.12</TableCell>
              <TableCell>Costos del Seguro</TableCell>
              <TableCell>
                <Input value='0' id='42.12Input' />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>43</TableCell>
              <TableCell>
                Total de ajustes al precio realmente pagado o por pagar
                (sumatoria de 42.1 a 42.12)
              </TableCell>
              <TableCell>
                <Input placeholder='0' disabled value='0' id='43Input' />
              </TableCell>
            </TableRow>
            <TableRow className='font-semibold'>
              <TableCell>44</TableCell>
              <TableCell colSpan={2}>
                DEDUCCIONES AL PRECIO REALMENTE PAGADO O POR PAGAR POR LAS
                MERCANCÍAS IMPORTADAS
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>44.1</TableCell>
              <TableCell>
                Gastos de construcción, armado, montaje, mantenimiento o
                asistencia técnica realizados después de la importación, en
                relación con las mercancías importadas
              </TableCell>
              <TableCell>
                <Input type='text' value='0' id='44.1Input' />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>44.2</TableCell>
              <TableCell>
                Costos de transporte posterior al puerto o lugar de importación
              </TableCell>
              <TableCell>
                <Input value='0' id='44.2Input' />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>44.3</TableCell>
              <TableCell>
                Derechos e impuestos aplicables en el país de importación
              </TableCell>
              <TableCell>
                <Input value='0' id='44.3Input' />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>44.4</TableCell>
              <TableCell>Monto de intereses</TableCell>
              <TableCell>
                <Input value='0' id='44.4Input' />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>44.5</TableCell>
              <TableCell>Otras deducciones legalmente aplicables</TableCell>
              <TableCell>
                <Input value='0' id='44.5Input' />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>45</TableCell>
              <TableCell>
                Total deducciones al precio realmente pagado o por pagar por las
                mercancías importadas
              </TableCell>
              <TableCell>
                <Input placeholder='0' disabled id='45Input' />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>46</TableCell>
              <TableCell>VALOR EN ADUANA (41 + 43 - 45)</TableCell>
              <TableCell>
                <Input placeholder='0' disabled id='46Input' />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className='mr-6 flex justify-between gap-2'>
        <small>
          Cuando alguno/s de los ajustes de las casillas 42.1 a 42.12 se
          declaren con base en resolución o disposición administrativa, indicar
          el número y fecha de estas, así como el número de la casilla/s a la
          que corresponde.
        </small>
        <div className='flex gap-2'>
          <Button
            variant={'outline'}
            onClick={() => setTab[tabs[tabIndex - 1]]}
          >
            Regresar
          </Button>
          <Button>Guardar</Button>
        </div>
      </div>
    </Card>
  )
}

function FormFinalizar({
  tabIndex,
  tabs,
  tabObjetivo,
  setTab,
  setTabObjetivo,
}: {
  tabIndex: number
  tabObjetivo: number
  tabs: string[]
  setTab: Dispatch<SetStateAction<string>>
}) {
  return (
    <Card className='p-3'>
      <h6>III. Determinación del Valor en Aduana, en Pesos Centroamericanos</h6>
      <div className='overflow-x-auto'>
        <h1>Formulario completo</h1>
      </div>
      <div className='mr-6 flex justify-between gap-2'>
        <div className='flex gap-2'>
          <Button
            variant={'outline'}
            onClick={() => setTab(tabs[tabIndex - 1])}
          >
            Regresar
          </Button>
          <Button
            onClick={() => {
              console.log('finalizar')
            }}
          >
            Finalizar Declaración de Valor
          </Button>
        </div>
      </div>
    </Card>
  )
}
