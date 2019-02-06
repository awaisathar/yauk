$.fn.setUrduInput = function(options = { urduNumerals: true, autoload: true }) {
    var m = {
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
    };
    var urduNumerals = {
        "0": "۰",
        "1": "۱",
        "2": "۲",
        "3": "۳",
        "4": "۴",
        "5": "۵",
        "6": "۶",
        "7": "۷",
        "8": "۸",
        "9": "۹"
    }; //http://www.omniglot.com/language/numbers/urdu.htm
    options && options.urduNumerals ? $.extend(m, urduNumerals) : null;
    var autoload = options.autoload != null ? options.autoload : true;
    var old = "",
        el = this;
    var bind = function() {
        old = $(el).val();
        $(el).off("input");
        $(el).bind("input", function(e) {
            e.preventDefault();
            var e = e.originalEvent;
            var control = el[0].selectionEnd,
                numbers = el[0].value,
                event = control == urduNumerals.length;
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
                old = el[0].value;
                return false;
            }
            if (
                (el[0].value != "" || el[0].value != " ") &&
                typeof e.data !== "undefined"
            ) {
                var input = typeof m[e.data] == "undefined" ? e.data : m[e.data];
                insertAtCursor(el[0], input, old);
                old = el[0].value;
            }
        });
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
    if (autoload) {
        old = $(this).val();
        bind();
    }
    var unbind = function() {
        old = $(el).val();
        $(el).off("input");
        return el;
    };
    return { unbind, bind, el };
};