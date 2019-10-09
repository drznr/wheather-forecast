import React from 'react';

function MainHeader(props) {
  const dialog = React.createRef();
  const inputError = React.createRef();

  function autoComplete(e) {
    if (e.target.value) {
      if (e.target.value.match(/^[A-Za-z ]*$/)) {
        inputError.current.classList.remove('active');
        props.autoComplete(e.target.value);
        dialog.current.classList.add('open');
      } else {
        inputError.current.classList.add('active');
      }
    } else {
      props.clearAutoComplete();
      dialog.current.classList.remove('open');
  };
  }
  function sendCityName(e) {
    props.changeCityDetails(e.target.dataset.key, e.target.textContent);
    dialog.current.classList.remove('open');
  }
  return (
      <div className="mainHeader">
      <p className="mainHeader_search_error" ref={inputError}>please type a valid city name (english letters only)</p>
        <div className="mainHeader_search">
          <span role="img" aria-label="search" className="mainHeader_search_i">&#128270;</span>
          <input type="text" id="locationSearch" placeholder="search city" onChange={autoComplete} className="mainHeader_search_input" />
          <label htmlFor="locationSearch" className="mainHeader_search_label">search city</label>
          <div className="mainHeader_search_dialog" ref={dialog} >
            <ul className="mainHeader_search_dialog_resaults">
                {props.autoCompleteData.length === 0 ? <li className="mainHeader_search_dialog_resaults_loader"><img src="/images/loader-search.gif" className="mainHeader_search_dialog_resaults_loader_loader" alt="loader"/></li> : ""}
              {
                props.autoCompleteData.map((city, index) =>
                  <li key={index}
                    className="mainHeader_search_dialog_resaults_resault"
                    onClick={sendCityName}
                    data-key={city.Key}
                  >{city.LocalizedName}</li>
                )
              }
            </ul>
          </div>
        </div>
      </div>
  );
}

export default MainHeader;