import React from 'react';
import CardItem from './CardItem';

class SectionCards extends React.Component {
  render() {
    const items = []

    for (let i = 0; i < 3; i++) {
      items.push(<CardItem key={i}/>)
    }

    return (
      <section className="cards-section">
        <div className="container">
          <h2 className="section-title text-center">The Docker Enterprise Difference</h2>
          <h3 className="section-subtitle text-center">Leading companies rely on our container platform to build, manage and secure all their applications from traditional applications to cutting-edge microservices — and deploy them anywhere.</h3>
          <div className="cards-row row mt-5">
            { items }
          </div>
        </div>
      </section>
    );
  }
}

export default SectionCards;
