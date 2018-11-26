import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

function withLoader(WrappedComponent) {
  function WithLoader(props) {
    const {loading, ...etc} = props
    return <React.Fragment>
        <Segment>
          <Dimmer active={loading}>
            <Loader content="Loading" />
          </Dimmer>
          <WrappedComponent {...etc} />
        </Segment>
      </React.Fragment>;
  }
  WithLoader.displayName = `withLoader(${getDisplayName(WrappedComponent)})`;
  return WithLoader;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export { withLoader };
