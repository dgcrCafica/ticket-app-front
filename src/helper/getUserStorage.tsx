import { Agente } from '../interfaces/Agente';
export const getUserStorage = (): Agente => {
  return {
    agente    : localStorage.getItem('agente') || '',
    escritorio: localStorage.getItem('escritorio') || '',
  }
}