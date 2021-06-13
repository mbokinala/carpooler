
function initAutoComplete() {
  let autocomplete;
  let address1Field;
  let address2Field;
  let postalField;

  address1Field = document.querySelector("#address-field");

  // Create the autocomplete object, restricting the search predictions to
  // addresses in the US and Canada.
  autocomplete = new google.maps.places.Autocomplete(address1Field, {
    componentRestrictions: { country: ["us", "ca"] },
    fields: ["address_components", "geometry"],
    types: ["address"],
  });
  address1Field.focus();
}

initAutoComplete();