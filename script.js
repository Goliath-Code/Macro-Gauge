// ID'd FOR THE FROM OPENING PANEL
const hatch = document.getElementById("hatch");
const openBtn = document.getElementById("open-button");
const closeBtn = document.getElementById("close-button");

// SLIDERS AND OUTPUT FROM MAIN INNER PANEL
// READ AND DISPLAY SLIDER FOR KG
const kgSlider = document.getElementById("weight-kg-slider");
const kgOutput = document.getElementById("weight-kg-output");
// READ AND DISPLAY SLIDER FOR CENTIMETERS
const cmSlider = document.getElementById("height-cm-slider");
const cmOutput = document.getElementById("height-cm-output");
// READ AND DISPLAY SLIDER FOR AGE
const ageSlider = document.getElementById("age-slider");
const ageOutput = document.getElementById("age-output");
// READ AND DISPLAY SLIDER FOR ACTIVITY LEVEL
const activitySlider = document.getElementById("activity");
const activityOutput = document.getElementById("activity-output");
// READ CALORY COUNT
const bmrOutput = document.getElementById("bmr-output"); 

// MACRO COUNTS WHERE FROM IS THE LOWER OF THE TWO NUMBERS DISPLAYED FOR EACH MACRO TYPE
const fromProteinCount = document.getElementById("from-protein-count");
const fromCarbsCount = document.getElementById("from-carb-count");
const fromFatsCount = document.getElementById("from-fat-count");
// MACRO CONT FOR THE UPPER END OF THE RANGE OF MACROS DESIRED
const proteinCount = document.getElementById("protein-count");
const carbsCount = document.getElementById("carb-count");
const fatCount = document.getElementById("fat-count");

// CURRENT METRICS AND TARGETS
const kgCurrent = document.getElementById("kg-current");
const kgTarget = document.getElementById("kg-target");
//////////////////////////////////////////////////////////////////////
const muscleCurrent = document.getElementById("muscle-current");
const muscleTarget = document.getElementById("muscle-target");
//////////////////////////////////////////////////////////////////////
const viceralFatCurrent = document.getElementById("viceral-fat-current");
const viceralFatTarget = document.getElementById("viceral-fat-target");
//////////////////////////////////////////////////////////////////////
const bodyFatCurrent = document.getElementById("body-fat-current");
const bodyFatTarget = document.getElementById("body-fat-target");
//////////////////////////////////////////////////////////////////////
const bmiCurrent = document.getElementById("bmi-current");
const bmiTarget = document.getElementById("bmi-target");

// GENDERS
const maleGender = document.getElementById("male");
const femaleGender = document.getElementById("female");

// DISPLAY DATA ON THE MAIN FROM PANEL THAT SLIDES DOWN
const bmrDisplay = document.getElementById("bmr-output-display");
const weightDisplay = document.getElementById("weight-display");
const muscleDisplay = document.getElementById("muscle-display");
const viceralDisplay = document.getElementById("viceral-display");
const bodyFatDisplay = document.getElementById("body-fat-display");
const proteinDisplay = document.getElementById("protein-display");
const carbsDisplay = document.getElementById("carbs-display");
const fatsDisplay = document.getElementById("fats-display");
//////////////////////////////////////////////////////////////////////
const fromProteinDisplay = document.getElementById("from-protein-display");
const fromCarbsDisplay = document.getElementById("from-carbs-display");
const fromFatsDisplay = document.getElementById("from-fats-display");

// SAVE & UPDATE BUTTON
const updateBtn = document.getElementById("update-button");

// DEFAULT SETTING FOR THE HATCH
let openClosed = false;


