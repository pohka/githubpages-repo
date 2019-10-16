
import React, { Component } from 'react';
import './KV.css';

class KVPage extends Component {

  render()
  {
    return(
      <div>
        <div className="kv-con">
          <div className="kv-section">
            <textarea placeholder="Paste or edit your KV file here.."></textarea>
          </div>
          <div className="kv-section"><code>output</code></div>
        </div>
      </div>
    );
  }
}

export default KVPage;
