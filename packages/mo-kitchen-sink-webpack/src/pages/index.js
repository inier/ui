import { lazy } from '@components';

// import Entrance from './Entrance';
const Entrance = lazy(() => import('./Entrance'));
const List = lazy(() => import('./List'));
const Doc = lazy(() => import('./Doc'));
const About = lazy(() => import('./About'));
// 提前加载
const NotFound = lazy(() => import(/* webpackPrefetch: true */ './NotFound'));

export { Entrance, List, Doc, About, NotFound };