// CALCULATING YOUR BMI SCORE FROM DATA USER INPUTS AND DISPLAYING IN THE INPUT BOX
function bmiCount() {
    const height = (cmSlider.value / 100) *2;

    bmi = kgSlider.value / height;    

    if (bmi < 18.5) {
        bmiCurrent.style.backgroundColor = "lightblue";
    } else if (bmi > 18.5 && bmi < 24.9) {
        bmiCurrent.style.backgroundColor = "lime";
    } else if (bmi > 25 && bmi < 29.9) {
        bmiCurrent.style.backgroundColor = "yellow";
    } else if (bmi > 30 && bmi < 34.9) {
        bmiCurrent.style.backgroundColor = "orange";
    } else if (bmi > 35) {
        bmiCurrent.style.backgroundColor = "red";
    }
    bmiCurrent.value = bmi.toFixed(2);    

    // SETTING BMI SCORE TO LOCAL STORAGE FOR IT TO BE UPDATE LATER WHEN APP REOPENS
    localStorage.setItem("bmiSave", bmi.toFixed(2));
    // 18.5 blue/Underweight
    // 18.5-24.9 green/ Normal
    // 25-29.9 yellow/Overweight
    // 30-34.9 orange/Obese
    // 35< red/Extremely Obese
    
}


// HARRIS BENEDICT FORMULA - RESPONSIBLE FOR CALLORY COUNT BASED UPON KG, HEIGHT, AGE AND GENDER
function harrisBenedict() {
    // SETTING STORED DATA TO TRUE/FALSE TO UPDATE RADIO BUTTONS AS CHECKED FROM STORAGE LATER
    if (male.checked == true) {
        localStorage.setItem("maleSave", true);
        localStorage.setItem("femaleSave", false);
    } 
    if (female.checked == true) {
        localStorage.setItem("femaleSave", true);
        localStorage.setItem("maleSave", false);
    }
    
    // CHECKING IF MALE OR FEMALE IS CHECKED THEN RUNNING THE REQUIRED EQUATION
    if(male.checked == true){
        let maleBMR = (kgSlider.value * 10) + (cmSlider.value * 6.25) - (5 * ageSlider.value) + 5;
        let withActivity = 0;
        activitySlider.value == 0 ? withActivity = Math.ceil(maleBMR * 1.2) : 
        activitySlider.value == 25 ? withActivity = Math.ceil(maleBMR * 1.375) : 
        activitySlider.value == 50 ? withActivity = Math.ceil(maleBMR * 1.55) :
        activitySlider.value == 75 ? withActivity = Math.ceil(maleBMR * 1.725) : 
        activitySlider.value == 100 ? withActivity = Math.ceil(maleBMR * 1.9) : bmrOutput.textContent = "ERR0" ;      
        
        localStorage.setItem("bmrOutputSave", withActivity);

        bmrOutput.textContent = withActivity;
        bmrDisplay.textContent = withActivity;
        
    } else if (female.checked == true){
        let femaleBMR = (kgSlider.value * 10) + (cmSlider.value * 6.25) - (5 * ageSlider.value) - 161;
        let withActivity = 0;
        activitySlider.value == 0 ? withActivity = Math.ceil(femaleBMR * 1.2) : 
        activitySlider.value == 25 ? withActivity = Math.ceil(femaleBMR * 1.375) : 
        activitySlider.value == 50 ? withActivity = Math.ceil(femaleBMR * 1.55) :
        activitySlider.value == 75 ? withActivity = Math.ceil(femaleBMR * 1.725) : 
        activitySlider.value == 100 ? withActivity = Math.ceil(femaleBMR * 1.9) : bmrOutput.textContent = "ERR0" ;   

        localStorage.setItem("bmrOutputSave", withActivity);

        bmrOutput.textContent = withActivity;
        bmrDisplay.textContent = withActivity;       
        
    } else {
        bmrOutput.textContent = "Error";
        
    }

}

