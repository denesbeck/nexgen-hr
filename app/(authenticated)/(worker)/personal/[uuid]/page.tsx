import { Header } from '@/_components'
import PersonIcon from '@mui/icons-material/Person'
import { AddDocument, Document, EditInfo, InfoRow } from './_components'
import postgres from '@/_lib/postgres'
import { getUser } from '@/_actions/auth'
import { theme } from '@/theme'
import { ThemeProvider } from '@mui/material'

const pgInstance = postgres().getInstance()

const fetchPersonal = async (uuid: string) => {
  const { rows } = await pgInstance.query(
    `SELECT * FROM personal WHERE worker_uuid = $1`,
    [uuid]
  )
  return rows[0]
}

interface IPersonal {
  params: Promise<{
    uuid: string
  }>
}

const Personal = async ({ params }: IPersonal) => {
  const res = await getUser()
  const uuid = (await params).uuid

  // TODO: Unauthorized page
  if (res === null || res.id !== uuid) return <div>Unauthorized</div>

  const {
    name,
    date_of_birth,
    city_of_birth,
    country_of_birth,
    citizenship,
    nationality,
    gender,
    marital_status,
  } = await fetchPersonal(uuid)

  return (
    <ThemeProvider theme={theme}>
      <div className="p-8 text-gray-700 bg-white rounded-xl">
        <div className="flex justify-between items-center">
          <Header
            title="Personal"
            icon={PersonIcon}
            backgroundColor="bg-indigo-300"
          />
          <EditInfo uuid="personal" />
        </div>
        <div className="grid gap-10 mt-4 lg:grid-cols-2 lg:gap-0">
          <div className="grid gap-3">
            {[
              { label: 'Name', value: name },
              {
                label: 'Date of Birth',
                value: new Date(date_of_birth).toLocaleDateString(),
              },
              {
                label: 'Age',
                value:
                  new Date().getFullYear() -
                  new Date(date_of_birth).getFullYear(),
              },
              {
                label: 'Gender',
                value: gender,
              },
              { label: 'Country of Birth', value: country_of_birth },
              { label: 'City of Birth', value: city_of_birth },
              { label: 'Marital status', value: marital_status },
              { label: 'Citizenship', value: citizenship.join(', ') },
              { label: 'Nationality', value: nationality },
            ].map(({ label, value }) => (
              <InfoRow key={label} label={label} value={value} />
            ))}
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h1 className="font-bold">Documents</h1>
              <AddDocument />
            </div>

            <div className="grid gap-4">
              <Document type="Identity Card" id="00000000000" />
              <Document type="Social Security Number" id="00000000000" />
              <Document type="Tax Id" id="00000000000" />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default Personal
