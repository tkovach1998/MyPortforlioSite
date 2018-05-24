    $(document).ready(function() {



        /**
         * flavorForm Submission
         * ---------------------
         */

        $("#flavorForm").validator().on("submit", function(event) {
            if (event.isDefaultPrevented()) {
                // handle the invalid form...
                formError("#flavorForm");
                submitMSG(false, "Did you fill in the form properly?");
            } else {
                // everything looks good!
                event.preventDefault();
                submitForm("#flavorForm");
            }
        });

        /**
         * twentyoneForm Submission
         * ------------------------
         */

        // $("#twentyoneForm").validator().on("submit", function(event) {
        //     if (event.isDefaultPrevented()) {
        //         // handle the invalid form...
        //         formError("#twentyoneForm");
        //         submitMSG(false, "Did you fill in the form properly?");
        //     } else {
        //         // everything looks good!
        //         event.preventDefault();
        //         submitForm("#twentyoneForm");
        //     }
        // });


        $("#twentyoneForm1").validator().on("submit", function(event) {
            if (event.isDefaultPrevented()) {
                // handle the invalid form...
                formError("#twentyoneForm1");
                submitMSG(false, "Did you fill in the form properly?");
            } else {
                // everything looks good!
                event.preventDefault();
                submitForm("#twentyoneForm1");
            }
        });

        $("#twentyoneForm2").validator().on("submit", function(event) {
            if (event.isDefaultPrevented()) {
                // handle the invalid form...
                formError("#twentyoneForm2");
                submitMSG(false, "Did you fill in the form properly?");
            } else {
                // everything looks good!
                event.preventDefault();
                submitForm("#twentyoneForm2");
            }
        });

         $("#twentyoneForm3").validator().on("submit", function(event) {
            if (event.isDefaultPrevented()) {
                // handle the invalid form...
                formError("#twentyoneForm3");
                submitMSG(false, "Did you fill in the form properly?");
            } else {
                // everything looks good!
                event.preventDefault();
                submitForm("#twentyoneForm3");
            }
        });

        $("#twentyoneForm4").validator().on("submit", function(event) {
            if (event.isDefaultPrevented()) {
                // handle the invalid form...
                formError("#twentyoneForm4");
                submitMSG(false, "Did you fill in the form properly?");
            } else {
                // everything looks good!
                event.preventDefault();
                submitForm("#twentyoneForm4");
            }
        });

        /**
         * generalForm Submission
         * ----------------------
         */

        $("#generalForm").validator().on("submit", function(event) {
            if (event.isDefaultPrevented()) {
                // handle the invalid form...
                formError("#generalForm");
                submitMSG(false, "Did you fill in the form properly?");
            } else {
                // everything looks good!
                event.preventDefault();
                submitForm("#generalForm");
            }
        });


    });

    /**
     * Swedish match Form Reveal
     * -------------------------
     */

    $(".reveal-btn").click(function() {
            $(this).parent().next('.rep-form').slideToggle('slow');
    });

    /**
     * AJAX Form Submission
     * --------------------
     */

    function submitForm(form) {



          /**
           * Universal Function
           * Google Tag Manager to push to dataLayer
           * If virtualPage is true (is one page site section) then push information
           * If virtualPage is false (is not one page site) then push location
           * Most is explicitly set in Google Tag Manager
           */
          function googleTagManager2(url, title, location, virtualPage) {
            if (virtualPage) {
                dataLayer.push(
                    {
                        event: 'VirtualPageview',
                        virtualPageURL: url,
                        virtualPageTitle: title,
                        virtualPageLocation: location
                    },
                    {
                        event: location
                    }
                );
            } else {
                dataLayer.push(
                    {
                        event: location
                    }
                );
            }
          }

        // console.log("Form Tag ID : ", form);
        // console.log("County: ", $(form + " input[name=county]").val());

        // Initiate Variables With Form Content
        var formID = $(form + " input[name=formID]").val();
        var fullname = $(form + " input[name=fullname]").val();
        var email = $(form + " input[name=email]").val();
        var county = $(form + " input[name=county]").val();
        var ordinance = $(form + " input[name=ordinance]").val();
        var repcontact = $(form + " input[name=repcontact]").val();

        switch(form) {
            case "#twentyoneForm1":
                googleTagManager2(null, null, 'ga-form-official-mundelein', false);
                break;
            case "#twentyoneForm2":
                googleTagManager2(null, null, 'ga-form-official-shawnee', false);
                break;
            case "#twentyoneForm3":
                googleTagManager2(null, null, 'ga-form-official-north-mankato', false);
                break;
            case "#generalForm":
                googleTagManager2(null, null, 'ga-form-official-malden', false);
                break;
            case "#twentyoneForm4":
                googleTagManager2(null, null, 'ga-form-official-detroit-lakes', false);
                break;
            default:
                break;
        }


        $.ajax({
            type: "POST",
            url: "http://tobaccoordinances.linux1.dev.gatesmanagency.com/2017-assets/php/form-process.php",
            data: {
                "formID": formID,
                "fullname": fullname,
                "email": email,
                "county": county,
                "ordinance": ordinance,
                "repcontact": repcontact
            },
            success: function(text) {
                // console.log("Text", text);
                if (text == "success") {
                    formSuccess(form);
                    // console.log("Success");

                } else {
                    formError(form);
                    // console.log("Success");
                    submitMSG(false, text);
                }
            }
        });
    }

    /**
     * General Success
     * ------------------
     */

    function formSuccess(form) {
        switch(form) {
            case "#flavorForm" :
                $(form)[0].reset();
                submitMSG(true, "Thank you! Your email has been successfully sent.", form);
            break;
             case "#twentyoneForm1" :
                $(form)[0].reset();
                submitMSG(true, "Thank you! Your email has been successfully sent.", form);
            break;
             case "#twentyoneForm2" :
                $(form)[0].reset();
                submitMSG(true, "Thank you! Your email has been successfully sent.", form);
            break;
             case "#twentyoneForm3" :
                $(form)[0].reset();
                submitMSG(true, "Thank you! Your email has been successfully sent.", form);
            break;
             case "#twentyoneForm4" :
                $(form)[0].reset();
                submitMSG(true, "Thank you! Your email has been successfully sent.", form);
            break;
            case "#generalForm" :
                $(form)[0].reset();
                submitMSG(true, "Thank you! Your email has been successfully sent.", form);
            break;
        }

    }


    /**
     * General Errors
     * ---------------------
     */

    function formError(form) {
        switch(form) {
            case "#flavorForm" :
                $(form).removeClass().addClass('').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $(this).removeClass();
                });
            break;
             case "#twentyoneForm1" :
                $(form).removeClass().addClass('').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $(this).removeClass();
                });
            break;
             case "#twentyoneForm2" :
                $(form).removeClass().addClass('').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $(this).removeClass();
                });
            break;
             case "#twentyoneForm3" :
                $(form).removeClass().addClass('').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $(this).removeClass();
                });
            break;
             case "#twentyoneForm4" :
                $(form).removeClass().addClass('').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $(this).removeClass();
                });

            break;
            case "#generalForm" :
                $(form).removeClass().addClass('').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $(this).removeClass();
                });
            break;
        }
    }

    /**
    *  Message Errors
    * ---------------
    */
    function submitMSG(valid, msg, form) {
        if (valid) {
            var msgClasses = "h3 text-center text-success";
        } else {
            var msgClasses = "h3 text-center text-danger";
        }
        $(form + " .msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }
