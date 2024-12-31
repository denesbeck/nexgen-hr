'use client'
import { Button } from '@mui/material'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Header, Modal } from '@/_components'
import ArticleIcon from '@mui/icons-material/Article'

const AddDocument = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        className="flex items-center space-x-1"
        variant="text"
        color="primary"
        onClick={() => setOpen(true)}
      >
        <AddIcon className="text-lg" />
        <span>Add</span>
      </Button>
      {open && (
        <Modal close={() => setOpen(false)}>
          <Header
            title="Add Document"
            icon={ArticleIcon}
            backgroundColor="bg-slate-300"
          />
        </Modal>
      )}
    </>
  )
}

export default AddDocument
