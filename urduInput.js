Element.prototype.urduInput = function(
    control = {
        numeric: true,
        buttons: ["language", "layout"],
        default_language: "UR",
        default_style: true,
        default_image: 'https://github.com/awaisathar/yauk/raw/master/kb.png?raw=true'
    }
) {
    var inputs = control.buttons != null ? control.buttons : ["language", "layout"];
    var def = control.default_language != null ? control.default_language : 'UR';
    var style = control.default_style != null ? control.default_style : true;
    var default_image = control.default_image != null ? control.default_image : 'https://github.com/awaisathar/yauk/raw/master/kb.png?raw=true';
    var numeric = control.numeric != null ? control.numeric : true;
    var cls = this.classList[0];
    var alphabets = {
            q: "ق",
            w: "و",
            e: "ع",
            r: "ر",
            t: "ت",
            y: "ے",
            u: "ء",
            i: "ی",
            o: "ہ",
            p: "پ",
            a: "ا",
            s: "س",
            d: "د",
            f: "ف",
            g: "گ",
            h: "ح",
            j: "ج",
            k: "ک",
            l: "ل",
            z: "ز",
            x: "ش",
            c: "چ",
            v: "ط",
            b: "ب",
            n: "ن",
            m: "م",
            "`": "ً",
            ",": "،",
            ".": "۔",
            Q: "ْ",
            W: "ّ",
            E: "ٰ",
            R: "ڑ",
            T: "ٹ",
            Y: "َ",
            U: "ئ",
            I: "ِ",
            O: "ۃ",
            P: "ُ",
            A: "آ",
            S: "ص",
            D: "ڈ",
            G: "غ",
            H: "ھ",
            J: "ض",
            K: "خ",
            Z: "ذ",
            X: "ژ",
            C: "ث",
            V: "ظ",
            N: "ں",
            M: "٘",
            "~": "ٍ",
            "?": "؟",
            F: "ٔ",
            L: "ل",
            B: "ب"
        },
        numbers = {
            0: "۰",
            1: "۱",
            2: "۲",
            3: "۳",
            4: "۴",
            5: "۵",
            6: "۶",
            7: "۷",
            8: "۸",
            9: "۹"
        },
        el = this,
        parentNode = el.parentNode;
    control && numeric ?
        (alphabets = Object.assign({}, alphabets, numbers)) :
        false;
    var old = "",
        run,
        handler = function(e) {
            var control = this.selectionEnd,
                numbers = this.value,
                event = control == numbers.length;
            var last = val =>
                val.split("").length > 1 ?
                val.split("")[val.split("").length - 1] :
                val;
            var cut = val => {
                return val
                    .split("")
                    .slice(0, val.split("").length - 1)
                    .join("");
            };
            if (
                e.inputType == "deleteContentBackward" ||
                e.inputType == "deleteContentForward" ||
                e.data == " "
            ) {
                old = this.value;
                return false;
            }
            if ((this.value != "" || this.value != " ") && typeof e.data !== "undefined") {
                var input =
                    typeof alphabets[e.data] == "undefined" ? e.data : alphabets[e.data];
                insertAtCursor(this, input, old);
                old = this.value;
            }
        };

    function insertAtCursor(myField, myValue, old) {
        //IE support
        if (document.selection) {
            myField.focus();
            sel = document.selection.createRange();
            sel.text = myValue;
        } else if (myField.selectionStart || myField.selectionStart == "0") {
            //MOZILLA and others
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            myField.value =
                old.substring(0, startPos + myValue.length - 2) +
                myValue +
                old.substring(endPos + myValue.length - 2, old.length);
            myField.selectionStart = startPos + myValue.length;
            myField.selectionEnd = startPos + myValue.length - 1;
        } else {
            myField.value += myValue;
        }
    }
    var removeListener = function() {
        el.removeEventListener("input", handler);
        el.style.textAlign = "left";
        el.style.direction = "ltr";
    };
    var destroy = function() {
        old = el.value;
        removeListener();
        removeOtherInputs();
        parentNode.querySelector(".layoutInfo").remove();
        parentNode.outerHTML = parentNode
            .querySelector(".inline-langs")
            .innerHTML.toString()
            .trim();
        el = document.querySelector("." + cls);
        return el;
    };
    var addParent = function() {
        old = el.value;
        el.outerHTML = `<div class="lang-container"><span class="inline-langs">${el.outerHTML}</span></div>`;
        el = parentNode.querySelector("." + cls);
    };
    var addSimpleStyle = function() {
        var style = document.createElement("style");
        style.innerHTML = `.lang-container .inline-langs{ display:block; float:left; }.switch-langs .switch{border:1px solid grey;  background:#ccc;}.lang-container, .lang-container .switch-langs, .lang-container input, .lang-container button{  float:left;}.lang-container img{  float:left;  clear:both;  max-width:100%;}.hidden{  display:none;}`;
        document.head.appendChild(style);
    };
    var addOtherInputs = function() {
        if (inputs.length > 0) {
            addParent();
        }
        inputs = typeof inputs == "object" ? inputs : [];
        inputs.forEach(function(value, ind) {
            var button = document.createElement("button");
            button.classList.add("switch");
            button.classList.add(value);
            button.setAttribute("onclick", "return false");
            button.setAttribute("role", "button");
            var text = value == "language" ? "UR" : value == "layout" ? "⌨" : "?";
            button.innerHTML = text;
            parentNode.querySelector(".inline-langs").appendChild(button);
            if (value == "layout" && ind == inputs.length - 1) {
                var img = document.createElement("img");
                img.classList.add("hidden");
                img.classList.add("layoutInfo");
                img.src = default_image;
                parentNode.querySelector(".lang-container").append(img);
            }
        }, el);
        parentNode.querySelectorAll(".switch").forEach(function(ell) {
            ell.addEventListener("click", function() {
                var cls = ell.classList.toString();
                if (cls.includes("language")) {
                    if (ell.innerHTML == "UR") {
                        langEN();
                    } else {
                        langUR();
                    }
                    el.focus();
                }
                if (cls.includes("layout")) {
                    var Eimg = parentNode.querySelector("img.layoutInfo");
                    if (Eimg.classList.toString().includes("hidden")) {
                        Eimg.classList.remove("hidden");
                    } else {
                        Eimg.classList.add("hidden");
                    }
                }
            });
        });
        if (style) {
            addSimpleStyle();
        }
        run();
        if (def == "UR") {
            langUR();
        }
        if (def == "EN") {
            langEN();
        }
    };
    var langEN = function() {
        var ell =
            parentNode.querySelector(".switch.language") != null ?
            parentNode.querySelector(".switch.language") :
            "";
        old = el.value;
        if (ell != "") {
            ell.innerHTML = "EN";
            removeListener();
            alphabets = alphabets;
        }
        return el;
    };
    var langUR = function() {
        var ell =
            parentNode.querySelector(".switch.language") != null ?
            parentNode.querySelector(".switch.language") :
            "";
        old = el.value;
        if (ell != "") {
            ell.innerHTML = "UR";
            alphabets = Object.assign({}, alphabets, numbers);
            run();
        }
        return el;
    };
    var attachHandler = function() {
        old = el.value;
        el.addEventListener("input", handler);
        el.style.textAlign = "right";
        el.style.direction = "rtl";
    };
    run = attachHandler;
    addOtherInputs();
    var removeOtherInputs = function() {
        parentNode.querySelectorAll(".switch").forEach(function(el) {
            el.remove();
        });
    };
    return { destroy, langEN, langUR, unbind: removeListener };
};