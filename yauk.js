$.fn.setUrduInput = function (options) 
{

	var m={"q":"ق","w":"و","e":"ع","r":"ر","t":"ت","y":"ے","u":"ء","i":"ی","o":"ہ","p":"پ","a":"ا","s":"س","d":"د","f":"ف","g":"گ","h":"ح","j":"ج","k":"ک","l":"ل","z":"ز","x":"ش","c":"چ","v":"ط","b":"ب","n":"ن","m":"م","`":"ً",",":"،",".":"۔","Q":"ْ","W":"ّ","E":"ٰ","R":"ڑ","T":"ٹ","Y":"َ","U":"ئ","I":"ِ","O":"ۃ","P":"ُ","A":"آ","S":"ص","D":"ڈ","G":"غ","H":"ھ","J":"ض","K":"خ","Z":"ذ","X":"ژ","C":"ث","V":"ظ","N":"ں","M":"٘","~":"ٍ","?":"؟","F":"ٔ","L":"ل","B":"ب"};
	var urduNumerals = {"0": "۰", "1": "۱", "2": "۲", "3": "۳", "4": "۴", "5": "۵", "6": "۶", "7": "۷", "8": "۸", "9": "۹"}; //http://www.omniglot.com/language/numbers/urdu.htm
	options && options.urduNumerals ? $.extend(m, urduNumerals) : null;

	var last = '';
	$(this).bind('input', function ()
	{
		var pos = $(this)[0].selectionEnd;
		var s = $(this).val();		
		var isLastPos = (pos==s.length);
		if (last==s) return;
		var S = [];
		for (var x = 0; x < s.length; x++)
		{
			var c = s.charAt(x);
			S.push(m[c]||c);
		}
		$(this).val(S.join(''));
		last = $(this).val();
		if (!isLastPos) {
			$(this)[0].selectionStart = $(this)[0].selectionEnd = pos;
		}
	});
};
