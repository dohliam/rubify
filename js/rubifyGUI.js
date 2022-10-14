import Rubify from "./index.js";
/**
 * @author jomin398
 * @see {@link Rubify}
 * @desc GUI Api for Rubify homepage
 */
export default class RubifyGUI extends Rubify {
    constructor() {
        super();
    }
    init() {
        document.getElementById("revealhtml").onclick = () => this.#toggleHtml();
        document.getElementById("savesvg").onclick = () => this.#saveSvg();
        document.getElementById("savepng").onclick = () => this.#savePng();
        document.querySelector("#convert_buttons :nth-child(1)").onclick = () => this.#venify();
        document.querySelector("#convert_buttons :nth-child(2)").onclick = () => this.#demo();
        document.querySelector('form#inmode').onchange = m => this.#changeMode(m.target.value);
        document.querySelector('form#rtPos').onchange = v => this.#rtPos(v.target.value);
        document.querySelector('form#rtSize').onchange = v => this.#rtSize(v.target.value);

        document.querySelector('form#rbText').onchange = v => this.#rbSize(v.target.value);
        document.querySelector('form#rbText').oninput = v => this.#rbSize(v.target.value);

        document.querySelector('input#ptCol').onchange = v => this.#textCol(v.target.value);
        document.querySelector('input#ptCol').oninput = v => this.#textCol(v.target.value);

        document.querySelector('input#pbkCol').onchange = v => this.#bgCol(v.target.value);
        document.querySelector('input#pbkCol').oninput = v => this.#bgCol(v.target.value);

        document.querySelector('input#prtCol').onchange = v => this.#rtCol(v.target.value);
        document.querySelector('input#prtCol').oninput = v => this.#rtCol(v.target.value);

        document.querySelector('#demolang').onchange = () => this.#demo();
    }
    #toggleHtml() {
        let code = document.getElementById("htmlcode");
        let btn = document.getElementById("revealhtml");
        let style = code.style;
        if (style.display == "none") {
            style.display = "";
            btn.textContent = "Hide HTML";
        } else {
            style.display = "none";
            btn.textContent = "Show HTML";
        }
    }

    #changeMode(mode) {
        let div = document.getElementById(mode);
        div.style.display = "";
        let off = "simple";
        if (mode == "simple") {
            off = "complex";
        }
        document.getElementById(off).style.display = "none";
    }

    #rtPos(pos) {
        let div = document.getElementById("textout");
        div.style.rubyPosition = pos;
    }

    #rtSize(size) {
        let rtsize = document.getElementById("style_rt_size");
        rtsize.textContent = "rt {font-size: " + size + "}";
    }

    #rbSize(size) {
        let textout = document.getElementById("textout");
        let rbsval = document.getElementById("rbsval");
        textout.style.fontSize = size + "em";
    }

    #rtCol(col) {
        let rtcol = document.getElementById("style_rt_col");
        rtcol.textContent = "rt {color: " + col + "}";
    }

    #bgCol(picker) {
        document.getElementById('textout').style.backgroundColor = picker;
    }

    #textCol(picker) {
        document.getElementById('textout').style.color = picker;
    }

    #saveSvg() {
        domtoimage.toSvg(document.querySelector("#textout"))
            .then(dataUrl => {
                var link = document.createElement('a');
                link.download = 'rubify.svg';
                link.href = dataUrl;
                link.click();
            });
    }

    #savePng() {
        domtoimage.toPng(document.querySelector("#textout"))
            .then(dataUrl => {
                var link = document.createElement('a');
                link.download = 'rubify.png';
                link.href = dataUrl;
                link.click();
            });
    }

    #demo() {
        let lang = parseInt(document.getElementById("demolang").value);

        let rbinput = document.getElementById("rbinput");
        let rtinput = document.getElementById("rtinput");
        let complexin = document.getElementById("complexin");

        let rbiArr = ["漢語拼音", "注音符號", "粵語拼音", "日本語の振り仮名", "韓國語"];
        let rtiArr = ["Hàn yǔ pīn yīn", "ㄓㄨˋ ㄧㄣ ㄈㄨˊ ㄏㄠˋ", "Jyut⁶ jyu⁵ ping¹ yam¹", "に ほん ご の ふ り が な", "한 국 어"];
        let prcArr = ["漢(Hàn)語(yǔ)拼(pīn)音(yīn)", "注(ㄓㄨˋ)音(ㄧㄣ)符(ㄈㄨˊ)號(ㄏㄠˋ)", "粵(Jyut⁶)語(jyu⁵)拼(ping¹)音(yam¹)", "日(に)本(ほん)語(ご)の()振(ふ)り()仮(が)名(な)", "韓(한)國(국)語(어)"];

        rbinput.value = rbiArr[lang];
        rtinput.value = rtiArr[lang];
        complexin.value = prcArr[lang];
    }
    #venify() {
        let textout = document.getElementById("textout");
        let htmlcode = document.getElementById("htmlcode");
        let revealbtn = document.getElementById("revealhtml");
        let savepng = document.getElementById("savepng");
        let savesvg = document.getElementById("savesvg");
        let mode = document.forms[0].inputmode.value;
        let result = "<ruby>";
        if (mode == "simple") {
            let rb = document.getElementById("rbinput").value;
            let rt = document.getElementById("rtinput").value;
            result += this.simpleConv(rb, rt);
        } else {
            let comp = document.getElementById("complexin").value;
            result += this.complexConv(comp);
        }
        result += "</ruby>";
        textout.innerHTML = result;
        htmlcode.value = result;
        revealbtn.style.display = "";
        savepng.style.display = "";
        savesvg.style.display = "";
    }
}