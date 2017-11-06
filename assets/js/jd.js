(function (j) {
    j.relativeCenter = function ($1,$2) {
        var h1 = $1.outerHeight();
        var h2 = $2.outerHeight();
        $2.css({
            'margin-top': (h1 - h2) / 2
        })

    }
    j.resizeWindow = function ($1, $2) {
        j(window).resize(function () {
            j.relativeCenter($1, $2);
        });
    }
    j.historyBack = function () {
        history.back();
    }
    j.fixedCommon = function ($1) {
        var marginLeft = $('#content').css('margin-left');
        var numML = parseInt(marginLeft.substr(0,marginLeft.length-2));
        $1.css({
            'left' : marginLeft,
            'width': screen.width - numML
        })
    }
})(jQuery);