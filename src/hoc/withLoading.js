import React from 'react';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';

function withLoading(WrappedComponent) {
  function WithLoading(props) {
    const { loading, ...etc } = props;
    return (
      <React.Fragment>
        <Segment>
          <Dimmer active={loading}>
            <Loader content="Loading" />
          </Dimmer>
          <WrappedComponent {...etc} />
        </Segment>
      </React.Fragment>
    );
  }
  WithLoading.displayName = `withLoading(${getDisplayName(WrappedComponent)})`;
  return WithLoading;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export { withLoading };
