const piPdCalculator = (newValue, oldValue) => {
  const percentage = ((newValue - oldValue) / oldValue) * 100;
  const roundedPercentage = percentage.toFixed(2);
  if (newValue > oldValue) {
    return `Percentage Increase: ${roundedPercentage}%`;
  } else if (newValue < oldValue) {
    return `Percentage Decrease: ${-roundedPercentage}%`;
  } else {
    return "No percentage increase or decrease";
  }
};

document
  .getElementById("floatingInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = "Data for Total_Data_Volume_Upda";
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const lastEntryIndex = jsonData.length - 1;
        const lastDayEntryIndex = jsonData.length - 97;
        const lastWeekEntryIndex = jsonData.length - 673;
        console.log(lastEntryIndex);
        console.log(lastDayEntryIndex);
        console.log(lastWeekEntryIndex);

        if (jsonData.length > 0) {
          const lastWeekEntry = jsonData[lastWeekEntryIndex];
          const lastDayEntry = jsonData[lastDayEntryIndex];
          const lastEntry = jsonData[lastEntryIndex];
          console.log(lastDayEntry);
          console.log(lastEntry);
          console.log(lastWeekEntry);
          displayLastEntry(lastWeekEntry, lastDayEntry, lastEntry);
        } else {
          document.getElementById("output").innerText =
            "No data found in the file.";
        }
      };
      reader.readAsArrayBuffer(file);
    }
  });

function displayLastEntry(lastWeekEntry, lastdayEntry, entry) {
  // const outputDiv = document.getElementById("output");
  // outputDiv.innerHTML = "<h2>Current Entry</h2>";
  // const ul = document.createElement("ul");
  // for (const key in entry) {
  //   if (entry.hasOwnProperty(key)) {
  //     const li = document.createElement("li");
  //     li.textContent = `${key}: ${entry[key]}`;
  //     ul.appendChild(li);
  //   }
  // }
  // outputDiv.appendChild(ul);

  // const lastDayOutputDiv = document.getElementById('lastday-output');
  // lastDayOutputDiv.innerHTML = '<h2>Last Day Entry</h2>';
  // const p = document.createElement('p');
  // for (const key in lastdayEntry) {
  //     if (lastdayEntry.hasOwnProperty(key)) {
  //         p.textContent = `${key}: ${lastdayEntry[key]}`
  //     }
  // }
  // lastDayOutputDiv.appendChild(p);

  // document.getElementById(
  //   "output"
  // ).innerHTML = `<p>Current value: ${entry['Total_Data_Volume_Updated']}</p>`;
  // document.getElementById(
  //   "lastday-output"
  // ).innerHTML = `<p>Last day Entry: ${lastdayEntry['Total_Data_Volume_Updated']}</p>`;
  // document.getElementById(
  //   "lastweek-output"
  // ).innerHTML = `<p>Last Week Entry: ${lastWeekEntry['Total_Data_Volume_Updated']}</p>`;

  document.getElementById(
    "current"
  ).textContent = `${entry["Total_Data_Volume_Updated"]}`;
  document.getElementById(
    "lastday"
  ).textContent = `${lastdayEntry["Total_Data_Volume_Updated"]}`;
  document.getElementById(
    "lastweek"
  ).textContent = `${lastWeekEntry["Total_Data_Volume_Updated"]}`;

  const lastdayComparison = piPdCalculator(
    entry["Total_Data_Volume_Updated"],
    lastdayEntry["Total_Data_Volume_Updated"]
  );
  const lastWeekComparison = piPdCalculator(
    entry["Total_Data_Volume_Updated"],
    lastWeekEntry["Total_Data_Volume_Updated"]
  );

  console.log("lastday: " + lastdayComparison);
  console.log("lastweek: " + lastWeekComparison);

  document.getElementById(
    "pipd-from-lastday"
  ).innerHTML = `<h6 class="mb-0">From yesterday</h6>, ${lastdayComparison}`;

  document.getElementById(
    "pidpd-from-lastweek"
  ).innerHTML = `<h6 class="mb-0">From last week</h6>, ${lastWeekComparison}`;
}
