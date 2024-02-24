import { IConstructorConstants } from '../../interfaces/constants.interface.ts'

export function constructorReducers(constant: IConstructorConstants) {
  return function (state = {}, action: { type: string; payload: object }) {
    switch (action.type) {
      case constant.load:
        return { load: true }
      case constant.success:
        return { load: false, data: action.payload }
      case constant.fail:
        return { load: false, fail: action.payload }
      case constant.error:
        return { load: false, error: action.payload }
      case constant.reset:
        return { load: false }
      default:
        return state
    }
  }
}