function macroCounts() {
    if (activitySlider.value == 0) {
        var protein = (activitySlider.value + 0.8) * kgSlider.value;
        var fromProtein = (activitySlider.value - 0) * kgSlider.value;
    } else if (activitySlider.value == 25) {
        var protein = (activitySlider.value - 23.8) * kgSlider.value;
        var fromProtein = (activitySlider.value - 24.2) * kgSlider.value;
    } else if (activitySlider.value == 50) {
        var protein = (activitySlider.value - 48.6) * kgSlider.value;
        var fromProtein = (activitySlider.value - 48.8) * kgSlider.value;
    }  else if (activitySlider.value == 75) {
        var protein = (activitySlider.value - 73) * kgSlider.value;
        var fromProtein = (activitySlider.value - 73.6) * kgSlider.value;
    }  else if (activitySlider.value == 100) {
        var protein = (activitySlider.value - 98) * kgSlider.value;
        var fromProtein = (activitySlider.value - 98.8) * kgSlider.value;
    }

    localStorage.setItem("proteinCountSave", Math.ceil(protein));
    localStorage.setItem("fromProteinCountSave", Math.ceil(fromProtein));

    fromProteinDisplay.textContent = Math.ceil(fromProtein);
    fromProteinCount.textContent = Math.ceil(fromProtein);
    proteinCount.textContent = Math.ceil(protein);
    proteinDisplay.textContent = Math.ceil(protein);
    
    if (activitySlider.value == 0) {
        var carbs = (activitySlider.value + 5) * kgSlider.value;
        var fromCarbs = (activitySlider.value + 0) * kgSlider.value;
    } else if (activitySlider.value == 25) {
        var carbs = (activitySlider.value - 18) * kgSlider.value;
        var fromCarbs = (activitySlider.value - 20) * kgSlider.value;
    } else if (activitySlider.value == 50) {
        var carbs = (activitySlider.value - 40) * kgSlider.value;
        var fromCarbs = (activitySlider.value - 44) * kgSlider.value;
    }  else if (activitySlider.value == 75) {
        var carbs = (activitySlider.value - 67) * kgSlider.value;
        var fromCarbs = (activitySlider.value - 70) * kgSlider.value;
    }  else if (activitySlider.value == 100) {
        var carbs = (activitySlider.value - 88) * kgSlider.value;
        var fromCarbs = (activitySlider.value - 92) * kgSlider.value;
    }

    localStorage.setItem("carbsCountSave", Math.ceil(carbs));
    localStorage.setItem("fromCarbsCountSave", Math.ceil(fromCarbs));

    fromCarbsDisplay.textContent = Math.ceil(fromCarbs);
    fromCarbsCount.textContent = Math.ceil(fromCarbs);
    carbsCount.textContent = Math.ceil(carbs);
    carbsDisplay.textContent = Math.ceil(carbs);
    
    if (activitySlider.value == 0) {
        var fats = (activitySlider.value + 1) * kgSlider.value;
        var fromFats = (activitySlider.value + 0.5) * kgSlider.value;
    } else if (activitySlider.value == 25) {
        var fats = (activitySlider.value - 23.5) * kgSlider.value;
        var fromFats = (activitySlider.value - 24.5) * kgSlider.value;
    } else if (activitySlider.value == 50) {
        var fats = (activitySlider.value - 48.5) * kgSlider.value;
        var fromFats = (activitySlider.value - 49.5) * kgSlider.value;
    }  else if (activitySlider.value == 75) {
        var fats = (activitySlider.value - 73.5) * kgSlider.value;
        var fromFats = (activitySlider.value - 74.5) * kgSlider.value;
    }  else if (activitySlider.value == 100) {
        var fats = (activitySlider.value - 98) * kgSlider.value;
        var fromFats = (activitySlider.value - 99.5) * kgSlider.value;
    }

    localStorage.setItem("fatsCountSave", Math.ceil(fats));
    localStorage.setItem("fromFatsCountSave", Math.ceil(fromFats));

    fromFatsDisplay.textContent = Math.ceil(fromFats);
    fromFatsCount.textContent = Math.ceil(fromFats);
    fatCount.textContent = Math.ceil(fats);
    fatsDisplay.textContent = Math.ceil(fats);
    
}

