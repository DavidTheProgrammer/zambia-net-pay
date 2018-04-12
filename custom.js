$(document).ready(function() {
	var NapsaRate		= 0.05;
	var NapsaCeiling	= 894.61;
	var ZraPensionRate	= 0.15;
	var ZraPensionMax	= 255;

	//Income Bands
	var incomeBand0		= 0;
	var incomeBand1		= 3300;
	var incomeBand2		= 4100;
	var incomeBand3		= 6200;

	//Tax Bands
	var taxBand0		= 0.000;
	var taxBand1		= 0.250;
	var taxBand2		= 0.300;
	var taxBand3		= 0.375;

	var resultsPaye;
	var resultsNapsa;
	var resultsNet;

	// Storing of variables to use later on
	var $resultsName = $('#results-name');
	var $resultsUserIncome = $('#results-user-income');
	var $resultsPaye = $('#results-paye');
	var $resultsNapsa = $('#results-napsa');
	var $resultsNet = $('#results-net');


	// Initialisation of the modal
	$('#results-modal').modal();
	// $('#results-modal').modal('open');
	// Button Must Trigger Modal PopUp
	var $button = $('#modal-trigger');
	// Trigger Modal on click
	$button.on('click', function(){
		if (verifyIncome()) {
			Materialize.toast("<span><i class='material-icons' style='transform: translateY(5px)'>warning</i> Your income must be atleast K10</span>", 2750);
		} else if (checkValidity() && !verifyIncome()) {
			calculate();
			$('#results-modal').modal('open');
		} else {
			Materialize.toast("<span><i class='material-icons' style='transform: translateY(5px)'>error</i> Please enter a valid amount</span>", 2750);
		}
	});

	var $userIncome = $('#userIncome');

	// add event Listener on Income to trigger validity of entry and underline on input
	$userIncome.on('input blur keyup', function() {
		if(checkValidity()){
			// Remove Invalid class if it exists
			if($userIncome.hasClass('invalid')) {
				$userIncome.removeClass('invalid');
			}
			// Add Valid Class if it doesn't exist
			if(!$userIncome.hasClass('valid')) {
				$userIncome.addClass('valid');
			}
		} else {
			// Remove Valid Class if it exists
			if($userIncome.hasClass('valid')){
				$userIncome.removeClass('valid');
			}
			// Add Invalid Class if it doesn't exist
			if(!$userIncome.hasClass('invalid')) {
				$userIncome.addClass('invalid');
			}
		}
	});

	////////////////////////////////////////
	//Tax Calculation
	function calculate() {
		//Username and Income Values
		var tempUsername = $('#userName').val();
		var userName		= ( tempUsername.trim().length === 0 ) ? 'Anonymous' : tempUsername;
		var userIncome		= $('#userIncome').val();
		var NapsaCont		= Math.min(NapsaCeiling, userIncome * NapsaRate);
		var NonTaxPension	= Math.min((ZraPensionRate * userIncome), ZraPensionMax);
		var TaxableIncome	= userIncome - NonTaxPension;
		//Pay As You Earn Tax (PAYE) Deductible
		var noTax    = (TaxableIncome	- incomeBand0) * taxBand0;
		var lowTax   = (TaxableIncome	- incomeBand1) * taxBand1 +	(incomeBand1	- incomeBand0) * taxBand0;
		var midTax   = (TaxableIncome	- incomeBand2) * taxBand2 + (incomeBand2	- incomeBand1) * taxBand1 +	(incomeBand1	- incomeBand0) * taxBand0;
		var highTax	 = (TaxableIncome 	- incomeBand3) * taxBand3 +	(incomeBand3 	- incomeBand2) * taxBand2 +	(incomeBand2 	- incomeBand1) * taxBand1 +	(incomeBand1	- incomeBand0) * taxBand0;

		// Statements determining the values
		if (TaxableIncome > incomeBand0 && TaxableIncome <= incomeBand1) {
			var tempUserIncome = (+userIncome).toFixed(2);
			var tempTax = noTax.toFixed(2);
			var tempNapsa = NapsaCont.toFixed(2);
			var tempNet = (+tempUserIncome - +tempNapsa - +tempTax).toFixed(2);

			resultsPaye = tempTax;
			resultsNapsa = tempNapsa;
			resultsNet = tempNet;

		} else if (TaxableIncome > incomeBand1 && TaxableIncome <= incomeBand2){
			var tempUserIncome = (+userIncome).toFixed(2);
			var tempNapsa = NapsaCont.toFixed(2);
			var tempTax = lowTax.toFixed(2);
			var tempNet = (+tempUserIncome - +tempNapsa - +tempTax).toFixed(2);

			resultsPaye = tempTax;
			resultsNapsa = tempNapsa;
			resultsNet = tempNet;

		} else if (TaxableIncome > incomeBand2 && TaxableIncome <= incomeBand3){
			var tempUserIncome = (+userIncome).toFixed(2);
			var tempNapsa = NapsaCont.toFixed(2);
			var tempTax = midTax.toFixed(2);
			var tempNet = (+tempUserIncome - +tempNapsa - +tempTax).toFixed(2);

			resultsPaye = tempTax;
			resultsNapsa = tempNapsa;
			resultsNet = tempNet;

		} else if (TaxableIncome > incomeBand3) {
			var tempUserIncome = (+userIncome).toFixed(2);
			var tempNapsa = NapsaCont.toFixed(2);
			var tempTax = highTax.toFixed(2);
			var tempNet = (+tempUserIncome - +tempNapsa - +tempTax).toFixed(2);

			resultsPaye = tempTax;
			resultsNapsa = tempNapsa;
			resultsNet = tempNet;

		} else {
			userIncome = '0.00';
			resultsPaye = '0.00';
			resultsNapsa = '0.00';
			resultsNet = '0.00';
		}

		// Set the content on the modal
		$resultsName.text(userName);
		$resultsUserIncome.text(checkDelimit((+userIncome).toFixed(2)));
		$resultsPaye.text(checkDelimit(resultsPaye));
		$resultsNapsa.text(checkDelimit(resultsNapsa));
		$resultsNet.text(checkDelimit(resultsNet));
	}

	// ======================================================================//
	// Functions to help with the presentation and other calculations
	// ======================================================================//
	// Function to check if value is less than 10
	function verifyIncome(){
		return $('#userIncome').val() < 10;
	}

	// Function to check validity of Money Input to match RegEx on Input
	function checkValidity() {
		var userIncome = $('#userIncome').val();
		return /^[1-9]\d+\.?\d?\d?$/.test(userIncome.toString());
	}

	// Function to check if a value should be delemited
	function checkDelimit (string) {
		// final string to return
		var finalString; 
		var index = string.indexOf('.');
	
		// Split string to before and after decimal point
		var afterPoint = string.slice(index);
		var beforePoint = string.slice(0, index);
		// If the length of the string before the decimal point is greater than a thousand (4), delemit.
		if(beforePoint.length >= 4) {
			var delemitedBeforePoint = delimit(beforePoint);
			finalString = delemitedBeforePoint + afterPoint;
		} else {
			// if before point is less than 1000. Final String = original string;
			finalString = string;
		}

		return finalString;
	}

	// Function to delemit a string
	function delimit (string) {
		var splitString = string.split('');
		var finalString = []
		// initialise the count outside loop. Variable to count elements pushed
		var count = 0;
		// loop through the string backwards and add a comma after every 3 digits
		for ( var i = splitString.length - 1; i > -1; i-- ) {
			// Add elements to the final String
			finalString.push(splitString[i]);
			// increase the count
			count++;
			// if the count is perfectly divisible by 3 add a comma;
			if(count % 3 === 0 && i !== 0){
				finalString.push(',');
			}
		}
		return finalString.reverse().join('');
	}

});
