let chartInstance;

const calculatorDom = `
<div class="flex flex-col gap-2">
    <h1 class="header-1">Data Entry AI Cost Savings Calculator</h1>
    <p>You can use this calculator to see how much money you could save on data entry by using AI for data entry.</p>
    <br/>
    <table class="table">
        <tr><th colspan="2" class="font-bold">Work Scope</th></tr>
        <tr>
            <td>Number of Documents to Process</td>
            <td>
                <div class="flex flex-col gap-2">
                    <input type="range" min="1000" max="1000000" value="100000" onInput="onInputChange()" id="numDocuments">
                    <div><span id="numDocumentsValue">100000</span> docs</div>
                </div>
            </td>
        </tr>
        <tr>
            <td>Frequency</td>
            <td>
                <select id="frequency" onChange="onInputChange()">
                    <option value="once">Once</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </td>
        </tr>
        <tr><th colspan="2" class="font-bold">With Humans</th></tr>
        <tr>
            <td>Human Speed</td>
            <td>
                <div class="flex flex-col gap-2">
                    <input type="range" min="50" max="200" value="100" onInput="onInputChange()" id="manSpeed">
                    <div><span id="manSpeedValue">100</span> docs per hour</div>
                </div>
            </td>
        </tr>
        <tr>
            <td>Human Salary</td>
            <td>
                <div class="flex flex-col gap-2">
                    <input type="range" min="1" max="100" value="10" onInput="onInputChange()" id="manSalary">
                    <div><span id="manSalaryValue">10</span> per hour</div>
                </div>
            </td>
        </tr>
        <tr>
            <td>Total Human Cost</td>
            <td><strong><span id="estimatedManualCost">10,000</span></strong></td>
        </tr>
        <tr><th colspan="2" class="font-bold">With Artificial Intelligence</th></tr>
        <tr>
          <td>AI Model</td>
          <td>
            <select id="aiModel" onChange="onInputChange()">
              <option value="open-source">Open Source</option>
              <option value="openai-gpt-3.5">OpenAI GPT-3.5</option>
              <option value="claude-instant">Claude Instant</option>
              <option value="claude-2.1">Claude 2.1</option>
              <option value="openai-gpt-4">OpenAI GPT-4</option>
            </select>
          </td>
        </tr>
        <tr>
            <td>AI Cost</td>
            <td><strong><span id="estimatedAiCost">257.50</span></strong></td>
        </tr>
        <tr><th colspan="2">Fixed Costs</th></tr>
        <tr>
            <td>Estimated Project Cost</td>
            <td>
            <select id="fixedCost" onChange="onInputChange()">
                <option value="50000">$50,000</option>
                <option value="100000">$100,000 (typical small startups)</option>
                <option value="150000">$150,000</option>
                <option value="200000">$200,000</option>
                <option value="250000">$250,000</option>
                <option value="300000">$300,000</option>
                <option value="400000">$400,000</option>
                <option value="500000">$500,000 (typical large startups)</option>
                <option value="750000">$750,000</option>
                <option value="1000000">$1,000,000</option>
                <option value="1250000">$1,250,000</option>
                <option value="1500000" selected="true">$1,500,000 (typical midsized)</option>
                <option value="2000000">$2,000,000</option>
                <option value="2500000">$2,500,000</option>
                <option value="3000000">$3,000,000 (typical enterprise)</option>
                <option value="4000000">$4,000,000</option>
                <option value="5000000">$5,000,000</option>
                <option value="6000000">$6,000,000</option>
                <option value="7000000">$7,000,000</option>
                <option value="8000000">$8,000,000</option>
                <option value="9000000">$9,000,000</option>
                <option value="10000000">$10,000,000</option>
            </select>
            </td>
        </tr>
    </table>

    <h2 class="header-1">Results</h2>
    <p>By using AI for data entry, you could save <strong><span id="estimatedPctSavings">--</span></strong> on data entry costs.</p>
    <canvas id="chartOut"></canvas>
</div>
`;

const AI_MODELS = {
  "open-source": {
    inputCostPer1000Tokens: 0,
    outputCostPer1000Tokens: 0,
  },
  "openai-gpt-3.5": {
    inputCostPer1000Tokens: 0.0005,
    outputCostPer1000Tokens: 0.0015,
  },
  "openai-gpt-4": {
    inputCostPer1000Tokens: 0.03,
    outputCostPer1000Tokens: 0.06,
  },
  "claude-instant": {
    inputCostPer1000Tokens: 0.0008,
    outputCostPer1000Tokens: 0.0024,
  },
  "claude-2.1": {
    inputCostPer1000Tokens: 0.008,
    outputCostPer1000Tokens: 0.024,
  }
}

function calculateManualCost({ numDocuments, manSpeed, manSalary }) {
  const hours = numDocuments / manSpeed;
  const cost = hours * manSalary;

  return cost;
}

function calculateAiCost({ numDocuments, aiModel }) {
  const modelInputCost = AI_MODELS[aiModel].inputCostPer1000Tokens;
  const modelOutputCost = AI_MODELS[aiModel].outputCostPer1000Tokens;

  const averageInputLength = 5000;
  const totalInputTokens = numDocuments * averageInputLength;
  const averageInputCostPer1000Tokens = modelInputCost;
  const inputCost = averageInputCostPer1000Tokens * (totalInputTokens / 1000);

  const averageOutputLength = 50;
  const totalOutputTokens = numDocuments * averageOutputLength;
  const outputCost = modelOutputCost * (totalOutputTokens / 1000);

  const totalCost = inputCost + outputCost;

  return totalCost;
}

function onInputChange() {
  // input parsing
  const numDocuments = parseInt(document.getElementById("numDocuments").value);
  const manSpeed = parseInt(document.getElementById("manSpeed").value);
  const manSalary = parseInt(document.getElementById("manSalary").value);
  const aiModel = document.getElementById("aiModel").value;
  const frequency = document.getElementById("frequency").value;
  const fixedCost = parseInt(document.getElementById("fixedCost").value);

  // calculations
  const manCost = calculateManualCost({ numDocuments, manSpeed, manSalary });
  const aiCost = calculateAiCost({ numDocuments, aiModel });
  const savingsPct = ((manCost - aiCost) / manCost) * 100;

  // text outputs
  document.getElementById("estimatedManualCost").innerText = formatCurrency(manCost)
  document.getElementById("estimatedAiCost").innerText = formatCurrency(aiCost)
  document.getElementById("numDocumentsValue").innerText = formatWholeNumber(numDocuments)
  document.getElementById("manSpeedValue").innerText = formatWholeNumber(manSpeed);
  document.getElementById("manSalaryValue").innerText = formatCurrency(manSalary);
  document.getElementById("estimatedPctSavings").innerText = formatPercent(savingsPct);

  // update chart
  if (!chartInstance) {
    const ctx = document.getElementById("chartOut");
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

function formatWholeNumber(num) {
  return Number(num).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function formatFloat(num) {
  return Number(num).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatCurrency(num) {
  return "$" + formatFloat(num);
}

function formatPercent(num) {
  return "" + formatFloat(num) + "%"
}

document.addEventListener("DOMContentLoaded", () => {
  const script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js";
  script.onload = function () {
    document.getElementById("calculator-root").innerHTML = calculatorDom;
    onInputChange(); // Initialize with default values
  }
  document.head.appendChild(script);
});