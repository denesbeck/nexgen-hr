interface CardProps {
  children: React.ReactNode
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="overflow-hidden py-6 px-4 space-y-2 bg-white rounded-md shadow-md transition-transform duration-200 ease-in-out cursor-pointer select-none hover:scale-105 min-h-[9rem] w-[20rem] max-w-[80vw] animate-slideInFromBottom">
      {children}
    </div>
  )
}

export default Card
