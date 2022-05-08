import { useEffect } from 'react';

export default function Content(props) {
  useEffect(() => {
    var t = '';
    document.onmouseup = getContent;
    if (!document.all) document.captureEvents(Event.MOUSEUP);

    function getContent(e) {
      t = document.all
        ? document.selection.createRange().text
        : document.getSelection().getRangeAt(0);
      document.getElementById('input').value = t;
      props.setPosition([t.startOffset, t.endOffset]);
      props.setText(document.getElementById('input').value);
    }
  });
  return (
    <div id='wrapper'>
      <div id='container'>
        <h1>Double Click on Word or Highlight</h1>
        <input id='input' type='text' style={{ display: 'none' }}></input>
        <section className='open-book'>
          <header>
            <h1>{props.title}</h1>
            <h6>{props.author}</h6>
          </header>
          <article className='article'>
            <div className='page'>
              <p className='content'>{props.page[0].content}</p>
            </div>
            <br />
            <div className='page'>
              <p className='content'>{props.page[1].content}</p>
            </div>
          </article>
          <footer>
            <ol id='page-numbers'>
              <li>{props.page[0].pageIndex}</li>
              <li>{props.page[1].pageIndex}</li>
            </ol>
          </footer>
        </section>
      </div>
    </div>
  );
}