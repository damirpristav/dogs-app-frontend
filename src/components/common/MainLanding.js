import React, { Fragment } from 'react';

import Header from '../common/Header';
import bannerImg from '../../assets/img/banner.jpg';

const MainLanding = (props) => {
  return (
    <Fragment>
      <Header transparent />
      <section className="s-landing" style={{backgroundImage: `url(${bannerImg})`}}>
        <div className="container">
          {props.children}
        </div>
      </section>
    </Fragment>
  )
}

export default MainLanding;
