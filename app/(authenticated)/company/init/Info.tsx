interface InfoProps {
  text: string
}

const Info = ({ text }: InfoProps) => {
  return <p className="text-sm text-gray-500">{text}</p>
}

export default Info
