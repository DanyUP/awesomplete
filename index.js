$ = Awesomplete.$;
$$ = Awesomplete.$$;

document.addEventListener("DOMContentLoaded", function() {
	var nav = $("nav")
	$$("section > h1").forEach(function (h1) {
		if (h1.parentNode.id) {
			$.create("a", {
				href: "#" + h1.parentNode.id,
				textContent: h1.textContent.replace(/\(.+?\)/g, ""),
				inside: nav
			});
		}
	});
});

//Select box example

(function(){

    function copySelectedValue(input, select){
        //Copy select box text to input field
        if(select.selectedIndex > -1){
            input.value = select.options[select.selectedIndex].text;
        }
    }
    
    function init() {
        Awesomplete.$$("select.awesomplete").forEach(function (select) {

            //Copying all data-* attributes
            var dataAttributes = Array.prototype.slice.call(select.attributes)
                .filter(function(attr) {
                    return /^data-/.test(attr.name);
                }).reduce(function(obj, attr){
                    obj[attr.name] = attr.value;
                    return obj;
                }, {});

            //Create input element used by Awesomplete
            var input = Awesomplete.$.create('input', dataAttributes);
            select.parentElement.insertBefore(input, select);
            select.setAttribute("hidden", "");

            copySelectedValue(input, select);

            //Start Awesomplete
            var awesompleteElement = new Awesomplete(input, {
                list: select
            });

            //Create dropdown button
            var button = Awesomplete.$.create('button');
            input.parentElement.insertBefore(button, input.nextSibling);

            Awesomplete.$.bind(button, {
                'click': function(){
                    //Open full suggestion list
                    awesompleteElement.evaluate("");
                }
            });

            Awesomplete.$.bind(input, {
                'awesomplete-selectcomplete': function(){
                    //When user select an item, update the real hidden select box
                    var selectedItems = Awesomplete.$$("option", select).filter(function(elem){
                        return  elem.text === input.value
                    });
                    if(selectedItems.length > 0){
                        select.value = selectedItems[0].value;  
                    }
                },
                'blur': function(){
                    //When user deselect input box synchronize it with the real selected item
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

