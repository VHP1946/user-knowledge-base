/**
 * A function which takes an object and merges it into a larger object.
 * @param {Object} obj | the object being updated
 * @param {Boolean} start | ?
 * @param {Object} mobj | ?
 * @param {Boolean} insert | indicates an insertion is taking place
 * @param {Boolean} copied | indicates the array has already been deep cloned
 * @returns | the modified object
 */
export function MergeObject(obj={},start=false,mobj={},insert=false,copied=false){
	let tobj;
	if(!copied) {
		tobj = JSON.parse(JSON.stringify(obj));
	}
	else {
		tobj=obj
	}
  
	for(let o in tobj){
		if(start){
			if (o === start) {
				start=false
			}
			tobj[o]=tobj[o].constructor== Object?MergeObject(tobj[o],start,mobj,insert,true):tobj[o];
		} else {
			if(tobj[o]!==undefined){
				if(mobj[o]!=undefined){
					tobj[o] = mobj[o].constructor !== Object?mobj[o]:MergeObject(tobj[o],start,mobj[o],insert,true);
				}
			}
		}
	}
	return tobj
}

export function FilterByText(e, searchKey, staticData) {
  	let newData = null;
  	if (e.target.value == "") {
		newData = null
  	} else {
		newData = []
	  	for (let obj in staticData) {
			//Search through the properties of each object
		  	for (let key in staticData[obj]) {
			  	if (key == searchKey || searchKey == undefined) {
					if (String(staticData[obj][key]).toLowerCase().includes(e.target.value.toLowerCase())) {
						newData.push(JSON.parse(JSON.stringify(staticData[obj]))) //Push clone of object to new array
					  	break;
				  	}
			  	}
		  	}
	  	}
  	}
  	return newData
}

/**
 * 
 * @param {*} string 
 * @param {*} includes 
 * @returns 
 */
export function TextFilter(string, includes) {
	if (String(string).toLowerCase().includes(includes)) {
		return true
	}
	return false
}

/**
 * Filter a list using a start date and optional end date. If no end date is provided, uses the current date.
 * @param {event} e 
 * @param {string} searchKey | key used for searching data
 * @param {list} staticData | list of data
 * @param {string} startDate | start date for filter range
 * @param {string} endData | end date for filter range
 * @returns filtered list
 */
export function FilterByDate(e, searchKey, staticData, startDate, endDate=null) {
  	let newData = null;
  	if (e.target.value == "") {
	  	newData = null
  	} else {
	  	newData = []

	  	let StartDate = new Date(startDate)
	  	let EndDate = new Date(endDate)

	  	if (startDate) {
		  	for (let obj in staticData) {
				//Search through the properties of each object
				for (let key in staticData[obj]) {
					if (key == searchKey) {
						let ObjDate = new Date(staticData[obj][key])
						if (ObjDate != "Invalid Date") {
							if (ObjDate >= StartDate && (ObjDate <= EndDate || EndDate == "Invalid Date")) {
								newData.push(JSON.parse(JSON.stringify(staticData[obj]))) //Push clone of object to new array
								break;
							}
						}
					}
				}
			}
		}
  	}
  	return newData
}

/**
 * Generic function for setting the state of a single property value.
 * DO NOT MODIFY
 * SERIOUSLY
 * this is used everywhere
 * @param {*} value | value passed in
 * @param {String} key | key in state being updated
 */
export function SetProperty(value, key) {
	this.setState({
		[key]:value
	})
}

/**
 * Sets a singly nested property in state
 * @todo Update to work like the fields
 * @param {*} value | the value being set
 * @param {Object} key | {key:String, nest:String}
 */
export function SetNestedProperty(value, key) {
	let nest = Clone(this.state[key.nest])
	nest[key.key] = value
	this.setState({
		[key.nest]:nest
	})
}

/**
 * Sorts an array in order from earliest to latest date.
 * Credit to https://stackoverflow.com/revisions/47773035/1
 * @param {array} arr | unsorted array with objects containing .Date property
 * @param {boolean} reverse | determines whether to reverse the array on return
 * @param {string} key | the date key used for sorting. defaults 'Date'
 * @returns 
 */
export function SortByDate(arr, reverse = false, key = "Date") {
	arr.sort(function(a,b){
	  	return Number(new Date(a[key])) - Number(new Date(b[key]));
	});
	var filtered = arr.filter(function (el) {
		return el != null;
	});
	if (reverse) {return filtered.reverse()}
	return filtered
}

