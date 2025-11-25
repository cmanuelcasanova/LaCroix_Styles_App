import { useEffect, useRef, DependencyList, EffectCallback } from 'react';

export const useUpdateEffect = (callback: EffectCallback, dependencies: DependencyList): void => {
 
  const isInitialMount = useRef<boolean>(true);

  useEffect(() => {
   
    if (isInitialMount.current) {
     
      isInitialMount.current = false;
      return; 
    }
    
  
    return callback(); 
    
  }, dependencies);
};