'use client'
import {
  Steps,
  Layers,
  Instances,
  Review,
} from '@/(authenticated)/company/[uuid]/init/_components'
import { useState } from 'react'
import { InitCompanyContext } from '@/_contexts'

const StepContents = () => {
  const [activeStep, setActiveStep] = useState(0)
  const handleNext = () =>
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep === steps.length - 1) return prevActiveStep
      return prevActiveStep + 1
    })
  const handleBack = () =>
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep === 0) return prevActiveStep
      return prevActiveStep - 1
    })

  const steps = [
    {
      label: 'Define Layers',
      description:
        "Start by outlining the essential layers of your company's structure, setting the foundation for your blueprint.",
    },
    {
      label: 'Define Instances',
      description:
        'For each layer, specify the instances and their parent elements. This step enables you to build a hierarchical representation of your company.',
    },
    {
      label: 'Review',
      description:
        'Finally, review your selections to ensure they accurately reflect your company’s vision before finalizing the blueprint.',
    },
  ]

  return (
    <>
      <Steps steps={steps} activeStep={activeStep} />
      <InitCompanyContext.Provider
        value={{ next: handleNext, back: handleBack }}
      >
        {activeStep === 0 && <Layers />}
        {activeStep === 1 && <Instances />}
        {activeStep === 2 && <Review />}
      </InitCompanyContext.Provider>
    </>
  )
}

export default StepContents