export function SortByNestedDate(arr, reverse = false, key = "Date", nest) {
	arr.sort(function(a,b){
	  	return Number(new Date(a[nest][key])) - Number(new Date(b[nest][key]));
	});
	var filtered = arr.filter(function (el) {
		return el != null;
	});
	if (reverse) {return filtered.reverse()}
	return filtered
}

export function SortByID(arr, reverse=false) {
	arr.sort(function(a,b){
	  return Number(a.id) - Number(b.id);
	});
	var filtered = arr.filter(function (el) {
		return el != null;
	});
	if (reverse) {return filtered.reverse()}
	return filtered
}

/**
 * Flips the state of a boolean saved in state from true to false or false to true.
 * @param {String} key | describes the boolean being flipped
 */
export function ToggleBoolean(key) {
	this.setState({
		[key]:!this.state[key]
	})
}

/**
 * Sets the state of a boolean saved in state to true.
 * @param {String} key | describes the boolean being set to true
 */
export function SetBooleanTrue(key) {
	this.setState({
		[key]:true
	})
}

/**
 * Sets the state of a boolean saved in state to false.
 * @param {String} key | describes the boolean being set to false
 */
export function SetBooleanFalse(key) {
	this.setState({
		[key]:false
	})
}

/**
 * Sets the state of a property in state to match the dropdowns value
 * @param {Object} input | {text, value} pair
 * @param {String} key | describes the property being set to the dropdown value
 */
export function SetToDropDownValue(Input, key) {
	this.setState({
		[key]:Input.value
	})
}

/**
 * Sets the state of a property in state to match the dropdowns text
 * @param {Object} input | {text, value} pair
 * @param {String} key | describes the property being set to the dropdown text
 */
export function SetToDropDownText(Input, key) {
	this.setState({
		[key]:Input.text
	})
}

/**
 * Loop through each item in state and compare it against the initial object saved to this.savedState.
 * @param {String} staticKey | the key of the static data attached to the component
 * @param {String} ignore | an optional string to denote which key is ignored when checking for changes in state
 * @returns | boolean describing whether or not a form item has been updated
 */
export function GetStateChanged(staticKey = "savedState", ignore = undefined) {
	for (let key in this.state) {
		if (this.state[key] != this[staticKey][key]) {
			if (ignore != undefined) {
				if (key != ignore) {
					return true
				}
			} else {
				return true
			}
		}
	}

	return false
}

/**
 * ??? What was this used for? Spiral Duct form?
 * @param {Object} data | {price, qty} pair of objects used for calculations
 * @param {Object} unitPrices | data containing the collection of unit prices.
 * @returns 
 */
export function CalculatePricingTotal(data, unitPrices) {
	let sum = 0;
	for (let key in unitPrices) {
		if (data[key] != undefined) {
			if (data[key].qty != undefined) {
				sum += Number(data[key].price) * Number(unitPrices[key]) * Number(data[key].qty)
			} else {
				sum += Number(data[key].price) * Number(unitPrices[key])
			}
		}
	}

	return sum
}

/**
 * Takes a req object and a collection of data, and modifies each entry in the req object where its
 * @param {Object} req | object containing keys matching data, set to either "" or "form-item-empty"
 * @param {Object} data | the data within the form
 * @returns | a modified version of req with 'form-item-empty' given for each property in data which has no value
 */
export function CheckFormFill(req, data) {
	for (let innerkey in req) {
		if (data[innerkey] == "") {
			req[innerkey] = "form-item-empty"
		} else {
			if (
				typeof data[innerkey] === 'object' &&
				!Array.isArray(data[innerkey]) &&
				data[innerkey] !== null
			) {
				if (data[innerkey].value == undefined || data[innerkey].value == "") {
					req[innerkey] = "form-item-empty"
				} else {
					req[innerkey] = ""
				}
			} else {
				req[innerkey] = ""
			}
		}
	}
	return req
}

/**
 * Takes a document and returns its CSS in an array
 * @returns an array containing all of the CSS rules of the document
 */
