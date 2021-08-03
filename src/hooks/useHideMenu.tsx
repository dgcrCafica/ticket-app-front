import { useContext, useEffect } from "react"
import { UIContext } from '../context/UIContext';

export const useHideMenu = ( ocultar: boolean ) => {
  const { hideMenu, showMenu } = useContext( UIContext );

  useEffect(() => {
    if( ocultar ) {
      hideMenu();
    } else {
      showMenu();
    }
  }, [ hideMenu, showMenu, ocultar ]);
}
