import { lazy } from "react";

type props = {
    path: string;
}
  
const lazyLoadingComponent = ({path}: props) => {
    const name = path.split('/').pop() || '';
    return lazy(() => (
        import(/* @vite-ignore */path).then(component => ({default: component[name]})))
    )
}

export default lazyLoadingComponent