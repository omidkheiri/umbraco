/**
@ngdoc directive
@name umbraco.directives.directive:umbRadiobutton
@restrict E
@scope

@description
<b>Added in Umbraco version 7.14.0</b> Use this directive to render an umbraco radio button.

<h3>Markup example</h3>
<pre>
    <div ng-controller="My.Controller as vm">

        <umb-radiobutton
            name="radiobuttonlist"
            value="{{key}}"
            model="true"
            text="{{text}}">
        </umb-radiobutton>

    </div>
</pre>

@param {boolean} model Set to <code>true</code> or <code>false</code> to set the radiobutton to checked or unchecked.
@param {string} inputId Set the <code>id</code> of the radiobutton.
@param {string} value Set the value of the radiobutton.
@param {string} name Set the name of the radiobutton.
@param {string} text Set the text for the radiobutton label.
@param {string} labelKey Set a dictinary/localization string for the checkbox label
@param {boolean} disabled Set the radiobutton to be disabled.
@param {boolean} required Set the radiobutton to be required.
@param {callback} onChange Callback when the value of the radiobutton change by interaction.

**/

(function () {
    'use strict';

    function UmbRadiobuttonController($timeout, localizationService) {

        var vm = this;

        vm.$onInit = onInit;
        vm.change = change;

        function onInit() {
            vm.inputId = vm.inputId || "umb-radio_" + String.CreateGuid();

            // If a labelKey is passed let's update the returned text if it's does not contain an opening square bracket [
            if (vm.labelKey) {
                 localizationService.localize(vm.labelKey).then(function (data) {
                      if(data.indexOf('[') === -1){
                        vm.text = data;
                      }
                 });
            }
        }

        function change() {
            if (vm.onChange) {
                $timeout(function () {
                    vm.onChange({ model: vm.model, value: vm.value });
                }, 0);
            }
        }
    }

    var component = {
        templateUrl: 'views/components/forms/umb-radiobutton.html',
        controller: UmbRadiobuttonController,
        controllerAs: 'vm',
        transclude: true,
        bindings: {
            model: "=",
            inputId: "@",
            value: "@",
            name: "@",
            text: "@",
            labelKey: "@?",
            disabled: "<",
            required: "<",
            onChange: "&?"
        }
    };

    angular.module('umbraco.directives').component('umbRadiobutton', component);

})();
