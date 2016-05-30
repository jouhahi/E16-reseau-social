(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/js/themes/social-1/app.js":[function(require,module,exports){
// Essentials
require('essential/js/main');

// Layout
require('layout/js/main');

// Sidebar
require('sidebar/js/main');

// Chat
//require('chat/js/main');

// Social
require('social/js/main');

// Maps
//window.initGoogleMaps = require('maps/js/google/main');

// CORE
require('./main');
},{"./main":"/media/sf_d/src/js/themes/social-1/main.js","essential/js/main":"/media/sf_d/lib/essential/js/main.js","layout/js/main":"/media/sf_d/lib/layout/js/main.js","sidebar/js/main":"/media/sf_d/lib/sidebar/js/main.js","social/js/main":"/media/sf_d/lib/social/js/main.js"}],"/media/sf_d/lib/essential/js/_bootstrap-carousel.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkCarousel = function () {

        if (! this.length) return;

        this.carousel();

        this.find('[data-slide]').click(function (e) {
            e.preventDefault();
        });

    };

})(jQuery);
},{}],"/media/sf_d/lib/essential/js/_bootstrap-collapse.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkCollapse = function () {

        if (! this.length) return;

        var target = this.attr('href') || this.attr('target');
        if (! target) return;

        this.click(function(e){
            e.preventDefault();
        });

        $(target).collapse({toggle: false});

    };

})(jQuery);
},{}],"/media/sf_d/lib/essential/js/_bootstrap-modal.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkModal = function () {

        if (! this.length) return;

        var target = this.attr('href') || this.attr('target');
        if (! target) return;

        this.click(function (e) {
            e.preventDefault();
        });

        $(target).modal({show: false});

    };

    /**
     * Modal creator for the demo page.
     * Allows to explore different modal types.
     * For demo purposes only.
     */

    // Process the modal via Handlebars templates
    var modal = function (options) {
        var source = $("#" + options.template).html();
        var template = Handlebars.compile(source);
        return template(options);
    };

    var randomId = function () {
        /** @return String */
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };

    $.fn.tkModalDemo = function () {

        if (! this.length) return;

        var targetId = this.attr('href') || this.attr('target'),
            target = $(targetId);

        if (! targetId) {
            targetId = randomId();
            this.attr('data-target', '#' + targetId);
        }

        targetId.replace('#', '');

        if (! target.length) {
            target = $(modal({
                id: targetId,
                template: this.data('template') || 'tk-modal-demo',
                modalOptions: this.data('modalOptions') || '',
                dialogOptions: this.data('dialogOptions') || '',
                contentOptions: this.data('contentOptions') || ''
            }));
            $('body').append(target);
            target.modal({show: false});
        }

        this.click(function (e) {
            e.preventDefault();
            target.modal('toggle');
        });

    };

    $('[data-toggle="tk-modal-demo"]').each(function () {
        $(this).tkModalDemo();
    });

})(jQuery);
},{}],"/media/sf_d/lib/essential/js/_bootstrap-switch.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('[data-toggle="switch-checkbox"]').each(function () {

        $(this).bootstrapSwitch({
            offColor: 'danger'
        });

    });

})(jQuery);
},{}],"/media/sf_d/lib/essential/js/_check-all.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkCheckAll = function(){

        if (! this.length) return;

        this.on('click', function () {
            $($(this).data('target')).find(':checkbox').prop('checked', this.checked);
        });

    };

    // Check All Checkboxes
    $('[data-toggle="check-all"]').tkCheckAll();

})(jQuery);
},{}],"/media/sf_d/lib/essential/js/_cover.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * Conserve aspect ratio of the orignal region. Useful when shrinking/enlarging
     * images to fit into a certain area.
     *
     * @param {Number} srcWidth Source area width
     * @param {Number} srcHeight Source area height
     * @param {Number} maxWidth Fittable area maximum available width
     * @param {Number} maxHeight Fittable area maximum available height
     * @return {Object} { width, heigth }
     */
    var aspectRatioFit = function (srcWidth, srcHeight, maxWidth, maxHeight) {

        var wRatio = maxWidth / srcWidth,
            hRatio = maxHeight / srcHeight,
            width = srcWidth,
            height = srcHeight;

        if (srcWidth / maxWidth < srcHeight / maxHeight) {
            width = maxWidth;
            height = srcHeight * wRatio;
        } else {
            width = srcWidth * hRatio;
            height = maxHeight;
        }

        return {width: width, height: height};
    };

    $.fn.tkCover = function () {

        if (! this.length) return;

        this.filter(':visible').not('[class*="height"]').each(function () {
            var t = $(this),
                i = t.find('img:first');

            if (i.length) {
                $.loadImage(i.attr('src')).done(function (img) {
                    t.height(i.height());
                    $('.overlay-full', t).innerHeight(i.height());
                    $(document).trigger('domChanged');
                });
            }
            else {
                i = t.find('.img:first');
                t.height(i.height());
                $('.overlay-full', t).innerHeight(i.height());
                $(document).trigger('domChanged');
            }
        });

        this.filter(':visible').filter('[class*="height"]').each(function () {
            var t = $(this),
                img = t.find('img') || t.find('.img');

            img.each(function () {
                var i = $(this);
                if (i.data('autoSize') === false) {
                    return true;
                }
                if (i.is('img')) {
                    $.loadImage(i.attr('src')).done(function (img) {
                        i.removeAttr('style');
                        i.css(aspectRatioFit(i.width(), i.height(), t.width(), t.height()));
                    });
                }
                else {
                    i.removeAttr('style');
                    i.css(aspectRatioFit(i.width(), i.height(), t.width(), t.height()));
                }
            });
        });

    };

    function height() {

        $('.cover.overlay').each(function () {
            $(this).tkCover();
        });

    }

    $(document).ready(height);
    $(window).on('load', height);

    var t;
    $(window).on("debouncedresize", function () {
        clearTimeout(t);
        t = setTimeout(height, 200);
    });

})(jQuery);

},{}],"/media/sf_d/lib/essential/js/_datepicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkDatePicker = function () {

        if (! this.length) return;

        if (typeof $.fn.datepicker != 'undefined') {

            this.datepicker();

        }

    };

    $('.datepicker').tkDatePicker();

})(jQuery);
},{}],"/media/sf_d/lib/essential/js/_daterangepicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkDaterangepickerReport = function () {
        var e = this;
        this.daterangepicker(
            {
                ranges: {
                    'Today': [ moment(), moment() ],
                    'Yesterday': [ moment().subtract('days', 1), moment().subtract('days', 1) ],
                    'Last 7 Days': [ moment().subtract('days', 6), moment() ],
                    'Last 30 Days': [ moment().subtract('days', 29), moment() ],
                    'This Month': [ moment().startOf('month'), moment().endOf('month') ],
                    'Last Month': [ moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month') ]
                },
                startDate: moment().subtract('days', 29),
                endDate: moment()
            },
            function (start, end) {
                var output = start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY');
                e.find('span').html(output);
            }
        );
    };

    $.fn.tkDaterangepickerReservation = function () {
        this.daterangepicker({
            timePicker: true,
            timePickerIncrement: 30,
            format: 'MM/DD/YYYY h:mm A'
        });
    };

    $('.daterangepicker-report').tkDaterangepickerReport();

    $('.daterangepicker-reservation').tkDaterangepickerReservation();

})(jQuery);
},{}],"/media/sf_d/lib/essential/js/_expandable.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     * @todo: Angular directive.
     */
    $.fn.tkExpandable = function () {

        if (! this.length) return;

        this.find('.expandable-content').append('<div class="expandable-indicator"><i></i></div>');

    };

    $('.expandable').each(function () {
        $(this).tkExpandable();
    });

    $('body').on('click', '.expandable-indicator', function(){
        $(this).closest('.expandable').toggleClass('expandable-open');
    });

    $('body').on('click', '.expandable-trigger:not(.expandable-open)', function(){
        $(this).addClass('expandable-open');
    });

}(jQuery));
},{}],"/media/sf_d/lib/essential/js/_iframe.js":[function(require,module,exports){
(function () {
    "use strict";

    // if we're inside an iframe, reload without iframe
    if (window.location != window.parent.location)
        top.location.href = document.location.href;

})();

},{}],"/media/sf_d/lib/essential/js/_minicolors.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     * @todo: Angular directive.
     */
    $.fn.tkMiniColors = function () {

        if (! this.length) return;

        if (typeof $.fn.minicolors != 'undefined') {

            this.minicolors({
                control: this.attr('data-control') || 'hue',
                defaultValue: this.attr('data-defaultValue') || '',
                inline: this.attr('data-inline') === 'true',
                letterCase: this.attr('data-letterCase') || 'lowercase',
                opacity: this.attr('data-opacity'),
                position: this.attr('data-position') || 'bottom left',
                change: function (hex, opacity) {
                    if (! hex) return;
                    if (opacity) hex += ', ' + opacity;
                    if (typeof console === 'object') {
                        console.log(hex);
                    }
                },
                theme: 'bootstrap'
            });

        }

    };

    $('.minicolors').each(function () {

        $(this).tkMiniColors();

    });

})(jQuery);
},{}],"/media/sf_d/lib/essential/js/_nestable.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     * @todo: Angular directive.
     */
    $.fn.tkNestable = function () {

        if (! this.length) return;

        if (typeof $.fn.nestable != 'undefined') {

            this.nestable({
                rootClass: 'nestable',
                listNodeName: 'ul',
                listClass: 'nestable-list',
                itemClass: 'nestable-item',
                dragClass: 'nestable-drag',
                handleClass: 'nestable-handle',
                collapsedClass: 'nestable-collapsed',
                placeClass: 'nestable-placeholder',
                emptyClass: 'nestable-empty'
            });

        }

    };

    $('.nestable').tkNestable();

})(jQuery);

},{}],"/media/sf_d/lib/essential/js/_panel-collapse.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var randomId = function() {
        /** @return String */
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkPanelCollapse = function () {

        if (! this.length) return;

        var body = $('.panel-body', this),
            id = body.attr('id') || randomId(),
            collapse = $('<div/>');

        collapse
            .attr('id', id)
            .addClass('collapse' + (this.data('open') ? ' in' : ''))
            .append(body.clone());

        body.remove();

        $(this).append(collapse);

        $('.panel-collapse-trigger', this)
            .attr('data-toggle', 'collapse' )
            .attr('data-target', '#' + id)
            .collapse({ trigger: false });

    };

    $('[data-toggle="panel-collapse"]').each(function(){
        $(this).tkPanelCollapse();
    });

})(jQuery);

},{}],"/media/sf_d/lib/essential/js/_progress-bars.js":[function(require,module,exports){
(function ($) {

    // Progress Bar Animation
    $('.progress-bar').each(function () {
        $(this).width($(this).attr('aria-valuenow') + '%');
    });

})(jQuery);
},{}],"/media/sf_d/lib/essential/js/_select2.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelect2 = function () {

        if (! this.length) return;

        if (typeof $.fn.select2 != 'undefined') {

            var t = this,
                options = {
                    allowClear: t.data('allowClear')
                };

            if (t.is('button')) return true;
            if (t.is('input[type="button"]')) return true;

            if (t.is('[data-toggle="select2-tags"]')) {
                options.tags = t.data('tags').split(',');
            }

            t.select2(options);

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelect2Enable = function () {

        if (! this.length) return;

        if (typeof $.fn.select2 != 'undefined') {

            this.click(function () {
                $($(this).data('target')).select2("enable");
            });

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelect2Disable = function () {

        if (! this.length) return;

        if (typeof $.fn.select2 != 'undefined') {

            this.click(function () {
                $(this.data('target')).select2("disable");
            });

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelect2Flags = function () {

        if (! this.length) return;

        if (typeof $.fn.select2 != 'undefined') {

            // templating
            var format = function (state) {
                if (! state.id) return state.text;
                return "<img class='flag' src='http://select2.github.io/select2/images/flags/" + state.id.toLowerCase() + ".png'/>" + state.text;
            };

            this.select2({
                formatResult: format,
                formatSelection: format,
                escapeMarkup: function (m) {
                    return m;
                }
            });

        }

    };

    $('[data-toggle*="select2"]').each(function() {

        $(this).tkSelect2();

    });

    $('[data-toggle="select2-enable"]').tkSelect2Enable();

    $('[data-toggle="select2-disable"]').tkSelect2Disable();

    $("#select2_7").tkSelect2Flags();

})(jQuery);

},{}],"/media/sf_d/lib/essential/js/_selectpicker.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSelectPicker = function () {

        if (! this.length) return;

        if (typeof $.fn.selectpicker != 'undefined') {

            this.selectpicker({
                width: this.data('width') || '100%'
            });

        }

    };

    $(function () {

        $('.selectpicker').each(function () {
           $(this).tkSelectPicker();
        });

    });

})(jQuery);

},{}],"/media/sf_d/lib/essential/js/_show-hover.js":[function(require,module,exports){
(function ($) {

    var showHover = function () {
        $('[data-show-hover]').hide().each(function () {
            var self = $(this),
                parent = $(this).data('showHover');

            self.closest(parent).on('mouseover', function (e) {
                e.stopPropagation();
                self.show();
            }).on('mouseout', function () {
                self.hide();
            });
        });
    };

    showHover();

    window.showHover = showHover;

})(jQuery);
},{}],"/media/sf_d/lib/essential/js/_skin.js":[function(require,module,exports){
module.exports = (function () {
    var skin = $.cookie('skin');

    if (typeof skin == 'undefined') {
        skin = 'default';
    }
    return skin;
});
},{}],"/media/sf_d/lib/essential/js/_slider.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var bars = function(el){
        $('.slider-handle', el).html('<i class="fa fa-bars fa-rotate-90"></i>');
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSlider = function () {

        if (! this.length) return;

        if (typeof $.fn.slider != 'undefined') {

            this.slider();

            bars(this);

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSliderFormatter = function () {

        if (! this.length) return;

        if (typeof $.fn.slider != 'undefined') {

            this.slider({
                formatter: function (value) {
                    return 'Current value: ' + value;
                }
            });

            bars(this);

        }

    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSliderUpdate = function () {

        if (! this.length) return;

        if (typeof $.fn.slider != 'undefined') {

            this.on("slide", function (slideEvt) {
                $(this.attr('data-on-slide')).text(slideEvt.value);
            });

            bars(this);

        }

    };

    $('[data-slider="default"]').tkSlider();

    $('[data-slider="formatter"]').tkSliderFormatter();

    $('[data-on-slide]').tkSliderUpdate();

})(jQuery);
},{}],"/media/sf_d/lib/essential/js/_summernote.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSummernote = function () {

        if (! this.length) return;

        if (typeof $.fn.summernote != 'undefined') {

            this.summernote({
                height: 300
            });

        }

    };

    $(function () {

        $('.summernote').each(function () {
           $(this).tkSummernote();
        });

    });

})(jQuery);

},{}],"/media/sf_d/lib/essential/js/_tables.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkDataTable = function(){

        if (! this.length) return;

        if (typeof $.fn.dataTable != 'undefined') {

            this.dataTable();

        }

    };

    $('[data-toggle="data-table"]').tkDataTable();

})(jQuery);
},{}],"/media/sf_d/lib/essential/js/_tabs.js":[function(require,module,exports){
(function ($) {

    var skin = require('./_skin')();

    $('.tabbable .nav-tabs').each(function(){
        var tabs = $(this).niceScroll({
            cursorborder: 0,
            cursorcolor: config.skins[ skin ][ 'primary-color' ],
            horizrailenabled: true,
            oneaxismousemode: true
        });

        var _super = tabs.getContentSize;
        tabs.getContentSize = function() {
            var page = _super.call(tabs);
            page.h = tabs.win.height();
            return page;
        };
    });

    $('[data-scrollable]').getNiceScroll().resize();

    $('.tabbable .nav-tabs a').on('shown.bs.tab', function(e){
        var tab = $(this).closest('.tabbable');
        var target = $(e.target),
            targetPane = target.attr('href') || target.data('target');

        // refresh tabs with horizontal scroll
        tab.find('.nav-tabs').getNiceScroll().resize();

        // refresh [data-scrollable] within the activated tab pane
        $(targetPane).find('[data-scrollable]').getNiceScroll().resize();
    });

}(jQuery));
},{"./_skin":"/media/sf_d/lib/essential/js/_skin.js"}],"/media/sf_d/lib/essential/js/_tooltip.js":[function(require,module,exports){
(function ($) {
    "use strict";

    // Tooltip
    $("body").tooltip({selector: '[data-toggle="tooltip"]', container: "body"});

})(jQuery);
},{}],"/media/sf_d/lib/essential/js/_touchspin.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkTouchSpin = function () {

        if (! this.length) return;

        if (typeof $.fn.TouchSpin != 'undefined') {

            this.TouchSpin();

        }

    };

    $('[data-toggle="touch-spin"]').tkTouchSpin();

}(jQuery));
},{}],"/media/sf_d/lib/essential/js/_tree.js":[function(require,module,exports){
(function ($) {

    var tree_glyph_options = {
        map: {
            checkbox: "fa fa-square-o",
            checkboxSelected: "fa fa-check-square",
            checkboxUnknown: "fa fa-check-square fa-muted",
            error: "fa fa-exclamation-triangle",
            expanderClosed: "fa fa-caret-right",
            expanderLazy: "fa fa-angle-right",
            expanderOpen: "fa fa-caret-down",
            doc: "fa fa-file-o",
            noExpander: "",
            docOpen: "fa fa-file",
            loading: "fa fa-refresh fa-spin",
            folder: "fa fa-folder",
            folderOpen: "fa fa-folder-open"
        }
    },
    tree_dnd_options = {
        autoExpandMS: 400,
            focusOnClick: true,
            preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
            preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
            dragStart: function(node, data) {
            /** This function MUST be defined to enable dragging for the tree.
             *  Return false to cancel dragging of node.
             */
            return true;
        },
        dragEnter: function(node, data) {
            /** data.otherNode may be null for non-fancytree droppables.
             *  Return false to disallow dropping on node. In this case
             *  dragOver and dragLeave are not called.
             *  Return 'over', 'before, or 'after' to force a hitMode.
             *  Return ['before', 'after'] to restrict available hitModes.
             *  Any other return value will calc the hitMode from the cursor position.
             */
            // Prevent dropping a parent below another parent (only sort
            // nodes under the same parent)
            /*
            if(node.parent !== data.otherNode.parent){
                return false;
            }
            // Don't allow dropping *over* a node (would create a child)
            return ["before", "after"];
            */
            return true;
        },
        dragDrop: function(node, data) {
            /** This function MUST be defined to enable dropping of items on
             *  the tree.
             */
            data.otherNode.moveTo(node, data.hitMode);
        }
    };

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkFancyTree = function(){

        if (! this.length) return;

        if (typeof $.fn.fancytree == 'undefined') return;

        var extensions = [ "glyph" ];
        if (typeof this.attr('data-tree-dnd') !== "undefined") {
            extensions.push( "dnd" );
        }
        this.fancytree({
            extensions: extensions,
            glyph: tree_glyph_options,
            dnd: tree_dnd_options,
            clickFolderMode: 3,
            checkbox: typeof this.attr('data-tree-checkbox') !== "undefined" || false,
            selectMode: typeof this.attr('data-tree-select') !== "undefined" ? parseInt(this.attr('data-tree-select')) : 2
        });

    };

    // using default options
    $('[data-toggle="tree"]').each(function () {
        $(this).tkFancyTree();
    });

}(jQuery));
},{}],"/media/sf_d/lib/essential/js/_wizard.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkWizard = function () {

        if (! this.length) return;

        if (typeof $.fn.slick == 'undefined') return;

        var t = this,
            container = t.closest('.wizard-container');

        t.slick({
            dots: false,
            arrows: false,
            slidesToShow: 1,
            rtl: this.data('rtl'),
            slide: 'fieldset',
            onAfterChange: function (wiz, index) {
                $(document).trigger('after.wizard.step', {
                    wiz: wiz,
                    target: index,
                    container: container,
                    element: t
                });
            }
        });

        container.find('.wiz-next').click(function (e) {
            e.preventDefault();
            t.slickNext();
        });

        container.find('.wiz-prev').click(function (e) {
            e.preventDefault();
            t.slickPrev();
        });

        container.find('.wiz-step').click(function (e) {
            e.preventDefault();
            t.slickGoTo($(this).data('target'));
        });

        $(document).on('show.bs.modal', function () {
            t.closest('.modal-body').hide();
        });

        $(document).on('shown.bs.modal', function () {
            t.closest('.modal-body').show();
            t.slickSetOption('dots', false, true);
        });

    };

    $('[data-toggle="wizard"]').each(function () {
        $(this).tkWizard();
    });

    /**
     * By leveraging events we can hook into the wizard to add functionality.
     * This example updates the progress bar after the wizard step changes.
     */
    $(document).on('after.wizard.step', function (event, data) {

        if (data.container.is('#wizard-demo-1')) {

            var target = data.container.find('.wiz-progress li:eq(' + data.target + ')');

            data.container.find('.wiz-progress li').removeClass('active complete');

            target.addClass('active');

            target.prevAll().addClass('complete');

        }

    });

}(jQuery));
},{}],"/media/sf_d/lib/essential/js/main.js":[function(require,module,exports){
require('./_tabs');
require('./_tree');
require('./_show-hover');
require('./_daterangepicker');
require('./_expandable');
require('./_nestable');
require('./_cover');
require('./_tooltip');
require('./_tables');
require('./_check-all');
require('./_progress-bars');
require('./_iframe');
require('./_bootstrap-collapse');
require('./_bootstrap-carousel');
require('./_bootstrap-modal');
require('./_panel-collapse');

// Forms
require('./_touchspin');
require('./_select2');
require('./_slider');
require('./_selectpicker');
require('./_datepicker');
require('./_minicolors');
require('./_bootstrap-switch');
require('./_wizard');
require('./_summernote');
},{"./_bootstrap-carousel":"/media/sf_d/lib/essential/js/_bootstrap-carousel.js","./_bootstrap-collapse":"/media/sf_d/lib/essential/js/_bootstrap-collapse.js","./_bootstrap-modal":"/media/sf_d/lib/essential/js/_bootstrap-modal.js","./_bootstrap-switch":"/media/sf_d/lib/essential/js/_bootstrap-switch.js","./_check-all":"/media/sf_d/lib/essential/js/_check-all.js","./_cover":"/media/sf_d/lib/essential/js/_cover.js","./_datepicker":"/media/sf_d/lib/essential/js/_datepicker.js","./_daterangepicker":"/media/sf_d/lib/essential/js/_daterangepicker.js","./_expandable":"/media/sf_d/lib/essential/js/_expandable.js","./_iframe":"/media/sf_d/lib/essential/js/_iframe.js","./_minicolors":"/media/sf_d/lib/essential/js/_minicolors.js","./_nestable":"/media/sf_d/lib/essential/js/_nestable.js","./_panel-collapse":"/media/sf_d/lib/essential/js/_panel-collapse.js","./_progress-bars":"/media/sf_d/lib/essential/js/_progress-bars.js","./_select2":"/media/sf_d/lib/essential/js/_select2.js","./_selectpicker":"/media/sf_d/lib/essential/js/_selectpicker.js","./_show-hover":"/media/sf_d/lib/essential/js/_show-hover.js","./_slider":"/media/sf_d/lib/essential/js/_slider.js","./_summernote":"/media/sf_d/lib/essential/js/_summernote.js","./_tables":"/media/sf_d/lib/essential/js/_tables.js","./_tabs":"/media/sf_d/lib/essential/js/_tabs.js","./_tooltip":"/media/sf_d/lib/essential/js/_tooltip.js","./_touchspin":"/media/sf_d/lib/essential/js/_touchspin.js","./_tree":"/media/sf_d/lib/essential/js/_tree.js","./_wizard":"/media/sf_d/lib/essential/js/_wizard.js"}],"/media/sf_d/lib/layout/js/_async.js":[function(require,module,exports){
function contentLoaded(win, fn) {

    var done = false, top = true,

        doc = win.document,
        root = doc.documentElement,
        modern = doc.addEventListener,

        add = modern ? 'addEventListener' : 'attachEvent',
        rem = modern ? 'removeEventListener' : 'detachEvent',
        pre = modern ? '' : 'on',

        init = function (e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
            (e.type == 'load' ? win : doc)[ rem ](pre + e.type, init, false);
            if (! done && (done = true)) fn.call(win, e.type || e);
        },

        poll = function () {
            try {
                root.doScroll('left');
            } catch (e) {
                setTimeout(poll, 50);
                return;
            }
            init('poll');
        };

    if (doc.readyState == 'complete') fn.call(win, 'lazy');
    else {
        if (! modern && root.doScroll) {
            try {
                top = ! win.frameElement;
            } catch (e) {
            }
            if (top) poll();
        }
        doc[ add ](pre + 'DOMContentLoaded', init, false);
        doc[ add ](pre + 'readystatechange', init, false);
        win[ add ](pre + 'load', init, false);
    }
}

module.exports = function(urls, callback) {

    var asyncLoader = function (urls, callback) {

        urls.foreach(function (i, file) {
            loadCss(file);
        });

        // checking for a callback function
        if (typeof callback == 'function') {
            // calling the callback
            contentLoaded(window, callback);
        }
    };

    var loadCss = function (url) {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = url;
        document.getElementsByTagName('head')[ 0 ].appendChild(link);
    };

    // simple foreach implementation
    Array.prototype.foreach = function (callback) {
        for (var i = 0; i < this.length; i ++) {
            callback(i, this[ i ]);
        }
    };

    asyncLoader(urls, callback);

};
},{}],"/media/sf_d/lib/layout/js/_breakpoints.js":[function(require,module,exports){
(function ($) {

    $(window).setBreakpoints({
        distinct: true,
        breakpoints: [ 320, 480, 768, 1024 ]
    });

})(jQuery);
},{}],"/media/sf_d/lib/layout/js/_gridalicious.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkGridalicious = function () {

        if (! this.length) return;

        this.gridalicious({
            gutter: this.data('gutter') || 15,
            width: this.data('width') || 370,
            selector: '> div',
            animationOptions: {
                complete: function () {
                    $(window).trigger('resize');
                }
            }
        });

    };

    $('[data-toggle*="gridalicious"]').each(function () {
        $(this).tkGridalicious();
    });

})(jQuery);
},{}],"/media/sf_d/lib/layout/js/_isotope.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkIsotope = function () {

        if (! this.length) return;

        this.isotope({
            layoutMode: this.data('layoutMode') || "packery",
            itemSelector: '.item'
        });

        /*
        this.isotope('on', 'layoutComplete', function(){
            $(window).trigger('resize');
        });
        */

    };

    $(function(){

        setTimeout(function () {
            $('[data-toggle="isotope"]').each(function () {
                $(this).tkIsotope();
            });
        }, 300);

        $(document).on('domChanged', function(){
            $('[data-toggle="isotope"]').each(function(){
                $(this).isotope();
            });
        });

    });

})(jQuery);

},{}],"/media/sf_d/lib/layout/js/_parallax.js":[function(require,module,exports){
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function () {
    var lastTime = 0;
    var vendors = [ 'ms', 'moz', 'webkit', 'o' ];
    for (var x = 0; x < vendors.length && ! window.requestAnimationFrame; ++ x) {
        window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
        window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
    }

    if (! window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (! window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

(function ($, window) {
    "use strict";

    $.fn.tkParallax = function () {

        if (Modernizr.touch) return;

        var getOptions = function (e) {
            return {
                speed: e.data('speed') || 4,
                translate: e.data('speed') || true,
                translateWhen: e.data('translateWhen') || 'inViewportTop',
                autoOffset: e.data('autoOffset'),
                offset: e.data('offset') || 0,
                opacity: e.data('opacity')
            };
        };

        var $window = $(window),
            $windowContent = $('.st-content-inner'),
            $element = this;

        var ticking = false,
            $scrollable = null,
            lastScrollTop = 0;

        var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

        var requestTick = function (e) {
            if (! ticking) {
                $scrollable = $(e.currentTarget);
                // although Safari has support for requestAnimationFrame,
                // the animation in this case is choppy so we'll just run it directly
                if (isSafari) {
                    animate();
                } else {
                    window.requestAnimationFrame(animate);
                    ticking = true;
                }
            }
        };

        // Translates an element on the Y axis using translate3d to ensure
        // that the rendering is done by the GPU
        var translateY = function (elm, value) {
            var translate = 'translate3d(0px,' + value + 'px, 0px)';
            elm.style[ '-webkit-transform' ] = translate;
            elm.style[ '-moz-transform' ] = translate;
            elm.style[ '-ms-transform' ] = translate;
            elm.style[ '-o-transform' ] = translate;
            elm.style.transform = translate;
        };

        var layers = $element.find('.parallax-layer');

        var init = function () {
            layers.each(function () {

                var layer = $(this),
                    layerOptions = getOptions(layer),
                    height = $element.outerHeight(true);

                if (layerOptions.translate) {
                    if (layer.is('img') && layerOptions.autoOffset) {
                        $.loadImage(layer.attr('src')).done(function () {
                            layer.removeAttr('style');
                            var layerHeight = layer.height();
                            var offset = layerHeight * 0.33;
                            if ((offset + height) > layerHeight) {
                                offset = layerHeight - height;
                            }
                            offset = offset * - 1;
                            layer.attr('data-offset', offset);
                            translateY(layer.get(0), offset);
                        });
                    }
                }

            });
        };

        init();
        $(window).on("debouncedresize", init);

        var animate = function () {
            var scrollTop = parseInt($scrollable.scrollTop());
            var scrollableTop = $scrollable.is($window) ? 0 : $scrollable.offset().top;
            var height = $element.outerHeight(true);
            var bodyPadding = {
                top: parseInt($(document.body).css('padding-top')),
                bottom: parseInt($(document.body).css('padding-bottom'))
            };
            var windowHeight = $scrollable.innerHeight();
            var windowBottom = scrollTop + windowHeight - (bodyPadding.bottom + bodyPadding.top);
            var top = $element.offset().top - scrollableTop - bodyPadding.top;
            var bottom = top + height;
            var topAbs = Math.abs(top);
            var pos = top / windowHeight * 100;
            var opacityKey = height * 0.5;
            var when = {};

            /*
             * ONLY when the scrollable element IS NOT the window
             */

            // when the element is anywhere in viewport
            when.inViewport = (bottom > 0) && (top < windowHeight);

            // when the top of the viewport is crossing the element
            when.inViewportTop = (bottom > 0) && (top < 0);

            // when the bottom of the viewport is crossing the element
            when.inViewportBottom = (bottom > 0) && (top < windowHeight) && (bottom > windowHeight);

            /*
             * ONLY when the scrollable element IS the window
             */

            if ($scrollable.is($window)) {

                // when the window is scrollable and the element is completely in the viewport
                when.inWindowViewportFull = (top >= scrollTop) && (bottom <= windowBottom);

                when.inWindowViewport2 = (top >= scrollTop) && (top <= windowBottom);

                when.inWindowViewport3 = (bottom >= scrollTop) && (bottom <= windowBottom);

                when.inWindowViewport4 = (bottom >= scrollTop) && (bottom >= windowHeight) && (height > windowHeight);

                // when the window is scrollable and the top of the viewport is crossing the element
                when.inWindowViewportTop = ! when.inWindowViewport2 && (when.inWindowViewport3 || when.inWindowViewport4);

                // when the window is scrollable and the bottom of the viewport is crossing the element
                when.inWindowViewportBottom = when.inWindowViewport2 && ! when.inWindowViewport3;

                // when the window is scrollable and the element is anywhere in viewport
                when.inWindowViewport = when.inWindowViewportTop || when.inWindowViewportBottom || when.inWindowViewportFull;

                when.inViewport = when.inWindowViewport;
                when.inViewportTop = when.inWindowViewportTop;
                when.inViewportBottom = when.inWindowViewportBottom;

                pos = (top - scrollTop) / windowHeight * 100;
            }

            if (when.inViewportTop && when.inViewportBottom) {
                when.inViewportBottom = false;
            }

            if (! isNaN(scrollTop)) {
                layers.each(function () {

                    var layer = $(this);
                    var layerOptions = getOptions(layer);

                    var ty = (windowHeight + height) - bottom;

                    if ($scrollable.is($window)) {
                        ty = windowBottom - top;
                    }

                    if (layerOptions.translate) {

                        var layerPos = (- 1 * pos * layerOptions.speed) + layerOptions.offset;
                        var layerHeight = layer.height();

                        if (when.inViewport && ! when.inViewportTop && ! when.inViewportBottom) {
                            if (layer.is('img') && layerHeight > height) {
                                if ((Math.abs(layerPos) + height) > layerHeight) {
                                    layerPos = (layerHeight - height) * - 1;
                                }
                            }
                            if (! layer.is('img')) {
                                layerPos = 0;
                            }
                        }

                        if (when.inViewportTop && ((layer.is('img') && layerHeight == height) || ! layer.is('img') )) {
                            layerPos = Math.abs(layerPos);
                        }

                        if (when.inViewportBottom && ! layer.is('img')) {
                            layerPos = height - ty;

                            // scrolling up
                            if (scrollTop < lastScrollTop) {
                                layerPos = layerPos * - 1;
                            }
                        }

                        if (when.inViewport) {
                            layerPos = (layerPos).toFixed(5);
                            if (layerHeight > $window.height() && scrollTop <= 0) {
                                layerPos = 0;
                            }
                            translateY(layer.get(0), layerPos);
                        }

                    }

                    if (layerOptions.opacity) {

                        // fade in
                        if (when.inViewportBottom) {

                            var y, yP;

                            if ($scrollable.is($window)) {

                                y = ty;
                                yP = (y / height).toFixed(5);

                                if (y > opacityKey) {
                                    layer.css({opacity: yP});
                                }
                                else {
                                    layer.css({opacity: 0});
                                }
                            }
                            else {
                                if (bottom < (windowHeight + opacityKey)) {

                                    y = (windowHeight + opacityKey) - bottom;
                                    yP = (y / opacityKey).toFixed(5);

                                    layer.css({opacity: yP});
                                } else {
                                    layer.css({opacity: 0});
                                }
                            }
                        }

                        // fade out
                        else if (when.inViewportTop) {
                            var topOrigin = $scrollable.is($window) ? scrollTop - top : topAbs;
                            if (topOrigin > opacityKey) {
                                layer.css({
                                    'opacity': (1 - (topOrigin / height)).toFixed(5)
                                });
                            } else {
                                layer.css({'opacity': 1});
                            }
                        }

                        // reset
                        else {
                            layer.css({'opacity': 1});
                        }

                        if (when.inViewportBottom && scrollTop <= 0) {
                            layer.css({'opacity': 1});
                        }

                    }

                });

                lastScrollTop = scrollTop;
            }

            ticking = false;
        };

        if ($windowContent.length) {
            $windowContent.scroll(requestTick);
        } else {
            $window.scroll(requestTick);
        }

    };

    $('.parallax').each(function () {
        $(this).tkParallax();
    });

})(jQuery, window);
},{}],"/media/sf_d/lib/layout/js/_scrollable.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var skin = require('./_skin')();

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkScrollable = function (options) {

        if (! this.length) return;

        var settings = $.extend({
            horizontal: false
        }, options);

        var nice = this.niceScroll({
            cursorborder: 0,
            cursorcolor: config.skins[ skin ][ 'primary-color' ],
            horizrailenabled: settings.horizontal
        });

        if (! settings.horizontal) return;

        var _super = nice.getContentSize;

        nice.getContentSize = function () {
            var page = _super.call(nice);
            page.h = nice.win.height();
            return page;
        };

    };

    $('[data-scrollable]').tkScrollable();

    $('[data-scrollable-h]').each(function () {

       $(this).tkScrollable({ horizontal: true });

    });

    var t;
    $(window).on('debouncedresize', function () {
        clearTimeout(t);
        t = setTimeout(function () {
            $('[data-scrollable], [data-scrollable-h]').getNiceScroll().resize();
        }, 100);
    });

}(jQuery));
},{"./_skin":"/media/sf_d/lib/layout/js/_skin.js"}],"/media/sf_d/lib/layout/js/_sidebar-pc.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $.fn.tkSidebarSizePcDemo = function(){

        var t, spc_demo = this;

        if (! spc_demo.length) return;

        $(document)
            .on('sidebar.show', function(){
                $('#pc-open').prop('disabled', true);
            })
            .on('sidebar.hidden', function(){
                $('#pc-open').prop('disabled', false);
            });

        spc_demo.on('submit', function (e) {
            e.preventDefault();
            var s = $('.sidebar'), ve = $('#pc-value'), v = ve.val();
            ve.blur();
            if (! v.length || v < 25) {
                v = 25;
                ve.val(v);
            }
            s[ 0 ].className = s[ 0 ].className.replace(/sidebar-size-([\d]+)pc/ig, 'sidebar-size-' + v + 'pc');
            sidebar.open('sidebar-menu');
            clearTimeout(t);
            t = setTimeout(function () {
                sidebar.close('sidebar-menu');
            }, 5000);
        });

    };

    $('[data-toggle="sidebar-size-pc-demo"]').tkSidebarSizePcDemo();

})(jQuery);
},{}],"/media/sf_d/lib/layout/js/_skin.js":[function(require,module,exports){
module.exports=require("/media/sf_d/lib/essential/js/_skin.js")
},{"/media/sf_d/lib/essential/js/_skin.js":"/media/sf_d/lib/essential/js/_skin.js"}],"/media/sf_d/lib/layout/js/_skins.js":[function(require,module,exports){
var asyncLoader = require('./_async');

(function ($) {

    var changeSkin = function () {
        var skin = $.cookie("skin"),
            file = $.cookie("skin-file");
        if (typeof skin != 'undefined') {
            asyncLoader([ 'css/' + file + '.css' ], function () {
                $('[data-skin]').removeProp('disabled').parent().removeClass('loading');
            });
        }
    };

    $('[data-skin]').on('click', function () {

        if ($(this).prop('disabled')) return;

        $('[data-skin]').prop('disabled', true);

        $(this).parent().addClass('loading');

        $.cookie("skin", $(this).data('skin'));

        $.cookie("skin-file", $(this).data('file'));

        changeSkin();

    });

    var skin = $.cookie("skin");

    if (typeof skin != 'undefined' && skin != 'default') {
        changeSkin();
    }

})(jQuery);
},{"./_async":"/media/sf_d/lib/layout/js/_async.js"}],"/media/sf_d/lib/layout/js/main.js":[function(require,module,exports){
require('./_breakpoints.js');
require('./_gridalicious.js');
require('./_scrollable.js');
require('./_skins');
require('./_isotope');
require('./_parallax');

// Sidebar Percentage Sizes Demo
require('./_sidebar-pc');
},{"./_breakpoints.js":"/media/sf_d/lib/layout/js/_breakpoints.js","./_gridalicious.js":"/media/sf_d/lib/layout/js/_gridalicious.js","./_isotope":"/media/sf_d/lib/layout/js/_isotope.js","./_parallax":"/media/sf_d/lib/layout/js/_parallax.js","./_scrollable.js":"/media/sf_d/lib/layout/js/_scrollable.js","./_sidebar-pc":"/media/sf_d/lib/layout/js/_sidebar-pc.js","./_skins":"/media/sf_d/lib/layout/js/_skins.js"}],"/media/sf_d/lib/sidebar/js/_breakpoints.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var restore = function () {
            $("html").addClass('show-sidebar');
            $('.sidebar.sidebar-visible-desktop').not(':visible').each(function () {
                var options = sidebar.options($(this));
                sidebar.open($(this).attr('id'), options);
            });
        },
        hide = function () {
            $("html").removeClass('show-sidebar');
            $('.sidebar:visible').each(function () {
                sidebar.close($(this).attr('id'));
            });
        };

    $(window).bind('enterBreakpoint768', function () {
        if (! $('.sidebar').length) return;
        if ($('.hide-sidebar').length) return;
        restore();
    });

    $(window).bind('enterBreakpoint1024', function () {
        if (! $('.sidebar').length) return;
        if ($('.hide-sidebar').length) return;
        restore();
    });

    $(window).bind('enterBreakpoint480', function () {
        if (! $('.sidebar').length) return;
        hide();
    });

    if ($(window).width() <= 480) {
        if (! $('.sidebar').length) return;
        hide();
    }

})(jQuery);

},{}],"/media/sf_d/lib/sidebar/js/_collapsible.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSidebarCollapse = function () {

        if (! this.length) return;

        var sidebar = this;

        sidebar.find('.sidebar-menu > li > a').off('mouseenter');
        sidebar.find('.sidebar-menu > li.dropdown > a').off('mouseenter');
        sidebar.find('.sidebar-menu > li > a').off('mouseenter');
        sidebar.find('.sidebar-menu > li > a').off('click');
        sidebar.off('mouseleave');
        sidebar.find('.dropdown').off('mouseover');
        sidebar.find('.dropdown').off('mouseout');

        $('body').off('mouseout', '#dropdown-temp .dropdown');

        sidebar.find('ul.collapse')
            .off('shown.bs.collapse')
            .off('show.bs.collapse')
            .off('hide.bs.collapse')
            .off('hidden.bs.collapse');

        sidebar.find('#dropdown-temp').remove();

        sidebar.find('.hasSubmenu').removeClass('dropdown')
            .find('> ul').addClass('collapse').removeClass('dropdown-menu submenu-hide submenu-show')
            .end()
            .find('> a').attr('data-toggle', 'collapse').on('click', function(e){
                e.preventDefault();
            });

        sidebar.find('.collapse').on('shown.bs.collapse', function () {
            sidebar.find('[data-scrollable]').getNiceScroll().resize();
        });

        // Collapse
        sidebar.find('.collapse').on('show.bs.collapse', function (e) {
            e.stopPropagation();
            var parents = $(this).parents('ul:first').find('> li.open > ul');
            if (parents.length) {
                parents.collapse('hide').closest('.hasSubmenu').removeClass('open');
            }
            $(this).closest('.hasSubmenu').addClass('open');
        });

        sidebar.find('.collapse').on('hidden.bs.collapse', function (e) {
            e.stopPropagation();
            $(this).closest('.hasSubmenu').removeClass('open');
        });

        sidebar.find('.collapse').collapse({ toggle: false });

    };

    $('.sidebar[data-type="collapse"]').each(function(){
        $(this).tkSidebarCollapse();
    });

})(jQuery);
},{}],"/media/sf_d/lib/sidebar/js/_dropdown.js":[function(require,module,exports){
(function ($) {
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSidebarDropdown = function () {

        if (! this.length) return;

        var sidebar = this;

        sidebar.find('.collapse')
            .off('shown.bs.collapse')
            .off('show.bs.collapse')
            .off('hidden.bs.collapse');

        var nice = sidebar.find('[data-scrollable]');

        if (nice.length) {
            nice = nice.getNiceScroll()[ 0 ];
            nice.scrollstart(function () {
                if (! sidebar.is('[data-type="dropdown"]')) return;
                sidebar.addClass('scrolling');
                sidebar.find('#dropdown-temp > ul > li').empty();
                sidebar.find('#dropdown-temp').hide();
                sidebar.find('.open').removeClass('open');
            });

            nice.scrollend(function () {
                if (! sidebar.is('[data-type="dropdown"]')) return;
                $.data(this, 'lastScrollTop', nice.getScrollTop());
                sidebar.removeClass('scrolling');
            });
        }

        sidebar.find('.hasSubmenu').addClass('dropdown').removeClass('open')
            .find('> ul').addClass('dropdown-menu').removeClass('collapse in').removeAttr('style')
            .end()
            .find('> a').removeClass('collapsed')
            .removeAttr('data-toggle');

        sidebar.find('.sidebar-menu > li.dropdown > a').on('mouseenter', function () {

            var c = sidebar.find('#dropdown-temp');

            sidebar.find('.open').removeClass('open');
            c.hide();

            if (! $(this).parent('.dropdown').is('.open') && ! sidebar.is('.scrolling')) {
                var p = $(this).parent('.dropdown'),
                    t = p.find('> .dropdown-menu').clone().removeClass('submenu-hide');

                if (! c.length) {
                    c = $('<div/>').attr('id', 'dropdown-temp').appendTo(sidebar);
                    c.html('<ul><li></li></ul>');
                }

                c.show();
                c.find('.dropdown-menu').remove();
                c = c.find('> ul > li').css({overflow: 'visible'}).addClass('dropdown open');

                p.addClass('open');
                t.appendTo(c).css({
                    top: p.offset().top - c.offset().top,
                    left: '100%'
                }).show();

                if (sidebar.is('.right')) {
                    t.css({
                        left: 'auto',
                        right: '100%'
                    });
                }
            }
        });

        sidebar.find('.sidebar-menu > li > a').on('mouseenter', function () {

            if (! $(this).parent().is('.dropdown')) {
                var sidebar = $(this).closest('.sidebar');
                sidebar.find('.open').removeClass('open');
                sidebar.find('#dropdown-temp').hide();
            }

        });

        sidebar.find('.sidebar-menu > li > a').on('click', function (e) {
            if ($(this).parent().is('.dropdown')) {
                e.preventDefault();
                e.stopPropagation();
            }
        });

        sidebar.on('mouseleave', function () {
            $(this).find('#dropdown-temp').hide();
            $(this).find('.open').removeClass('open');
        });

        sidebar.find('.dropdown').on('mouseover', function () {
            $(this).addClass('open').children('ul').removeClass('submenu-hide').addClass('submenu-show');
        }).on('mouseout', function () {
            $(this).children('ul').removeClass('.submenu-show').addClass('submenu-hide');
        });

        $('body').on('mouseout', '#dropdown-temp .dropdown', function () {
            $('.sidebar-menu .open', $(this).closest('.sidebar')).removeClass('.open');
        });

    };

    var transform_dd = function () {

        $('.sidebar[data-type="dropdown"]').each(function () {
            $(this).tkSidebarDropdown();
        });

    };

    var transform_collapse = function () {

        $('.sidebar[data-type="collapse"]').each(function () {
            $(this).tkSidebarCollapse();
        });

    };

    transform_dd();

    $(window).bind('enterBreakpoint480', function () {
        if (! $('.sidebar[data-type="dropdown"]').length) return;
        $('.sidebar[data-type="dropdown"]').attr('data-type', 'collapse').attr('data-transformed', true);
        transform_collapse();
    });

    function make_dd() {
        if (! $('.sidebar[data-type="collapse"][data-transformed]').length) return;
        $('.sidebar[data-type="collapse"][data-transformed]').attr('data-type', 'dropdown').attr('data-transformed', true);
        transform_dd();
    }

    $(window).bind('enterBreakpoint768', make_dd);

    $(window).bind('enterBreakpoint1024', make_dd);

})(jQuery);
},{}],"/media/sf_d/lib/sidebar/js/_options.js":[function(require,module,exports){
module.exports = function (sidebar) {
    return {
        "transform-button": sidebar.data('transformButton') === true,
        "transform-button-icon": sidebar.data('transformButtonIcon') || 'fa-ellipsis-h'
    };
};
},{}],"/media/sf_d/lib/sidebar/js/_sidebar-menu.js":[function(require,module,exports){
(function ($) {

    var sidebars = $('.sidebar');

    sidebars.each(function () {

        var sidebar = $(this);
        var options = require('./_options')(sidebar);

        if (options[ 'transform-button' ]) {
            var button = $('<button type="button"></button>');

            button
                .attr('data-toggle', 'sidebar-transform')
                .addClass('btn btn-default')
                .html('<i class="fa ' + options[ 'transform-button-icon' ] + '"></i>');

            sidebar.find('.sidebar-menu').append(button);
        }
    });

}(jQuery));
},{"./_options":"/media/sf_d/lib/sidebar/js/_options.js"}],"/media/sf_d/lib/sidebar/js/_sidebar-toggle.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('#subnav').collapse({'toggle': false});

    function mobilecheck() {
        var check = false;
        (function (a) {
            if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
                check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

    (function () {

        var defaults = {
                effect: 'st-effect-1',
                duration: 550,
                overlay: false
            },

            containerSelector = '.st-container',

            eventtype = mobilecheck() ? 'touchstart' : 'click',

            getLayoutClasses = function (sidebar, direction) {

                var layoutClasses = sidebar.data('layoutClasses');

                if (! layoutClasses) {
                    var toggleLayout = sidebar.data('toggleLayout');
                    if (typeof toggleLayout == 'string') {
                        layoutClasses = toggleLayout.split(",").join(" ");
                        sidebar.data('layoutClasses', layoutClasses);
                        return layoutClasses;
                    }

                    var match = new RegExp('sidebar-' + direction + '(\\S+)', 'ig');
                    layoutClasses = $('html').get(0).className.match(match);
                    if (layoutClasses !== null && layoutClasses.length) {
                        layoutClasses = layoutClasses.join(" ");
                        sidebar.data('layoutClasses', layoutClasses);
                    }
                }

                return layoutClasses;

            },

            getSidebarDataOptions = function(sidebar){

                return {
                    effect: sidebar.data('effect'),
                    overlay: sidebar.data('overlay')
                };

            },

            animating = function () {

                if ($('body').hasClass('animating')) return true;
                $('body').addClass('animating');

                setTimeout(function () {
                    $('body').removeClass('animating');
                }, defaults.duration);

                return false;

            },

            reset = function (id, options) {

                var container = $(containerSelector);

                var target = typeof id !== 'undefined' ? '#' + id : container.data('stMenuTarget'),
                    sidebar = $(target);

                if (! sidebar.length) return false;
                if (! sidebar.is(':visible')) return false;
                if (sidebar.hasClass('sidebar-closed')) return false;

                var effect = typeof options !== 'undefined' && options.effect ? options.effect : container.data('stMenuEffect'),
                    direction = sidebar.is('.left') ? 'l' : 'r',
                    size = sidebar.get(0).className.match(/sidebar-size-(\S+)/).pop(),
                    htmlClass = 'st-effect-' + direction + size,
                    toggleLayout = sidebar.data('toggleLayout'),
                    layoutClasses = getLayoutClasses(sidebar, direction),
                    eventData = {
                        sidebar: sidebar,
                        target: target
                    };

                $(document).trigger('sidebar.hide', eventData);

                $('[data-toggle="sidebar-menu"][href="' + target + '"]')
                    .removeClass('active')
                    .closest('li')
                    .removeClass('active');

                $('html').addClass(htmlClass);
                sidebar.addClass(effect);
                container.addClass(effect);

                container.removeClass('st-menu-open st-pusher-overlay');

                setTimeout(function () {
                    $('html').removeClass(htmlClass);
                    if (toggleLayout) $('html').removeClass(layoutClasses);
                    sidebar.removeClass(effect);
                    container.get(0).className = 'st-container'; // clear
                    sidebar.addClass('sidebar-closed').hide();
                    $(document).trigger('sidebar.hidden', eventData);
                }, defaults.duration);

            },

            open = function (target, options) {

                var container = $(containerSelector);

                var sidebar = $(target);
                if (! sidebar.length) return false;

                // on mobile, allow only one sidebar to be open at the same time
                if ($(window).width() < 768 && container.hasClass('st-menu-open')) {
                    return reset();
                }

                $('[data-toggle="sidebar-menu"][href="' + target + '"]')
                    .addClass('active')
                    .closest('li')
                    .addClass('active');

                var effect = options.effect,
                    overlay = options.overlay;

                var direction = sidebar.is('.left') ? 'l' : 'r',
                    size = sidebar.get(0).className.match(/sidebar-size-(\S+)/).pop(),
                    htmlClass = 'st-effect-' + direction + size,
                    toggleLayout = sidebar.data('toggleLayout'),
                    layoutClasses = getLayoutClasses(sidebar, direction),
                    eventData = {
                        sidebar: sidebar,
                        target: target
                    };

                $(document).trigger('sidebar.show', eventData);

                $('html').addClass(htmlClass);
                sidebar.show().removeClass('sidebar-closed');

                container.data('stMenuEffect', effect);
                container.data('stMenuTarget', target);

                sidebar.addClass(effect);
                container.addClass(effect);
                if (overlay) container.addClass('st-pusher-overlay');

                setTimeout(function () {
                    container.addClass('st-menu-open');
                    sidebar.find('[data-scrollable]').getNiceScroll().resize();
                    $(window).trigger('resize');
                }, 25);

                setTimeout(function () {
                    if (toggleLayout) $('html').addClass(layoutClasses);
                    $(document).trigger('sidebar.shown', eventData);
                }, defaults.duration);

            },

            toggle = function (e) {

                e.stopPropagation();
                e.preventDefault();

                var a = animating();
                if (a) return false;

                var button = $(this),
                    target = button.attr('href'),
                    sidebar;

                if (target.length > 3) {
                    sidebar = $(target);
                    if (! sidebar.length) return false;
                }

                if (target.length < 3) {
                    var currentActiveElement = $('[data-toggle="sidebar-menu"]').not(this).closest('li').length ? $('[data-toggle="sidebar-menu"]').not(this).closest('li') : $('[data-toggle="sidebar-menu"]').not(this);
                    var activeElement = $(this).closest('li').length ? $(this).closest('li') : $(this);

                    currentActiveElement.removeClass('active');
                    activeElement.addClass('active');

                    if ($('html').hasClass('show-sidebar')) activeElement.removeClass('active');

                    $('html').removeClass('show-sidebar');

                    if (activeElement.hasClass('active')) $('html').addClass('show-sidebar');
                    return;
                }

                var dataOptions = getSidebarDataOptions(sidebar),
                    buttonOptions = {};

                if (button.data('effect')) buttonOptions.effect = button.data('effect');
                if (button.data('overlay')) buttonOptions.overlay = button.data('overlay');

                var options = $.extend({}, defaults, dataOptions, buttonOptions);

                if (! sidebar.hasClass('sidebar-closed') && sidebar.is(':visible')) {
                    reset(sidebar.attr('id'), options);
                    return;
                }

                open(target, options);

            };

        $('body').on(eventtype, '[data-toggle="sidebar-menu"]', toggle);

        $(document).on('keydown', null, 'esc', function () {

            var container = $(containerSelector);

            if (container.hasClass('st-menu-open')) {
                reset();
                return false;
            }

        });

        /**
         * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
         */
        $.fn.tkSidebarToggleBar = function () {

            if (! this.length) return;

            var sidebar = this;

            /* Sidebar Toggle Bar */
            if (sidebar.data('toggleBar')) {
                var bar = $('<a></a>');
                bar.attr('href', '#' + sidebar.attr('id'))
                    .attr('data-toggle', 'sidebar-menu')
                    .addClass('sidebar-toggle-bar');

                sidebar.append(bar);
            }

        };

        $('.sidebar').each(function(){
            $(this).tkSidebarToggleBar();
        });

        window.sidebar = {

            open: function (id, options) {

                var a = animating();
                if (a) return false;

                options = $.extend({}, defaults, options);

                return open('#' + id, options);

            },

            close: function (id, options) {

                options = $.extend({}, defaults, options);

                return reset(id, options);

            },

            options: getSidebarDataOptions

        };

    })();

})(jQuery);
},{}],"/media/sf_d/lib/sidebar/js/main.js":[function(require,module,exports){
require('./_breakpoints');
require('./_sidebar-menu');
require('./_collapsible');
require('./_dropdown');
require('./_sidebar-toggle');

(function($){
    "use strict";

    /**
     * jQuery plugin wrapper for compatibility with Angular UI.Utils: jQuery Passthrough
     */
    $.fn.tkSidebar = function (options) {

        if (! this.length) return;

        var settings = $.extend({
            menuType: false,
            toggleBar: false
        }, options);

        var sidebar = this;

        if (settings.menuType == "collapse") {
            sidebar.tkSidebarCollapse();
        }

        if (settings.menuType == "dropdown") {
            sidebar.tkSidebarDropdown();
        }

        if (settings.toggleBar === true) {
            sidebar.tkSidebarToggleBar();
        }

    };

})(jQuery);
},{"./_breakpoints":"/media/sf_d/lib/sidebar/js/_breakpoints.js","./_collapsible":"/media/sf_d/lib/sidebar/js/_collapsible.js","./_dropdown":"/media/sf_d/lib/sidebar/js/_dropdown.js","./_sidebar-menu":"/media/sf_d/lib/sidebar/js/_sidebar-menu.js","./_sidebar-toggle":"/media/sf_d/lib/sidebar/js/_sidebar-toggle.js"}],"/media/sf_d/lib/social/js/_timeline.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('.share textarea').on('keyup', function () {
        $(".share button")[ $(this).val() === '' ? 'hide' : 'show' ]();
    });

    if (! $("#scroll-spy").length) return;

    var offset = $("#scroll-spy").offset().top;

    $('body').scrollspy({target: '#scroll-spy', offset: offset});

})(jQuery);

},{}],"/media/sf_d/lib/social/js/main.js":[function(require,module,exports){
require('./_timeline');
},{"./_timeline":"/media/sf_d/lib/social/js/_timeline.js"}],"/media/sf_d/src/js/components/messages/_breakpoints.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $(window).bind('enterBreakpoint320', function () {
        var img = $('.messages-list .panel ul img');
        $('.messages-list .panel ul').width(img.first().width() * img.length);
    });

    $(window).bind('exitBreakpoint320', function () {
        $('.messages-list .panel ul').width('auto');
    });

})(jQuery);

},{}],"/media/sf_d/src/js/components/messages/_nicescroll.js":[function(require,module,exports){
(function ($) {
    "use strict";

    var nice = $('.messages-list .panel').niceScroll({cursorborder: 0, cursorcolor: "#25ad9f", zindex: 1});

    var _super = nice.getContentSize;

    nice.getContentSize = function () {
        var page = _super.call(nice);
        page.h = nice.win.height();
        return page;
    };

})(jQuery);
},{}],"/media/sf_d/src/js/components/messages/main.js":[function(require,module,exports){
require('./_breakpoints');
require('./_nicescroll');
},{"./_breakpoints":"/media/sf_d/src/js/components/messages/_breakpoints.js","./_nicescroll":"/media/sf_d/src/js/components/messages/_nicescroll.js"}],"/media/sf_d/src/js/pages/users.js":[function(require,module,exports){
(function ($) {
    "use strict";

    $('#users-filter-select').on('change', function () {
        if (this.value === 'name') {
            $('#user-first').removeClass('hidden');
            $('#user-search-name').removeClass('hidden');
        } else {
            $('#user-first').addClass('hidden');
            $('#user-search-name').addClass('hidden');
        }
        if (this.value === 'friends') {
            $('.select-friends').removeClass('hidden');

        } else {
            $('.select-friends').addClass('hidden');
        }
        if (this.value === 'name') {
            $('.search-name').removeClass('hidden');

        } else {
            $('.search-name').addClass('hidden');
        }
    });

})(jQuery);

},{}],"/media/sf_d/src/js/themes/social-1/main.js":[function(require,module,exports){
// Users
require('../../pages/users');

// Messages
require('../../components/messages/main');
},{"../../components/messages/main":"/media/sf_d/src/js/components/messages/main.js","../../pages/users":"/media/sf_d/src/js/pages/users.js"}]},{},["./src/js/themes/social-1/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvdGhlbWVzL3NvY2lhbC0xL2FwcC5qcyIsImxpYi9lc3NlbnRpYWwvanMvX2Jvb3RzdHJhcC1jYXJvdXNlbC5qcyIsImxpYi9lc3NlbnRpYWwvanMvX2Jvb3RzdHJhcC1jb2xsYXBzZS5qcyIsImxpYi9lc3NlbnRpYWwvanMvX2Jvb3RzdHJhcC1tb2RhbC5qcyIsImxpYi9lc3NlbnRpYWwvanMvX2Jvb3RzdHJhcC1zd2l0Y2guanMiLCJsaWIvZXNzZW50aWFsL2pzL19jaGVjay1hbGwuanMiLCJsaWIvZXNzZW50aWFsL2pzL19jb3Zlci5qcyIsImxpYi9lc3NlbnRpYWwvanMvX2RhdGVwaWNrZXIuanMiLCJsaWIvZXNzZW50aWFsL2pzL19kYXRlcmFuZ2VwaWNrZXIuanMiLCJsaWIvZXNzZW50aWFsL2pzL19leHBhbmRhYmxlLmpzIiwibGliL2Vzc2VudGlhbC9qcy9faWZyYW1lLmpzIiwibGliL2Vzc2VudGlhbC9qcy9fbWluaWNvbG9ycy5qcyIsImxpYi9lc3NlbnRpYWwvanMvX25lc3RhYmxlLmpzIiwibGliL2Vzc2VudGlhbC9qcy9fcGFuZWwtY29sbGFwc2UuanMiLCJsaWIvZXNzZW50aWFsL2pzL19wcm9ncmVzcy1iYXJzLmpzIiwibGliL2Vzc2VudGlhbC9qcy9fc2VsZWN0Mi5qcyIsImxpYi9lc3NlbnRpYWwvanMvX3NlbGVjdHBpY2tlci5qcyIsImxpYi9lc3NlbnRpYWwvanMvX3Nob3ctaG92ZXIuanMiLCJsaWIvZXNzZW50aWFsL2pzL19za2luLmpzIiwibGliL2Vzc2VudGlhbC9qcy9fc2xpZGVyLmpzIiwibGliL2Vzc2VudGlhbC9qcy9fc3VtbWVybm90ZS5qcyIsImxpYi9lc3NlbnRpYWwvanMvX3RhYmxlcy5qcyIsImxpYi9lc3NlbnRpYWwvanMvX3RhYnMuanMiLCJsaWIvZXNzZW50aWFsL2pzL190b29sdGlwLmpzIiwibGliL2Vzc2VudGlhbC9qcy9fdG91Y2hzcGluLmpzIiwibGliL2Vzc2VudGlhbC9qcy9fdHJlZS5qcyIsImxpYi9lc3NlbnRpYWwvanMvX3dpemFyZC5qcyIsImxpYi9lc3NlbnRpYWwvanMvbWFpbi5qcyIsImxpYi9sYXlvdXQvanMvX2FzeW5jLmpzIiwibGliL2xheW91dC9qcy9fYnJlYWtwb2ludHMuanMiLCJsaWIvbGF5b3V0L2pzL19ncmlkYWxpY2lvdXMuanMiLCJsaWIvbGF5b3V0L2pzL19pc290b3BlLmpzIiwibGliL2xheW91dC9qcy9fcGFyYWxsYXguanMiLCJsaWIvbGF5b3V0L2pzL19zY3JvbGxhYmxlLmpzIiwibGliL2xheW91dC9qcy9fc2lkZWJhci1wYy5qcyIsImxpYi9sYXlvdXQvanMvX3NraW5zLmpzIiwibGliL2xheW91dC9qcy9tYWluLmpzIiwibGliL3NpZGViYXIvanMvX2JyZWFrcG9pbnRzLmpzIiwibGliL3NpZGViYXIvanMvX2NvbGxhcHNpYmxlLmpzIiwibGliL3NpZGViYXIvanMvX2Ryb3Bkb3duLmpzIiwibGliL3NpZGViYXIvanMvX29wdGlvbnMuanMiLCJsaWIvc2lkZWJhci9qcy9fc2lkZWJhci1tZW51LmpzIiwibGliL3NpZGViYXIvanMvX3NpZGViYXItdG9nZ2xlLmpzIiwibGliL3NpZGViYXIvanMvbWFpbi5qcyIsImxpYi9zb2NpYWwvanMvX3RpbWVsaW5lLmpzIiwibGliL3NvY2lhbC9qcy9tYWluLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvbWVzc2FnZXMvX2JyZWFrcG9pbnRzLmpzIiwic3JjL2pzL2NvbXBvbmVudHMvbWVzc2FnZXMvX25pY2VzY3JvbGwuanMiLCJzcmMvanMvY29tcG9uZW50cy9tZXNzYWdlcy9tYWluLmpzIiwic3JjL2pzL3BhZ2VzL3VzZXJzLmpzIiwic3JjL2pzL3RoZW1lcy9zb2NpYWwtMS9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9SQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIEVzc2VudGlhbHNcbnJlcXVpcmUoJ2Vzc2VudGlhbC9qcy9tYWluJyk7XG5cbi8vIExheW91dFxucmVxdWlyZSgnbGF5b3V0L2pzL21haW4nKTtcblxuLy8gU2lkZWJhclxucmVxdWlyZSgnc2lkZWJhci9qcy9tYWluJyk7XG5cbi8vIENoYXRcbi8vcmVxdWlyZSgnY2hhdC9qcy9tYWluJyk7XG5cbi8vIFNvY2lhbFxucmVxdWlyZSgnc29jaWFsL2pzL21haW4nKTtcblxuLy8gTWFwc1xuLy93aW5kb3cuaW5pdEdvb2dsZU1hcHMgPSByZXF1aXJlKCdtYXBzL2pzL2dvb2dsZS9tYWluJyk7XG5cbi8vIENPUkVcbnJlcXVpcmUoJy4vbWFpbicpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a0Nhcm91c2VsID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5jYXJvdXNlbCgpO1xuXG4gICAgICAgIHRoaXMuZmluZCgnW2RhdGEtc2xpZGVdJykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a0NvbGxhcHNlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMuYXR0cignaHJlZicpIHx8IHRoaXMuYXR0cigndGFyZ2V0Jyk7XG4gICAgICAgIGlmICghIHRhcmdldCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuY2xpY2soZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQodGFyZ2V0KS5jb2xsYXBzZSh7dG9nZ2xlOiBmYWxzZX0pO1xuXG4gICAgfTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtNb2RhbCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLmF0dHIoJ2hyZWYnKSB8fCB0aGlzLmF0dHIoJ3RhcmdldCcpO1xuICAgICAgICBpZiAoISB0YXJnZXQpIHJldHVybjtcblxuICAgICAgICB0aGlzLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQodGFyZ2V0KS5tb2RhbCh7c2hvdzogZmFsc2V9KTtcblxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBNb2RhbCBjcmVhdG9yIGZvciB0aGUgZGVtbyBwYWdlLlxuICAgICAqIEFsbG93cyB0byBleHBsb3JlIGRpZmZlcmVudCBtb2RhbCB0eXBlcy5cbiAgICAgKiBGb3IgZGVtbyBwdXJwb3NlcyBvbmx5LlxuICAgICAqL1xuXG4gICAgLy8gUHJvY2VzcyB0aGUgbW9kYWwgdmlhIEhhbmRsZWJhcnMgdGVtcGxhdGVzXG4gICAgdmFyIG1vZGFsID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9ICQoXCIjXCIgKyBvcHRpb25zLnRlbXBsYXRlKS5odG1sKCk7XG4gICAgICAgIHZhciB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShzb3VyY2UpO1xuICAgICAgICByZXR1cm4gdGVtcGxhdGUob3B0aW9ucyk7XG4gICAgfTtcblxuICAgIHZhciByYW5kb21JZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLyoqIEByZXR1cm4gU3RyaW5nICovXG4gICAgICAgIHZhciBTNCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAoKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKSB8IDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiAoUzQoKSArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBcIi1cIiArIFM0KCkgKyBTNCgpICsgUzQoKSk7XG4gICAgfTtcblxuICAgICQuZm4udGtNb2RhbERlbW8gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB2YXIgdGFyZ2V0SWQgPSB0aGlzLmF0dHIoJ2hyZWYnKSB8fCB0aGlzLmF0dHIoJ3RhcmdldCcpLFxuICAgICAgICAgICAgdGFyZ2V0ID0gJCh0YXJnZXRJZCk7XG5cbiAgICAgICAgaWYgKCEgdGFyZ2V0SWQpIHtcbiAgICAgICAgICAgIHRhcmdldElkID0gcmFuZG9tSWQoKTtcbiAgICAgICAgICAgIHRoaXMuYXR0cignZGF0YS10YXJnZXQnLCAnIycgKyB0YXJnZXRJZCk7XG4gICAgICAgIH1cblxuICAgICAgICB0YXJnZXRJZC5yZXBsYWNlKCcjJywgJycpO1xuXG4gICAgICAgIGlmICghIHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRhcmdldCA9ICQobW9kYWwoe1xuICAgICAgICAgICAgICAgIGlkOiB0YXJnZXRJZCxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogdGhpcy5kYXRhKCd0ZW1wbGF0ZScpIHx8ICd0ay1tb2RhbC1kZW1vJyxcbiAgICAgICAgICAgICAgICBtb2RhbE9wdGlvbnM6IHRoaXMuZGF0YSgnbW9kYWxPcHRpb25zJykgfHwgJycsXG4gICAgICAgICAgICAgICAgZGlhbG9nT3B0aW9uczogdGhpcy5kYXRhKCdkaWFsb2dPcHRpb25zJykgfHwgJycsXG4gICAgICAgICAgICAgICAgY29udGVudE9wdGlvbnM6IHRoaXMuZGF0YSgnY29udGVudE9wdGlvbnMnKSB8fCAnJ1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgJCgnYm9keScpLmFwcGVuZCh0YXJnZXQpO1xuICAgICAgICAgICAgdGFyZ2V0Lm1vZGFsKHtzaG93OiBmYWxzZX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGFyZ2V0Lm1vZGFsKCd0b2dnbGUnKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwidGstbW9kYWwtZGVtb1wiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnRrTW9kYWxEZW1vKCk7XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkKCdbZGF0YS10b2dnbGU9XCJzd2l0Y2gtY2hlY2tib3hcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAkKHRoaXMpLmJvb3RzdHJhcFN3aXRjaCh7XG4gICAgICAgICAgICBvZmZDb2xvcjogJ2RhbmdlcidcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtDaGVja0FsbCA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB0aGlzLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJCh0aGlzKS5kYXRhKCd0YXJnZXQnKSkuZmluZCgnOmNoZWNrYm94JykucHJvcCgnY2hlY2tlZCcsIHRoaXMuY2hlY2tlZCk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIC8vIENoZWNrIEFsbCBDaGVja2JveGVzXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwiY2hlY2stYWxsXCJdJykudGtDaGVja0FsbCgpO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogQ29uc2VydmUgYXNwZWN0IHJhdGlvIG9mIHRoZSBvcmlnbmFsIHJlZ2lvbi4gVXNlZnVsIHdoZW4gc2hyaW5raW5nL2VubGFyZ2luZ1xuICAgICAqIGltYWdlcyB0byBmaXQgaW50byBhIGNlcnRhaW4gYXJlYS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzcmNXaWR0aCBTb3VyY2UgYXJlYSB3aWR0aFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBzcmNIZWlnaHQgU291cmNlIGFyZWEgaGVpZ2h0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG1heFdpZHRoIEZpdHRhYmxlIGFyZWEgbWF4aW11bSBhdmFpbGFibGUgd2lkdGhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbWF4SGVpZ2h0IEZpdHRhYmxlIGFyZWEgbWF4aW11bSBhdmFpbGFibGUgaGVpZ2h0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSB7IHdpZHRoLCBoZWlndGggfVxuICAgICAqL1xuICAgIHZhciBhc3BlY3RSYXRpb0ZpdCA9IGZ1bmN0aW9uIChzcmNXaWR0aCwgc3JjSGVpZ2h0LCBtYXhXaWR0aCwgbWF4SGVpZ2h0KSB7XG5cbiAgICAgICAgdmFyIHdSYXRpbyA9IG1heFdpZHRoIC8gc3JjV2lkdGgsXG4gICAgICAgICAgICBoUmF0aW8gPSBtYXhIZWlnaHQgLyBzcmNIZWlnaHQsXG4gICAgICAgICAgICB3aWR0aCA9IHNyY1dpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0ID0gc3JjSGVpZ2h0O1xuXG4gICAgICAgIGlmIChzcmNXaWR0aCAvIG1heFdpZHRoIDwgc3JjSGVpZ2h0IC8gbWF4SGVpZ2h0KSB7XG4gICAgICAgICAgICB3aWR0aCA9IG1heFdpZHRoO1xuICAgICAgICAgICAgaGVpZ2h0ID0gc3JjSGVpZ2h0ICogd1JhdGlvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2lkdGggPSBzcmNXaWR0aCAqIGhSYXRpbztcbiAgICAgICAgICAgIGhlaWdodCA9IG1heEhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7d2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodH07XG4gICAgfTtcblxuICAgICQuZm4udGtDb3ZlciA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyKCc6dmlzaWJsZScpLm5vdCgnW2NsYXNzKj1cImhlaWdodFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgIGkgPSB0LmZpbmQoJ2ltZzpmaXJzdCcpO1xuXG4gICAgICAgICAgICBpZiAoaS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkLmxvYWRJbWFnZShpLmF0dHIoJ3NyYycpKS5kb25lKGZ1bmN0aW9uIChpbWcpIHtcbiAgICAgICAgICAgICAgICAgICAgdC5oZWlnaHQoaS5oZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAgICAgICQoJy5vdmVybGF5LWZ1bGwnLCB0KS5pbm5lckhlaWdodChpLmhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcignZG9tQ2hhbmdlZCcpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaSA9IHQuZmluZCgnLmltZzpmaXJzdCcpO1xuICAgICAgICAgICAgICAgIHQuaGVpZ2h0KGkuaGVpZ2h0KCkpO1xuICAgICAgICAgICAgICAgICQoJy5vdmVybGF5LWZ1bGwnLCB0KS5pbm5lckhlaWdodChpLmhlaWdodCgpKTtcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS50cmlnZ2VyKCdkb21DaGFuZ2VkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyKCc6dmlzaWJsZScpLmZpbHRlcignW2NsYXNzKj1cImhlaWdodFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHQgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgIGltZyA9IHQuZmluZCgnaW1nJykgfHwgdC5maW5kKCcuaW1nJyk7XG5cbiAgICAgICAgICAgIGltZy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaSA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgaWYgKGkuZGF0YSgnYXV0b1NpemUnKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpLmlzKCdpbWcnKSkge1xuICAgICAgICAgICAgICAgICAgICAkLmxvYWRJbWFnZShpLmF0dHIoJ3NyYycpKS5kb25lKGZ1bmN0aW9uIChpbWcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkuY3NzKGFzcGVjdFJhdGlvRml0KGkud2lkdGgoKSwgaS5oZWlnaHQoKSwgdC53aWR0aCgpLCB0LmhlaWdodCgpKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgICAgICAgICBpLmNzcyhhc3BlY3RSYXRpb0ZpdChpLndpZHRoKCksIGkuaGVpZ2h0KCksIHQud2lkdGgoKSwgdC5oZWlnaHQoKSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBoZWlnaHQoKSB7XG5cbiAgICAgICAgJCgnLmNvdmVyLm92ZXJsYXknKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykudGtDb3ZlcigpO1xuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgICQoZG9jdW1lbnQpLnJlYWR5KGhlaWdodCk7XG4gICAgJCh3aW5kb3cpLm9uKCdsb2FkJywgaGVpZ2h0KTtcblxuICAgIHZhciB0O1xuICAgICQod2luZG93KS5vbihcImRlYm91bmNlZHJlc2l6ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0KTtcbiAgICAgICAgdCA9IHNldFRpbWVvdXQoaGVpZ2h0LCAyMDApO1xuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrRGF0ZVBpY2tlciA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5kYXRlcGlja2VyICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZGF0ZXBpY2tlcigpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAkKCcuZGF0ZXBpY2tlcicpLnRrRGF0ZVBpY2tlcigpO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgJC5mbi50a0RhdGVyYW5nZXBpY2tlclJlcG9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGUgPSB0aGlzO1xuICAgICAgICB0aGlzLmRhdGVyYW5nZXBpY2tlcihcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByYW5nZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ1RvZGF5JzogWyBtb21lbnQoKSwgbW9tZW50KCkgXSxcbiAgICAgICAgICAgICAgICAgICAgJ1llc3RlcmRheSc6IFsgbW9tZW50KCkuc3VidHJhY3QoJ2RheXMnLCAxKSwgbW9tZW50KCkuc3VidHJhY3QoJ2RheXMnLCAxKSBdLFxuICAgICAgICAgICAgICAgICAgICAnTGFzdCA3IERheXMnOiBbIG1vbWVudCgpLnN1YnRyYWN0KCdkYXlzJywgNiksIG1vbWVudCgpIF0sXG4gICAgICAgICAgICAgICAgICAgICdMYXN0IDMwIERheXMnOiBbIG1vbWVudCgpLnN1YnRyYWN0KCdkYXlzJywgMjkpLCBtb21lbnQoKSBdLFxuICAgICAgICAgICAgICAgICAgICAnVGhpcyBNb250aCc6IFsgbW9tZW50KCkuc3RhcnRPZignbW9udGgnKSwgbW9tZW50KCkuZW5kT2YoJ21vbnRoJykgXSxcbiAgICAgICAgICAgICAgICAgICAgJ0xhc3QgTW9udGgnOiBbIG1vbWVudCgpLnN1YnRyYWN0KCdtb250aCcsIDEpLnN0YXJ0T2YoJ21vbnRoJyksIG1vbWVudCgpLnN1YnRyYWN0KCdtb250aCcsIDEpLmVuZE9mKCdtb250aCcpIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogbW9tZW50KCkuc3VidHJhY3QoJ2RheXMnLCAyOSksXG4gICAgICAgICAgICAgICAgZW5kRGF0ZTogbW9tZW50KClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgICAgIHZhciBvdXRwdXQgPSBzdGFydC5mb3JtYXQoJ01NTU0gRCwgWVlZWScpICsgJyAtICcgKyBlbmQuZm9ybWF0KCdNTU1NIEQsIFlZWVknKTtcbiAgICAgICAgICAgICAgICBlLmZpbmQoJ3NwYW4nKS5odG1sKG91dHB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfTtcblxuICAgICQuZm4udGtEYXRlcmFuZ2VwaWNrZXJSZXNlcnZhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5kYXRlcmFuZ2VwaWNrZXIoe1xuICAgICAgICAgICAgdGltZVBpY2tlcjogdHJ1ZSxcbiAgICAgICAgICAgIHRpbWVQaWNrZXJJbmNyZW1lbnQ6IDMwLFxuICAgICAgICAgICAgZm9ybWF0OiAnTU0vREQvWVlZWSBoOm1tIEEnXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAkKCcuZGF0ZXJhbmdlcGlja2VyLXJlcG9ydCcpLnRrRGF0ZXJhbmdlcGlja2VyUmVwb3J0KCk7XG5cbiAgICAkKCcuZGF0ZXJhbmdlcGlja2VyLXJlc2VydmF0aW9uJykudGtEYXRlcmFuZ2VwaWNrZXJSZXNlcnZhdGlvbigpO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICogQHRvZG86IEFuZ3VsYXIgZGlyZWN0aXZlLlxuICAgICAqL1xuICAgICQuZm4udGtFeHBhbmRhYmxlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5maW5kKCcuZXhwYW5kYWJsZS1jb250ZW50JykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiZXhwYW5kYWJsZS1pbmRpY2F0b3JcIj48aT48L2k+PC9kaXY+Jyk7XG5cbiAgICB9O1xuXG4gICAgJCgnLmV4cGFuZGFibGUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCh0aGlzKS50a0V4cGFuZGFibGUoKTtcbiAgICB9KTtcblxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnLmV4cGFuZGFibGUtaW5kaWNhdG9yJywgZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuZXhwYW5kYWJsZScpLnRvZ2dsZUNsYXNzKCdleHBhbmRhYmxlLW9wZW4nKTtcbiAgICB9KTtcblxuICAgICQoJ2JvZHknKS5vbignY2xpY2snLCAnLmV4cGFuZGFibGUtdHJpZ2dlcjpub3QoLmV4cGFuZGFibGUtb3BlbiknLCBmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdleHBhbmRhYmxlLW9wZW4nKTtcbiAgICB9KTtcblxufShqUXVlcnkpKTsiLCIoZnVuY3Rpb24gKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLy8gaWYgd2UncmUgaW5zaWRlIGFuIGlmcmFtZSwgcmVsb2FkIHdpdGhvdXQgaWZyYW1lXG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbiAhPSB3aW5kb3cucGFyZW50LmxvY2F0aW9uKVxuICAgICAgICB0b3AubG9jYXRpb24uaHJlZiA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqIEB0b2RvOiBBbmd1bGFyIGRpcmVjdGl2ZS5cbiAgICAgKi9cbiAgICAkLmZuLnRrTWluaUNvbG9ycyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5taW5pY29sb3JzICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIHRoaXMubWluaWNvbG9ycyh7XG4gICAgICAgICAgICAgICAgY29udHJvbDogdGhpcy5hdHRyKCdkYXRhLWNvbnRyb2wnKSB8fCAnaHVlJyxcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHRoaXMuYXR0cignZGF0YS1kZWZhdWx0VmFsdWUnKSB8fCAnJyxcbiAgICAgICAgICAgICAgICBpbmxpbmU6IHRoaXMuYXR0cignZGF0YS1pbmxpbmUnKSA9PT0gJ3RydWUnLFxuICAgICAgICAgICAgICAgIGxldHRlckNhc2U6IHRoaXMuYXR0cignZGF0YS1sZXR0ZXJDYXNlJykgfHwgJ2xvd2VyY2FzZScsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogdGhpcy5hdHRyKCdkYXRhLW9wYWNpdHknKSxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5hdHRyKCdkYXRhLXBvc2l0aW9uJykgfHwgJ2JvdHRvbSBsZWZ0JyxcbiAgICAgICAgICAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChoZXgsIG9wYWNpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEgaGV4KSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcGFjaXR5KSBoZXggKz0gJywgJyArIG9wYWNpdHk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGhleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRoZW1lOiAnYm9vdHN0cmFwJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgICQoJy5taW5pY29sb3JzJykuZWFjaChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgJCh0aGlzKS50a01pbmlDb2xvcnMoKTtcblxuICAgIH0pO1xuXG59KShqUXVlcnkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICogQHRvZG86IEFuZ3VsYXIgZGlyZWN0aXZlLlxuICAgICAqL1xuICAgICQuZm4udGtOZXN0YWJsZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5uZXN0YWJsZSAhPSAndW5kZWZpbmVkJykge1xuXG4gICAgICAgICAgICB0aGlzLm5lc3RhYmxlKHtcbiAgICAgICAgICAgICAgICByb290Q2xhc3M6ICduZXN0YWJsZScsXG4gICAgICAgICAgICAgICAgbGlzdE5vZGVOYW1lOiAndWwnLFxuICAgICAgICAgICAgICAgIGxpc3RDbGFzczogJ25lc3RhYmxlLWxpc3QnLFxuICAgICAgICAgICAgICAgIGl0ZW1DbGFzczogJ25lc3RhYmxlLWl0ZW0nLFxuICAgICAgICAgICAgICAgIGRyYWdDbGFzczogJ25lc3RhYmxlLWRyYWcnLFxuICAgICAgICAgICAgICAgIGhhbmRsZUNsYXNzOiAnbmVzdGFibGUtaGFuZGxlJyxcbiAgICAgICAgICAgICAgICBjb2xsYXBzZWRDbGFzczogJ25lc3RhYmxlLWNvbGxhcHNlZCcsXG4gICAgICAgICAgICAgICAgcGxhY2VDbGFzczogJ25lc3RhYmxlLXBsYWNlaG9sZGVyJyxcbiAgICAgICAgICAgICAgICBlbXB0eUNsYXNzOiAnbmVzdGFibGUtZW1wdHknXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgJCgnLm5lc3RhYmxlJykudGtOZXN0YWJsZSgpO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgcmFuZG9tSWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLyoqIEByZXR1cm4gU3RyaW5nICovXG4gICAgICAgIHZhciBTNCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICgoKDErTWF0aC5yYW5kb20oKSkqMHgxMDAwMCl8MCkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIChTNCgpK1M0KCkrXCItXCIrUzQoKStcIi1cIitTNCgpK1wiLVwiK1M0KCkrXCItXCIrUzQoKStTNCgpK1M0KCkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrUGFuZWxDb2xsYXBzZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBib2R5ID0gJCgnLnBhbmVsLWJvZHknLCB0aGlzKSxcbiAgICAgICAgICAgIGlkID0gYm9keS5hdHRyKCdpZCcpIHx8IHJhbmRvbUlkKCksXG4gICAgICAgICAgICBjb2xsYXBzZSA9ICQoJzxkaXYvPicpO1xuXG4gICAgICAgIGNvbGxhcHNlXG4gICAgICAgICAgICAuYXR0cignaWQnLCBpZClcbiAgICAgICAgICAgIC5hZGRDbGFzcygnY29sbGFwc2UnICsgKHRoaXMuZGF0YSgnb3BlbicpID8gJyBpbicgOiAnJykpXG4gICAgICAgICAgICAuYXBwZW5kKGJvZHkuY2xvbmUoKSk7XG5cbiAgICAgICAgYm9keS5yZW1vdmUoKTtcblxuICAgICAgICAkKHRoaXMpLmFwcGVuZChjb2xsYXBzZSk7XG5cbiAgICAgICAgJCgnLnBhbmVsLWNvbGxhcHNlLXRyaWdnZXInLCB0aGlzKVxuICAgICAgICAgICAgLmF0dHIoJ2RhdGEtdG9nZ2xlJywgJ2NvbGxhcHNlJyApXG4gICAgICAgICAgICAuYXR0cignZGF0YS10YXJnZXQnLCAnIycgKyBpZClcbiAgICAgICAgICAgIC5jb2xsYXBzZSh7IHRyaWdnZXI6IGZhbHNlIH0pO1xuXG4gICAgfTtcblxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInBhbmVsLWNvbGxhcHNlXCJdJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLnRrUGFuZWxDb2xsYXBzZSgpO1xuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICAvLyBQcm9ncmVzcyBCYXIgQW5pbWF0aW9uXG4gICAgJCgnLnByb2dyZXNzLWJhcicpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLndpZHRoKCQodGhpcykuYXR0cignYXJpYS12YWx1ZW5vdycpICsgJyUnKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtTZWxlY3QyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLnNlbGVjdDIgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgdmFyIHQgPSB0aGlzLFxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFsbG93Q2xlYXI6IHQuZGF0YSgnYWxsb3dDbGVhcicpXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHQuaXMoJ2J1dHRvbicpKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0LmlzKCdpbnB1dFt0eXBlPVwiYnV0dG9uXCJdJykpIHJldHVybiB0cnVlO1xuXG4gICAgICAgICAgICBpZiAodC5pcygnW2RhdGEtdG9nZ2xlPVwic2VsZWN0Mi10YWdzXCJdJykpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLnRhZ3MgPSB0LmRhdGEoJ3RhZ3MnKS5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0LnNlbGVjdDIob3B0aW9ucyk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtTZWxlY3QyRW5hYmxlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgaWYgKHR5cGVvZiAkLmZuLnNlbGVjdDIgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgdGhpcy5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCgkKHRoaXMpLmRhdGEoJ3RhcmdldCcpKS5zZWxlY3QyKFwiZW5hYmxlXCIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtTZWxlY3QyRGlzYWJsZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5zZWxlY3QyICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIHRoaXMuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQodGhpcy5kYXRhKCd0YXJnZXQnKSkuc2VsZWN0MihcImRpc2FibGVcIik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a1NlbGVjdDJGbGFncyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5zZWxlY3QyICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIC8vIHRlbXBsYXRpbmdcbiAgICAgICAgICAgIHZhciBmb3JtYXQgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoISBzdGF0ZS5pZCkgcmV0dXJuIHN0YXRlLnRleHQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiPGltZyBjbGFzcz0nZmxhZycgc3JjPSdodHRwOi8vc2VsZWN0Mi5naXRodWIuaW8vc2VsZWN0Mi9pbWFnZXMvZmxhZ3MvXCIgKyBzdGF0ZS5pZC50b0xvd2VyQ2FzZSgpICsgXCIucG5nJy8+XCIgKyBzdGF0ZS50ZXh0O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5zZWxlY3QyKHtcbiAgICAgICAgICAgICAgICBmb3JtYXRSZXN1bHQ6IGZvcm1hdCxcbiAgICAgICAgICAgICAgICBmb3JtYXRTZWxlY3Rpb246IGZvcm1hdCxcbiAgICAgICAgICAgICAgICBlc2NhcGVNYXJrdXA6IGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAkKCdbZGF0YS10b2dnbGUqPVwic2VsZWN0MlwiXScpLmVhY2goZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgJCh0aGlzKS50a1NlbGVjdDIoKTtcblxuICAgIH0pO1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwic2VsZWN0Mi1lbmFibGVcIl0nKS50a1NlbGVjdDJFbmFibGUoKTtcblxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInNlbGVjdDItZGlzYWJsZVwiXScpLnRrU2VsZWN0MkRpc2FibGUoKTtcblxuICAgICQoXCIjc2VsZWN0Ml83XCIpLnRrU2VsZWN0MkZsYWdzKCk7XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtTZWxlY3RQaWNrZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mICQuZm4uc2VsZWN0cGlja2VyICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0cGlja2VyKHtcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5kYXRhKCd3aWR0aCcpIHx8ICcxMDAlJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgICQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICQoJy5zZWxlY3RwaWNrZXInKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgJCh0aGlzKS50a1NlbGVjdFBpY2tlcigpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgc2hvd0hvdmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCdbZGF0YS1zaG93LWhvdmVyXScpLmhpZGUoKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICBwYXJlbnQgPSAkKHRoaXMpLmRhdGEoJ3Nob3dIb3ZlcicpO1xuXG4gICAgICAgICAgICBzZWxmLmNsb3Nlc3QocGFyZW50KS5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIHNlbGYuc2hvdygpO1xuICAgICAgICAgICAgfSkub24oJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzaG93SG92ZXIoKTtcblxuICAgIHdpbmRvdy5zaG93SG92ZXIgPSBzaG93SG92ZXI7XG5cbn0pKGpRdWVyeSk7IiwibW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBza2luID0gJC5jb29raWUoJ3NraW4nKTtcblxuICAgIGlmICh0eXBlb2Ygc2tpbiA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBza2luID0gJ2RlZmF1bHQnO1xuICAgIH1cbiAgICByZXR1cm4gc2tpbjtcbn0pOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIGJhcnMgPSBmdW5jdGlvbihlbCl7XG4gICAgICAgICQoJy5zbGlkZXItaGFuZGxlJywgZWwpLmh0bWwoJzxpIGNsYXNzPVwiZmEgZmEtYmFycyBmYS1yb3RhdGUtOTBcIj48L2k+Jyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtTbGlkZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mICQuZm4uc2xpZGVyICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2xpZGVyKCk7XG5cbiAgICAgICAgICAgIGJhcnModGhpcyk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtTbGlkZXJGb3JtYXR0ZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mICQuZm4uc2xpZGVyICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2xpZGVyKHtcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ0N1cnJlbnQgdmFsdWU6ICcgKyB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYmFycyh0aGlzKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a1NsaWRlclVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5zbGlkZXIgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgdGhpcy5vbihcInNsaWRlXCIsIGZ1bmN0aW9uIChzbGlkZUV2dCkge1xuICAgICAgICAgICAgICAgICQodGhpcy5hdHRyKCdkYXRhLW9uLXNsaWRlJykpLnRleHQoc2xpZGVFdnQudmFsdWUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGJhcnModGhpcyk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgICQoJ1tkYXRhLXNsaWRlcj1cImRlZmF1bHRcIl0nKS50a1NsaWRlcigpO1xuXG4gICAgJCgnW2RhdGEtc2xpZGVyPVwiZm9ybWF0dGVyXCJdJykudGtTbGlkZXJGb3JtYXR0ZXIoKTtcblxuICAgICQoJ1tkYXRhLW9uLXNsaWRlXScpLnRrU2xpZGVyVXBkYXRlKCk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrU3VtbWVybm90ZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5zdW1tZXJub3RlICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc3VtbWVybm90ZSh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAzMDBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICAkKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAkKCcuc3VtbWVybm90ZScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAkKHRoaXMpLnRrU3VtbWVybm90ZSgpO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xuXG59KShqUXVlcnkpO1xuIiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrRGF0YVRhYmxlID0gZnVuY3Rpb24oKXtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5kYXRhVGFibGUgIT0gJ3VuZGVmaW5lZCcpIHtcblxuICAgICAgICAgICAgdGhpcy5kYXRhVGFibGUoKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwiZGF0YS10YWJsZVwiXScpLnRrRGF0YVRhYmxlKCk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgc2tpbiA9IHJlcXVpcmUoJy4vX3NraW4nKSgpO1xuXG4gICAgJCgnLnRhYmJhYmxlIC5uYXYtdGFicycpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHRhYnMgPSAkKHRoaXMpLm5pY2VTY3JvbGwoe1xuICAgICAgICAgICAgY3Vyc29yYm9yZGVyOiAwLFxuICAgICAgICAgICAgY3Vyc29yY29sb3I6IGNvbmZpZy5za2luc1sgc2tpbiBdWyAncHJpbWFyeS1jb2xvcicgXSxcbiAgICAgICAgICAgIGhvcml6cmFpbGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICBvbmVheGlzbW91c2Vtb2RlOiB0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBfc3VwZXIgPSB0YWJzLmdldENvbnRlbnRTaXplO1xuICAgICAgICB0YWJzLmdldENvbnRlbnRTaXplID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgcGFnZSA9IF9zdXBlci5jYWxsKHRhYnMpO1xuICAgICAgICAgICAgcGFnZS5oID0gdGFicy53aW4uaGVpZ2h0KCk7XG4gICAgICAgICAgICByZXR1cm4gcGFnZTtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgICQoJ1tkYXRhLXNjcm9sbGFibGVdJykuZ2V0TmljZVNjcm9sbCgpLnJlc2l6ZSgpO1xuXG4gICAgJCgnLnRhYmJhYmxlIC5uYXYtdGFicyBhJykub24oJ3Nob3duLmJzLnRhYicsIGZ1bmN0aW9uKGUpe1xuICAgICAgICB2YXIgdGFiID0gJCh0aGlzKS5jbG9zZXN0KCcudGFiYmFibGUnKTtcbiAgICAgICAgdmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxuICAgICAgICAgICAgdGFyZ2V0UGFuZSA9IHRhcmdldC5hdHRyKCdocmVmJykgfHwgdGFyZ2V0LmRhdGEoJ3RhcmdldCcpO1xuXG4gICAgICAgIC8vIHJlZnJlc2ggdGFicyB3aXRoIGhvcml6b250YWwgc2Nyb2xsXG4gICAgICAgIHRhYi5maW5kKCcubmF2LXRhYnMnKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XG5cbiAgICAgICAgLy8gcmVmcmVzaCBbZGF0YS1zY3JvbGxhYmxlXSB3aXRoaW4gdGhlIGFjdGl2YXRlZCB0YWIgcGFuZVxuICAgICAgICAkKHRhcmdldFBhbmUpLmZpbmQoJ1tkYXRhLXNjcm9sbGFibGVdJykuZ2V0TmljZVNjcm9sbCgpLnJlc2l6ZSgpO1xuICAgIH0pO1xuXG59KGpRdWVyeSkpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLy8gVG9vbHRpcFxuICAgICQoXCJib2R5XCIpLnRvb2x0aXAoe3NlbGVjdG9yOiAnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScsIGNvbnRhaW5lcjogXCJib2R5XCJ9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtUb3VjaFNwaW4gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mICQuZm4uVG91Y2hTcGluICE9ICd1bmRlZmluZWQnKSB7XG5cbiAgICAgICAgICAgIHRoaXMuVG91Y2hTcGluKCk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvdWNoLXNwaW5cIl0nKS50a1RvdWNoU3BpbigpO1xuXG59KGpRdWVyeSkpOyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIHRyZWVfZ2x5cGhfb3B0aW9ucyA9IHtcbiAgICAgICAgbWFwOiB7XG4gICAgICAgICAgICBjaGVja2JveDogXCJmYSBmYS1zcXVhcmUtb1wiLFxuICAgICAgICAgICAgY2hlY2tib3hTZWxlY3RlZDogXCJmYSBmYS1jaGVjay1zcXVhcmVcIixcbiAgICAgICAgICAgIGNoZWNrYm94VW5rbm93bjogXCJmYSBmYS1jaGVjay1zcXVhcmUgZmEtbXV0ZWRcIixcbiAgICAgICAgICAgIGVycm9yOiBcImZhIGZhLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlXCIsXG4gICAgICAgICAgICBleHBhbmRlckNsb3NlZDogXCJmYSBmYS1jYXJldC1yaWdodFwiLFxuICAgICAgICAgICAgZXhwYW5kZXJMYXp5OiBcImZhIGZhLWFuZ2xlLXJpZ2h0XCIsXG4gICAgICAgICAgICBleHBhbmRlck9wZW46IFwiZmEgZmEtY2FyZXQtZG93blwiLFxuICAgICAgICAgICAgZG9jOiBcImZhIGZhLWZpbGUtb1wiLFxuICAgICAgICAgICAgbm9FeHBhbmRlcjogXCJcIixcbiAgICAgICAgICAgIGRvY09wZW46IFwiZmEgZmEtZmlsZVwiLFxuICAgICAgICAgICAgbG9hZGluZzogXCJmYSBmYS1yZWZyZXNoIGZhLXNwaW5cIixcbiAgICAgICAgICAgIGZvbGRlcjogXCJmYSBmYS1mb2xkZXJcIixcbiAgICAgICAgICAgIGZvbGRlck9wZW46IFwiZmEgZmEtZm9sZGVyLW9wZW5cIlxuICAgICAgICB9XG4gICAgfSxcbiAgICB0cmVlX2RuZF9vcHRpb25zID0ge1xuICAgICAgICBhdXRvRXhwYW5kTVM6IDQwMCxcbiAgICAgICAgICAgIGZvY3VzT25DbGljazogdHJ1ZSxcbiAgICAgICAgICAgIHByZXZlbnRWb2lkTW92ZXM6IHRydWUsIC8vIFByZXZlbnQgZHJvcHBpbmcgbm9kZXMgJ2JlZm9yZSBzZWxmJywgZXRjLlxuICAgICAgICAgICAgcHJldmVudFJlY3Vyc2l2ZU1vdmVzOiB0cnVlLCAvLyBQcmV2ZW50IGRyb3BwaW5nIG5vZGVzIG9uIG93biBkZXNjZW5kYW50c1xuICAgICAgICAgICAgZHJhZ1N0YXJ0OiBmdW5jdGlvbihub2RlLCBkYXRhKSB7XG4gICAgICAgICAgICAvKiogVGhpcyBmdW5jdGlvbiBNVVNUIGJlIGRlZmluZWQgdG8gZW5hYmxlIGRyYWdnaW5nIGZvciB0aGUgdHJlZS5cbiAgICAgICAgICAgICAqICBSZXR1cm4gZmFsc2UgdG8gY2FuY2VsIGRyYWdnaW5nIG9mIG5vZGUuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBkcmFnRW50ZXI6IGZ1bmN0aW9uKG5vZGUsIGRhdGEpIHtcbiAgICAgICAgICAgIC8qKiBkYXRhLm90aGVyTm9kZSBtYXkgYmUgbnVsbCBmb3Igbm9uLWZhbmN5dHJlZSBkcm9wcGFibGVzLlxuICAgICAgICAgICAgICogIFJldHVybiBmYWxzZSB0byBkaXNhbGxvdyBkcm9wcGluZyBvbiBub2RlLiBJbiB0aGlzIGNhc2VcbiAgICAgICAgICAgICAqICBkcmFnT3ZlciBhbmQgZHJhZ0xlYXZlIGFyZSBub3QgY2FsbGVkLlxuICAgICAgICAgICAgICogIFJldHVybiAnb3ZlcicsICdiZWZvcmUsIG9yICdhZnRlcicgdG8gZm9yY2UgYSBoaXRNb2RlLlxuICAgICAgICAgICAgICogIFJldHVybiBbJ2JlZm9yZScsICdhZnRlciddIHRvIHJlc3RyaWN0IGF2YWlsYWJsZSBoaXRNb2Rlcy5cbiAgICAgICAgICAgICAqICBBbnkgb3RoZXIgcmV0dXJuIHZhbHVlIHdpbGwgY2FsYyB0aGUgaGl0TW9kZSBmcm9tIHRoZSBjdXJzb3IgcG9zaXRpb24uXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIC8vIFByZXZlbnQgZHJvcHBpbmcgYSBwYXJlbnQgYmVsb3cgYW5vdGhlciBwYXJlbnQgKG9ubHkgc29ydFxuICAgICAgICAgICAgLy8gbm9kZXMgdW5kZXIgdGhlIHNhbWUgcGFyZW50KVxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIGlmKG5vZGUucGFyZW50ICE9PSBkYXRhLm90aGVyTm9kZS5wYXJlbnQpe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERvbid0IGFsbG93IGRyb3BwaW5nICpvdmVyKiBhIG5vZGUgKHdvdWxkIGNyZWF0ZSBhIGNoaWxkKVxuICAgICAgICAgICAgcmV0dXJuIFtcImJlZm9yZVwiLCBcImFmdGVyXCJdO1xuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBkcmFnRHJvcDogZnVuY3Rpb24obm9kZSwgZGF0YSkge1xuICAgICAgICAgICAgLyoqIFRoaXMgZnVuY3Rpb24gTVVTVCBiZSBkZWZpbmVkIHRvIGVuYWJsZSBkcm9wcGluZyBvZiBpdGVtcyBvblxuICAgICAgICAgICAgICogIHRoZSB0cmVlLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBkYXRhLm90aGVyTm9kZS5tb3ZlVG8obm9kZSwgZGF0YS5oaXRNb2RlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrRmFuY3lUcmVlID0gZnVuY3Rpb24oKXtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICh0eXBlb2YgJC5mbi5mYW5jeXRyZWUgPT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblxuICAgICAgICB2YXIgZXh0ZW5zaW9ucyA9IFsgXCJnbHlwaFwiIF07XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5hdHRyKCdkYXRhLXRyZWUtZG5kJykgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGV4dGVuc2lvbnMucHVzaCggXCJkbmRcIiApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZmFuY3l0cmVlKHtcbiAgICAgICAgICAgIGV4dGVuc2lvbnM6IGV4dGVuc2lvbnMsXG4gICAgICAgICAgICBnbHlwaDogdHJlZV9nbHlwaF9vcHRpb25zLFxuICAgICAgICAgICAgZG5kOiB0cmVlX2RuZF9vcHRpb25zLFxuICAgICAgICAgICAgY2xpY2tGb2xkZXJNb2RlOiAzLFxuICAgICAgICAgICAgY2hlY2tib3g6IHR5cGVvZiB0aGlzLmF0dHIoJ2RhdGEtdHJlZS1jaGVja2JveCcpICE9PSBcInVuZGVmaW5lZFwiIHx8IGZhbHNlLFxuICAgICAgICAgICAgc2VsZWN0TW9kZTogdHlwZW9mIHRoaXMuYXR0cignZGF0YS10cmVlLXNlbGVjdCcpICE9PSBcInVuZGVmaW5lZFwiID8gcGFyc2VJbnQodGhpcy5hdHRyKCdkYXRhLXRyZWUtc2VsZWN0JykpIDogMlxuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICAvLyB1c2luZyBkZWZhdWx0IG9wdGlvbnNcbiAgICAkKCdbZGF0YS10b2dnbGU9XCJ0cmVlXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykudGtGYW5jeVRyZWUoKTtcbiAgICB9KTtcblxufShqUXVlcnkpKTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtXaXphcmQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICBpZiAodHlwZW9mICQuZm4uc2xpY2sgPT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcblxuICAgICAgICB2YXIgdCA9IHRoaXMsXG4gICAgICAgICAgICBjb250YWluZXIgPSB0LmNsb3Nlc3QoJy53aXphcmQtY29udGFpbmVyJyk7XG5cbiAgICAgICAgdC5zbGljayh7XG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICBydGw6IHRoaXMuZGF0YSgncnRsJyksXG4gICAgICAgICAgICBzbGlkZTogJ2ZpZWxkc2V0JyxcbiAgICAgICAgICAgIG9uQWZ0ZXJDaGFuZ2U6IGZ1bmN0aW9uICh3aXosIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcignYWZ0ZXIud2l6YXJkLnN0ZXAnLCB7XG4gICAgICAgICAgICAgICAgICAgIHdpejogd2l6LFxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogdFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb250YWluZXIuZmluZCgnLndpei1uZXh0JykuY2xpY2soZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHQuc2xpY2tOZXh0KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnRhaW5lci5maW5kKCcud2l6LXByZXYnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdC5zbGlja1ByZXYoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29udGFpbmVyLmZpbmQoJy53aXotc3RlcCcpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0LnNsaWNrR29UbygkKHRoaXMpLmRhdGEoJ3RhcmdldCcpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChkb2N1bWVudCkub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0LmNsb3Nlc3QoJy5tb2RhbC1ib2R5JykuaGlkZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignc2hvd24uYnMubW9kYWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0LmNsb3Nlc3QoJy5tb2RhbC1ib2R5Jykuc2hvdygpO1xuICAgICAgICAgICAgdC5zbGlja1NldE9wdGlvbignZG90cycsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwid2l6YXJkXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykudGtXaXphcmQoKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEJ5IGxldmVyYWdpbmcgZXZlbnRzIHdlIGNhbiBob29rIGludG8gdGhlIHdpemFyZCB0byBhZGQgZnVuY3Rpb25hbGl0eS5cbiAgICAgKiBUaGlzIGV4YW1wbGUgdXBkYXRlcyB0aGUgcHJvZ3Jlc3MgYmFyIGFmdGVyIHRoZSB3aXphcmQgc3RlcCBjaGFuZ2VzLlxuICAgICAqL1xuICAgICQoZG9jdW1lbnQpLm9uKCdhZnRlci53aXphcmQuc3RlcCcsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuXG4gICAgICAgIGlmIChkYXRhLmNvbnRhaW5lci5pcygnI3dpemFyZC1kZW1vLTEnKSkge1xuXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZGF0YS5jb250YWluZXIuZmluZCgnLndpei1wcm9ncmVzcyBsaTplcSgnICsgZGF0YS50YXJnZXQgKyAnKScpO1xuXG4gICAgICAgICAgICBkYXRhLmNvbnRhaW5lci5maW5kKCcud2l6LXByb2dyZXNzIGxpJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZSBjb21wbGV0ZScpO1xuXG4gICAgICAgICAgICB0YXJnZXQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICB0YXJnZXQucHJldkFsbCgpLmFkZENsYXNzKCdjb21wbGV0ZScpO1xuXG4gICAgICAgIH1cblxuICAgIH0pO1xuXG59KGpRdWVyeSkpOyIsInJlcXVpcmUoJy4vX3RhYnMnKTtcbnJlcXVpcmUoJy4vX3RyZWUnKTtcbnJlcXVpcmUoJy4vX3Nob3ctaG92ZXInKTtcbnJlcXVpcmUoJy4vX2RhdGVyYW5nZXBpY2tlcicpO1xucmVxdWlyZSgnLi9fZXhwYW5kYWJsZScpO1xucmVxdWlyZSgnLi9fbmVzdGFibGUnKTtcbnJlcXVpcmUoJy4vX2NvdmVyJyk7XG5yZXF1aXJlKCcuL190b29sdGlwJyk7XG5yZXF1aXJlKCcuL190YWJsZXMnKTtcbnJlcXVpcmUoJy4vX2NoZWNrLWFsbCcpO1xucmVxdWlyZSgnLi9fcHJvZ3Jlc3MtYmFycycpO1xucmVxdWlyZSgnLi9faWZyYW1lJyk7XG5yZXF1aXJlKCcuL19ib290c3RyYXAtY29sbGFwc2UnKTtcbnJlcXVpcmUoJy4vX2Jvb3RzdHJhcC1jYXJvdXNlbCcpO1xucmVxdWlyZSgnLi9fYm9vdHN0cmFwLW1vZGFsJyk7XG5yZXF1aXJlKCcuL19wYW5lbC1jb2xsYXBzZScpO1xuXG4vLyBGb3Jtc1xucmVxdWlyZSgnLi9fdG91Y2hzcGluJyk7XG5yZXF1aXJlKCcuL19zZWxlY3QyJyk7XG5yZXF1aXJlKCcuL19zbGlkZXInKTtcbnJlcXVpcmUoJy4vX3NlbGVjdHBpY2tlcicpO1xucmVxdWlyZSgnLi9fZGF0ZXBpY2tlcicpO1xucmVxdWlyZSgnLi9fbWluaWNvbG9ycycpO1xucmVxdWlyZSgnLi9fYm9vdHN0cmFwLXN3aXRjaCcpO1xucmVxdWlyZSgnLi9fd2l6YXJkJyk7XG5yZXF1aXJlKCcuL19zdW1tZXJub3RlJyk7IiwiZnVuY3Rpb24gY29udGVudExvYWRlZCh3aW4sIGZuKSB7XG5cbiAgICB2YXIgZG9uZSA9IGZhbHNlLCB0b3AgPSB0cnVlLFxuXG4gICAgICAgIGRvYyA9IHdpbi5kb2N1bWVudCxcbiAgICAgICAgcm9vdCA9IGRvYy5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgIG1vZGVybiA9IGRvYy5hZGRFdmVudExpc3RlbmVyLFxuXG4gICAgICAgIGFkZCA9IG1vZGVybiA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdhdHRhY2hFdmVudCcsXG4gICAgICAgIHJlbSA9IG1vZGVybiA/ICdyZW1vdmVFdmVudExpc3RlbmVyJyA6ICdkZXRhY2hFdmVudCcsXG4gICAgICAgIHByZSA9IG1vZGVybiA/ICcnIDogJ29uJyxcblxuICAgICAgICBpbml0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLnR5cGUgPT0gJ3JlYWR5c3RhdGVjaGFuZ2UnICYmIGRvYy5yZWFkeVN0YXRlICE9ICdjb21wbGV0ZScpIHJldHVybjtcbiAgICAgICAgICAgIChlLnR5cGUgPT0gJ2xvYWQnID8gd2luIDogZG9jKVsgcmVtIF0ocHJlICsgZS50eXBlLCBpbml0LCBmYWxzZSk7XG4gICAgICAgICAgICBpZiAoISBkb25lICYmIChkb25lID0gdHJ1ZSkpIGZuLmNhbGwod2luLCBlLnR5cGUgfHwgZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcG9sbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcm9vdC5kb1Njcm9sbCgnbGVmdCcpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQocG9sbCwgNTApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluaXQoJ3BvbGwnKTtcbiAgICAgICAgfTtcblxuICAgIGlmIChkb2MucmVhZHlTdGF0ZSA9PSAnY29tcGxldGUnKSBmbi5jYWxsKHdpbiwgJ2xhenknKTtcbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKCEgbW9kZXJuICYmIHJvb3QuZG9TY3JvbGwpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdG9wID0gISB3aW4uZnJhbWVFbGVtZW50O1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRvcCkgcG9sbCgpO1xuICAgICAgICB9XG4gICAgICAgIGRvY1sgYWRkIF0ocHJlICsgJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0LCBmYWxzZSk7XG4gICAgICAgIGRvY1sgYWRkIF0ocHJlICsgJ3JlYWR5c3RhdGVjaGFuZ2UnLCBpbml0LCBmYWxzZSk7XG4gICAgICAgIHdpblsgYWRkIF0ocHJlICsgJ2xvYWQnLCBpbml0LCBmYWxzZSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVybHMsIGNhbGxiYWNrKSB7XG5cbiAgICB2YXIgYXN5bmNMb2FkZXIgPSBmdW5jdGlvbiAodXJscywgY2FsbGJhY2spIHtcblxuICAgICAgICB1cmxzLmZvcmVhY2goZnVuY3Rpb24gKGksIGZpbGUpIHtcbiAgICAgICAgICAgIGxvYWRDc3MoZmlsZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNoZWNraW5nIGZvciBhIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gY2FsbGluZyB0aGUgY2FsbGJhY2tcbiAgICAgICAgICAgIGNvbnRlbnRMb2FkZWQod2luZG93LCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGxvYWRDc3MgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgIHZhciBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0JztcbiAgICAgICAgbGluay5ocmVmID0gdXJsO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWyAwIF0uYXBwZW5kQ2hpbGQobGluayk7XG4gICAgfTtcblxuICAgIC8vIHNpbXBsZSBmb3JlYWNoIGltcGxlbWVudGF0aW9uXG4gICAgQXJyYXkucHJvdG90eXBlLmZvcmVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArKykge1xuICAgICAgICAgICAgY2FsbGJhY2soaSwgdGhpc1sgaSBdKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBhc3luY0xvYWRlcih1cmxzLCBjYWxsYmFjayk7XG5cbn07IiwiKGZ1bmN0aW9uICgkKSB7XG5cbiAgICAkKHdpbmRvdykuc2V0QnJlYWtwb2ludHMoe1xuICAgICAgICBkaXN0aW5jdDogdHJ1ZSxcbiAgICAgICAgYnJlYWtwb2ludHM6IFsgMzIwLCA0ODAsIDc2OCwgMTAyNCBdXG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgKi9cbiAgICAkLmZuLnRrR3JpZGFsaWNpb3VzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5ncmlkYWxpY2lvdXMoe1xuICAgICAgICAgICAgZ3V0dGVyOiB0aGlzLmRhdGEoJ2d1dHRlcicpIHx8IDE1LFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMuZGF0YSgnd2lkdGgnKSB8fCAzNzAsXG4gICAgICAgICAgICBzZWxlY3RvcjogJz4gZGl2JyxcbiAgICAgICAgICAgIGFuaW1hdGlvbk9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkKHdpbmRvdykudHJpZ2dlcigncmVzaXplJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICAkKCdbZGF0YS10b2dnbGUqPVwiZ3JpZGFsaWNpb3VzXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykudGtHcmlkYWxpY2lvdXMoKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtJc290b3BlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5pc290b3BlKHtcbiAgICAgICAgICAgIGxheW91dE1vZGU6IHRoaXMuZGF0YSgnbGF5b3V0TW9kZScpIHx8IFwicGFja2VyeVwiLFxuICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLml0ZW0nXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qXG4gICAgICAgIHRoaXMuaXNvdG9wZSgnb24nLCAnbGF5b3V0Q29tcGxldGUnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoJ3Jlc2l6ZScpO1xuICAgICAgICB9KTtcbiAgICAgICAgKi9cblxuICAgIH07XG5cbiAgICAkKGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCdbZGF0YS10b2dnbGU9XCJpc290b3BlXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS50a0lzb3RvcGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LCAzMDApO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdkb21DaGFuZ2VkJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cImlzb3RvcGVcIl0nKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5pc290b3BlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcblxufSkoalF1ZXJ5KTtcbiIsIi8vIGh0dHA6Ly9wYXVsaXJpc2guY29tLzIwMTEvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1hbmltYXRpbmcvXG4vLyBodHRwOi8vbXkub3BlcmEuY29tL2Vtb2xsZXIvYmxvZy8yMDExLzEyLzIwL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtZXItYW5pbWF0aW5nXG4vLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcG9seWZpbGwgYnkgRXJpayBNw7ZsbGVyLiBmaXhlcyBmcm9tIFBhdWwgSXJpc2ggYW5kIFRpbm8gWmlqZGVsXG4vLyBNSVQgbGljZW5zZVxuKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbGFzdFRpbWUgPSAwO1xuICAgIHZhciB2ZW5kb3JzID0gWyAnbXMnLCAnbW96JywgJ3dlYmtpdCcsICdvJyBdO1xuICAgIGZvciAodmFyIHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgISB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyArKyB4KSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbIHZlbmRvcnNbIHggXSArICdSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnIF07XG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvd1sgdmVuZG9yc1sgeCBdICsgJ0NhbmNlbEFuaW1hdGlvbkZyYW1lJyBdIHx8IHdpbmRvd1sgdmVuZG9yc1sgeCBdICsgJ0NhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZScgXTtcbiAgICB9XG5cbiAgICBpZiAoISB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBlbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgY3VyclRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHZhciB0aW1lVG9DYWxsID0gTWF0aC5tYXgoMCwgMTYgLSAoY3VyclRpbWUgLSBsYXN0VGltZSkpO1xuICAgICAgICAgICAgdmFyIGlkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhjdXJyVGltZSArIHRpbWVUb0NhbGwpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGltZVRvQ2FsbCk7XG4gICAgICAgICAgICBsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcbiAgICAgICAgICAgIHJldHVybiBpZDtcbiAgICAgICAgfTtcblxuICAgIGlmICghIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSlcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgICAgICB9O1xufSgpKTtcblxuKGZ1bmN0aW9uICgkLCB3aW5kb3cpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQuZm4udGtQYXJhbGxheCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoTW9kZXJuaXpyLnRvdWNoKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGdldE9wdGlvbnMgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGVlZDogZS5kYXRhKCdzcGVlZCcpIHx8IDQsXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlOiBlLmRhdGEoJ3NwZWVkJykgfHwgdHJ1ZSxcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVXaGVuOiBlLmRhdGEoJ3RyYW5zbGF0ZVdoZW4nKSB8fCAnaW5WaWV3cG9ydFRvcCcsXG4gICAgICAgICAgICAgICAgYXV0b09mZnNldDogZS5kYXRhKCdhdXRvT2Zmc2V0JyksXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiBlLmRhdGEoJ29mZnNldCcpIHx8IDAsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogZS5kYXRhKCdvcGFjaXR5JylcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyICR3aW5kb3cgPSAkKHdpbmRvdyksXG4gICAgICAgICAgICAkd2luZG93Q29udGVudCA9ICQoJy5zdC1jb250ZW50LWlubmVyJyksXG4gICAgICAgICAgICAkZWxlbWVudCA9IHRoaXM7XG5cbiAgICAgICAgdmFyIHRpY2tpbmcgPSBmYWxzZSxcbiAgICAgICAgICAgICRzY3JvbGxhYmxlID0gbnVsbCxcbiAgICAgICAgICAgIGxhc3RTY3JvbGxUb3AgPSAwO1xuXG4gICAgICAgIHZhciBpc1NhZmFyaSA9IC9TYWZhcmkvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgL0FwcGxlIENvbXB1dGVyLy50ZXN0KG5hdmlnYXRvci52ZW5kb3IpO1xuXG4gICAgICAgIHZhciByZXF1ZXN0VGljayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoISB0aWNraW5nKSB7XG4gICAgICAgICAgICAgICAgJHNjcm9sbGFibGUgPSAkKGUuY3VycmVudFRhcmdldCk7XG4gICAgICAgICAgICAgICAgLy8gYWx0aG91Z2ggU2FmYXJpIGhhcyBzdXBwb3J0IGZvciByZXF1ZXN0QW5pbWF0aW9uRnJhbWUsXG4gICAgICAgICAgICAgICAgLy8gdGhlIGFuaW1hdGlvbiBpbiB0aGlzIGNhc2UgaXMgY2hvcHB5IHNvIHdlJ2xsIGp1c3QgcnVuIGl0IGRpcmVjdGx5XG4gICAgICAgICAgICAgICAgaWYgKGlzU2FmYXJpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGUoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICAgICAgICAgICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gVHJhbnNsYXRlcyBhbiBlbGVtZW50IG9uIHRoZSBZIGF4aXMgdXNpbmcgdHJhbnNsYXRlM2QgdG8gZW5zdXJlXG4gICAgICAgIC8vIHRoYXQgdGhlIHJlbmRlcmluZyBpcyBkb25lIGJ5IHRoZSBHUFVcbiAgICAgICAgdmFyIHRyYW5zbGF0ZVkgPSBmdW5jdGlvbiAoZWxtLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZSA9ICd0cmFuc2xhdGUzZCgwcHgsJyArIHZhbHVlICsgJ3B4LCAwcHgpJztcbiAgICAgICAgICAgIGVsbS5zdHlsZVsgJy13ZWJraXQtdHJhbnNmb3JtJyBdID0gdHJhbnNsYXRlO1xuICAgICAgICAgICAgZWxtLnN0eWxlWyAnLW1vei10cmFuc2Zvcm0nIF0gPSB0cmFuc2xhdGU7XG4gICAgICAgICAgICBlbG0uc3R5bGVbICctbXMtdHJhbnNmb3JtJyBdID0gdHJhbnNsYXRlO1xuICAgICAgICAgICAgZWxtLnN0eWxlWyAnLW8tdHJhbnNmb3JtJyBdID0gdHJhbnNsYXRlO1xuICAgICAgICAgICAgZWxtLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zbGF0ZTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgbGF5ZXJzID0gJGVsZW1lbnQuZmluZCgnLnBhcmFsbGF4LWxheWVyJyk7XG5cbiAgICAgICAgdmFyIGluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBsYXllcnMuZWFjaChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgbGF5ZXIgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICBsYXllck9wdGlvbnMgPSBnZXRPcHRpb25zKGxheWVyKSxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gJGVsZW1lbnQub3V0ZXJIZWlnaHQodHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAobGF5ZXJPcHRpb25zLnRyYW5zbGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGF5ZXIuaXMoJ2ltZycpICYmIGxheWVyT3B0aW9ucy5hdXRvT2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkLmxvYWRJbWFnZShsYXllci5hdHRyKCdzcmMnKSkuZG9uZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGF5ZXJIZWlnaHQgPSBsYXllci5oZWlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gbGF5ZXJIZWlnaHQgKiAwLjMzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgob2Zmc2V0ICsgaGVpZ2h0KSA+IGxheWVySGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IGxheWVySGVpZ2h0IC0gaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQgPSBvZmZzZXQgKiAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuYXR0cignZGF0YS1vZmZzZXQnLCBvZmZzZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVkobGF5ZXIuZ2V0KDApLCBvZmZzZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIGluaXQoKTtcbiAgICAgICAgJCh3aW5kb3cpLm9uKFwiZGVib3VuY2VkcmVzaXplXCIsIGluaXQpO1xuXG4gICAgICAgIHZhciBhbmltYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNjcm9sbFRvcCA9IHBhcnNlSW50KCRzY3JvbGxhYmxlLnNjcm9sbFRvcCgpKTtcbiAgICAgICAgICAgIHZhciBzY3JvbGxhYmxlVG9wID0gJHNjcm9sbGFibGUuaXMoJHdpbmRvdykgPyAwIDogJHNjcm9sbGFibGUub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgdmFyIGhlaWdodCA9ICRlbGVtZW50Lm91dGVySGVpZ2h0KHRydWUpO1xuICAgICAgICAgICAgdmFyIGJvZHlQYWRkaW5nID0ge1xuICAgICAgICAgICAgICAgIHRvcDogcGFyc2VJbnQoJChkb2N1bWVudC5ib2R5KS5jc3MoJ3BhZGRpbmctdG9wJykpLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogcGFyc2VJbnQoJChkb2N1bWVudC5ib2R5KS5jc3MoJ3BhZGRpbmctYm90dG9tJykpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHdpbmRvd0hlaWdodCA9ICRzY3JvbGxhYmxlLmlubmVySGVpZ2h0KCk7XG4gICAgICAgICAgICB2YXIgd2luZG93Qm90dG9tID0gc2Nyb2xsVG9wICsgd2luZG93SGVpZ2h0IC0gKGJvZHlQYWRkaW5nLmJvdHRvbSArIGJvZHlQYWRkaW5nLnRvcCk7XG4gICAgICAgICAgICB2YXIgdG9wID0gJGVsZW1lbnQub2Zmc2V0KCkudG9wIC0gc2Nyb2xsYWJsZVRvcCAtIGJvZHlQYWRkaW5nLnRvcDtcbiAgICAgICAgICAgIHZhciBib3R0b20gPSB0b3AgKyBoZWlnaHQ7XG4gICAgICAgICAgICB2YXIgdG9wQWJzID0gTWF0aC5hYnModG9wKTtcbiAgICAgICAgICAgIHZhciBwb3MgPSB0b3AgLyB3aW5kb3dIZWlnaHQgKiAxMDA7XG4gICAgICAgICAgICB2YXIgb3BhY2l0eUtleSA9IGhlaWdodCAqIDAuNTtcbiAgICAgICAgICAgIHZhciB3aGVuID0ge307XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBPTkxZIHdoZW4gdGhlIHNjcm9sbGFibGUgZWxlbWVudCBJUyBOT1QgdGhlIHdpbmRvd1xuICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgIC8vIHdoZW4gdGhlIGVsZW1lbnQgaXMgYW55d2hlcmUgaW4gdmlld3BvcnRcbiAgICAgICAgICAgIHdoZW4uaW5WaWV3cG9ydCA9IChib3R0b20gPiAwKSAmJiAodG9wIDwgd2luZG93SGVpZ2h0KTtcblxuICAgICAgICAgICAgLy8gd2hlbiB0aGUgdG9wIG9mIHRoZSB2aWV3cG9ydCBpcyBjcm9zc2luZyB0aGUgZWxlbWVudFxuICAgICAgICAgICAgd2hlbi5pblZpZXdwb3J0VG9wID0gKGJvdHRvbSA+IDApICYmICh0b3AgPCAwKTtcblxuICAgICAgICAgICAgLy8gd2hlbiB0aGUgYm90dG9tIG9mIHRoZSB2aWV3cG9ydCBpcyBjcm9zc2luZyB0aGUgZWxlbWVudFxuICAgICAgICAgICAgd2hlbi5pblZpZXdwb3J0Qm90dG9tID0gKGJvdHRvbSA+IDApICYmICh0b3AgPCB3aW5kb3dIZWlnaHQpICYmIChib3R0b20gPiB3aW5kb3dIZWlnaHQpO1xuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogT05MWSB3aGVuIHRoZSBzY3JvbGxhYmxlIGVsZW1lbnQgSVMgdGhlIHdpbmRvd1xuICAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgIGlmICgkc2Nyb2xsYWJsZS5pcygkd2luZG93KSkge1xuXG4gICAgICAgICAgICAgICAgLy8gd2hlbiB0aGUgd2luZG93IGlzIHNjcm9sbGFibGUgYW5kIHRoZSBlbGVtZW50IGlzIGNvbXBsZXRlbHkgaW4gdGhlIHZpZXdwb3J0XG4gICAgICAgICAgICAgICAgd2hlbi5pbldpbmRvd1ZpZXdwb3J0RnVsbCA9ICh0b3AgPj0gc2Nyb2xsVG9wKSAmJiAoYm90dG9tIDw9IHdpbmRvd0JvdHRvbSk7XG5cbiAgICAgICAgICAgICAgICB3aGVuLmluV2luZG93Vmlld3BvcnQyID0gKHRvcCA+PSBzY3JvbGxUb3ApICYmICh0b3AgPD0gd2luZG93Qm90dG9tKTtcblxuICAgICAgICAgICAgICAgIHdoZW4uaW5XaW5kb3dWaWV3cG9ydDMgPSAoYm90dG9tID49IHNjcm9sbFRvcCkgJiYgKGJvdHRvbSA8PSB3aW5kb3dCb3R0b20pO1xuXG4gICAgICAgICAgICAgICAgd2hlbi5pbldpbmRvd1ZpZXdwb3J0NCA9IChib3R0b20gPj0gc2Nyb2xsVG9wKSAmJiAoYm90dG9tID49IHdpbmRvd0hlaWdodCkgJiYgKGhlaWdodCA+IHdpbmRvd0hlaWdodCk7XG5cbiAgICAgICAgICAgICAgICAvLyB3aGVuIHRoZSB3aW5kb3cgaXMgc2Nyb2xsYWJsZSBhbmQgdGhlIHRvcCBvZiB0aGUgdmlld3BvcnQgaXMgY3Jvc3NpbmcgdGhlIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB3aGVuLmluV2luZG93Vmlld3BvcnRUb3AgPSAhIHdoZW4uaW5XaW5kb3dWaWV3cG9ydDIgJiYgKHdoZW4uaW5XaW5kb3dWaWV3cG9ydDMgfHwgd2hlbi5pbldpbmRvd1ZpZXdwb3J0NCk7XG5cbiAgICAgICAgICAgICAgICAvLyB3aGVuIHRoZSB3aW5kb3cgaXMgc2Nyb2xsYWJsZSBhbmQgdGhlIGJvdHRvbSBvZiB0aGUgdmlld3BvcnQgaXMgY3Jvc3NpbmcgdGhlIGVsZW1lbnRcbiAgICAgICAgICAgICAgICB3aGVuLmluV2luZG93Vmlld3BvcnRCb3R0b20gPSB3aGVuLmluV2luZG93Vmlld3BvcnQyICYmICEgd2hlbi5pbldpbmRvd1ZpZXdwb3J0MztcblxuICAgICAgICAgICAgICAgIC8vIHdoZW4gdGhlIHdpbmRvdyBpcyBzY3JvbGxhYmxlIGFuZCB0aGUgZWxlbWVudCBpcyBhbnl3aGVyZSBpbiB2aWV3cG9ydFxuICAgICAgICAgICAgICAgIHdoZW4uaW5XaW5kb3dWaWV3cG9ydCA9IHdoZW4uaW5XaW5kb3dWaWV3cG9ydFRvcCB8fCB3aGVuLmluV2luZG93Vmlld3BvcnRCb3R0b20gfHwgd2hlbi5pbldpbmRvd1ZpZXdwb3J0RnVsbDtcblxuICAgICAgICAgICAgICAgIHdoZW4uaW5WaWV3cG9ydCA9IHdoZW4uaW5XaW5kb3dWaWV3cG9ydDtcbiAgICAgICAgICAgICAgICB3aGVuLmluVmlld3BvcnRUb3AgPSB3aGVuLmluV2luZG93Vmlld3BvcnRUb3A7XG4gICAgICAgICAgICAgICAgd2hlbi5pblZpZXdwb3J0Qm90dG9tID0gd2hlbi5pbldpbmRvd1ZpZXdwb3J0Qm90dG9tO1xuXG4gICAgICAgICAgICAgICAgcG9zID0gKHRvcCAtIHNjcm9sbFRvcCkgLyB3aW5kb3dIZWlnaHQgKiAxMDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh3aGVuLmluVmlld3BvcnRUb3AgJiYgd2hlbi5pblZpZXdwb3J0Qm90dG9tKSB7XG4gICAgICAgICAgICAgICAgd2hlbi5pblZpZXdwb3J0Qm90dG9tID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghIGlzTmFOKHNjcm9sbFRvcCkpIHtcbiAgICAgICAgICAgICAgICBsYXllcnMuZWFjaChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGxheWVyID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxheWVyT3B0aW9ucyA9IGdldE9wdGlvbnMobGF5ZXIpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB0eSA9ICh3aW5kb3dIZWlnaHQgKyBoZWlnaHQpIC0gYm90dG9tO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgkc2Nyb2xsYWJsZS5pcygkd2luZG93KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHkgPSB3aW5kb3dCb3R0b20gLSB0b3A7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAobGF5ZXJPcHRpb25zLnRyYW5zbGF0ZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGF5ZXJQb3MgPSAoLSAxICogcG9zICogbGF5ZXJPcHRpb25zLnNwZWVkKSArIGxheWVyT3B0aW9ucy5vZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGF5ZXJIZWlnaHQgPSBsYXllci5oZWlnaHQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdoZW4uaW5WaWV3cG9ydCAmJiAhIHdoZW4uaW5WaWV3cG9ydFRvcCAmJiAhIHdoZW4uaW5WaWV3cG9ydEJvdHRvbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXllci5pcygnaW1nJykgJiYgbGF5ZXJIZWlnaHQgPiBoZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChNYXRoLmFicyhsYXllclBvcykgKyBoZWlnaHQpID4gbGF5ZXJIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyUG9zID0gKGxheWVySGVpZ2h0IC0gaGVpZ2h0KSAqIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISBsYXllci5pcygnaW1nJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXJQb3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdoZW4uaW5WaWV3cG9ydFRvcCAmJiAoKGxheWVyLmlzKCdpbWcnKSAmJiBsYXllckhlaWdodCA9PSBoZWlnaHQpIHx8ICEgbGF5ZXIuaXMoJ2ltZycpICkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllclBvcyA9IE1hdGguYWJzKGxheWVyUG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdoZW4uaW5WaWV3cG9ydEJvdHRvbSAmJiAhIGxheWVyLmlzKCdpbWcnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyUG9zID0gaGVpZ2h0IC0gdHk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzY3JvbGxpbmcgdXBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsVG9wIDwgbGFzdFNjcm9sbFRvcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllclBvcyA9IGxheWVyUG9zICogLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdoZW4uaW5WaWV3cG9ydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyUG9zID0gKGxheWVyUG9zKS50b0ZpeGVkKDUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXllckhlaWdodCA+ICR3aW5kb3cuaGVpZ2h0KCkgJiYgc2Nyb2xsVG9wIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXJQb3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVZKGxheWVyLmdldCgwKSwgbGF5ZXJQb3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAobGF5ZXJPcHRpb25zLm9wYWNpdHkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmFkZSBpblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdoZW4uaW5WaWV3cG9ydEJvdHRvbSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHksIHlQO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRzY3JvbGxhYmxlLmlzKCR3aW5kb3cpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5UCA9ICh5IC8gaGVpZ2h0KS50b0ZpeGVkKDUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5ID4gb3BhY2l0eUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY3NzKHtvcGFjaXR5OiB5UH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY3NzKHtvcGFjaXR5OiAwfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib3R0b20gPCAod2luZG93SGVpZ2h0ICsgb3BhY2l0eUtleSkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeSA9ICh3aW5kb3dIZWlnaHQgKyBvcGFjaXR5S2V5KSAtIGJvdHRvbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHlQID0gKHkgLyBvcGFjaXR5S2V5KS50b0ZpeGVkKDUpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllci5jc3Moe29wYWNpdHk6IHlQfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllci5jc3Moe29wYWNpdHk6IDB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmFkZSBvdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHdoZW4uaW5WaWV3cG9ydFRvcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b3BPcmlnaW4gPSAkc2Nyb2xsYWJsZS5pcygkd2luZG93KSA/IHNjcm9sbFRvcCAtIHRvcCA6IHRvcEFicztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9wT3JpZ2luID4gb3BhY2l0eUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllci5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29wYWNpdHknOiAoMSAtICh0b3BPcmlnaW4gLyBoZWlnaHQpKS50b0ZpeGVkKDUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNzcyh7J29wYWNpdHknOiAxfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZXNldFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuY3NzKHsnb3BhY2l0eSc6IDF9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdoZW4uaW5WaWV3cG9ydEJvdHRvbSAmJiBzY3JvbGxUb3AgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLmNzcyh7J29wYWNpdHknOiAxfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBsYXN0U2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aWNraW5nID0gZmFsc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKCR3aW5kb3dDb250ZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgJHdpbmRvd0NvbnRlbnQuc2Nyb2xsKHJlcXVlc3RUaWNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICR3aW5kb3cuc2Nyb2xsKHJlcXVlc3RUaWNrKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgICQoJy5wYXJhbGxheCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAkKHRoaXMpLnRrUGFyYWxsYXgoKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5LCB3aW5kb3cpOyIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIHNraW4gPSByZXF1aXJlKCcuL19za2luJykoKTtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtTY3JvbGxhYmxlID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcblxuICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzZXR0aW5ncyA9ICQuZXh0ZW5kKHtcbiAgICAgICAgICAgIGhvcml6b250YWw6IGZhbHNlXG4gICAgICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgICAgIHZhciBuaWNlID0gdGhpcy5uaWNlU2Nyb2xsKHtcbiAgICAgICAgICAgIGN1cnNvcmJvcmRlcjogMCxcbiAgICAgICAgICAgIGN1cnNvcmNvbG9yOiBjb25maWcuc2tpbnNbIHNraW4gXVsgJ3ByaW1hcnktY29sb3InIF0sXG4gICAgICAgICAgICBob3JpenJhaWxlbmFibGVkOiBzZXR0aW5ncy5ob3Jpem9udGFsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghIHNldHRpbmdzLmhvcml6b250YWwpIHJldHVybjtcblxuICAgICAgICB2YXIgX3N1cGVyID0gbmljZS5nZXRDb250ZW50U2l6ZTtcblxuICAgICAgICBuaWNlLmdldENvbnRlbnRTaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBhZ2UgPSBfc3VwZXIuY2FsbChuaWNlKTtcbiAgICAgICAgICAgIHBhZ2UuaCA9IG5pY2Uud2luLmhlaWdodCgpO1xuICAgICAgICAgICAgcmV0dXJuIHBhZ2U7XG4gICAgICAgIH07XG5cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtc2Nyb2xsYWJsZV0nKS50a1Njcm9sbGFibGUoKTtcblxuICAgICQoJ1tkYXRhLXNjcm9sbGFibGUtaF0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICQodGhpcykudGtTY3JvbGxhYmxlKHsgaG9yaXpvbnRhbDogdHJ1ZSB9KTtcblxuICAgIH0pO1xuXG4gICAgdmFyIHQ7XG4gICAgJCh3aW5kb3cpLm9uKCdkZWJvdW5jZWRyZXNpemUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0KTtcbiAgICAgICAgdCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnW2RhdGEtc2Nyb2xsYWJsZV0sIFtkYXRhLXNjcm9sbGFibGUtaF0nKS5nZXROaWNlU2Nyb2xsKCkucmVzaXplKCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfSk7XG5cbn0oalF1ZXJ5KSk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkLmZuLnRrU2lkZWJhclNpemVQY0RlbW8gPSBmdW5jdGlvbigpe1xuXG4gICAgICAgIHZhciB0LCBzcGNfZGVtbyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCEgc3BjX2RlbW8ubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgJChkb2N1bWVudClcbiAgICAgICAgICAgIC5vbignc2lkZWJhci5zaG93JywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAkKCcjcGMtb3BlbicpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdzaWRlYmFyLmhpZGRlbicsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCgnI3BjLW9wZW4nKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHNwY19kZW1vLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIHMgPSAkKCcuc2lkZWJhcicpLCB2ZSA9ICQoJyNwYy12YWx1ZScpLCB2ID0gdmUudmFsKCk7XG4gICAgICAgICAgICB2ZS5ibHVyKCk7XG4gICAgICAgICAgICBpZiAoISB2Lmxlbmd0aCB8fCB2IDwgMjUpIHtcbiAgICAgICAgICAgICAgICB2ID0gMjU7XG4gICAgICAgICAgICAgICAgdmUudmFsKHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc1sgMCBdLmNsYXNzTmFtZSA9IHNbIDAgXS5jbGFzc05hbWUucmVwbGFjZSgvc2lkZWJhci1zaXplLShbXFxkXSspcGMvaWcsICdzaWRlYmFyLXNpemUtJyArIHYgKyAncGMnKTtcbiAgICAgICAgICAgIHNpZGViYXIub3Blbignc2lkZWJhci1tZW51Jyk7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodCk7XG4gICAgICAgICAgICB0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2lkZWJhci5jbG9zZSgnc2lkZWJhci1tZW51Jyk7XG4gICAgICAgICAgICB9LCA1MDAwKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwic2lkZWJhci1zaXplLXBjLWRlbW9cIl0nKS50a1NpZGViYXJTaXplUGNEZW1vKCk7XG5cbn0pKGpRdWVyeSk7IiwidmFyIGFzeW5jTG9hZGVyID0gcmVxdWlyZSgnLi9fYXN5bmMnKTtcblxuKGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgY2hhbmdlU2tpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNraW4gPSAkLmNvb2tpZShcInNraW5cIiksXG4gICAgICAgICAgICBmaWxlID0gJC5jb29raWUoXCJza2luLWZpbGVcIik7XG4gICAgICAgIGlmICh0eXBlb2Ygc2tpbiAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgYXN5bmNMb2FkZXIoWyAnY3NzLycgKyBmaWxlICsgJy5jc3MnIF0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1za2luXScpLnJlbW92ZVByb3AoJ2Rpc2FibGVkJykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgICQoJ1tkYXRhLXNraW5dJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmICgkKHRoaXMpLnByb3AoJ2Rpc2FibGVkJykpIHJldHVybjtcblxuICAgICAgICAkKCdbZGF0YS1za2luXScpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5hZGRDbGFzcygnbG9hZGluZycpO1xuXG4gICAgICAgICQuY29va2llKFwic2tpblwiLCAkKHRoaXMpLmRhdGEoJ3NraW4nKSk7XG5cbiAgICAgICAgJC5jb29raWUoXCJza2luLWZpbGVcIiwgJCh0aGlzKS5kYXRhKCdmaWxlJykpO1xuXG4gICAgICAgIGNoYW5nZVNraW4oKTtcblxuICAgIH0pO1xuXG4gICAgdmFyIHNraW4gPSAkLmNvb2tpZShcInNraW5cIik7XG5cbiAgICBpZiAodHlwZW9mIHNraW4gIT0gJ3VuZGVmaW5lZCcgJiYgc2tpbiAhPSAnZGVmYXVsdCcpIHtcbiAgICAgICAgY2hhbmdlU2tpbigpO1xuICAgIH1cblxufSkoalF1ZXJ5KTsiLCJyZXF1aXJlKCcuL19icmVha3BvaW50cy5qcycpO1xucmVxdWlyZSgnLi9fZ3JpZGFsaWNpb3VzLmpzJyk7XG5yZXF1aXJlKCcuL19zY3JvbGxhYmxlLmpzJyk7XG5yZXF1aXJlKCcuL19za2lucycpO1xucmVxdWlyZSgnLi9faXNvdG9wZScpO1xucmVxdWlyZSgnLi9fcGFyYWxsYXgnKTtcblxuLy8gU2lkZWJhciBQZXJjZW50YWdlIFNpemVzIERlbW9cbnJlcXVpcmUoJy4vX3NpZGViYXItcGMnKTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciByZXN0b3JlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJChcImh0bWxcIikuYWRkQ2xhc3MoJ3Nob3ctc2lkZWJhcicpO1xuICAgICAgICAgICAgJCgnLnNpZGViYXIuc2lkZWJhci12aXNpYmxlLWRlc2t0b3AnKS5ub3QoJzp2aXNpYmxlJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSBzaWRlYmFyLm9wdGlvbnMoJCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgc2lkZWJhci5vcGVuKCQodGhpcykuYXR0cignaWQnKSwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoXCJodG1sXCIpLnJlbW92ZUNsYXNzKCdzaG93LXNpZGViYXInKTtcbiAgICAgICAgICAgICQoJy5zaWRlYmFyOnZpc2libGUnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzaWRlYmFyLmNsb3NlKCQodGhpcykuYXR0cignaWQnKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICQod2luZG93KS5iaW5kKCdlbnRlckJyZWFrcG9pbnQ3NjgnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghICQoJy5zaWRlYmFyJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgIGlmICgkKCcuaGlkZS1zaWRlYmFyJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgIHJlc3RvcmUoKTtcbiAgICB9KTtcblxuICAgICQod2luZG93KS5iaW5kKCdlbnRlckJyZWFrcG9pbnQxMDI0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoISAkKCcuc2lkZWJhcicpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICBpZiAoJCgnLmhpZGUtc2lkZWJhcicpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICByZXN0b3JlKCk7XG4gICAgfSk7XG5cbiAgICAkKHdpbmRvdykuYmluZCgnZW50ZXJCcmVha3BvaW50NDgwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoISAkKCcuc2lkZWJhcicpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICBoaWRlKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPD0gNDgwKSB7XG4gICAgICAgIGlmICghICQoJy5zaWRlYmFyJykubGVuZ3RoKSByZXR1cm47XG4gICAgICAgIGhpZGUoKTtcbiAgICB9XG5cbn0pKGpRdWVyeSk7XG4iLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtTaWRlYmFyQ29sbGFwc2UgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB2YXIgc2lkZWJhciA9IHRoaXM7XG5cbiAgICAgICAgc2lkZWJhci5maW5kKCcuc2lkZWJhci1tZW51ID4gbGkgPiBhJykub2ZmKCdtb3VzZWVudGVyJyk7XG4gICAgICAgIHNpZGViYXIuZmluZCgnLnNpZGViYXItbWVudSA+IGxpLmRyb3Bkb3duID4gYScpLm9mZignbW91c2VlbnRlcicpO1xuICAgICAgICBzaWRlYmFyLmZpbmQoJy5zaWRlYmFyLW1lbnUgPiBsaSA+IGEnKS5vZmYoJ21vdXNlZW50ZXInKTtcbiAgICAgICAgc2lkZWJhci5maW5kKCcuc2lkZWJhci1tZW51ID4gbGkgPiBhJykub2ZmKCdjbGljaycpO1xuICAgICAgICBzaWRlYmFyLm9mZignbW91c2VsZWF2ZScpO1xuICAgICAgICBzaWRlYmFyLmZpbmQoJy5kcm9wZG93bicpLm9mZignbW91c2VvdmVyJyk7XG4gICAgICAgIHNpZGViYXIuZmluZCgnLmRyb3Bkb3duJykub2ZmKCdtb3VzZW91dCcpO1xuXG4gICAgICAgICQoJ2JvZHknKS5vZmYoJ21vdXNlb3V0JywgJyNkcm9wZG93bi10ZW1wIC5kcm9wZG93bicpO1xuXG4gICAgICAgIHNpZGViYXIuZmluZCgndWwuY29sbGFwc2UnKVxuICAgICAgICAgICAgLm9mZignc2hvd24uYnMuY29sbGFwc2UnKVxuICAgICAgICAgICAgLm9mZignc2hvdy5icy5jb2xsYXBzZScpXG4gICAgICAgICAgICAub2ZmKCdoaWRlLmJzLmNvbGxhcHNlJylcbiAgICAgICAgICAgIC5vZmYoJ2hpZGRlbi5icy5jb2xsYXBzZScpO1xuXG4gICAgICAgIHNpZGViYXIuZmluZCgnI2Ryb3Bkb3duLXRlbXAnKS5yZW1vdmUoKTtcblxuICAgICAgICBzaWRlYmFyLmZpbmQoJy5oYXNTdWJtZW51JykucmVtb3ZlQ2xhc3MoJ2Ryb3Bkb3duJylcbiAgICAgICAgICAgIC5maW5kKCc+IHVsJykuYWRkQ2xhc3MoJ2NvbGxhcHNlJykucmVtb3ZlQ2xhc3MoJ2Ryb3Bkb3duLW1lbnUgc3VibWVudS1oaWRlIHN1Ym1lbnUtc2hvdycpXG4gICAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAgIC5maW5kKCc+IGEnKS5hdHRyKCdkYXRhLXRvZ2dsZScsICdjb2xsYXBzZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHNpZGViYXIuZmluZCgnLmNvbGxhcHNlJykub24oJ3Nob3duLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2lkZWJhci5maW5kKCdbZGF0YS1zY3JvbGxhYmxlXScpLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ29sbGFwc2VcbiAgICAgICAgc2lkZWJhci5maW5kKCcuY29sbGFwc2UnKS5vbignc2hvdy5icy5jb2xsYXBzZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgdmFyIHBhcmVudHMgPSAkKHRoaXMpLnBhcmVudHMoJ3VsOmZpcnN0JykuZmluZCgnPiBsaS5vcGVuID4gdWwnKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHBhcmVudHMuY29sbGFwc2UoJ2hpZGUnKS5jbG9zZXN0KCcuaGFzU3VibWVudScpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5oYXNTdWJtZW51JykuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2lkZWJhci5maW5kKCcuY29sbGFwc2UnKS5vbignaGlkZGVuLmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5oYXNTdWJtZW51JykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2lkZWJhci5maW5kKCcuY29sbGFwc2UnKS5jb2xsYXBzZSh7IHRvZ2dsZTogZmFsc2UgfSk7XG5cbiAgICB9O1xuXG4gICAgJCgnLnNpZGViYXJbZGF0YS10eXBlPVwiY29sbGFwc2VcIl0nKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykudGtTaWRlYmFyQ29sbGFwc2UoKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIGpRdWVyeSBwbHVnaW4gd3JhcHBlciBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFuZ3VsYXIgVUkuVXRpbHM6IGpRdWVyeSBQYXNzdGhyb3VnaFxuICAgICAqL1xuICAgICQuZm4udGtTaWRlYmFyRHJvcGRvd24gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICB2YXIgc2lkZWJhciA9IHRoaXM7XG5cbiAgICAgICAgc2lkZWJhci5maW5kKCcuY29sbGFwc2UnKVxuICAgICAgICAgICAgLm9mZignc2hvd24uYnMuY29sbGFwc2UnKVxuICAgICAgICAgICAgLm9mZignc2hvdy5icy5jb2xsYXBzZScpXG4gICAgICAgICAgICAub2ZmKCdoaWRkZW4uYnMuY29sbGFwc2UnKTtcblxuICAgICAgICB2YXIgbmljZSA9IHNpZGViYXIuZmluZCgnW2RhdGEtc2Nyb2xsYWJsZV0nKTtcblxuICAgICAgICBpZiAobmljZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIG5pY2UgPSBuaWNlLmdldE5pY2VTY3JvbGwoKVsgMCBdO1xuICAgICAgICAgICAgbmljZS5zY3JvbGxzdGFydChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEgc2lkZWJhci5pcygnW2RhdGEtdHlwZT1cImRyb3Bkb3duXCJdJykpIHJldHVybjtcbiAgICAgICAgICAgICAgICBzaWRlYmFyLmFkZENsYXNzKCdzY3JvbGxpbmcnKTtcbiAgICAgICAgICAgICAgICBzaWRlYmFyLmZpbmQoJyNkcm9wZG93bi10ZW1wID4gdWwgPiBsaScpLmVtcHR5KCk7XG4gICAgICAgICAgICAgICAgc2lkZWJhci5maW5kKCcjZHJvcGRvd24tdGVtcCcpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBzaWRlYmFyLmZpbmQoJy5vcGVuJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBuaWNlLnNjcm9sbGVuZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEgc2lkZWJhci5pcygnW2RhdGEtdHlwZT1cImRyb3Bkb3duXCJdJykpIHJldHVybjtcbiAgICAgICAgICAgICAgICAkLmRhdGEodGhpcywgJ2xhc3RTY3JvbGxUb3AnLCBuaWNlLmdldFNjcm9sbFRvcCgpKTtcbiAgICAgICAgICAgICAgICBzaWRlYmFyLnJlbW92ZUNsYXNzKCdzY3JvbGxpbmcnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgc2lkZWJhci5maW5kKCcuaGFzU3VibWVudScpLmFkZENsYXNzKCdkcm9wZG93bicpLnJlbW92ZUNsYXNzKCdvcGVuJylcbiAgICAgICAgICAgIC5maW5kKCc+IHVsJykuYWRkQ2xhc3MoJ2Ryb3Bkb3duLW1lbnUnKS5yZW1vdmVDbGFzcygnY29sbGFwc2UgaW4nKS5yZW1vdmVBdHRyKCdzdHlsZScpXG4gICAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAgIC5maW5kKCc+IGEnKS5yZW1vdmVDbGFzcygnY29sbGFwc2VkJylcbiAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLXRvZ2dsZScpO1xuXG4gICAgICAgIHNpZGViYXIuZmluZCgnLnNpZGViYXItbWVudSA+IGxpLmRyb3Bkb3duID4gYScpLm9uKCdtb3VzZWVudGVyJywgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICB2YXIgYyA9IHNpZGViYXIuZmluZCgnI2Ryb3Bkb3duLXRlbXAnKTtcblxuICAgICAgICAgICAgc2lkZWJhci5maW5kKCcub3BlbicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICBjLmhpZGUoKTtcblxuICAgICAgICAgICAgaWYgKCEgJCh0aGlzKS5wYXJlbnQoJy5kcm9wZG93bicpLmlzKCcub3BlbicpICYmICEgc2lkZWJhci5pcygnLnNjcm9sbGluZycpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHAgPSAkKHRoaXMpLnBhcmVudCgnLmRyb3Bkb3duJyksXG4gICAgICAgICAgICAgICAgICAgIHQgPSBwLmZpbmQoJz4gLmRyb3Bkb3duLW1lbnUnKS5jbG9uZSgpLnJlbW92ZUNsYXNzKCdzdWJtZW51LWhpZGUnKTtcblxuICAgICAgICAgICAgICAgIGlmICghIGMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGMgPSAkKCc8ZGl2Lz4nKS5hdHRyKCdpZCcsICdkcm9wZG93bi10ZW1wJykuYXBwZW5kVG8oc2lkZWJhcik7XG4gICAgICAgICAgICAgICAgICAgIGMuaHRtbCgnPHVsPjxsaT48L2xpPjwvdWw+Jyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYy5zaG93KCk7XG4gICAgICAgICAgICAgICAgYy5maW5kKCcuZHJvcGRvd24tbWVudScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIGMgPSBjLmZpbmQoJz4gdWwgPiBsaScpLmNzcyh7b3ZlcmZsb3c6ICd2aXNpYmxlJ30pLmFkZENsYXNzKCdkcm9wZG93biBvcGVuJyk7XG5cbiAgICAgICAgICAgICAgICBwLmFkZENsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgdC5hcHBlbmRUbyhjKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICB0b3A6IHAub2Zmc2V0KCkudG9wIC0gYy5vZmZzZXQoKS50b3AsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6ICcxMDAlJ1xuICAgICAgICAgICAgICAgIH0pLnNob3coKTtcblxuICAgICAgICAgICAgICAgIGlmIChzaWRlYmFyLmlzKCcucmlnaHQnKSkge1xuICAgICAgICAgICAgICAgICAgICB0LmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnYXV0bycsXG4gICAgICAgICAgICAgICAgICAgICAgICByaWdodDogJzEwMCUnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2lkZWJhci5maW5kKCcuc2lkZWJhci1tZW51ID4gbGkgPiBhJykub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGlmICghICQodGhpcykucGFyZW50KCkuaXMoJy5kcm9wZG93bicpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNpZGViYXIgPSAkKHRoaXMpLmNsb3Nlc3QoJy5zaWRlYmFyJyk7XG4gICAgICAgICAgICAgICAgc2lkZWJhci5maW5kKCcub3BlbicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgc2lkZWJhci5maW5kKCcjZHJvcGRvd24tdGVtcCcpLmhpZGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KTtcblxuICAgICAgICBzaWRlYmFyLmZpbmQoJy5zaWRlYmFyLW1lbnUgPiBsaSA+IGEnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKCQodGhpcykucGFyZW50KCkuaXMoJy5kcm9wZG93bicpKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNpZGViYXIub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJyNkcm9wZG93bi10ZW1wJykuaGlkZSgpO1xuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcub3BlbicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNpZGViYXIuZmluZCgnLmRyb3Bkb3duJykub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ29wZW4nKS5jaGlsZHJlbigndWwnKS5yZW1vdmVDbGFzcygnc3VibWVudS1oaWRlJykuYWRkQ2xhc3MoJ3N1Ym1lbnUtc2hvdycpO1xuICAgICAgICB9KS5vbignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCd1bCcpLnJlbW92ZUNsYXNzKCcuc3VibWVudS1zaG93JykuYWRkQ2xhc3MoJ3N1Ym1lbnUtaGlkZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCdib2R5Jykub24oJ21vdXNlb3V0JywgJyNkcm9wZG93bi10ZW1wIC5kcm9wZG93bicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJy5zaWRlYmFyLW1lbnUgLm9wZW4nLCAkKHRoaXMpLmNsb3Nlc3QoJy5zaWRlYmFyJykpLnJlbW92ZUNsYXNzKCcub3BlbicpO1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICB2YXIgdHJhbnNmb3JtX2RkID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICQoJy5zaWRlYmFyW2RhdGEtdHlwZT1cImRyb3Bkb3duXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKHRoaXMpLnRrU2lkZWJhckRyb3Bkb3duKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIHZhciB0cmFuc2Zvcm1fY29sbGFwc2UgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgJCgnLnNpZGViYXJbZGF0YS10eXBlPVwiY29sbGFwc2VcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQodGhpcykudGtTaWRlYmFyQ29sbGFwc2UoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgdHJhbnNmb3JtX2RkKCk7XG5cbiAgICAkKHdpbmRvdykuYmluZCgnZW50ZXJCcmVha3BvaW50NDgwJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoISAkKCcuc2lkZWJhcltkYXRhLXR5cGU9XCJkcm9wZG93blwiXScpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAkKCcuc2lkZWJhcltkYXRhLXR5cGU9XCJkcm9wZG93blwiXScpLmF0dHIoJ2RhdGEtdHlwZScsICdjb2xsYXBzZScpLmF0dHIoJ2RhdGEtdHJhbnNmb3JtZWQnLCB0cnVlKTtcbiAgICAgICAgdHJhbnNmb3JtX2NvbGxhcHNlKCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBtYWtlX2RkKCkge1xuICAgICAgICBpZiAoISAkKCcuc2lkZWJhcltkYXRhLXR5cGU9XCJjb2xsYXBzZVwiXVtkYXRhLXRyYW5zZm9ybWVkXScpLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAkKCcuc2lkZWJhcltkYXRhLXR5cGU9XCJjb2xsYXBzZVwiXVtkYXRhLXRyYW5zZm9ybWVkXScpLmF0dHIoJ2RhdGEtdHlwZScsICdkcm9wZG93bicpLmF0dHIoJ2RhdGEtdHJhbnNmb3JtZWQnLCB0cnVlKTtcbiAgICAgICAgdHJhbnNmb3JtX2RkKCk7XG4gICAgfVxuXG4gICAgJCh3aW5kb3cpLmJpbmQoJ2VudGVyQnJlYWtwb2ludDc2OCcsIG1ha2VfZGQpO1xuXG4gICAgJCh3aW5kb3cpLmJpbmQoJ2VudGVyQnJlYWtwb2ludDEwMjQnLCBtYWtlX2RkKTtcblxufSkoalF1ZXJ5KTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzaWRlYmFyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgXCJ0cmFuc2Zvcm0tYnV0dG9uXCI6IHNpZGViYXIuZGF0YSgndHJhbnNmb3JtQnV0dG9uJykgPT09IHRydWUsXG4gICAgICAgIFwidHJhbnNmb3JtLWJ1dHRvbi1pY29uXCI6IHNpZGViYXIuZGF0YSgndHJhbnNmb3JtQnV0dG9uSWNvbicpIHx8ICdmYS1lbGxpcHNpcy1oJ1xuICAgIH07XG59OyIsIihmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIHNpZGViYXJzID0gJCgnLnNpZGViYXInKTtcblxuICAgIHNpZGViYXJzLmVhY2goZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHZhciBzaWRlYmFyID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSByZXF1aXJlKCcuL19vcHRpb25zJykoc2lkZWJhcik7XG5cbiAgICAgICAgaWYgKG9wdGlvbnNbICd0cmFuc2Zvcm0tYnV0dG9uJyBdKSB7XG4gICAgICAgICAgICB2YXIgYnV0dG9uID0gJCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCI+PC9idXR0b24+Jyk7XG5cbiAgICAgICAgICAgIGJ1dHRvblxuICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXRvZ2dsZScsICdzaWRlYmFyLXRyYW5zZm9ybScpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdidG4gYnRuLWRlZmF1bHQnKVxuICAgICAgICAgICAgICAgIC5odG1sKCc8aSBjbGFzcz1cImZhICcgKyBvcHRpb25zWyAndHJhbnNmb3JtLWJ1dHRvbi1pY29uJyBdICsgJ1wiPjwvaT4nKTtcblxuICAgICAgICAgICAgc2lkZWJhci5maW5kKCcuc2lkZWJhci1tZW51JykuYXBwZW5kKGJ1dHRvbik7XG4gICAgICAgIH1cbiAgICB9KTtcblxufShqUXVlcnkpKTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQoJyNzdWJuYXYnKS5jb2xsYXBzZSh7J3RvZ2dsZSc6IGZhbHNlfSk7XG5cbiAgICBmdW5jdGlvbiBtb2JpbGVjaGVjaygpIHtcbiAgICAgICAgdmFyIGNoZWNrID0gZmFsc2U7XG4gICAgICAgIChmdW5jdGlvbiAoYSkge1xuICAgICAgICAgICAgaWYgKC8oYW5kcm9pZHxpcGFkfHBsYXlib29rfHNpbGt8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxuZXRmcm9udHxvcGVyYSBtKG9ifGluKWl8cGFsbSggb3MpP3xwaG9uZXxwKGl4aXxyZSlcXC98cGx1Y2tlcnxwb2NrZXR8cHNwfHNlcmllcyg0fDYpMHxzeW1iaWFufHRyZW98dXBcXC4oYnJvd3NlcnxsaW5rKXx2b2RhZm9uZXx3YXB8d2luZG93cyAoY2V8cGhvbmUpfHhkYXx4aWluby9pLnRlc3QoYSkgfHwgLzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL2kudGVzdChhLnN1YnN0cigwLCA0KSkpXG4gICAgICAgICAgICAgICAgY2hlY2sgPSB0cnVlO1xuICAgICAgICB9KShuYXZpZ2F0b3IudXNlckFnZW50IHx8IG5hdmlnYXRvci52ZW5kb3IgfHwgd2luZG93Lm9wZXJhKTtcbiAgICAgICAgcmV0dXJuIGNoZWNrO1xuICAgIH1cblxuICAgIChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgICAgIGVmZmVjdDogJ3N0LWVmZmVjdC0xJyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogNTUwLFxuICAgICAgICAgICAgICAgIG92ZXJsYXk6IGZhbHNlXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjb250YWluZXJTZWxlY3RvciA9ICcuc3QtY29udGFpbmVyJyxcblxuICAgICAgICAgICAgZXZlbnR0eXBlID0gbW9iaWxlY2hlY2soKSA/ICd0b3VjaHN0YXJ0JyA6ICdjbGljaycsXG5cbiAgICAgICAgICAgIGdldExheW91dENsYXNzZXMgPSBmdW5jdGlvbiAoc2lkZWJhciwgZGlyZWN0aW9uKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgbGF5b3V0Q2xhc3NlcyA9IHNpZGViYXIuZGF0YSgnbGF5b3V0Q2xhc3NlcycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCEgbGF5b3V0Q2xhc3Nlcykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG9nZ2xlTGF5b3V0ID0gc2lkZWJhci5kYXRhKCd0b2dnbGVMYXlvdXQnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0b2dnbGVMYXlvdXQgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxheW91dENsYXNzZXMgPSB0b2dnbGVMYXlvdXQuc3BsaXQoXCIsXCIpLmpvaW4oXCIgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZWJhci5kYXRhKCdsYXlvdXRDbGFzc2VzJywgbGF5b3V0Q2xhc3Nlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGF5b3V0Q2xhc3NlcztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IG5ldyBSZWdFeHAoJ3NpZGViYXItJyArIGRpcmVjdGlvbiArICcoXFxcXFMrKScsICdpZycpO1xuICAgICAgICAgICAgICAgICAgICBsYXlvdXRDbGFzc2VzID0gJCgnaHRtbCcpLmdldCgwKS5jbGFzc05hbWUubWF0Y2gobWF0Y2gpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGF5b3V0Q2xhc3NlcyAhPT0gbnVsbCAmJiBsYXlvdXRDbGFzc2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0Q2xhc3NlcyA9IGxheW91dENsYXNzZXMuam9pbihcIiBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlYmFyLmRhdGEoJ2xheW91dENsYXNzZXMnLCBsYXlvdXRDbGFzc2VzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBsYXlvdXRDbGFzc2VzO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRTaWRlYmFyRGF0YU9wdGlvbnMgPSBmdW5jdGlvbihzaWRlYmFyKXtcblxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGVmZmVjdDogc2lkZWJhci5kYXRhKCdlZmZlY3QnKSxcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheTogc2lkZWJhci5kYXRhKCdvdmVybGF5JylcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBhbmltYXRpbmcgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoJCgnYm9keScpLmhhc0NsYXNzKCdhbmltYXRpbmcnKSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdhbmltYXRpbmcnKTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2FuaW1hdGluZycpO1xuICAgICAgICAgICAgICAgIH0sIGRlZmF1bHRzLmR1cmF0aW9uKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVzZXQgPSBmdW5jdGlvbiAoaWQsIG9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgIHZhciBjb250YWluZXIgPSAkKGNvbnRhaW5lclNlbGVjdG9yKTtcblxuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSB0eXBlb2YgaWQgIT09ICd1bmRlZmluZWQnID8gJyMnICsgaWQgOiBjb250YWluZXIuZGF0YSgnc3RNZW51VGFyZ2V0JyksXG4gICAgICAgICAgICAgICAgICAgIHNpZGViYXIgPSAkKHRhcmdldCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoISBzaWRlYmFyLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICghIHNpZGViYXIuaXMoJzp2aXNpYmxlJykpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoc2lkZWJhci5oYXNDbGFzcygnc2lkZWJhci1jbG9zZWQnKSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgdmFyIGVmZmVjdCA9IHR5cGVvZiBvcHRpb25zICE9PSAndW5kZWZpbmVkJyAmJiBvcHRpb25zLmVmZmVjdCA/IG9wdGlvbnMuZWZmZWN0IDogY29udGFpbmVyLmRhdGEoJ3N0TWVudUVmZmVjdCcpLFxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBzaWRlYmFyLmlzKCcubGVmdCcpID8gJ2wnIDogJ3InLFxuICAgICAgICAgICAgICAgICAgICBzaXplID0gc2lkZWJhci5nZXQoMCkuY2xhc3NOYW1lLm1hdGNoKC9zaWRlYmFyLXNpemUtKFxcUyspLykucG9wKCksXG4gICAgICAgICAgICAgICAgICAgIGh0bWxDbGFzcyA9ICdzdC1lZmZlY3QtJyArIGRpcmVjdGlvbiArIHNpemUsXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUxheW91dCA9IHNpZGViYXIuZGF0YSgndG9nZ2xlTGF5b3V0JyksXG4gICAgICAgICAgICAgICAgICAgIGxheW91dENsYXNzZXMgPSBnZXRMYXlvdXRDbGFzc2VzKHNpZGViYXIsIGRpcmVjdGlvbiksXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50RGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZGViYXI6IHNpZGViYXIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldFxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkudHJpZ2dlcignc2lkZWJhci5oaWRlJywgZXZlbnREYXRhKTtcblxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cInNpZGViYXItbWVudVwiXVtocmVmPVwiJyArIHRhcmdldCArICdcIl0nKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCdsaScpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAkKCdodG1sJykuYWRkQ2xhc3MoaHRtbENsYXNzKTtcbiAgICAgICAgICAgICAgICBzaWRlYmFyLmFkZENsYXNzKGVmZmVjdCk7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKGVmZmVjdCk7XG5cbiAgICAgICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoJ3N0LW1lbnUtb3BlbiBzdC1wdXNoZXItb3ZlcmxheScpO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJ2h0bWwnKS5yZW1vdmVDbGFzcyhodG1sQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9nZ2xlTGF5b3V0KSAkKCdodG1sJykucmVtb3ZlQ2xhc3MobGF5b3V0Q2xhc3Nlcyk7XG4gICAgICAgICAgICAgICAgICAgIHNpZGViYXIucmVtb3ZlQ2xhc3MoZWZmZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmdldCgwKS5jbGFzc05hbWUgPSAnc3QtY29udGFpbmVyJzsgLy8gY2xlYXJcbiAgICAgICAgICAgICAgICAgICAgc2lkZWJhci5hZGRDbGFzcygnc2lkZWJhci1jbG9zZWQnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ3NpZGViYXIuaGlkZGVuJywgZXZlbnREYXRhKTtcbiAgICAgICAgICAgICAgICB9LCBkZWZhdWx0cy5kdXJhdGlvbik7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9wZW4gPSBmdW5jdGlvbiAodGFyZ2V0LCBvcHRpb25zKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyID0gJChjb250YWluZXJTZWxlY3Rvcik7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2lkZWJhciA9ICQodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBpZiAoISBzaWRlYmFyLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gb24gbW9iaWxlLCBhbGxvdyBvbmx5IG9uZSBzaWRlYmFyIHRvIGJlIG9wZW4gYXQgdGhlIHNhbWUgdGltZVxuICAgICAgICAgICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDc2OCAmJiBjb250YWluZXIuaGFzQ2xhc3MoJ3N0LW1lbnUtb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNldCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICQoJ1tkYXRhLXRvZ2dsZT1cInNpZGViYXItbWVudVwiXVtocmVmPVwiJyArIHRhcmdldCArICdcIl0nKVxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KCdsaScpXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZWZmZWN0ID0gb3B0aW9ucy5lZmZlY3QsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJsYXkgPSBvcHRpb25zLm92ZXJsYXk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gc2lkZWJhci5pcygnLmxlZnQnKSA/ICdsJyA6ICdyJyxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IHNpZGViYXIuZ2V0KDApLmNsYXNzTmFtZS5tYXRjaCgvc2lkZWJhci1zaXplLShcXFMrKS8pLnBvcCgpLFxuICAgICAgICAgICAgICAgICAgICBodG1sQ2xhc3MgPSAnc3QtZWZmZWN0LScgKyBkaXJlY3Rpb24gKyBzaXplLFxuICAgICAgICAgICAgICAgICAgICB0b2dnbGVMYXlvdXQgPSBzaWRlYmFyLmRhdGEoJ3RvZ2dsZUxheW91dCcpLFxuICAgICAgICAgICAgICAgICAgICBsYXlvdXRDbGFzc2VzID0gZ2V0TGF5b3V0Q2xhc3NlcyhzaWRlYmFyLCBkaXJlY3Rpb24pLFxuICAgICAgICAgICAgICAgICAgICBldmVudERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlYmFyOiBzaWRlYmFyLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXRcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ3NpZGViYXIuc2hvdycsIGV2ZW50RGF0YSk7XG5cbiAgICAgICAgICAgICAgICAkKCdodG1sJykuYWRkQ2xhc3MoaHRtbENsYXNzKTtcbiAgICAgICAgICAgICAgICBzaWRlYmFyLnNob3coKS5yZW1vdmVDbGFzcygnc2lkZWJhci1jbG9zZWQnKTtcblxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5kYXRhKCdzdE1lbnVFZmZlY3QnLCBlZmZlY3QpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5kYXRhKCdzdE1lbnVUYXJnZXQnLCB0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgc2lkZWJhci5hZGRDbGFzcyhlZmZlY3QpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDbGFzcyhlZmZlY3QpO1xuICAgICAgICAgICAgICAgIGlmIChvdmVybGF5KSBjb250YWluZXIuYWRkQ2xhc3MoJ3N0LXB1c2hlci1vdmVybGF5Jyk7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmFkZENsYXNzKCdzdC1tZW51LW9wZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgc2lkZWJhci5maW5kKCdbZGF0YS1zY3JvbGxhYmxlXScpLmdldE5pY2VTY3JvbGwoKS5yZXNpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoJ3Jlc2l6ZScpO1xuICAgICAgICAgICAgICAgIH0sIDI1KTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9nZ2xlTGF5b3V0KSAkKCdodG1sJykuYWRkQ2xhc3MobGF5b3V0Q2xhc3Nlcyk7XG4gICAgICAgICAgICAgICAgICAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ3NpZGViYXIuc2hvd24nLCBldmVudERhdGEpO1xuICAgICAgICAgICAgICAgIH0sIGRlZmF1bHRzLmR1cmF0aW9uKTtcblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgdG9nZ2xlID0gZnVuY3Rpb24gKGUpIHtcblxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGEgPSBhbmltYXRpbmcoKTtcbiAgICAgICAgICAgICAgICBpZiAoYSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgdmFyIGJ1dHRvbiA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IGJ1dHRvbi5hdHRyKCdocmVmJyksXG4gICAgICAgICAgICAgICAgICAgIHNpZGViYXI7XG5cbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Lmxlbmd0aCA+IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2lkZWJhciA9ICQodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEgc2lkZWJhci5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Lmxlbmd0aCA8IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRBY3RpdmVFbGVtZW50ID0gJCgnW2RhdGEtdG9nZ2xlPVwic2lkZWJhci1tZW51XCJdJykubm90KHRoaXMpLmNsb3Nlc3QoJ2xpJykubGVuZ3RoID8gJCgnW2RhdGEtdG9nZ2xlPVwic2lkZWJhci1tZW51XCJdJykubm90KHRoaXMpLmNsb3Nlc3QoJ2xpJykgOiAkKCdbZGF0YS10b2dnbGU9XCJzaWRlYmFyLW1lbnVcIl0nKS5ub3QodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhY3RpdmVFbGVtZW50ID0gJCh0aGlzKS5jbG9zZXN0KCdsaScpLmxlbmd0aCA/ICQodGhpcykuY2xvc2VzdCgnbGknKSA6ICQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEFjdGl2ZUVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVFbGVtZW50LmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoJCgnaHRtbCcpLmhhc0NsYXNzKCdzaG93LXNpZGViYXInKSkgYWN0aXZlRWxlbWVudC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgJCgnaHRtbCcpLnJlbW92ZUNsYXNzKCdzaG93LXNpZGViYXInKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYWN0aXZlRWxlbWVudC5oYXNDbGFzcygnYWN0aXZlJykpICQoJ2h0bWwnKS5hZGRDbGFzcygnc2hvdy1zaWRlYmFyJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZGF0YU9wdGlvbnMgPSBnZXRTaWRlYmFyRGF0YU9wdGlvbnMoc2lkZWJhciksXG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbk9wdGlvbnMgPSB7fTtcblxuICAgICAgICAgICAgICAgIGlmIChidXR0b24uZGF0YSgnZWZmZWN0JykpIGJ1dHRvbk9wdGlvbnMuZWZmZWN0ID0gYnV0dG9uLmRhdGEoJ2VmZmVjdCcpO1xuICAgICAgICAgICAgICAgIGlmIChidXR0b24uZGF0YSgnb3ZlcmxheScpKSBidXR0b25PcHRpb25zLm92ZXJsYXkgPSBidXR0b24uZGF0YSgnb3ZlcmxheScpO1xuXG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIGRhdGFPcHRpb25zLCBidXR0b25PcHRpb25zKTtcblxuICAgICAgICAgICAgICAgIGlmICghIHNpZGViYXIuaGFzQ2xhc3MoJ3NpZGViYXItY2xvc2VkJykgJiYgc2lkZWJhci5pcygnOnZpc2libGUnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXNldChzaWRlYmFyLmF0dHIoJ2lkJyksIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgb3Blbih0YXJnZXQsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICQoJ2JvZHknKS5vbihldmVudHR5cGUsICdbZGF0YS10b2dnbGU9XCJzaWRlYmFyLW1lbnVcIl0nLCB0b2dnbGUpO1xuXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdrZXlkb3duJywgbnVsbCwgJ2VzYycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9ICQoY29udGFpbmVyU2VsZWN0b3IpO1xuXG4gICAgICAgICAgICBpZiAoY29udGFpbmVyLmhhc0NsYXNzKCdzdC1tZW51LW9wZW4nKSkge1xuICAgICAgICAgICAgICAgIHJlc2V0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBqUXVlcnkgcGx1Z2luIHdyYXBwZXIgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBBbmd1bGFyIFVJLlV0aWxzOiBqUXVlcnkgUGFzc3Rocm91Z2hcbiAgICAgICAgICovXG4gICAgICAgICQuZm4udGtTaWRlYmFyVG9nZ2xlQmFyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBpZiAoISB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgICAgICB2YXIgc2lkZWJhciA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8qIFNpZGViYXIgVG9nZ2xlIEJhciAqL1xuICAgICAgICAgICAgaWYgKHNpZGViYXIuZGF0YSgndG9nZ2xlQmFyJykpIHtcbiAgICAgICAgICAgICAgICB2YXIgYmFyID0gJCgnPGE+PC9hPicpO1xuICAgICAgICAgICAgICAgIGJhci5hdHRyKCdocmVmJywgJyMnICsgc2lkZWJhci5hdHRyKCdpZCcpKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignZGF0YS10b2dnbGUnLCAnc2lkZWJhci1tZW51JylcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzaWRlYmFyLXRvZ2dsZS1iYXInKTtcblxuICAgICAgICAgICAgICAgIHNpZGViYXIuYXBwZW5kKGJhcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICAkKCcuc2lkZWJhcicpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQodGhpcykudGtTaWRlYmFyVG9nZ2xlQmFyKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdpbmRvdy5zaWRlYmFyID0ge1xuXG4gICAgICAgICAgICBvcGVuOiBmdW5jdGlvbiAoaWQsIG9wdGlvbnMpIHtcblxuICAgICAgICAgICAgICAgIHZhciBhID0gYW5pbWF0aW5nKCk7XG4gICAgICAgICAgICAgICAgaWYgKGEpIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wZW4oJyMnICsgaWQsIG9wdGlvbnMpO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjbG9zZTogZnVuY3Rpb24gKGlkLCBvcHRpb25zKSB7XG5cbiAgICAgICAgICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXNldChpZCwgb3B0aW9ucyk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIG9wdGlvbnM6IGdldFNpZGViYXJEYXRhT3B0aW9uc1xuXG4gICAgICAgIH07XG5cbiAgICB9KSgpO1xuXG59KShqUXVlcnkpOyIsInJlcXVpcmUoJy4vX2JyZWFrcG9pbnRzJyk7XG5yZXF1aXJlKCcuL19zaWRlYmFyLW1lbnUnKTtcbnJlcXVpcmUoJy4vX2NvbGxhcHNpYmxlJyk7XG5yZXF1aXJlKCcuL19kcm9wZG93bicpO1xucmVxdWlyZSgnLi9fc2lkZWJhci10b2dnbGUnKTtcblxuKGZ1bmN0aW9uKCQpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogalF1ZXJ5IHBsdWdpbiB3cmFwcGVyIGZvciBjb21wYXRpYmlsaXR5IHdpdGggQW5ndWxhciBVSS5VdGlsczogalF1ZXJ5IFBhc3N0aHJvdWdoXG4gICAgICovXG4gICAgJC5mbi50a1NpZGViYXIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXG4gICAgICAgIGlmICghIHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHNldHRpbmdzID0gJC5leHRlbmQoe1xuICAgICAgICAgICAgbWVudVR5cGU6IGZhbHNlLFxuICAgICAgICAgICAgdG9nZ2xlQmFyOiBmYWxzZVxuICAgICAgICB9LCBvcHRpb25zKTtcblxuICAgICAgICB2YXIgc2lkZWJhciA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHNldHRpbmdzLm1lbnVUeXBlID09IFwiY29sbGFwc2VcIikge1xuICAgICAgICAgICAgc2lkZWJhci50a1NpZGViYXJDb2xsYXBzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNldHRpbmdzLm1lbnVUeXBlID09IFwiZHJvcGRvd25cIikge1xuICAgICAgICAgICAgc2lkZWJhci50a1NpZGViYXJEcm9wZG93bigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNldHRpbmdzLnRvZ2dsZUJhciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc2lkZWJhci50a1NpZGViYXJUb2dnbGVCYXIoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQoJy5zaGFyZSB0ZXh0YXJlYScpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJChcIi5zaGFyZSBidXR0b25cIilbICQodGhpcykudmFsKCkgPT09ICcnID8gJ2hpZGUnIDogJ3Nob3cnIF0oKTtcbiAgICB9KTtcblxuICAgIGlmICghICQoXCIjc2Nyb2xsLXNweVwiKS5sZW5ndGgpIHJldHVybjtcblxuICAgIHZhciBvZmZzZXQgPSAkKFwiI3Njcm9sbC1zcHlcIikub2Zmc2V0KCkudG9wO1xuXG4gICAgJCgnYm9keScpLnNjcm9sbHNweSh7dGFyZ2V0OiAnI3Njcm9sbC1zcHknLCBvZmZzZXQ6IG9mZnNldH0pO1xuXG59KShqUXVlcnkpO1xuIiwicmVxdWlyZSgnLi9fdGltZWxpbmUnKTsiLCIoZnVuY3Rpb24gKCQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICQod2luZG93KS5iaW5kKCdlbnRlckJyZWFrcG9pbnQzMjAnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpbWcgPSAkKCcubWVzc2FnZXMtbGlzdCAucGFuZWwgdWwgaW1nJyk7XG4gICAgICAgICQoJy5tZXNzYWdlcy1saXN0IC5wYW5lbCB1bCcpLndpZHRoKGltZy5maXJzdCgpLndpZHRoKCkgKiBpbWcubGVuZ3RoKTtcbiAgICB9KTtcblxuICAgICQod2luZG93KS5iaW5kKCdleGl0QnJlYWtwb2ludDMyMCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnLm1lc3NhZ2VzLWxpc3QgLnBhbmVsIHVsJykud2lkdGgoJ2F1dG8nKTtcbiAgICB9KTtcblxufSkoalF1ZXJ5KTtcbiIsIihmdW5jdGlvbiAoJCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIG5pY2UgPSAkKCcubWVzc2FnZXMtbGlzdCAucGFuZWwnKS5uaWNlU2Nyb2xsKHtjdXJzb3Jib3JkZXI6IDAsIGN1cnNvcmNvbG9yOiBcIiMyNWFkOWZcIiwgemluZGV4OiAxfSk7XG5cbiAgICB2YXIgX3N1cGVyID0gbmljZS5nZXRDb250ZW50U2l6ZTtcblxuICAgIG5pY2UuZ2V0Q29udGVudFNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYWdlID0gX3N1cGVyLmNhbGwobmljZSk7XG4gICAgICAgIHBhZ2UuaCA9IG5pY2Uud2luLmhlaWdodCgpO1xuICAgICAgICByZXR1cm4gcGFnZTtcbiAgICB9O1xuXG59KShqUXVlcnkpOyIsInJlcXVpcmUoJy4vX2JyZWFrcG9pbnRzJyk7XG5yZXF1aXJlKCcuL19uaWNlc2Nyb2xsJyk7IiwiKGZ1bmN0aW9uICgkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAkKCcjdXNlcnMtZmlsdGVyLXNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlID09PSAnbmFtZScpIHtcbiAgICAgICAgICAgICQoJyN1c2VyLWZpcnN0JykucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICAgICAgJCgnI3VzZXItc2VhcmNoLW5hbWUnKS5yZW1vdmVDbGFzcygnaGlkZGVuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcjdXNlci1maXJzdCcpLmFkZENsYXNzKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICQoJyN1c2VyLXNlYXJjaC1uYW1lJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnZhbHVlID09PSAnZnJpZW5kcycpIHtcbiAgICAgICAgICAgICQoJy5zZWxlY3QtZnJpZW5kcycpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLnNlbGVjdC1mcmllbmRzJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnZhbHVlID09PSAnbmFtZScpIHtcbiAgICAgICAgICAgICQoJy5zZWFyY2gtbmFtZScpLnJlbW92ZUNsYXNzKCdoaWRkZW4nKTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnLnNlYXJjaC1uYW1lJykuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn0pKGpRdWVyeSk7XG4iLCIvLyBVc2Vyc1xucmVxdWlyZSgnLi4vLi4vcGFnZXMvdXNlcnMnKTtcblxuLy8gTWVzc2FnZXNcbnJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvbWVzc2FnZXMvbWFpbicpOyJdfQ==