// UPDATING THE BACKGROUND COLOR OF THE INPUT FIELDS FOR BMI TO INDICATE BMI DANGER LEVELS
function updateBmiColors() {
    bmiCur = bmiCurrent.value = localStorage.getItem("bmiSave");   
    bmiTar = bmiTarget.value = localStorage.getItem("bmiTargetSave");
    
    if (bmiCur < 18.5) {
        bmiCurrent.style.backgroundColor = "lightblue";        
    } else if (bmiCur > 18.5 && bmiCur < 24.9) {
        bmiCurrent.style.backgroundColor = "lime";        
    } else if (bmiCur > 25 && bmiCur < 29.9) {
        bmiCurrent.style.backgroundColor = "yellow";        
    } else if (bmiCur > 30 && bmiCur < 34.9) {
        bmiCurrent.style.backgroundColor = "orange";        
    } else if (bmiCur > 35) {
        bmiCurrent.style.backgroundColor = "red";        
    }

    if (bmiTar < 18.5) {        
        bmiTarget.style.backgroundColor = "lightblue";
    } else if (bmiTar > 18.5 && bmiTar < 24.9) {        
        bmiTarget.style.backgroundColor = "lime";
    } else if (bmiTar > 25 && bmiTar < 29.9) {        
        bmiTarget.style.backgroundColor = "yellow";
    } else if (bmiTar > 30 && bmiTar < 34.9) {        
        bmiTarget.style.backgroundColor = "orange";
    } else if (bmiTar > 35) {
        bmiTarget.style.backgroundColor = "red";
    }
}


// AUTO UPDATING THE FOLLOWING DATA FROM LOCAL STORAGE ON RELOAD OF PAGE
function updateAll() {
    // BMR/CALORY UPDATE
    bmrOutput.textContent = localStorage.getItem("bmrOutputSave");
    bmrDisplay.textContent = localStorage.getItem("bmrOutputSave");
    // MACROS UPDATE
    proteinCount.textContent = localStorage.getItem("proteinCountSave");
    proteinDisplay.textContent = localStorage.getItem("proteinCountSave");
    //////////////////////////////////////////////////////////////////////
    carbsCount.textContent = localStorage.getItem("carbsCountSave");
    carbsDisplay.textContent = localStorage.getItem("carbsCountSave");
    //////////////////////////////////////////////////////////////////////
    fatCount.textContent = localStorage.getItem("fatsCountSave");
    fatsDisplay.textContent = localStorage.getItem("fatsCountSave");
    //////////////////////////////////////////////////////////////////////
    kgSlider.value = localStorage.getItem("kgOutputSave");
    kgOutput.textContent = localStorage.getItem("kgOutputSave");
    kgCurrent.value = localStorage.getItem("kgOutputSave");
    //////////////////////////////////////////////////////////////////////
    cmSlider.value = localStorage.getItem("cmOutputSave");
    cmOutput.textContent = localStorage.getItem("cmOutputSave");
    //////////////////////////////////////////////////////////////////////
    ageSlider.value = localStorage.getItem("ageOutputSave");
    ageOutput.textContent = localStorage.getItem("ageOutputSave");
    //////////////////////////////////////////////////////////////////////
    activitySlider.value = localStorage.getItem("activitySliderSave");
    activityOutput.textContent = localStorage.getItem("activityOutputSave");
    //////////////////////////////////////////////////////////////////////
    kgTarget.value = localStorage.getItem("kgTargetSave");
    //////////////////////////////////////////////////////////////////////
    bmiCurrent.value = localStorage.getItem("bmiSave");   
    bmiTarget.value = localStorage.getItem("bmiTargetSave");
    //////////////////////////////////////////////////////////////////////
    fromProteinCount.textContent = localStorage.getItem("fromProteinCountSave");
    fromProteinDisplay.textContent = localStorage.getItem("fromProteinCountSave");
    //////////////////////////////////////////////////////////////////////
    fromCarbsCount.textContent = localStorage.getItem("fromCarbsCountSave");
    fromCarbsDisplay.textContent = localStorage.getItem("fromCarbsCountSave");
    //////////////////////////////////////////////////////////////////////
    fromFatsCount.textContent = localStorage.getItem("fromFatsCountSave");
    fromFatsDisplay.textContent = localStorage.getItem("fromFatsCountSave");

    // READ CURRENT VALUES AND TARGET VALUE THEN SAVE THEM.
    bodyFatCurrent.value = localStorage.getItem("bodyFatCurrentSave");
    viceralFatCurrent.value = localStorage.getItem("viceralFatCurrentSave");
    muscleCurrent.value = localStorage.getItem("muscleCurrentSave");

    bodyFatTarget.value = localStorage.getItem("bodyFatTargetSave");
    viceralFatTarget.value = localStorage.getItem("viceralFatTargetSave");
    muscleTarget.value = localStorage.getItem("muscleTargetSave");
    
    // TAKE THESE VALUES FROM THE LOCAL STORAGE AND MINUS THE CURRENT VALUE FROM THE TARGET VALUE,
    // DISPLAY THE REMAINING TARGET ON THE FRONT DISPLAY.
    const targetKg = localStorage.getItem("kgTargetSave");
    const currentKg = localStorage.getItem("kgCurrentSave");
    const weightGain = parseInt(targetKg) - parseInt(currentKg);    

    weightDisplay.textContent = weightGain;    

    muscleDisplay.textContent = muscleTarget.value - muscleCurrent.value;
    viceralDisplay.textContent = viceralFatTarget.value - viceralFatCurrent.value;
    bodyFatDisplay.textContent = bodyFatTarget.value - bodyFatCurrent.value;

    localStorage.setItem("gain-weight", weightGain);

    let male = localStorage.getItem("maleSave");
    let female = localStorage.getItem("femaleSave");

    femaleGender.checked = JSON.parse(female);
    maleGender.checked = JSON.parse(male);

    updateBmiColors();
    
}

