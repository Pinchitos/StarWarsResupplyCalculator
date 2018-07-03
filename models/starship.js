//Declare time constants to avoid using "Magic numbers"
const yearConst = {
    name: 'year',
    hours: '8760'
}
const monthConst = {
    name: 'month',
    hours: '730'
}
const weekConst = {
    name: 'week',
    hours: '168'
}
const dayConst = {
    name: 'day',
    hours: '24'
}

//Export of the Starship class to use it in other files
module.exports = class Starship {

    //The constructor will take only the required parameters
    constructor(name, MGLT, consumables) {
        this.name = name;
        this.MGLT = MGLT;
        this.consumables = consumables;
        this.consumableMGLT = this.calculateConsumableMGLT();
    }

    //Method to perform the operation the total amount of MGLT without resupply
    calculateConsumableMGLT() {
        //Initialize the variable for the hours of consumables the ship has
        var consumableHours;

        /*Get the number of consumables and multiply it for the number of hours depending 
        on the time measure (day,week,month,year)*/
        var consumableQty = this.consumables.match(/\d+/)[0];
        if (this.consumables.includes(yearConst.name)) {
            consumableHours = consumableQty * yearConst.hours
        } else
        if (this.consumables.includes(monthConst.name)) {
            consumableHours = consumableQty * monthConst.hours
        } else
        if (this.consumables.includes(weekConst.name)) {
            consumableHours = consumableQty * weekConst.hours
        } else
        if (this.consumables.includes(dayConst.name)) {
            consumableHours = consumableQty * dayConst.hours
        }
        //Get the MGLT traveled with the consumables
        return consumableHours * this.MGLT;
    }

    //Calculate the number of stops the ship has to do
    calculateStops(InputMGLT){
        return Math.trunc(InputMGLT/this.consumableMGLT)
    }

    //Method to create the desired string for the output
    resultToString(InputMGLT) {
        return `${this.name}: ${this.calculateStops(InputMGLT)}`;
    }
}