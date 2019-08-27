import React, { Component } from 'react';

class Sharing extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    const { type, content, hashtags, via, url } = this.props;
    const width = 575;
    const height = 400;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    const options = `status=1,width=${width},height=${height},top=${top},left=${left}`;
    const location = url && url !== '' ? url : document.location.protocol + '//' + document.location.host;
    const link = encodeURIComponent(location);

    let uri = '';
    switch (type) {
      case 'twitter':
        uri = `https://twitter.com/share?url=${link}&text=${content}&hashtags=${hashtags}&via=${via}`;
        break;

      case 'facebook':
        uri = `https://facebook.com/sharer/sharer.php?u=${link}&hashtag=%23${hashtags}&quote=${content}`;
        break;

      default:
        break;
    }

    window.open(uri, '', options);
  }

  render() {
    const { label } = this.props;

    return (
      <div className="Sharing">
        <button className="social-sharing__item" onClick={this.handleClick}>
          <span>{ label }</span>
        </button>
      </div>
    );
  }
}

export default Sharing;
