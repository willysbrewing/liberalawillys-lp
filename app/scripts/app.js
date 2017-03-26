(function() {
    'use strict';

    angular.module('app', []);
    angular.module('app').controller('LPController', ['$timeout', LPController]);

    function LPController($timeout) {
        var vm = this;

        // Init
        var app = angular.element(document.getElementsByClassName('lp-app'));
        app.css('display', 'block');

        // Vars
        vm.status = 'loading';
        vm.step = 0;
        vm.claim = [' '];
        vm.game = ['LIBÉRALA','OK','NOT YET','CASI CASI','SIGUE INTENTANDO', 'YOU KNOW', 'WILLYS', 'AMA LA BIRRA','UN POCO MÁS'];
        vm.gameIndex = 0;
        vm.gameCounter = 0;

        $timeout(function(){
          vm.status = 'loaded';
        }, 1000);

        vm.next = function (currentStep) {
          switch(currentStep) {
            case 0:
              stepZero()
              break;
            case 1:
              stepOne()
              break;
            case 2:
              stepTwo()
              break;
            default:
          }
          if(currentStep === 2){
            $timeout(function(){
              vm.step++;
              $timeout(function(){
                angular.element(document.getElementsByClassName('content')).css('opacity', 1);
              }, 500);
            }, 500);
          } else {
            vm.step++;
          }
        };

        vm.freeWillys = function () {
          if (vm.gameCounter >= 15){
            var modal = angular.element(document.getElementById('modal'));
            //var iframe = angular.element(document.getElementById('modal')).find('iframe');
            //var iframeSrc = iframe[0].getAttribute('src');
            //iframe[0].setAttribute('src', iframeSrc+'&autoplay=1&start=93');
            $('#modal').modal('show');
          }
          vm.gameCounter++;
          var newIndex = Math.floor((Math.random() * vm.game.length));
          if(newIndex !== vm.gameIndex){
            vm.gameIndex = newIndex;
          } else {
            vm.freeWillys();
          }
        }

        function swapColor() {
          var body = angular.element(document).find('body');
          var claim = angular.element(document.getElementsByClassName('claim')).find('h1');
          if (body.css('background-color') === 'rgb(0, 0, 0)') {
            body.css('background-color', '#fff');
            claim.css('color', '#000');
          } else {
            body.css('background-color', '#000');
            claim.css('color', '#fff');
          }
        }

        function stepZero() {
          vm.claim.push('#Libera');
          swapColor();
          $timeout(function(){
            vm.next(1);
          }, 1500);
        }

        function stepOne() {
          vm.claim.push('La');
          swapColor();
          $timeout(function(){
            vm.next(2);
          }, 1500);
        }

        function stepTwo() {
          vm.claim.push('Willys');
          swapColor();
        }

    }

})();