export function GetDocumentCSS() {
	let css= [];

	for (var sheeti= 0; sheeti<document.styleSheets.length; sheeti++) {
		var sheet= document.styleSheets[sheeti];
		var rules= ('cssRules' in sheet)? sheet.cssRules : sheet.rules;
		for (var rulei= 0; rulei<rules.length; rulei++) {
			var rule= rules[rulei];
			if ('cssText' in rule)
				css.push(rule.cssText);
			else
				css.push(rule.selectorText+' {\n'+rule.style.cssText+'\n}\n');
		}
	}

	return css
}

/**
 * A function which takes an element and makes it able to be freely moved around the screen.
 * Credit to: https://www.w3schools.com/howto/howto_js_draggable.asp
 * @param {HTMLElement} elmnt | the container being mad draggable
 * @param {String} draggerid | id of the div which you use to use as the dragger
 */
export function DragElement(elmnt, draggerid="") {
	if (elmnt) {
		var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
		if (document.getElementById(draggerid)) {
			// if present, the header is where you move the DIV from:
			document.getElementById(draggerid).onpointerdown = dragMouseDown;
		} else {
			// otherwise, move the DIV from anywhere inside the DIV:
			elmnt.onpointerdown = dragMouseDown;
		}

		function dragMouseDown(e) {
			e = e || window.event;
			e.preventDefault();
			// get the mouse cursor position at startup:
			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onpointerup = closeDragElement;
			// call a function whenever the cursor moves:
			document.onpointermove = elementDrag;
		}

		function elementDrag(e) {
			e = e || window.event;
			e.preventDefault();
			// calculate the new cursor position:
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;
			// set the element's new position:
			elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
			elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
		}

		function closeDragElement() {
			// stop moving when mouse button is released:
			document.onpointerup = null;
			document.onpointermove = null;
		}
	}
}

/**
 * A function which takes in a collection and returns that collection with all of its
 * text, value pairs stripped back to their text or value. **Directly modifies data.**
 * @param {Object} data | a data object passed into the function to be stripped.
 * @param {String} type | 'text' or 'value'. defaults 'value'
 */
export function StripDescendants(data, property="value") {
	for (let key in data) {
		//Look for text,value pairs in the outer object
		if (data[key].value != undefined) {
			if (property == "value") {
				data[key] = data[key].value
			} else {
				data[key] = data[key].text
			}
		} else {
			//Look for text,value pairs in the inner objects recursively
			if (Object.prototype.toString.call(data[key]) == "[object Object]") {
				//Loop through the inner keys of the object
				for (let innerkey in data[key]) {
					if (data[key][innerkey].value != undefined) {
						if (property == "value") {
							data[key][innerkey] = data[key][innerkey].value
						} else {
							data[key][innerkey] = data[key][innerkey].text
						}
					} else {
						//Recursive case
						//Need to check if it's a string before recursing
						if (Object.prototype.toString.call(data[key][innerkey]) === "[object String]") {
							data[key][innerkey] = data[key][innerkey]
						} else {
							data[key][innerkey] = StripDescendants(data[key][innerkey])
						}
					}
				}
			} else if (Object.prototype.toString.call(data[key]) === "[object Array]" && !(Object.prototype.toString.call(data[key]) === "[object String]")) {
				//Loop through the array and check for value being undefined
				for (let i = 0; i < data[key].length; i++) {
					if (data[key][i].value != undefined) {
						if (property == "value") {
							data[key][i] = data[key][i].value
						} else {
							data[key][i] = data[key][i].text
						}
					} else {
						data[key][i] = StripDescendants(data[key][i])
					}
				}
			} else {
				//Base case
				let val = data[key]
				data[key] = data[key]
			}
		}
	}
	return data
}

/**
 * Clones an object so it can be modified without modifying the original object.
 * @param {Object} obj | the thing being cloned
 * @returns the cloned copy
 */
export function Clone(obj) {
	return JSON.parse(JSON.stringify(obj))
}

/**
 * Resets filters stored in state.
 */
export function ResetFilters() {
	let newFilters = Clone(this.state.filters)
	for (let key in newFilters) {
		newFilters[key] = false
	}

	this.setState({
		filters:newFilters,
		filterCount:0
	})
}

/**
 * Toggles a filter and modifies the filter count.
 * @param {String} key | key identifying the filter
 */
export function ToggleFilter(key) {
	let filters = Clone(this.state.filters)
	let filterCount = 0
	if (filters[key] != undefined) {
		if (filters[key] == true) {
			filters[key] = false
			filterCount = filterCount - 1;
		} else {
			filters[key] = true
			filterCount = filterCount + 1;
		}
	}

	this.setState({
		filters:filters,
		filterCount:this.state.filterCount + filterCount
	})
}

