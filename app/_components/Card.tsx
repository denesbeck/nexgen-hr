interface CardProps {
  children: React.ReactNode
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="min-h-[9rem] w-[20rem] max-w-[80vw] cursor-pointer select-none space-y-2 overflow-hidden rounded-md bg-white px-4 py-6 shadow-md transition-transform duration-200 ease-in-out hover:scale-105">
      {children}
    </div>
  )
}

export default Card
