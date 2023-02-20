import { lazy } from "react";

type props = {
    path: string;
    name: string;
  }
  
const lazyLoadingComponent = ({path, name}: props) => {
    const promise = import(path);
    
    return lazy(() => (
        promise.then(component => ({default: component[name]})))
    )

}

export default lazyLoadingComponent