/**
 * Gets the state of the menu, collapsed or not
 * @param {Boolean} collapsed | boolean showing state of collapse
 */
export function GetMenuCollapsed(collapsed) {
	if (collapsed) {
		this.setState({
			collapsed:"collapsed"
		})
	} else {
		this.setState({
			collapsed:""
		})
	}
}

/**
 * Changes the state of the menu's current tab
 * Each time you define a menu bar in a component, include this function
 * @param {Number} TabID 
 */
export function SetTab(TabID) {
	this.setState({
		currentTab:TabID
	})
}
/**
 * Changes the state of the menu's current tab, and collapses the menu bar
 * @param {Number} TabID 
 */
export function SetCollapsibleTab(TabID) {
	this.setState({
		currentTab:TabID
	},()=>{
		if (this.GetMenuCollapsed) {
			this.GetMenuCollapsed(true)
		}
	})
}

/**
 * Loops through a list and creates an object of filters in state according to the key.
 * @param {Array} list | the list of objects being looped through
 * @param {String} key | the key of the property being used for the filter
 */
export function BuildFilters(list, key) {
	let filters = {}
	for (let i = 0; i < list.length; i++) {
		filters[list[i][key]] = false
	}

	this.setState({
		filters:filters
	})
}

/**
 * Toggles the view object in state. Currently supports medium cards and list
 * @param {String} type | the string of the type
 */
export function ToggleViewType(type) {
	let data = [
		"",
		""
	]
	if (type == "medium-cards") {
		data[0] = "selected"
	} else {
		data[1] = "selected"
	}
	this.setState({
		view:type,
		selectedView:data
	})
}

export function StripDate(date) {
	return new Date(date).toLocaleDateString()
}

/**
 * Returns a date string in the format required for the date input field
 * @param {String} date | the date string
 */
export function GetInputDate(date) {
	if (date == "" || date == null) {
		return ""
	}
	return new Date(date).toISOString().substring(0, 10)
}

/**
 * Closes a note by modifying its showNote and timeout state.
 */
export function CloseNote() {
	this.setState({
		DropNoteProps:{
			showNote:false,
			timeout:0
		}
	})
}

/**
 * Toggles the loading screen
 * @param {String} msg | message you wish to be displayed
 */
export function ToggleLoadingScreen(msg = "Getting Work Order") {
	this.setState({
		loading:!this.state.loading,
		loadingMsg:msg
	})
}

/**
 * Updates a DropNote by modifying DropNoteProps in state
 * @param {Boolean} showNote | show or hide the note
 * @param {String} text | the message to show
 * @param {String} level | the level used for the note
 * @param {Number} timeout | how long the note stays on screen in milliseconds. use 0 for no timeout. 
 */
export function SetDropNote(props) {
	this.setState({
		DropNoteProps:props
	})
}

/**
 * Generates an array of selection chips.
 * @param {Array} list | the list being looped through
 * @param {String} displayKey | the key of the property displayed in the chip
 * @param {Function} ClickFunction | the function called
 * @param {String} dataKey | the key indicating where in the config in state the filters exist.
 * @param {String} idKey | the key of the property used in the filter object. defaults to id.
 * @param {Array} colors | the array or object containing the colors
 * @returns an array containing the data for each selection chip
 */
export function GenerateSelectionChips(list, displayKey, ClickFunction, dataKey, idKey = "id", colors) {
	let data = []
	let n = 0; //but why???
	for (let key in list) {
		data[n] = {
			data:{id:list[key][idKey], key:dataKey},
			ClickFunction:ClickFunction,
			keyName:"filter"
		}
		if (this.props.config.filters[list[key][idKey]] == true) {
			data[n].type = "ImageButton"
			data[n].src = "https://www.vhpportal.com/repo/assets/icons/cross.png"
			data[n].buttonClass = "filter-button selected "
			if (colors != undefined) {
				data[n].buttonClass = "filter-button selected " + colors[key]
			} else {
				data[n].buttonClass = "filter-button selected"
			}
			data[n].text = list[key][displayKey]
		} else {
			if (colors != undefined) {
				data[n].buttonClass = "filter-button " + colors[key]
			} else {
				data[n].buttonClass = "filter-button"
			}
			data[n].text = list[key][displayKey]
		}

		n = n + 1
	}

	return data
}

