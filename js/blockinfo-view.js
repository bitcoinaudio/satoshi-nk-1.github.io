import { html, PolymerElement } from '../node_modules/@polymer/polymer/polymer-element.js';

/**
 * `blockinfo-view`
 * Display and navigate block info
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class BlockinfoView extends PolymerElement {
	static get template() {
		return html`
       <style>
        :host {
          display: block;
        }
      </style>

			 <div class="blocknav">
                <span><input id="prevblockButton" class="btn btn-default btn-sm" value="< prev" onclick="prevheight()" /></span>

                <span><input type="text" id="searchTB"  onchange="getstring()" placeholder="ENTER BLOCK HEIGHT"></span>

                <span><input id="nextblockButton" class="btn btn-default btn-sm" value="next >" onclick="nextheight()" /></span>
</div>
<div id="blockinfo" class="blockinfo">
            <h2>blockinfo goes hear</h2>
        </div>
 <select name="stringtype" id="stringtype" class="btn btn-default btn-sm">
                                
                                <option value="root">Root</option>
                                <option value="hash">Hash</option>
                            </select><input id="blockTB" class="text-center" name="blockTB">

<hr>
    `;
	}
	static get properties() {
		return {
			prop1: {
				type: String,
				value: 'blockinfo-view'
			}
		};
	}
}

window.customElements.define('blockinfo-view', BlockinfoView);
