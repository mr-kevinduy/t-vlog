import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazy-load';
import LegitImage from 'legit-image';

const getProps = ({src, alt, title}) => ({
    src: `https://rexxars.github.io/react-layout-pack/img/${src}`,
    alt: alt.replace(/\(\d+\)$/, ''),
    title: title,
    height: alt.replace(/.*\((\d+)\)$/, '$1') | 0
});

class ImageRender extends React.Component {
    render() {
      const {src, alt, title, height} = getProps(this.props);

      return (
        <div className="image-wrapper">
        <div className="description">{title}</div>

        <LazyLoad height={height || null}>
        <LegitImage src={src} alt={alt} />
        </LazyLoad>
        </div>
      );
    }
}

ImageRender.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  alt: PropTypes.string
};

export default ImageRender;
