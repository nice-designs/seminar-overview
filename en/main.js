// var currentDate = new Date().toISOString().split('T')[0]; //return the current date "2018-07-13"
// var seminarDate = $(".seminar-date").attr('seminar-date');
$(document).ready(function () {
    var seminarInfo = $('.seminar-info');
    var eventsDropdwon = $("#events");
    var dateDropdown = $("#seminarYear");
    var levelDropdown = $("#seminarLevel");
    var countryDropdown = $('#seminarCountry');
    var allSeminarsContainer = $('#allSeminarsContainer');
    var noSeminarsContainer = $('#noSeminarsContainer');
    var seminarsList = $('#seminarsList');
    var filtersList = $('#filtersList');

    // the following variable will be use to display a paragraph if there are no seminars to display
    var noSeminars = $('#noSeminars');
    var isNoExistSeminars = false;

    // the following variables to check previous or upcoming seminars
    var upcomingSeminar = false;
    var previousSeminar = false;

    // the following variables to check the level of the seminar
    var beginnerFlag = false;
    var intermediateFlag = false;
    var advancedFlag = false;

    // the following variables to check the year of the seminar
    var year2019 = false;
    var year2018 = false;
    var year2017 = false;
    var year2016 = false;

    // the following variables to check the country of the seminar
    var countryMalaysia = false;
    var countrySpain = false;
    var countryPurtogal = false;
    var countryUAE = false;
    var countryBahrain = false;
    var countryOman = false;
    var countryQatar = false;
    var countrySouthAfrica = false;
    var countryPhilippines = false;


    // the following variables to get the current date
    var q = new Date();
    var m = q.getMonth();
    var d = q.getDate();
    var y = q.getFullYear();

    // get the current date
    var currentDate = new Date(y, m, d);

    function allSeminars() {
        seminarInfo.each(function () {
            $(this).closest('.col-xs-12').removeClass('show');
            $(this).closest('.col-xs-12').removeClass('hide');
        });
        eventsDropdwon.selectpicker('val', 'allSeminars');
        dateDropdown.selectpicker('val', 'allYears');
        levelDropdown.selectpicker('val', 'allLevels');
        countryDropdown.selectpicker('val', 'allCountries');
        noSeminarsParagraph();
    }

    // remove show and hide classes from all seminars
    function removeShowHide() {
        seminarInfo.each(function () {
            $(this).closest('.flag-seminar-container').removeClass('show');
            $(this).closest('.flag-seminar-container').removeClass('hide');
        });
    }

    // add show class
    function addShowClass(element) {
        element.closest('.flag-seminar-container').addClass('show');
    }

    // add hide class
    function addHideClass(element) {
        element.closest('.flag-seminar-container').addClass('hide');
    }

    // add a paragraph if there are no seminars to display
    function noSeminarsParagraph() {
        if ($("#allSeminarsContainer div.flag-seminar-container.hide").length === $("#allSeminarsContainer div.flag-seminar-container").length) {
            isNoExistSeminars = true;
        } else {
            isNoExistSeminars = false;
        }

        if (isNoExistSeminars === true) {
            noSeminars.addClass('show');
            noSeminars.removeClass('hide');
            seminarsList.addClass('no-seminars');
            filtersList.addClass('no-seminars');
            allSeminarsContainer.addClass('hide');
            allSeminarsContainer.removeClass('show');
            noSeminarsContainer.addClass('no-seminars-container');

        } else {
            noSeminars.addClass('hide');
            noSeminars.removeClass('show');
            seminarsList.removeClass('no-seminars');
            filtersList.removeClass('no-seminars');
            allSeminarsContainer.addClass('show');
            allSeminarsContainer.removeClass('hide');
            noSeminarsContainer.removeClass('no-seminars-container');
        }
    }

    // reset all flags to false
    function resetFlags() {
        upcomingSeminar = false;
        previousSeminar = false;

        beginnerFlag = false;
        intermediateFlag = false;
        advancedFlag = false;

        year2019 = false;
        year2018 = false;
        year2017 = false;
        year2016 = false;

        countryMalaysia = false;
        countrySpain = false;
        countryPurtogal = false;
        countryUAE = false;
        countryBahrain = false;
        countryOman = false;
        countryQatar = false;
        countrySouthAfrica = false;
        countryPhilippines = false;

        isNoExistSeminars = false;
    }

    // check if the seminar is upcoming or previous
    function checkEvent(element) {
        if (new Date(element.attr('seminar-date')) >= currentDate) {
            upcomingSeminar = true;
        } else {
            previousSeminar = true;
        }
    }

    // update event dropdown
    function updateEventDropdown() {
        if (upcomingSeminar === true && previousSeminar === false) {
            eventsDropdwon.selectpicker('val', 'upcoming');
        } else if (previousSeminar === true && upcomingSeminar === false) {
            eventsDropdwon.selectpicker('val', 'previous');
        } else {
            eventsDropdwon.selectpicker('val', 'allSeminars');
        }
        noSeminarsParagraph();
    }

    // check the level of the seminar
    function checkLevel(element) {
        if (element.attr('level') === 'beginner') {
            beginnerFlag = true;
        } else if (element.attr('level') === 'intermediate') {
            intermediateFlag = true;
        } else if (element.attr('level') === 'advanced') {
            advancedFlag = true;
        }
    }

    // update the level dropdown
    function updateLevelDropdown() {
        if (beginnerFlag === true && intermediateFlag === true && advancedFlag === true) {
            levelDropdown.selectpicker('val', 'allLevels');
        } else if (beginnerFlag === true) {
            levelDropdown.selectpicker('val', 'beginner');
        } else if (intermediateFlag === true) {
            levelDropdown.selectpicker('val', 'intermediate');
        } else if (advancedFlag === true) {
            levelDropdown.selectpicker('val', 'advanced');
        }
        noSeminarsParagraph();
    }

    // check the year of the seminar
    function checkYear(element) {
        if (parseInt(element.attr('year')) === 2019) {
            year2019 = true;
        } else if (parseInt(element.attr('year')) === 2018) {
            year2018 = true;
        } else if (parseInt(element.attr('year')) === 2017) {
            year2017 = true;
        } else if (parseInt(element.attr('year')) === 2016) {
            year2016 = true;
        }
    }

    // update the date dropdown
    function updateDateDropdown() {
        if (year2016 === true && year2017 === true && year2018 === true
            || year2016 === false && year2017 === false && year2018 === false) {
            dateDropdown.selectpicker('val', 'allYears');
        } else if (year2019 === true
            && year2018 === false
            && year2017 === false
            && year2016 === false) {
            dateDropdown.selectpicker('val', '2019');
        } else if (year2018 === true
            && year2019 === false
            && year2017 === false
            && year2016 === false) {
            dateDropdown.selectpicker('val', '2018');
        } else if (year2017 === true
            && year2018 === false
            && year2019 === false
            && year2016 === false) {
            dateDropdown.selectpicker('val', '2017');
        } else if (year2016 === true
            && year2018 === false
            && year2017 === false
            && year2019 === false) {
            dateDropdown.selectpicker('val', '2016');
        } else {
            dateDropdown.selectpicker('val', 'allYears');
        }
        noSeminarsParagraph();
    }

    // check the country of the seminar
    function checkCountry(element) {
        if (element.attr('country') === 'malaysia') {
            countryMalaysia = true;
        } else if (element.attr('country') === 'spain') {
            countrySpain = true;
        } else if (element.attr('country') === 'portugal') {
            countryPurtogal = true;
        } else if (element.attr('country') === 'UAE') {
            countryUAE = true;
        } else if (element.attr('country') === 'bahrain') {
            countryBahrain = true;
        } else if (element.attr('country') === 'oman') {
            countryOman = true;
        } else if (element.attr('country') === 'qatar') {
            countryQatar = true;
        } else if (element.attr('country') === 'southAfrica') {
            countrySouthAfrica = true;
        } else if (element.attr('country') === 'philippines') {
            countryPhilippines = true;
        }
    }

    // update the country dropdown
    function updateCountryDropdown() {
        if (countryMalaysia === true
            && countrySpain === false
            && countryPurtogal === false
            && countryUAE === false
            && countryBahrain === false
            && countryOman === false
            && countryQatar === false
            && countrySouthAfrica === false
            && countryPhilippines === false) {
            countryDropdown.selectpicker('val', 'malaysia');
        } else if (countrySpain === true
            && countryMalaysia === false
            && countryPurtogal === false
            && countryUAE === false
            && countryBahrain === false
            && countryOman === false
            && countryQatar === false
            && countrySouthAfrica === false
            && countryPhilippines === false) {
            countryDropdown.selectpicker('val', 'spain');
        } else if (countryPurtogal === true
            && countrySpain === false
            && countryMalaysia === false
            && countryUAE === false
            && countryBahrain === false
            && countryOman === false
            && countryQatar === false
            && countrySouthAfrica === false
            && countryPhilippines === false) {
            countryDropdown.selectpicker('val', 'portugal');
        } else if (countryUAE === true
            && countrySpain === false
            && countryPurtogal === false
            && countryMalaysia === false
            && countryBahrain === false
            && countryOman === false
            && countryQatar === false
            && countrySouthAfrica === false
            && countryPhilippines === false) {
            countryDropdown.selectpicker('val', 'UAE');
        } else if (countryBahrain === true
            && countrySpain === false
            && countryPurtogal === false
            && countryUAE === false
            && countryMalaysia === false
            && countryOman === false
            && countryQatar === false
            && countrySouthAfrica === false
            && countryPhilippines === false) {
            countryDropdown.selectpicker('val', 'bahrain');
        } else if (countryOman === true
            && countrySpain === false
            && countryPurtogal === false
            && countryUAE === false
            && countryBahrain === false
            && countryMalaysia === false
            && countryQatar === false
            && countrySouthAfrica === false
            && countryPhilippines === false) {
            countryDropdown.selectpicker('val', 'oman');
        } else if (countryQatar === true
            && countrySpain === false
            && countryPurtogal === false
            && countryUAE === false
            && countryBahrain === false
            && countryOman === false
            && countryMalaysia === false
            && countrySouthAfrica === false
            && countryPhilippines === false) {
            countryDropdown.selectpicker('val', 'qatar');
        } else if (countrySouthAfrica === true
            && countryOman === false
            && countrySpain === false
            && countryPurtogal === false
            && countryUAE === false
            && countryBahrain === false
            && countryMalaysia === false
            && countryQatar === false
            && countryPhilippines === false) {
            countryDropdown.selectpicker('val', 'southAfrica');
        } else if (countryPhilippines === true
            && countryOman === false
            && countrySpain === false
            && countryPurtogal === false
            && countryUAE === false
            && countryBahrain === false
            && countryMalaysia === false
            && countryQatar === false
            && countrySouthAfrica === false) {
            countryDropdown.selectpicker('val', 'philippines');
        } else {
            countryDropdown.selectpicker('val', 'allCountries');
        }
        noSeminarsParagraph();
    }

    // what should happen if the user select an option from the event dropdown
    function eventsOptions(element) {
        if (element.val() === 'allSeminars') {
            allSeminars();
        }
        else if (element.val() === 'upcoming') {
            removeShowHide();

            resetFlags();

            seminarInfo.each(function () {
                if (new Date($(this).attr('seminar-date')) >= currentDate) {
                    addShowClass($(this));

                    // check the level of the current seminar
                    checkLevel($(this));

                    // check the year of the current seminar
                    checkYear($(this));

                    // check the country of the current seminar
                    checkCountry($(this));
                } else {
                    addHideClass($(this));
                }
            });
            // update the level dropdown
            updateLevelDropdown();

            // update the date dropdown
            updateDateDropdown();

            // update the country dropdown
            updateCountryDropdown();
            noSeminarsParagraph();
        } else if (element.val() === 'previous') {
            removeShowHide();

            resetFlags();

            seminarInfo.each(function () {
                if (new Date($(this).attr('seminar-date')) < currentDate) {
                    addShowClass($(this));
                    // check the level of the current seminar
                    checkLevel($(this));

                    // check the year of the current seminar
                    checkYear($(this));

                    // check the country of the current seminar
                    checkCountry($(this));
                } else {
                    addHideClass($(this));
                }
            });
            // update the level dropdown
            updateLevelDropdown();

            // update the date dropdown
            updateDateDropdown();

            // update the country dropdown
            updateCountryDropdown();
            noSeminarsParagraph();
        }
    }

    // what should happen if the user select an option from the level dropdown
    function levelOptions(element) {
        if (element.val() === 'allLevels') {
            allSeminars();
        } else if (element.val() === 'beginner') {
            removeShowHide();

            resetFlags();

            seminarInfo.each(function () {
                if ($(this).attr('level') === 'beginner') {
                    addShowClass($(this));

                    // check the event of the current seminar
                    checkEvent($(this));

                    // check the year of the current seminar
                    checkYear($(this));

                    // check the country of the current seminar
                    checkCountry($(this));
                } else {
                    addHideClass($(this));
                }
            });

            // update the events dropdown
            updateEventDropdown();

            // update the date dropdown
            updateDateDropdown();

            // update the country dropdown
            updateCountryDropdown();
        } else if (element.val() === 'intermediate') {
            removeShowHide();

            resetFlags();

            seminarInfo.each(function () {
                if ($(this).attr('level') === 'intermediate') {
                    addShowClass($(this));

                    // check the event of the current seminar
                    checkEvent($(this));

                    // check the year of the current seminar
                    checkYear($(this));

                    // check the country of the current seminar
                    checkCountry($(this));
                } else {
                    addHideClass($(this));
                }
            });
            // update the events dropdown
            updateEventDropdown();

            // update the date dropdown
            updateDateDropdown();

            // update the country dropdown
            updateCountryDropdown();
        } else if (element.val() === 'advanced') {
            removeShowHide();

            resetFlags();

            seminarInfo.each(function () {
                if ($(this).attr('level') === 'advanced') {
                    addShowClass($(this));

                    // check the event of the current seminar
                    checkEvent($(this));

                    // check the year of the current seminar
                    checkYear($(this));

                    // check the country of the current seminar
                    checkCountry($(this));
                } else {
                    addHideClass($(this));
                }
            });
            // update the events dropdown
            updateEventDropdown();

            // update the date dropdown
            updateDateDropdown();

            // update the country dropdown
            updateCountryDropdown();
        }
    }

    // what should happen if the user select an option from the date dropdown
    function dateOptions(element) {
        if (element.val() === 'allYears') {
            allSeminars();
        } else if (element.val() === '2019') {
            removeShowHide();

            resetFlags();

            seminarInfo.each(function () {
                if (parseInt($(this).attr('year')) === 2019) {
                    addShowClass($(this));

                    // check the event of the current seminar
                    checkEvent($(this));

                    // check the level of the current seminar
                    checkLevel($(this));

                    // check the country of the current seminar
                    checkCountry($(this));
                } else {
                    addHideClass($(this));
                }
            });

            // update the events dropdown
            updateEventDropdown();

            // update the level dropdown
            updateLevelDropdown();

            // update the country dropdown
            updateCountryDropdown();
        } else if (element.val() === '2018') {
            removeShowHide();

            resetFlags();

            seminarInfo.each(function () {
                if (parseInt($(this).attr('year')) === 2018) {
                    addShowClass($(this));

                    // check the event of the current seminar
                    checkEvent($(this));

                    // check the level of the current seminar
                    checkLevel($(this));

                    // check the country of the current seminar
                    checkCountry($(this));
                } else {
                    addHideClass($(this));
                }
            });

            // update the events dropdown
            updateEventDropdown();

            // update the level dropdown
            updateLevelDropdown();

            // update the country dropdown
            updateCountryDropdown();
        } else if (element.val() === '2017') {
            removeShowHide();

            resetFlags();

            seminarInfo.each(function () {
                if (parseInt($(this).attr('year')) === 2017) {
                    addShowClass($(this));

                    // check the event of the current seminar
                    checkEvent($(this));

                    // check the level of the current seminar
                    checkLevel($(this));

                    // check the country of the current seminar
                    checkCountry($(this));
                } else {
                    addHideClass($(this));
                }
            });

            // update the events dropdown
            updateEventDropdown();

            // update the level dropdown
            updateLevelDropdown();

            // update the country dropdown
            updateCountryDropdown();
        } else if (element.val() === '2016') {
            removeShowHide();

            resetFlags();

            seminarInfo.each(function () {
                if (parseInt($(this).attr('year')) === 2016) {
                    addShowClass($(this));

                    // check the event of the current seminar
                    checkEvent($(this));

                    // check the level of the current seminar
                    checkLevel($(this));

                    // check the country of the current seminar
                    checkCountry($(this));
                } else {
                    addHideClass($(this));
                }
            });

            // update the events dropdown
            updateEventDropdown();

            // update the level dropdown
            updateLevelDropdown();

            // update the country dropdown
            updateCountryDropdown();
        }
    }

    // what should happen if the user select an option from the country dropdown
    function countryOptions(element) {
        if (element.val() === 'allCountries') {
            allSeminars();
        } else if (element.val() === 'malaysia') {
            removeShowHide();

            resetFlags();

            seminarInfo.each(function () {
                if ($(this).attr('country') === 'malaysia') {
                    addShowClass($(this));

                    // check the event of the current seminar
                    checkEvent($(this));

                    // check the level of the current seminar
                    checkLevel($(this));

                    // check the date of the current seminar
                    checkYear($(this));
                } else {
                    addHideClass($(this));
                }
            });

            // update the events dropdown
            updateEventDropdown();

            // update the level dropdown
            updateLevelDropdown();

            // update the date dropdown
            updateDateDropdown();
        } else if (element.val() === 'spain') {
            removeShowHide();

            resetFlags();

            seminarInfo.each(function () {
                if ($(this).attr('country') === 'spain') {
                    addShowClass($(this));

                    // check the event of the current seminar
                    checkEvent($(this));

                    // check the level of the current seminar
                    checkLevel($(this));

                    // check the date of the current seminar
                    checkYear($(this));
                } else {
                    addHideClass($(this));
                }
            });

            // update the events dropdown
            updateEventDropdown();

            // update the level dropdown
            updateLevelDropdown();

            // update the date dropdown
            updateDateDropdown();
        } else if (element.val() === 'portugal') {
            removeShowHide();

            resetFlags();

            seminarInfo.each(function () {
                if ($(this).attr('country') === 'portugal') {
                    addShowClass($(this));

                    // check the event of the current seminar
                    checkEvent($(this));

                    // check the level of the current seminar
                    checkLevel($(this));

                    // check the date of the current seminar
                    checkYear($(this));
                } else {
                    addHideClass($(this));
                }
            });

            // update the events dropdown
            updateEventDropdown();

            // update the level dropdown
            updateLevelDropdown();

            // update the date dropdown
            updateDateDropdown();
        } else if (element.val() === 'UAE') {
            removeShowHide();

            resetFlags();

            seminarInfo.each(function () {
                if ($(this).attr('country') === 'UAE') {
                    addShowClass($(this));

                    // check the event of the current seminar
                    checkEvent($(this));

                    // check the level of the current seminar
                    checkLevel($(this));

                    // check the date of the current seminar
                    checkYear($(this));
                } else {
                    addHideClass($(this));
                }
            });

            // update the events dropdown
            updateEventDropdown();

            // update the level dropdown
            updateLevelDropdown();

            // update the date dropdown
            updateDateDropdown();
        } else if (element.val() === 'bahrain') {
            removeShowHide();

            resetFlags();

            seminarInfo.each(function () {
                if ($(this).attr('country') === 'bahrain') {
                    addShowClass($(this));

                    // check the event of the current seminar
                    checkEvent($(this));

                    // check the level of the current seminar
                    checkLevel($(this));

                    // check the date of the current seminar
                    checkYear($(this));
                } else {
                    addHideClass($(this));
                }
            });

            // update the events dropdown
            updateEventDropdown();

            // update the level dropdown
            updateLevelDropdown();

            // update the date dropdown
            updateDateDropdown();
        } else if (element.val() === 'oman') {
            removeShowHide();

            resetFlags();

            seminarInfo.each(function () {
                if ($(this).attr('country') === 'oman') {
                    addShowClass($(this));

                    // check the event of the current seminar
                    checkEvent($(this));

                    // check the level of the current seminar
                    checkLevel($(this));

                    // check the date of the current seminar
                    checkYear($(this));
                } else {
                    addHideClass($(this));
                }
            });

            // update the events dropdown
            updateEventDropdown();

            // update the level dropdown
            updateLevelDropdown();

            // update the date dropdown
            updateDateDropdown();
        } else if (element.val() === 'qatar') {
            removeShowHide();

            resetFlags();

            seminarInfo.each(function () {
                if ($(this).attr('country') === 'qatar') {
                    addShowClass($(this));

                    // check the event of the current seminar
                    checkEvent($(this));

                    // check the level of the current seminar
                    checkLevel($(this));

                    // check the date of the current seminar
                    checkYear($(this));
                } else {
                    addHideClass($(this));
                }
            });

            // update the events dropdown
            updateEventDropdown();

            // update the level dropdown
            updateLevelDropdown();

            // update the date dropdown
            updateDateDropdown();
        } else if (element.val() === 'southAfrica') {
            removeShowHide();

            resetFlags();

            seminarInfo.each(function () {
                if ($(this).attr('country') === 'southAfrica') {
                    addShowClass($(this));

                    // check the event of the current seminar
                    checkEvent($(this));

                    // check the level of the current seminar
                    checkLevel($(this));

                    // check the date of the current seminar
                    checkYear($(this));
                } else {
                    addHideClass($(this));
                }
            });

            // update the events dropdown
            updateEventDropdown();

            // update the level dropdown
            updateLevelDropdown();

            // update the date dropdown
            updateDateDropdown();
        } else if (element.val() === 'philippines') {
            removeShowHide();

            resetFlags();

            seminarInfo.each(function () {
                if ($(this).attr('country') === 'philippines') {
                    addShowClass($(this));

                    // check the event of the current seminar
                    checkEvent($(this));

                    // check the level of the current seminar
                    checkLevel($(this));

                    // check the date of the current seminar
                    checkYear($(this));
                } else {
                    addHideClass($(this));
                }
            });

            // update the events dropdown
            updateEventDropdown();

            // update the level dropdown
            updateLevelDropdown();

            // update the date dropdown
            updateDateDropdown();
        }
    }


    eventsDropdwon.change(function () {
        eventsOptions($(this));
    });

    dateDropdown.change(function () {
        dateOptions($(this));
    });

    levelDropdown.change(function () {
        levelOptions($(this));
    });

    countryDropdown.change(function () {
        countryOptions($(this));
    });


    // code of the parallex effect
    // Cache the Window object
    var $window = $(window);

    // Parallax Backgrounds
    // Tutorial: http://code.tutsplus.com/tutorials/a-simple-parallax-scrolling-technique--net-27641

    $('section[data-type="background"]').each(function () {
        var $bgobj = $(this); // assigning the object

        $(window).scroll(function () {

            // Scroll the background at var speed
            // the yPos is a negative value because we're scrolling it UP!
            var yPos = -($window.scrollTop() / $bgobj.data('speed'));

            // Put together our final background position
            var coords = '50% ' + yPos + 'px';

            // Move the background
            $bgobj.css({backgroundPosition: coords});

        }); // end window scroll
    });
});