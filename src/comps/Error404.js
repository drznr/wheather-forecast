import React from 'react';

function Error404() { 
  return (
    <section className="error404"> 
      <h5 className="error404_num">404</h5>
      <p className="error404_txt">the page you are looking for doesn't exists.</p>
      <img src="/images/404.png" alt="sad robot" className="error404_img"/>
    </section>
  );
}

export default Error404;