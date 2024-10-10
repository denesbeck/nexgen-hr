'use client'
import { Section1 } from '@/(landing)/_components/'
import { Button, InputField } from '@/_components'
import VpnKeyIcon from '@mui/icons-material/VpnKey'

export default function Home() {
  return (
    <>
      <div className="flex fixed z-10 flex-col gap-8 justify-center items-center p-8 text-white bg-clip-border bg-gradient-to-tr from-cyan-300 via-indigo-500 to-blue-400 rounded-md shadow-md bottom-[10rem] left-[6rem]">
        <div className="absolute left-1 top-1 h-[calc(100%-0.5rem)] w-[calc(100%-0.5rem)] rounded-md bg-neutral-900"></div>
        <h1 className="z-10 text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-tr from-cyan-300 via-indigo-500 to-blue-400">
          Welcome to NexGen HR
        </h1>
        <InputField value="" label="Email" handler={() => {}} />
        <InputField
          value=""
          label="Password"
          isPassword={true}
          handler={() => {}}
        />
        <div className="z-10 w-[12rem]">
          <Button
            icon={<VpnKeyIcon className="mr-2" />}
            action={() => console.log('Login')}
            variant="primary-solid"
            label="Login"
            wide={true}
          />
        </div>
      </div>
      <div className="fixed -right-10 z-20 top-[8rem]">
        <Section1 />
      </div>
    </>
  )
}