function realTimeUpdate() {
    currentKg.value = kgSlider.value;
    
}




// MAIN UPDATE FUNCTION CONTROLLED BY THE SAVE BUTTON
function updateButton(e) {
    e.preventDefault();

    localStorage.setItem("kgTargetSave", kgTarget.value);

    localStorage.setItem("bodyFatCurrentSave", bodyFatCurrent.value);
    localStorage.setItem("viceralFatCurrentSave", viceralFatCurrent.value);
    localStorage.setItem("muscleCurrentSave", muscleCurrent.value);

    localStorage.setItem("bodyFatTargetSave", bodyFatTarget.value);
    localStorage.setItem("viceralFatTargetSave", viceralFatTarget.value);
    localStorage.setItem("muscleTargetSave", muscleTarget.value);
    localStorage.setItem("bmiTargetSave", bmiTarget.value);

    kgCurrent.value = localStorage.getItem("kgCurrentSave");

    updateBmiColors();    
    bmiCount();
    macroCounts();
    harrisBenedict();
}

// READING THE SLIDER FOR FIVE ACTIVITY LEVELS
function UpdateSlider() {
    kgOutput.textContent = kgSlider.value;
    cmOutput.textContent = cmSlider.value;
    ageOutput.textContent = ageSlider.value;

    localStorage.setItem("kgOutputSave", kgSlider.value);
    localStorage.setItem("kgCurrentSave", kgSlider.value);
    localStorage.setItem("cmOutputSave", cmSlider.value);
    localStorage.setItem("ageOutputSave", ageSlider.value);
    localStorage.setItem("activitySliderSave", activitySlider.value);    

    if (activitySlider.value == 0) {
        activityOutput.textContent = "Little to no exercise";
        localStorage.setItem("activityOutputSave", "Little to no exercise");
    } else if (activitySlider.value == 25) {
        activityOutput.textContent = "Light to moderate exercise, 1-3 days per week";
        localStorage.setItem("activityOutputSave", "Light to moderate exercise, 1-3 days per week");
    } else if (activitySlider.value == 50) {
        activityOutput.textContent = "Moderate to high-intensity endurance training, e.g., marathon runners, cyclists";
        localStorage.setItem("activityOutputSave", "Moderate to high-intensity endurance training, e.g., marathon runners, cyclists");
    } else if (activitySlider.value == 75) {
        activityOutput.textContent = "Weightlifting, bodybuilding, high-intensity training";
        localStorage.setItem("activityOutputSave", "Weightlifting, bodybuilding, high-intensity training");
    } else if (activitySlider.value == 100) {
        activityOutput.textContent = "Extreme endurance activities lasting several hours or more";
        localStorage.setItem("activityOutputSave", "Extreme endurance activities lasting several hours or more");
    }

}

