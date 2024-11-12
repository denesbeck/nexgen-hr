interface IInfoRow {
  label: string
  value: string
}

const InfoRow = ({ label, value }: IInfoRow) => {
  return (
    <p className="flex items-center">
      <span className="font-bold min-w-[10rem]">{label}:</span>
      <span>{value}</span>
    </p>
  )
}

export default InfoRow
