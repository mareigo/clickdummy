'use strict';

var form = document.forms[0];
form.addEventListener('submit', checkForm);

var eu_country = ["DE", "CH", "FR"];

function checkForm(e) {
  e.preventDefault();
  var form = e.target;
  var storage = form.storage;
  var customer = form.customer;
  var netto = form.netto;
  var tax_input = form.tax;
  var tax = null;
  var brutto = form.brutto;
  var marked = form.marked;

  if (storage.value == "DE" && customer.value == "DE") {
    tax = 19; 
  }
  else if (storage.value == "CH" && customer.value == "CH") {
    tax = 7.7;
  }
  else {
    tax = 0;
  }
  tax_input.value = tax;

  if (eu_country.includes(customer.value))  {
    marked.value = 'Innerhalb EU';
  }

  brutto.value = brutto.value.replace(",",".");
  netto.value = netto.value.replace(",",".");

  if (netto.value !== "" && brutto.value == "") {
    brutto.value = netto.value * (tax / 100 + 1) ;
    brutto.value = Math.round(brutto.value * 100) / 100;
    brutto.value = brutto.value.replace(".",",");
  }

  if (netto.value == "" && brutto.value !== "") {
    netto.value = brutto.value / (tax / 100 + 1) 
    netto.value = Math.round(netto.value * 100) / 100;
    netto.value = netto.value.replace(".",",");
  }

}  