import { svg, html } from 'lit';

const svgContent = svg`
<path fill="#00e8ff" d="M40 120l20-60l90 90l-30 50l-40-40h-20"/>
<path fill="#283198" d="M80 160v-80l40-40v80M0 160l40 40l20-40l-20-40h-20"/>
<path fill="#324fff" d="M40 120v-80l40-40v80M120 200v-80l40-40v80M0 160v-80l40 40"/>
<path fill="#0ff" d="M40 200v-80l40 40"/>
`

export default html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200">
  ${svgContent};
</svg>`;
