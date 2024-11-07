'use client'
import CheckIcon from '@mui/icons-material/Check'
import { FlowMap, Header, Info } from '.'
import { styled, alpha } from '@mui/material/styles'
import { RichTreeView } from '@mui/x-tree-view/RichTreeView'
import { TreeItem2, treeItemClasses } from '@mui/x-tree-view'
import { TreeViewBaseItem } from '@mui/x-tree-view/models'
import { InitCompanyContext } from '@/_contexts'
import { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { ILayer } from '@/_hooks/useLayers'
import { IInstance } from '@/_hooks/useInstances'

const CustomTreeItem = styled(TreeItem2)(({ theme }) => ({
  color: theme.palette.grey[200],
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
    [`& .${treeItemClasses.label}`]: {
      fontSize: '0.8rem',
      fontWeight: 500,
    },
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.dark,
    padding: theme.spacing(0, 1.2),
    ...theme.applyStyles('light', {
      backgroundColor: alpha(theme.palette.primary.main, 0.25),
    }),
    ...theme.applyStyles('dark', {
      color: theme.palette.primary.contrastText,
    }),
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
  ...theme.applyStyles('light', {
    color: theme.palette.grey[800],
  }),
}))

const Review = () => {
  const { back, next } = useContext(InitCompanyContext)
  const [tree, setTree] = useState<TreeViewBaseItem[]>([])

  const generateTreeArrayFromLayers = (layers: ILayer[]) => {
    // get all instance objects into an array
    const instances = layers.map((layer) => layer.instances).flat()
    // generate a tree array from the instances by checking the parent value
    const treeArray: TreeViewBaseItem[] = []
    // loop through the instances array backwards
    while (instances.length > 0) {
      const instance = instances.pop()!
      if (instance.parent === null) {
        treeArray.unshift({
          id: instance.uuid,
          label: instance.name,
          children: instance.children,
        })
      }
      if (instance.parent !== null) {
        const parent = instances.find((el) => el.uuid === instance.parent)
        if (parent) {
          if (!parent.children) parent.children = []
          parent.children.unshift({
            id: instance.uuid,
            label: instance.name,
            children: instance.children,
          })
        }
      }
    }
    setTree(treeArray)
  }

  useEffect(() => {
    const layers = JSON.parse(
      typeof window !== 'undefined'
        ? localStorage.getItem('layers') || '[]'
        : '[]'
    )
    generateTreeArrayFromLayers(layers)
    // eslint-disable-next-line
  }, [])

  return (
    <div className="p-8 w-screen bg-white shadow-md lg:w-max h-max animate-slideInFromBottom lg:min-w-[calc(60vw-3rem)] lg:rounded-[2rem]">
      <Header title="Review" icon={CheckIcon} backgroundColor="bg-teal-500" />
      <Info text="You can review your company's hierarchical structure. At this stage you can still edit the name of your instances in the tree view by double clicking on their labels." />
      <div className="flex gap-8 items-center mt-4">
        <RichTreeView
          className="overflow-y-auto py-2 px-4 w-max h-full rounded-md border max-h-[50vh] min-w-[14rem]"
          isItemEditable={true}
          experimentalFeatures={{ labelEditing: true }}
          onItemLabelChange={(item, value) => {
            console.log(item, value)
          }}
          // expand all
          defaultExpandedItems={JSON.parse(
            typeof window !== 'undefined'
              ? localStorage.getItem('layers') || '[]'
              : '[]'
          )
            .map((l: ILayer) => l.instances)
            .flat()
            .map((i: IInstance) => i.uuid)}
          slots={{ item: CustomTreeItem }}
          items={tree}
        />
        <FlowMap />
      </div>
      <div className="flex justify-end mt-4 space-x-4 w-full">
        <Button onClick={() => back()} variant="outlined" color="primary">
          Back
        </Button>
        <Button onClick={() => next()} variant="contained" color="success">
          Complete
        </Button>
      </div>
    </div>
  )
}

export default Review
