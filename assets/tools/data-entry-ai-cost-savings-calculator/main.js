import { h, render } from 'https://esm.sh/preact';
import { signal } from 'https://esm.sh/@preact/signals@1.2.2';
import htm from 'https://esm.sh/htm';

const html = htm.bind(h);

function App (props) {
    const count = signal(51);

    const increment = () => {
        count.value++;
    }

    const value = count.value;

  return html`
    <div className="flex flex-col gap-3 text-4">
        <h1 className="header-1">Break Even Calculator for Classification Tasks using Generative AI like GPT-4 and Claude 2.1</h1>
        <p>
            Generative AI can be used to automate data entry tasks like invoice processing, form filling, and data extraction. 
        </p>
        <p>This calculator helps you estimate the cost savings of using Generative AI for classification tasks like document classification, sentiment analysis, topic modeling, and named entity recognition.</p>

        <h2 className="header-2">How many documents will you be processing?</h2>

        <button onClick=${() => increment()}>Increment</button>
        <p>${value}</p>

    </div>
  `;
}

const element = document.getElementById("out");

render(html`<${App} name="World" />`, element);