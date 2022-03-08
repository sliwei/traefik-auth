import React from 'react'
import { Router, Route, Switch, Redirect, withRouter } from 'react-router-dom'
import routes from './conf'
import Layout from '@/components/Layout'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import RouterGuard from './guard'
import '@/assets/css/router.global.css'
import history from './history'

const ANIMATION_MAP = {
  PUSH: 'forward', // forward slide | forward1 scale
  POP: 'back' // back slide | back1 scale
}

const Routes = withRouter(({ location, history, children }: any) => {
  return (
    <TransitionGroup
      className={'router-wrapper'}
      childFactory={(child) =>
        React.cloneElement(child, {
          // @ts-ignore
          classNames: ANIMATION_MAP[history.action]
        })
      }>
      <CSSTransition timeout={1000} key={location.pathname}>
        <Switch location={location}>
          {/*@ts-ignore*/}
          {children?.map(({ path, component }, index) => (
            <Route key={index.toString()} path={path} exact>
              {(props: { match: null }) => (
                <RouterGuard component={component} path={path} {...props} />
              )}
            </Route>
          ))}
          <Redirect to="/404" />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
})

/**
 * 跟路由
 * @returns {*}
 */
// eslint-disable-next-line react/display-name
export default () => {
  return (
    <Router history={history}>
      <Switch>
        {/*@ts-ignore*/}
        {routes.map(({ path, component, children }, index) => {
          if (typeof component === 'string' && children) {
            return (
              <Route
                path={path}
                key={index.toString()}
                // component={loadable(() => import(`../${component}/index.tsx`))}
              >
                {(() => {
                  switch (component) {
                    case 'Layout':
                      return (
                        <Layout>
                          <Routes children={children} />
                        </Layout>
                      )
                    default:
                      return null
                  }
                })()}
              </Route>
            )
          } else {
            return (
              // <Route
              //   path={path}
              //   key={index.toString()}
              //   // component={loadable(() => import(`../${component}/index.tsx`))}
              // >
              //   {component}
              // </Route>
              <Route key={index.toString()} path={path}>
                {(props: { match: null }) => (
                  <RouterGuard component={component} path={path} {...props} />
                )}
              </Route>
            )
          }
        })}
        {/*<Redirect to="/404" />*/}
      </Switch>
    </Router>
  )
}
