window.onscroll = function () {
	var B = document.body, 
			DE = document.documentElement,
			O = Math.min (B.clientHeight, DE.clientHeight); 

	if (!O) {
		O = B.clientHeight;
	}

	var S = Math.max (B.scrollTop, DE.scrollTop),
			C = Math.max (B.scrollHeight, DE.scrollHeight);

	if (O + S == C) {
		console.log('Работаем');
	}	
}
