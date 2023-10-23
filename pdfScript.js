const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth();
const day = currentDate.getDate();
const weekDay = currentDate.getDay();
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];

const formDayDate = `${weekDays[weekDay]}:  ${day}.${month}.${year}`;

// GENERATE PDF BUTTON ID
const genPdf = document.getElementById("generate-pdf");
// Default export is a4 paper, portrait, using millimeters for units
//const { jsPDF } = jspdf;
const doc = new jsPDF();





function generatePdf(e) {
    e.preventDefault();
    
    // FONT GLOBAL STYLES
    doc.setFont("Arial");
    doc.setFontSize(20);
    doc.setDrawColor(255, 255, 255, 0);


    doc.text("Macro Meter Report", 10, 15);
    doc.setFont("Arial");
    doc.setFontSize(11);

    
    doc.text(formDayDate, 160, 15);

    
    // METRICS
    doc.setFontSize(15);
    doc.text("Body Metrics", 10, 30);

    doc.setFontSize(11);        
    doc.text("Age:  " + localStorage.getItem("ageOutputSave"), 10, 40);
    doc.text("Height:  " + localStorage.getItem("cmOutputSave") + "cm", 10, 48);
    doc.text("Activity Level:   " + localStorage.getItem("activityOutputSave"), 10, 56);


    // MACROS
    doc.setFontSize(15);
    doc.text("Macro Ranges", 10, 80);

    doc.setFontSize(11);    
    doc.text("Calories  " + localStorage.getItem("bmrOutputSave"), 10, 90);
    doc.text("Protein:  " + localStorage.getItem("fromProteinCountSave") + " - " + localStorage.getItem("proteinCountSave"), 10, 98);
    doc.text("Carbs:  " + localStorage.getItem("fromCarbsCountSave") + " - " + localStorage.getItem("carbsCountSave"), 10, 106);
    doc.text("Fats:  " + localStorage.getItem("fromFatsCountSave") + " - " + localStorage.getItem("fatsCountSave"), 10, 114);


    doc.setFontSize(15);
    doc.text("Current Weight & Volume", 10, 138);
    doc.setFontSize(11);

    // CURRENT
    doc.text("Body Weight:  " + localStorage.getItem("kgOutputSave") + "kg", 10, 148);
    doc.text("Muscle:  " + localStorage.getItem("muscleCurrentSave") + "%", 10, 156);
    doc.text("Viceral Fat:  " + localStorage.getItem("viceralFatCurrentSave") + "%", 10, 164);
    doc.text("Body Fat:  " + localStorage.getItem("bodyFatCurrentSave") + "%", 10, 172);    
    doc.text("Current BMI:  " + localStorage.getItem("bmiSave"), 10, 180);


    doc.setFontSize(15);
    doc.text("Target Weight & Volume", 10, 204);
    doc.setFontSize(11);
    // TARGETS
    doc.text("Target Weight:  " + localStorage.getItem("kgTargetSave") + "kg", 10, 214);
    doc.text("Target Muscle:  " + localStorage.getItem("muscleTargetSave") + "%", 10, 222);
    doc.text("Target Viceral Fat:  " + localStorage.getItem("viceralFatTargetSave") + "%", 10, 230);
    doc.text("Target Body Fat:  " + localStorage.getItem("bodyFatTargetSave") + "%", 10, 238);
    doc.text("Target BMI:  " + localStorage.getItem("bmiTargetSave"), 10, 246);


    doc.save("Macro Meter Report.pdf");

}

genPdf.addEventListener("click", generatePdf);
