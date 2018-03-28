/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

eval("$(function () {\n\n\n    // listy rozwijane - wyjezdzanie\n\n    // gatunek\n\n    $('.right').find('.list1').hide();\n    $('.gatunek').on('click', function () {\n        $('.right').find('.list1').toggle('show');\n\n    });\n\n    // lata\n\n    $('.right').find('.list2').hide();\n    $('.lata').on('click', function () {\n        $('.right').find('.list2').toggle('show');\n    });\n\n\n    // mominacje\n\n    $('.right').find('.list3').hide();\n    $('.nominacje').on('click', function () {\n        $('.right').find('.list3').toggle('show');\n    });\n\n\n    $('.list').hide();\n    $('span').on('click', (e) => {\n        $('.list').hide(500);\n        $(e.target).parent().next().children().show(500);\n    });\n\n    // API\n    //do kategorii gatunek\n\n    var url = \"http://localhost:3000/movies\";\n    var changeParam = $(\".change\");\n\n    var types = [];\n    var years = [];\n    var nominations = [];\n    var all = [];\n    \n    changeParam.on(\"click\", function () {\n        // console.log($(this).data());\n        let dataType = $(this).data(\"type\");\n        let dataValue = $(this).data(\"value\");\n        if (dataType == \"genre\") {\n            if (types.indexOf(dataValue) < 0) {\n                types.push(dataValue);\n            } else {\n                let index = types.indexOf(dataValue);\n                types.splice(index, 1);\n            }\n        } else if (dataType == \"year\") {\n            if (years.indexOf(dataValue) < 0) {\n                years.push(dataValue);\n            } else {\n                let index = years.indexOf(dataValue);\n                years.splice(index, 1);\n            }\n        } else if (dataType == \"nomination\") {\n            if (nominations.indexOf(dataValue) < 0) {\n                nominations.push(dataValue);\n            } else {\n                let index = nominations.indexOf(dataValue);\n                nominations.splice(index, 1);\n            }\n        }\n\n        nominations.sort();\n        //console.log(nominations);\n        let urlParams = '?';\n       \n        \n\n        years.forEach(year => {\n            urlParams += urlParams == \"?\" ? \"years=\" + year : '&years=' + year;\n        });\n        types.forEach(type => {\n            urlParams += urlParams == \"?\" ? \"type=\" + type : '&type=' + type;\n        });\n        nominations.forEach((nomination, index) => {\n            // urlParams += urlParams==\"?\" ? \"type=\"+type : '&type='+type;\n            urlParams += urlParams == \"?\" ? \"nominations=\" + nomination : '&nominations=' + nomination;\n        });\n        if (nominations.length > 1) {\n            urlParams += nominations.length > 0 ? '&nominations=' : '';\n            nominations.forEach((nomination, index) => {\n                // urlParams += urlParams==\"?\" ? \"type=\"+type : '&type='+type;\n                urlParams += index == 0 ? nomination : ',' + nomination;\n            });\n        }\n\n       \n\n        var slider = $(\"#slider\");\n\n        if (types.length==0&&years.length==0&&nominations.length==0) {\n            slider.hide();\n        }else {\n            slider.show();\n        }\n\n\n        var innerSlider = $(\".carousel-inner\");\n        $(innerSlider)[0].innerHTML = \"\";\n        $.ajax({\n            url: url + urlParams,\n            method: \"GET\",\n            dataType: \"json\"\n        }).done((response) => {\n\n            var arrayImg = [];\n            let carouselItem = null;\n            response.map((e, i) => {\n                arrayImg.push(e.images);\n                if (i == 0) {\n                    carouselItem = $('<div class=\"carousel-item active\">');\n                } else {\n                    carouselItem = $('<div class=\"carousel-item\">');\n                }\n                let img = $('<img class=\"d-block\">');\n                img.attr('src', e.images);\n                carouselItem.append(img);\n                innerSlider.append(carouselItem);\n               \n            });\n\n\n        }).fail((error) => {\n            console.log(\"err\");\n        });\n       \n    });\n\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9hcHAuanM/Yzk5ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FBR0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7Ozs7QUFJQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhOzs7QUFHYixTQUFTO0FBQ1Q7QUFDQSxTQUFTOztBQUVULEtBQUs7O0FBRUwsQ0FBQyIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbiAoKSB7XG5cblxuICAgIC8vIGxpc3R5IHJvendpamFuZSAtIHd5amV6ZHphbmllXG5cbiAgICAvLyBnYXR1bmVrXG5cbiAgICAkKCcucmlnaHQnKS5maW5kKCcubGlzdDEnKS5oaWRlKCk7XG4gICAgJCgnLmdhdHVuZWsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJy5yaWdodCcpLmZpbmQoJy5saXN0MScpLnRvZ2dsZSgnc2hvdycpO1xuXG4gICAgfSk7XG5cbiAgICAvLyBsYXRhXG5cbiAgICAkKCcucmlnaHQnKS5maW5kKCcubGlzdDInKS5oaWRlKCk7XG4gICAgJCgnLmxhdGEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJy5yaWdodCcpLmZpbmQoJy5saXN0MicpLnRvZ2dsZSgnc2hvdycpO1xuICAgIH0pO1xuXG5cbiAgICAvLyBtb21pbmFjamVcblxuICAgICQoJy5yaWdodCcpLmZpbmQoJy5saXN0MycpLmhpZGUoKTtcbiAgICAkKCcubm9taW5hY2plJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcucmlnaHQnKS5maW5kKCcubGlzdDMnKS50b2dnbGUoJ3Nob3cnKTtcbiAgICB9KTtcblxuXG4gICAgJCgnLmxpc3QnKS5oaWRlKCk7XG4gICAgJCgnc3BhbicpLm9uKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICQoJy5saXN0JykuaGlkZSg1MDApO1xuICAgICAgICAkKGUudGFyZ2V0KS5wYXJlbnQoKS5uZXh0KCkuY2hpbGRyZW4oKS5zaG93KDUwMCk7XG4gICAgfSk7XG5cbiAgICAvLyBBUElcbiAgICAvL2RvIGthdGVnb3JpaSBnYXR1bmVrXG5cbiAgICB2YXIgdXJsID0gXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvbW92aWVzXCI7XG4gICAgdmFyIGNoYW5nZVBhcmFtID0gJChcIi5jaGFuZ2VcIik7XG5cbiAgICB2YXIgdHlwZXMgPSBbXTtcbiAgICB2YXIgeWVhcnMgPSBbXTtcbiAgICB2YXIgbm9taW5hdGlvbnMgPSBbXTtcbiAgICB2YXIgYWxsID0gW107XG4gICAgXG4gICAgY2hhbmdlUGFyYW0ub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCQodGhpcykuZGF0YSgpKTtcbiAgICAgICAgbGV0IGRhdGFUeXBlID0gJCh0aGlzKS5kYXRhKFwidHlwZVwiKTtcbiAgICAgICAgbGV0IGRhdGFWYWx1ZSA9ICQodGhpcykuZGF0YShcInZhbHVlXCIpO1xuICAgICAgICBpZiAoZGF0YVR5cGUgPT0gXCJnZW5yZVwiKSB7XG4gICAgICAgICAgICBpZiAodHlwZXMuaW5kZXhPZihkYXRhVmFsdWUpIDwgMCkge1xuICAgICAgICAgICAgICAgIHR5cGVzLnB1c2goZGF0YVZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gdHlwZXMuaW5kZXhPZihkYXRhVmFsdWUpO1xuICAgICAgICAgICAgICAgIHR5cGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZGF0YVR5cGUgPT0gXCJ5ZWFyXCIpIHtcbiAgICAgICAgICAgIGlmICh5ZWFycy5pbmRleE9mKGRhdGFWYWx1ZSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgeWVhcnMucHVzaChkYXRhVmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB5ZWFycy5pbmRleE9mKGRhdGFWYWx1ZSk7XG4gICAgICAgICAgICAgICAgeWVhcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChkYXRhVHlwZSA9PSBcIm5vbWluYXRpb25cIikge1xuICAgICAgICAgICAgaWYgKG5vbWluYXRpb25zLmluZGV4T2YoZGF0YVZhbHVlKSA8IDApIHtcbiAgICAgICAgICAgICAgICBub21pbmF0aW9ucy5wdXNoKGRhdGFWYWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IG5vbWluYXRpb25zLmluZGV4T2YoZGF0YVZhbHVlKTtcbiAgICAgICAgICAgICAgICBub21pbmF0aW9ucy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbm9taW5hdGlvbnMuc29ydCgpO1xuICAgICAgICAvL2NvbnNvbGUubG9nKG5vbWluYXRpb25zKTtcbiAgICAgICAgbGV0IHVybFBhcmFtcyA9ICc/JztcbiAgICAgICBcbiAgICAgICAgXG5cbiAgICAgICAgeWVhcnMuZm9yRWFjaCh5ZWFyID0+IHtcbiAgICAgICAgICAgIHVybFBhcmFtcyArPSB1cmxQYXJhbXMgPT0gXCI/XCIgPyBcInllYXJzPVwiICsgeWVhciA6ICcmeWVhcnM9JyArIHllYXI7XG4gICAgICAgIH0pO1xuICAgICAgICB0eXBlcy5mb3JFYWNoKHR5cGUgPT4ge1xuICAgICAgICAgICAgdXJsUGFyYW1zICs9IHVybFBhcmFtcyA9PSBcIj9cIiA/IFwidHlwZT1cIiArIHR5cGUgOiAnJnR5cGU9JyArIHR5cGU7XG4gICAgICAgIH0pO1xuICAgICAgICBub21pbmF0aW9ucy5mb3JFYWNoKChub21pbmF0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgLy8gdXJsUGFyYW1zICs9IHVybFBhcmFtcz09XCI/XCIgPyBcInR5cGU9XCIrdHlwZSA6ICcmdHlwZT0nK3R5cGU7XG4gICAgICAgICAgICB1cmxQYXJhbXMgKz0gdXJsUGFyYW1zID09IFwiP1wiID8gXCJub21pbmF0aW9ucz1cIiArIG5vbWluYXRpb24gOiAnJm5vbWluYXRpb25zPScgKyBub21pbmF0aW9uO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG5vbWluYXRpb25zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHVybFBhcmFtcyArPSBub21pbmF0aW9ucy5sZW5ndGggPiAwID8gJyZub21pbmF0aW9ucz0nIDogJyc7XG4gICAgICAgICAgICBub21pbmF0aW9ucy5mb3JFYWNoKChub21pbmF0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIHVybFBhcmFtcyArPSB1cmxQYXJhbXM9PVwiP1wiID8gXCJ0eXBlPVwiK3R5cGUgOiAnJnR5cGU9Jyt0eXBlO1xuICAgICAgICAgICAgICAgIHVybFBhcmFtcyArPSBpbmRleCA9PSAwID8gbm9taW5hdGlvbiA6ICcsJyArIG5vbWluYXRpb247XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgXG5cbiAgICAgICAgdmFyIHNsaWRlciA9ICQoXCIjc2xpZGVyXCIpO1xuXG4gICAgICAgIGlmICh0eXBlcy5sZW5ndGg9PTAmJnllYXJzLmxlbmd0aD09MCYmbm9taW5hdGlvbnMubGVuZ3RoPT0wKSB7XG4gICAgICAgICAgICBzbGlkZXIuaGlkZSgpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBzbGlkZXIuc2hvdygpO1xuICAgICAgICB9XG5cblxuICAgICAgICB2YXIgaW5uZXJTbGlkZXIgPSAkKFwiLmNhcm91c2VsLWlubmVyXCIpO1xuICAgICAgICAkKGlubmVyU2xpZGVyKVswXS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiB1cmwgKyB1cmxQYXJhbXMsXG4gICAgICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCJcbiAgICAgICAgfSkuZG9uZSgocmVzcG9uc2UpID0+IHtcblxuICAgICAgICAgICAgdmFyIGFycmF5SW1nID0gW107XG4gICAgICAgICAgICBsZXQgY2Fyb3VzZWxJdGVtID0gbnVsbDtcbiAgICAgICAgICAgIHJlc3BvbnNlLm1hcCgoZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGFycmF5SW1nLnB1c2goZS5pbWFnZXMpO1xuICAgICAgICAgICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2Fyb3VzZWxJdGVtID0gJCgnPGRpdiBjbGFzcz1cImNhcm91c2VsLWl0ZW0gYWN0aXZlXCI+Jyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2Fyb3VzZWxJdGVtID0gJCgnPGRpdiBjbGFzcz1cImNhcm91c2VsLWl0ZW1cIj4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGltZyA9ICQoJzxpbWcgY2xhc3M9XCJkLWJsb2NrXCI+Jyk7XG4gICAgICAgICAgICAgICAgaW1nLmF0dHIoJ3NyYycsIGUuaW1hZ2VzKTtcbiAgICAgICAgICAgICAgICBjYXJvdXNlbEl0ZW0uYXBwZW5kKGltZyk7XG4gICAgICAgICAgICAgICAgaW5uZXJTbGlkZXIuYXBwZW5kKGNhcm91c2VsSXRlbSk7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgfSkuZmFpbCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZXJyXCIpO1xuICAgICAgICB9KTtcbiAgICAgICBcbiAgICB9KTtcblxufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ })
/******/ ]);