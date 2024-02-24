import { IConstructorConstants } from '../../interfaces/constants.interface.ts'

export function constructorConstants(prefix: string): IConstructorConstants {
  return {
    load: `load_${ prefix }`,
    success: `success_${ prefix }`,
    fail: `fail_${ prefix }`,
    error: `error_${ prefix }`,
    reset: `reset_${ prefix }`
  }
}