/**
 * Toggles the filters of a specific page.
 * @param {String} id | the key of the property being used for the filter
 * @param {String} key | the key of the page being modified
 */
export function TogglePageFilter(data) {
	let config = Clone(this.state.config)
	let filters = config[data.key].filters
	if (filters[data.id] != undefined) {
		if (filters[data.id] == true) {
			filters[data.id] = false
			config[data.key].filterCount -= 1;
		} else {
			filters[data.id] = true
			config[data.key].filterCount += 1;
		}
	}

	config[data.key].filters = filters

	this.setState({
		config:config
	})
}

/**
 * Resets the filters of the specified page.
 * @param {String} key | the key of the page being modified 
 */
export function ResetPageFilters(data) {
	let config = Clone(this.state.config)
	let filters = config[data.key].filters
	for (let key in filters) {
		filters[key] = false
	}

	config[data.key].filters = filters
	config[data.key].filterCount = 0

	this.setState({
		config:config
	})
}

/**
 * Creates filters in state using the provided key, id, and list
 * @param {Array} list | the list being used for creating the filters
 * @param {String} id | the key of the property being used for the filter
 * @param {String} key | the key of the page being modified
 */
export function BuildPageFilters(data) {
	let config = Clone(this.state.config)

	let filters = {}
	for (let i = 0; i < data.list.length; i++) {
		filters[data.list[i][data.id]] = false
	}

	config[data.key].filters = filters
	this.setState({
		config:config
	})
}

/**
 * Toggles the view object in state for an individual page. Currently supports medium cards and list
 * @param {String} type | the string of the type
 * @param {String} key | the key of the page
 */
export function TogglePageViewType(data) {
	let config = Clone(this.state.config)

	let viewData = [
		"",
		""
	]
	if (data.type == "medium-cards") {
		viewData[0] = "selected"
	} else {
		viewData[1] = "selected"
	}

	config[data.key].view = data.type;
	config[data.key].selectedView = viewData

	this.setState({
		config:config
	})
}

/**
 * Searches through a list of text,value pairs and returns the pair which matches the given text, or choose one
 * @param {String} text | the known text
 * @param {Array} list | the list of text,value pairs
 * @returns the found text,value pair or a text,text pair if none is found
 */
export function GetDropDownFromText(text, list) {
	for (let i = 0; i < list.length; i++) {
		if (list[i].text == text) {
			return list[i]
		}
	}
	if (text !== "") {
		return {text:text, value:text}
	}
	return {text:"Choose one",value:""}
}

/**
 * Searches through a list of text,value pairs and returns the pair which matches the given value, or choose one
 * @param {String} value | the known value
 * @param {Array} list | the list of text,value pairs
 * @returns the found text,value pair or a value,value pair if none is found
 */
export function GetDropDownFromValue(value, list) {
	for (let i = 0; i < list.length; i++) {
		if (list[i].value == value) {
			return list[i]
		}
	}
	if (value !== "") {
		return {text:value, value:value}
	}
	return {text:"Choose one",value:""}
}

/**
 * Gets the text of a DropDown from the value
 * @param {String} value | the value being searched for
 * @param {Array} list | the list of text,value pairs
 * @returns the text or value if no text is found
 */
export function GetDropDownTextFromValue(value, list) {
	let option = GetDropDownFromValue(value, list)

	if (option && option.text) {
		return option.text
	}
	return value
}

/**
 * Generic function for sorting tables.
 * @param {*} data 
 * @param {*} order 
 * @param {*} key 
 * @returns a sorted table
 */
export function SortTable(data, order, key) {
	data.sort(function(a,b){
		//console.log(a[key] >= b[key])
		if (GetDataForNestedTable(a, key) < GetDataForNestedTable(b, key)) {
			return -1
		} else {
			return 1
		}
	});
	var filtered = data.filter(function (el) {
		return el != null;
	});
	if (order == -1) {return filtered.reverse()}
	return filtered
}

/**
 * Loops through a provided field and returns the value for that field
 * @param {Object} data | the data object
 * @param {Object} field | the field object, with no multi-level nesting
 * @returns the value being searched for
 */
