/* Load the PolymerElement base class and html helper function */
import { PolymerElement, html } from '../node_modules/@polymer/polymer/polymer-element.js';
/* Load shared styles. All view elements use these styles */


/* Extend the base PolymerElement class */
class BAPlayerView extends PolymerElement {
	/* Define a template for the new element */
	static get template() {
		return html`
      <style include="shared-styles">
        :host {
          display: block;

          
        }
      </style>
						 
     
                        <input id="prevslicebutton" class="btn btn-default btn-sm" type="button" value="<<< Click" onclick="clickbackseq()" />
                        <input id="playtoneseq" class="btn btn-default btn-sm" type="button" value="play tone seq" onclick="playseq()" />
                       
                        <input id="clickthrubutton" class="btn btn-default btn-sm" type="button" value="Click >>>" onclick="clickthruseq()" />
                        <input id="muteBTN" class="btn btn-default btn-sm" type="button" value="MUTE" onclick="muteaudio()" />
						 <button id="record" class="btn btn-danger">RECORD</button>
						 <button id="cancel" class="btn btn-default hidden">CANCEL</button>
<hr>
    `;
	}
}
/* Register the new element with the browser */
window.customElements.define('ba-player', BAPlayerView);