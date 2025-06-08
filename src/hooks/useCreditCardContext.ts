import { CreditCardContext } from '@/context/creditCardContext';
import { useContext } from 'react';

export default function useCreditCardContext() {
  return useContext(CreditCardContext);
}
