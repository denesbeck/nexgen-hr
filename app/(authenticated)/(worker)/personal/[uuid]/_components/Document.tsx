import { FileUpload } from '@/_components'
import { DeleteDocument, DownloadDocument, EditDocument } from '.'

interface IDocument {
  type: string
  id: string
}

const Document = ({ type, id }: IDocument) => {
  return (
    <div className="flex justify-between items-center py-2 pr-4 pl-8 rounded-md border-2 ring-offset-0 ring-offset-white transition-all duration-200 ease-in-out hover:ring-2 hover:ring-offset-2 animate-textFocus">
      <div className="grid gap-2">
        <div className="flex space-x-4 text-sm text-gray-500 whitespace-nowrap">
          <div className="font-bold min-w-[2.5rem]">Type:</div>{' '}
          <span>{type}</span>
        </div>
        <div className="flex space-x-4 text-sm text-gray-500 whitespace-nowrap">
          <div className="font-bold w-[2.5rem]">Id:</div> <span>{id}</span>
        </div>
      </div>
      <div className="flex items-center">
        <DownloadDocument uuid={id} />
        <EditDocument uuid={id} />
        <DeleteDocument uuid={id} />
      </div>
    </div>
  )
}

export default Document
