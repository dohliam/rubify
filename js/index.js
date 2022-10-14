/**
 * @author jomin398
 * @version ES6_1.00
 * @desc Rubify for script. inspred from dojliam's rubify
 * @see {@link https://github.com/dohliam/rubify}
 */
export default class Rubify {
    constructor() { };
    EmptyError = class extends Error {
        constructor() {
            super('No input text provided!'); // (1)
            this.name = "EmptyError"; // (2)
        };
    };
    ConvError = class extends Error {
        constructor() {
            super('Inputs are different lengths!');
            this.name = "ConvError";
        }
    }
    /**
     * @param {String} rb ruby base, mein text to display
     * @param {String} rt ruby text, display text on top or bottom of base.
     * @returns {HTMLElement} html ruby tag
     */
    simpleConv(rb, rt) {
        // rb = document.getElementById("rbinput").value;
        // rt = document.getElementById("rtinput").value;
        let rbArray = rb.split("");
        let rtArray = rt.split(" ");
        let rblen = rbArray.length;
        let rtlen = rtArray.length;
        let simpleout = "";
        if (rblen == "") {
            throw this.EmptyError();
        } else if (rblen != rtlen) {
            throw this.ConvError();
        } else {
            for (var i = 0; i < rblen; i++) {
                let char = rbArray[i];
                let tr = rtArray[i];
                simpleout += "<rb>" + char + "</rb><rp>(</rp><rt>" + tr + "</rt><rp>)</rp>";
            }
        }
        return simpleout;
    }
    /**
     * @param {String} value ruby fomated string
     * @returns {HTMLElement} html ruby tag
     * @example
     * complexConv("日(に)本(ほん)語(ご)")
     */
    complexConv(value) {
        let groups = value.replace(/\)$/, "").split(")");
        let complexout = "";
        if (!value) throw this.EmptyError();
        for (var i = 0; i < groups.length; i++) {
            let phr = groups[i].split("(");
            let char = phr[0];
            let tr = phr[1];
            complexout += "<rb>" + char + "</rb><rp>(</rp><rt>" + tr + "</rt><rp>)</rp>";
        }
        return complexout;
    }
};