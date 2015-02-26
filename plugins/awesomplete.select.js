
(function(){

	function copySelectedValue(input, select){
		if(select.selectedIndex > -1){
			input.value = select.options[select.selectedIndex].text;
		}
	}
	
	function init() {
		Awesomplete.$$("select.awesomplete").forEach(function (select) {

			var input = Awesomplete.$.create('input');
			select.parentElement.insertBefore(input, select);
			select.setAttribute("hidden", "");

			copySelectedValue(input, select);

			var button = Awesomplete.$.create('button', {innerText: '\u25BC'});
			input.parentElement.insertBefore(button, input.nextSibling);

			var awesompleteElement = new Awesomplete(input, {
				list: select
			});

			Awesomplete.$.bind(button, {
				'click': function(){
					awesompleteElement.evaluate("");
				}
			});

			Awesomplete.$.bind(input, {
				'awesomplete-selectcomplete': function(){
					var selectedItems = Awesomplete.$$("option", select).filter(function(elem){
						return  elem.text === input.value
					});
					if(selectedItems.length > 0){
						select.value = selectedItems[0].value;	
					}
				},
				'blur': function(){
					copySelectedValue(input, select);
				}
			});
			
			
		});
	}

	// DOM already loaded?
	if (document.readyState !== "loading") {
		init();
	} else {
		// Wait for it
		document.addEventListener("DOMContentLoaded", init);
	}
})();
