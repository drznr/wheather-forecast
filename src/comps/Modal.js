import React from 'react';

function Modal() {

  function closeModal() {
    document.querySelector('.cover_modal').classList.remove('active');
    setTimeout(()=> {document.querySelector('.cover').classList.remove('active');},300);
  }

  return (
    <div className="cover">
      <aside className="cover_modal">
          <div className="cover_modal_header">
              <h3>something went wrong! &#9888;<span onClick={closeModal} className="cover_modal_header_close">&times;</span></h3>
          </div>
          <div className="cover_modal_body">
              <p>
                an error has occured fetching the data.<br />
                please try agian later...
              </p>
          </div>
          <div className="cover_modal_footer">
            <button className="cover_modal_footer_btn" onClick={closeModal}>ok</button>
          </div>
      </aside>
    </div>
  );
}

export default Modal;