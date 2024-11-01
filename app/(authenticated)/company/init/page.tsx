'use client'
import { Header } from '@/_components'
import { Steps, Layers, Instances, Review } from '.'
import { useState } from 'react'
import { InitCompanyContext } from '@/_contexts'

const InitCompanyPage = () => {
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
    <div className="flex relative flex-col justify-start h-full min-h-screen">
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-neutral-900 lg:h-[95vh] lg:w-[40vw] lg:rounded-br-[3rem]" />
      <div className="absolute top-0 right-0 w-full h-[40vh] bg-neutral-900 lg:w-[70vw]" />
      <div className="flex z-10 justify-start px-8 pt-6 w-full">
        <Header />
      </div>
      <div className="flex z-10 flex-col gap-14 items-center p-8 mt-8 w-screen lg:flex-row lg:mt-0 h-[80vh]">
        <Steps steps={steps} activeStep={activeStep} />
        <InitCompanyContext.Provider
          value={{ next: handleNext, back: handleBack }}
        >
          {activeStep === 0 && <Layers />}
          {activeStep === 1 && <Instances />}
          {activeStep === 2 && <Review />}
        </InitCompanyContext.Provider>
      </div>
    </div>
  )
}

export default InitCompanyPage
