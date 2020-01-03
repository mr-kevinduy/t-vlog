import React from 'react';
import { withRouter } from 'react-router';
import Meta from '../common/Meta';
import Header from '../frontend/common/Header';
import Footer from '../frontend/common/Footer';

class FullLayout extends React.Component {
  constructor(props) {
    super(props)
    this.backTopRef = React.createRef();
  }

  handleScrollTop = () => {
    this.backTopRef.current.scrollTo(0, 0);
  }

  render() {
    const { children, id, className, ...rest } = this.props;

    return (
      <div id={id} className={className ? `main-layout ${className}` : `main-layout`} ref={this.backTopRef}>
        <Meta pathname={this.props.location.pathname} {...rest} />
        <Header />
        <div className="site-content">
          { children }
        </div>
        <Footer />
      </div>
    );
  }
}

export default withRouter(FullLayout);
