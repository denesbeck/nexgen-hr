'use client'
import {
  Step,
  StepContent,
  StepLabel,
  Stepper,
  ThemeProvider,
} from '@mui/material'
import { darkTheme } from '@/theme'

type Step = {
  label: string
  description: string
}

interface StepsProps {
  steps: Step[]
  activeStep: number
}

const Steps = ({ steps, activeStep }: StepsProps) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="block w-full lg:hidden max-w-[95vw]">
        <Stepper
          activeStep={activeStep}
          orientation="horizontal"
          alternativeLabel
        >
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className="hidden lg:block w-[20vw] min-w-[20vw]">
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <p className="text-sm text-white">{step.description}</p>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </div>
    </ThemeProvider>
  )
}

export default Steps