export function GetDataForNestedTable(data, field) {
	for (let key in field) {
		if (data[key] == null) {
			return ''
		}
	  	if (typeof data[key] === 'object') {
			if (Array.isArray(data[key])) {
				// loop through array
				for (let i = 0; i < data[key].length; i++) {
					if (typeof data[key][i] === 'string') {
						return data[key][i]
					} else {
						return GetDataForNestedTable(data[key][i],field[key][i]);
					}
				}
			} else {
			// call function recursively for object
				return GetDataForNestedTable(data[key],field[key]);
			}
	  	} else {
			// do something with value
			return data[key]
	  	}
	}
}

/**
 * Loops through a nested object and returns the base object. For use with table headers.
 * @param {Object} obj | the JSON object
 * @returns 
 */
export function GetNestedJSON(obj) {
	for (let key in obj) {
	  	if (typeof obj[key] === 'object') {
			if (Array.isArray(obj[key])) {
				// loop through array
				for (let i = 0; i < obj[key].length; i++) {
					return GetNestedJSON(obj[key][i]);
				}
			} else {
			// call function recursively for object
				return GetNestedJSON(obj[key]);
			}
	  	} else {
			// do something with value
			return obj[key]
	  	}
	}
}

export function toTitleCase(str) {
    var lcStr = str.toLowerCase();
    return lcStr.replace(/(?:^|\s)\w/g, function(match) {
    	return match.toUpperCase();
    });
}

export function SORTlist(list,sortopt,sortorder){
    return list.sort((a,b)=>{
      	const itemA = a[sortopt]; 
      	const itemB = b[sortopt]; 
     	if (itemA < itemB) {
        	return -1*sortorder;
      	}
      	if (itemA > itemB) {
        	return 1*sortorder;
      	}
      	return 0;
    });
}
/**
 * Formats a number to USD price format
 * @param {Number} price | the price
 * @param {Boolean} cents | whether to display cents. defaults true.
 * @returns 
 */
export function priceformat(price,cents=true){
  	let fprice = new Intl.NumberFormat(`en-US`, {
      	currency: `USD`,
      	style: 'currency',
    }).format(price);
  	return cents?fprice:fprice.split('.')[0];  
}

export function dateformat(date) {
	return date.split('T')[0];
}

export function booleanformat(field) {
	if (field == true) {
		return 'YES'
	}
	return 'NO'
}



export function deepEqual(object1, object2) {
  	const keys1 = Object.keys(object1);
  	const keys2 = Object.keys(object2);
  	if (keys1.length !== keys2.length) {
    	return false;
  	}
  	for (const key of keys1) {
		const val1 = object1[key];
		const val2 = object2[key];
		const areObjects = isObject(val1) && isObject(val2);
		if (
			areObjects && !deepEqual(val1, val2) ||
			!areObjects && val1 !== val2
		) {
			return false;
		}
  	}
  	return true;
}
export function isObject(object) {
  	return object != null && typeof object === 'object';
}


// Need to check for leading characters
// Need to send error messege
export function stringValidate(str){
  	let spChar = "/[!@#$%^&*()_+\-=\[\]{};':\\|,.<>\/?]+/";
  	for (var i = 0; i < str.length; i++) {
      	if (spChar.indexOf(str.charAt(i)) != -1) {
          	return true;
      	}
  	}
  	return false;
}

export function DictionaryifyList(list, key) {
	let result = {}
	for (let i = 0; i < list.length; i++) {
		result[list[i][key]] = list[i]
	}
	return result
}

export function DateToMonthDay(date, showDifferentYears = false) {
	let dateObj = new Date(date)
	let today = new Date()
	let month = dateObj.getMonth()
	let day = dateObj.getDate()
	let year = ""

	if (showDifferentYears == true) {
		if (dateObj.getFullYear() != today.getFullYear()) {
			year = dateObj.getFullYear()
		}
	}
	
	return month + " " + day + " " + year
}

export function SearchObject(object, search, fields) {
	if (search == "") {
		return true
	} else {
		let retval = false;
		for (let key in fields) {
			if (object[key] != undefined && fields[key] == true) {
				if (String(object[key]).toLowerCase().includes(search.toLowerCase())) {
					retval = true
				}
			}
		}

		return retval
	}
}

export function SearchArray(data, search) {
	let retval = []
	for (let i = 0; i < data.length; i++) {
		if (SearchObject(data[i], search.search, search.fields)) {
			retval.push(data[i])
		}
	}
	return retval
}

