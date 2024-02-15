---
layout: calculator
---


<div id="calculator-root"></div>

<script>
    const calculatorDom = `
<div class="flex flex-col gap-2">
    <h1 class="header-1">Unit Cost Savings Calculator</h1>
    <p>You can use this calculator to see how much money you could save on data entry by using AI. The calculations are based on the case study below.</p>
    <br/>
    <table class="table">
        <tr>
            <td>Number of Source Documents</td>
            <td>
                <input type="range" min="1000" max="1000000" value="100000" onInput="onInputChange()" id="numDocuments">
                <span id="numDocumentsValue">100000</span>
            </td>
        </tr>
        <tr>
            <td>Manual Entry Speed (documents/hour)</td>
            <td>
                <input type="range" min="50" max="200" value="100" onInput="onInputChange()" id="manSpeed">
                <span id="manSpeedValue">100</span> documents per hour
            </td>
        </tr>
        <tr>
            <td>Manual Entry Salary ($/hour)</td>
            <td>
                <input type="range" min="1" max="30" value="10" onInput="onInputChange()" id="manSalary">
                <span id="manSalaryValue">10</span> per hour
            </td>
        </tr>
        <tr>
            <td>Manual Entry Cost:</td>
            <td><strong><span id="estimatedManualCost">10,000</span></strong></td>
        </tr>
        <tr>
            <td>Cost using AI:</td>
            <td><strong><span id="estimatedAiCost">257.50</span></strong> (Using OpenAI GPT-3.5 Turbo)</td>
        </tr>
        <tr>
            <td>Savings Percentage:</td>
            <td><strong><span id="estimatedPctSavings">--</span></strong></td>
        </tr>
    </table>
</div>
`;


    function calculateManualCost() {
        const numDocuments = parseInt(document.getElementById("numDocuments").value, 10);
        const manSpeed = parseInt(document.getElementById("manSpeed").value, 10);
        const manSalary = parseInt(document.getElementById("manSalary").value, 10);
        
        const hours = numDocuments / manSpeed;
        const cost = hours * manSalary;
        
        return cost;
    }

    function calculateAiCost() {
        const numDocuments = parseInt(document.getElementById("numDocuments").value, 10);

        const averageInputLength = 5000;
        const totalInputTokens = numDocuments * averageInputLength;
        const averageInputCostPer1000Tokens = 0.0005;
        const inputCost = averageInputCostPer1000Tokens * (totalInputTokens / 1000);

        const averageOutputLength = 50;
        const averageOutputCostPer1000Tokens = 0.0015;
        const totalOutputTokens = numDocuments * averageOutputLength;
        const outputCost = averageOutputCostPer1000Tokens * (totalOutputTokens / 1000);

        const totalCost = inputCost + outputCost;

        return totalCost;
    }

    function onInputChange() {
        document.getElementById("numDocumentsValue").innerText = formatWholeNumber(document.getElementById("numDocuments").value)
        document.getElementById("manSpeedValue").innerText = formatWholeNumber(document.getElementById("manSpeed").value);
        document.getElementById("manSalaryValue").innerText = formatCurrency(document.getElementById("manSalary").value)
        
        const manCost = calculateManualCost();
        const aiCost = calculateAiCost();
        document.getElementById("estimatedManualCost").innerText = formatCurrency(manCost)
        document.getElementById("estimatedAiCost").innerText = formatCurrency(aiCost)

        const savingsPct = ((manCost - aiCost) / manCost) * 100;
        document.getElementById("estimatedPctSavings").innerText = formatPercent(savingsPct);
    }

    function formatWholeNumber(num) {
        return Number(num).toLocaleString("en-US", {minimumFractionDigits: 0, maximumFractionDigits: 0});
    }

    function formatFloat(num) {    
        return Number(num).toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }

    function formatCurrency(num) {
        return "$" + formatFloat(num);
    }

    function formatPercent(num) {
        return "" + formatFloat(num) + "%"
    }

    document.addEventListener("DOMContentLoaded", () => {
        document.getElementById("calculator-root").innerHTML = calculatorDom;
        onInputChange(); // Initialize with default values
    });
</script>