// CONTROLS THE HATCH THAT OPEN ON THE CLICK OF A BUTTON
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// OPEN HATCH FUNCTIONALITY AND STYLING TO FIT SCREEN SIZES
async function openHatch() {
    openClosed = !openClosed ? true : false;
    // VIEWPORT WIDTH TRIES TWO METHODS TO FIND THE WINDOW SIZE
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;    

    // if true then open hatch, else close
    if (openClosed) {
        if(viewportWidth > 1400){
            hatch.style.width = "96%";
            hatch.style.height = "830px";
            hatch.style.margin = "3.5% 2% 2% 1%";
            hatch.style.boxShadow = "inset 0 0 10px #000";
            openBtn.textContent = "CLOSE";
            openBtn.style.padding = "2% 0.5%";
            hatch.style.transition = "all 1s ease-in";
            openBtn.style.border = "2px solid #0ff";
            openBtn.style.backgroundColor = "#333";
            openBtn.style.color = "#0ff";
            hatch.style.marginTop = "83%";
            hatch.style.transition = "all 3s ease";
            await delay(2000);
            
            
        }
        if (viewportWidth > 768 && viewportWidth < 992) {
            hatch.style.width = "96%";
            hatch.style.height = "710px";
            hatch.style.margin = "3.5% 2% 2% 1%";
            hatch.style.boxShadow = "inset 0 0 10px #000";
            openBtn.textContent = "CLOSE";
            openBtn.style.padding = "2% 0.5%";
            hatch.style.transition = "all 1s ease-in";
            openBtn.style.border = "2px solid #0ff";
            openBtn.style.backgroundColor = "#333";
            openBtn.style.color = "#0ff";
            hatch.style.marginTop = "87%";
            hatch.style.transition = "all 3s ease";
            await delay(2000);           
            
        }
        // if (viewportWidth < 1681) {
            
        //     hatch.style.width = "96%";
        //     hatch.style.height = "710px";
        //     hatch.style.margin = "3.5% 2% 2% 1%";
        //     hatch.style.boxShadow = "inset 0 0 10px #000";
        //     openBtn.textContent = "CLOSE";
        //     openBtn.style.padding = "2% 0.5%";
        //     hatch.style.transition = "all 1s ease-in";
        //     openBtn.style.border = "2px solid #0ff";
        //     openBtn.style.backgroundColor = "#333";
        //     openBtn.style.color = "#0ff";
        //     hatch.style.marginTop = "82%";
        //     hatch.style.transition = "all 3s ease";
        //     await delay(2000);
            
        // } 
        // if (viewportWidth < 1441) {
        //     hatch.style.width = "96%";
        //     hatch.style.height = "710px";
        //     hatch.style.margin = "3.5% 2% 2% 1%";
        //     hatch.style.boxShadow = "inset 0 0 10px #000";
        //     openBtn.textContent = "CLOSE";
        //     openBtn.style.padding = "2% 0.5%";
        //     hatch.style.transition = "all 1s ease-in";
        //     openBtn.style.border = "2px solid #0ff";
        //     openBtn.style.backgroundColor = "#333";
        //     openBtn.style.color = "#0ff";
        //     hatch.style.marginTop = "82%";
        //     hatch.style.transition = "all 3s ease";
        //     await delay(2000);
            
        // }   
        
    } else {
        

        if(viewportWidth > 1400){
            hatch.style.marginTop = "2%";
            hatch.style.transition = "all 3s ease";
            
            await delay(2000);
            hatch.style.width = "calc(100% - 20px)";
            hatch.style.height = "830px";
            hatch.style.margin = "0";
            hatch.style.boxShadow = "inset 0 0 0px";
            hatch.style.transition = "all 3s ease-in";
            openBtn.textContent = "OPEN";
            openBtn.style.padding = "2% 1%";
            openBtn.style.border = "2px solid #aaa";
            openBtn.style.backgroundColor = "lightgrey";
            openBtn.style.color = "#333";
            
            
        } 
        if (viewportWidth > 768 && viewportWidth < 992) {
            hatch.style.marginTop = "2%";
            hatch.style.transition = "all 3s ease";
            
            await delay(2000);
            hatch.style.width = "calc(100% - 20px)";
            hatch.style.height = "710px";
            hatch.style.margin = "0";
            hatch.style.boxShadow = "inset 0 0 0px";
            hatch.style.transition = "all 3s ease-in";
            openBtn.textContent = "OPEN";
            openBtn.style.padding = "2% 1%";
            openBtn.style.border = "2px solid #aaa";
            openBtn.style.backgroundColor = "lightgrey";
            openBtn.style.color = "#333";
            
        }
        // if (viewportWidth < 1681) {
        //     hatch.style.marginTop = "2%";
            
        //     await delay(2000);
        //     hatch.style.width = "calc(100% - 20px)";
        //     hatch.style.height = "710px";
        //     hatch.style.margin = "0";
        //     hatch.style.boxShadow = "inset 0 0 0px";
        //     hatch.style.transition = "all 3s ease-in";
        //     openBtn.textContent = "OPEN";
        //     openBtn.style.padding = "2% 1%";
        //     openBtn.style.border = "2px solid #aaa";
        //     openBtn.style.backgroundColor = "lightgrey";
        //     openBtn.style.color = "#333";            
            
        // }
        // if (viewportWidth < 1441) {
        //     hatch.style.marginTop = "2%";
        //     hatch.style.transition = "all 3s ease";
            
        //     await delay(2000);
        //     hatch.style.width = "calc(100% - 20px)";
        //     hatch.style.height = "710px";
        //     hatch.style.margin = "0";
        //     hatch.style.boxShadow = "inset 0 0 0px";
        //     hatch.style.transition = "all 3s ease-in";
        //     openBtn.textContent = "OPEN";
        //     openBtn.style.padding = "2% 1%";
        //     openBtn.style.border = "2px solid #aaa";
        //     openBtn.style.backgroundColor = "lightgrey";
        //     openBtn.style.color = "#333";
            
        // }
    }    
}

function toggleBurgerMenu() {
    const burgerMenu = document.getElementById("burger-menu");
    burgerMenu.classList.toggle("open-burger-menu");
    // burgerMenu.style.marginTop = "0vh";
    burgerMenu.style.transition = "all 3s ease";
}
function myFunction(x) {
    x.classList.toggle("change");
    toggleBurgerMenu();

}


// EVENT LISTENERS
kgSlider.addEventListener("input", UpdateSlider);
cmSlider.addEventListener("input", UpdateSlider);
ageSlider.addEventListener("input", UpdateSlider);
activitySlider.addEventListener("input", UpdateSlider);

male.addEventListener("input", harrisBenedict);
female.addEventListener("input", harrisBenedict);

openBtn.addEventListener("click", openHatch);

updateBtn.addEventListener("click", updateButton);

// UPDATE ONLOAD FUNCTIONALITY
updateAll();