/**
* Formats a dropdown list from a list
* @param {Object} list | the dictionary you're creating a list from
* @returns 
*/
export function GenerateDropDownList(list) {
   let data = []
   for (let key in list) {
	   data.push({
		   text:list[key],
		   value:key
	   })
   }

   return data
}

export function sortarray(array) {
	array.sort(function(a,b){
		// Turn your strings into dates, and then subtract them
		// to get a value that is either negative, positive, or zero.
		return new Date(b.date) - new Date(a.date);
	});
	return array
}

export function SetGlobalFilters(data) {
	let filters = Clone(this.state.filters)
	for (let key in filters) {
		if (data[key] !== undefined) {
			if (data[key].value !== undefined) {
				filters[key] = data[key].value
			} else if (data[key].start !== undefined && data[key].end !== undefined) {
				filters[key] = data[key]
			} else if ((data[key] === false && filters[key] === true) || (data[key] === true && filters[key] === false)) {
				filters[key] = data[key]
			} else {
				filters[key] = data[key]
			}
		}
	}

	this.setState({
		filters:filters
	})
}

export function ResetGlobalFilters() {
	let filters = Clone(this.state.filters)
	for (let key in filters) {
		filters[key] = ""
	}

	this.setState({
		filters:filters
	})
}

export function FilterDataShallow(data, filters) {
	let retval = []
	
	for (let i = 0; i < data.length; i++) {
		let addToForm = true;
		for (let key in filters) {
			if (filters[key] !== "") {
				if (filters[key].start) {
					if (data[i][key] < filters[key].start || data[i][key] > filters[key].end) {
						addToForm = false
					}
				} else {
					if (filters[key] === true) {
						/*
						For checkboxes, if it's an array and length is zero, do not add to list.
						This can be used to filter out quotes with no bids, tickets with no sitems, employees with
						no devices, etc.
						*/
						if (Array.isArray(data[i][key])) {
							if (data[i][key].length == 0) {
								addToForm = false
							}
						}
					} else {
						if (data[i][key] !== filters[key] && filters[key] !== false) {
							addToForm = false
						}
					}
					
				}
			}
		}

		if (addToForm) {
			retval.push(data[i])
		}
	}

	return retval
}

export function FilterDataDeep(data, filters) {
	let retval = []
	
	//Here we do a deeper filter on nested objects

	return data
}

export function GoHome() {
	if (window.ipcRenderer != undefined) {
		window.ipcRenderer.invoke('home',{});
	} else {
		window.open("https://www.vhpportal.com/")
	}
}

/**
 * Filters a DropDown list by text. By default, searches both text and value.
 * @param {*} list | the list being searched
 * @param {*} search | the search key
 * @param {*} mode | Specifies which part of the dropdown will be searched. 'TEXT', 'VALUE', or 'BOTH' Default 'BOTH'
 */
export function FilterDropDownListByText(list, search, mode = 'BOTH') {
	if (search === '') {
		return list
	} else {
		let data = []
		if (mode == 'BOTH') {
			for (let i = 0; i < list.length; i++) {
				let addToForm = false;
				if (TextFilter(list[i].text, search) || TextFilter(list[i].value, search)) {
					addToForm = true
				}

				if (addToForm) {data.push(list[i])}
			}
		} else {
			for (let i = 0; i < list.length; i++) {
				let addToForm = false;
				if (TextFilter(list[i][mode.toLowerCase()], search)) {
					addToForm = true
				}

				if (addToForm) {data.push(list[i])}
			}
		}

		return data
	}
}

export function GetTextFromBoolean(bool) {
	if (bool == false) {
		return 'NO'
	} else {
		return 'YES'
	}
}

export function AddToList(data) {
	let list = Clone(this.state.list)
	let addToForm = true
	for (let i = 0; i < this.state.list.length; i++) {
		if (this.state.list[i].value == data.value) {
			addToForm = false;
			break;
		}
	}
	if (addToForm) {
		list.push(data)
	}
	this.setState({
		list:list
	})
}

export function RemoveFromList(data) {
	let list = Clone(this.state.list)
	for (let i = 0; i < this.state.list.length; i++) {
		if (this.state.list[i].value == data.value) {
			list.splice(i, 1)
			break;
		}
	}
	this.setState({
		list:list
	})
}