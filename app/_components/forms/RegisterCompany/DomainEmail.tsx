import { Button, InputAdornment, TextField } from '@mui/material'
import ShortTextIcon from '@mui/icons-material/ShortText'
import DomainIcon from '@mui/icons-material/Domain'
import EmailIcon from '@mui/icons-material/Email'
import { checkIfRegistered } from '@/_actions/register'
import { useAlert } from '@/_hooks'
import { useContext } from 'react'
import { RegisterCompanyContext } from '@/_contexts'

interface DomainEmailProps {
  next: () => void
  skip: () => void
}

const DomainEmail = ({ next, skip }: DomainEmailProps) => {
  const { alert } = useAlert()
  const {
    companyName,
    setCompanyName,
    domain,
    setDomain,
    rootEmail,
    setRootEmail,
  } = useContext(RegisterCompanyContext)

  const handleNext = async () => {
    const result = await checkIfRegistered(domain, `${rootEmail}@${domain}`)

    if (!result) {
      alert({
        id: 'company-check-if-registered',
        severity: 'error',
        message: 'An error occurred. Please try again.',
      })
      return
    }

    const { registered, emailMatch, confirmed } = result

    if (registered) {
      if (emailMatch) {
        if (confirmed) {
          alert({
            id: 'company-registered-email-match-confirmed',
            severity: 'info',
            message: 'Company already registered. Please sign in.',
          })
        } else {
          skip()
        }
      } else {
        alert({
          id: 'company-registered-email-mismatch',
          severity: 'error',
          message: 'Company already registered with a different root email.',
        })
      }
    } else {
      next()
    }
  }
  return (
    <div className="flex flex-col gap-4 animate-textFocus">
      <TextField
        autoFocus
        label="Name"
        variant="outlined"
        value={companyName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setCompanyName(event.target.value)
        }
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <ShortTextIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        label="Domain"
        variant="outlined"
        value={domain}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setDomain(event.target.value)
        }
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <DomainIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        label="Root email"
        variant="outlined"
        value={rootEmail}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setRootEmail(event.target.value)
        }
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">{'@' + domain}</InputAdornment>
            ),
          },
        }}
      />
      <div className="flex justify-end">
        <Button color="primary" variant="contained" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  )
}

export default DomainEmail
