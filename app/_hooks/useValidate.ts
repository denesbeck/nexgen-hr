'use client'

const useValidate = (list: { uuid: string; name: string }[]) => {
  const validate = () => {
    const errors: { id: string; message: string }[] = []
    list.forEach((el, index) => {
      if (!el.name) {
        errors.push({
          id: el.uuid,
          message: `Layer ${index + 1} has no name.`,
        })
        return
      }
      if (el.name.length < 3) {
        errors.push({
          id: el.uuid,
          message: `Layer ${index + 1} name is too short.`,
        })
        return
      }
      if (el.name.length > 64) {
        errors.push({
          id: el.uuid,
          message: `Layer ${index + 1} name is too long.`,
        })
      }
    })
    return errors.length ? errors : null
  }

  return { validate }
}

export default useValidate
